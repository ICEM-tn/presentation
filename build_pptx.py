# build_pptx.py
# Generates two PowerPoint decks that mirror the React presentation:
#   - KOMAX_deck_SIMPLE.pptx    (notes = SPEECH_FR_SIMPLE.md)
#   - KOMAX_deck_COMPLET.pptx   (notes = SPEECH_FR.md)
#
# Pure python-pptx shapes / text boxes (editable in PowerPoint). Animations
# and custom SVG components from the React deck are approximated with static
# rounded rectangles, icons, and text — fidelity is intentionally lower than
# the React version (see MEMORY session_history 2026-09-03 for context).
#
# Run:
#   python build_pptx.py            # both files
#   python build_pptx.py simple     # SIMPLE only
#   python build_pptx.py full       # COMPLET only

from __future__ import annotations

import re
import sys
from pathlib import Path

from pptx import Presentation
from pptx.util import Emu, Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR

ROOT = Path(__file__).resolve().parent


# ============================================================================
# 1. Design tokens (mirror presentation/src/styles/globals.css :root)
# ============================================================================
class C:
    NAVY_950 = RGBColor(0x05, 0x0B, 0x1E)
    NAVY_900 = RGBColor(0x0A, 0x12, 0x30)
    NAVY_800 = RGBColor(0x10, 0x1A, 0x45)
    NAVY_700 = RGBColor(0x18, 0x25, 0x62)
    NAVY_500 = RGBColor(0x2A, 0x3D, 0x94)
    NAVY_300 = RGBColor(0x68, 0x79, 0xC9)
    NAVY_100 = RGBColor(0xDF, 0xE4, 0xF7)

    ORANGE_500 = RGBColor(0xFF, 0x7A, 0x1A)
    ORANGE_400 = RGBColor(0xFF, 0x95, 0x48)
    ORANGE_300 = RGBColor(0xFF, 0xB3, 0x7A)
    ORANGE_100 = RGBColor(0xFF, 0xE4, 0xD1)

    CYAN = RGBColor(0x4E, 0xCD, 0xC4)
    GREEN = RGBColor(0x4A, 0xDE, 0x80)
    RED = RGBColor(0xF8, 0x71, 0x71)
    YELLOW = RGBColor(0xFA, 0xCC, 0x15)

    GREY_100 = RGBColor(0xF4, 0xF6, 0xFB)
    GREY_300 = RGBColor(0xC9, 0xD0, 0xDC)
    GREY_500 = RGBColor(0x7D, 0x84, 0x96)
    GREY_700 = RGBColor(0x3A, 0x3F, 0x4C)

    WHITE = RGBColor(0xFF, 0xFF, 0xFF)
    BLACK = RGBColor(0x00, 0x00, 0x00)


DISPLAY_FONT = "Space Grotesk"
BODY_FONT = "Inter"
MONO_FONT = "JetBrains Mono"


# 16:9 widescreen (default PowerPoint)
SLIDE_W = Inches(13.333)
SLIDE_H = Inches(7.5)

# Content grid margins (mirrors slide-inner max-width feel)
PAD_L = Inches(0.7)
PAD_R = Inches(0.7)
PAD_T = Inches(0.55)
PAD_B = Inches(0.4)
CONTENT_W = SLIDE_W - PAD_L - PAD_R  # ≈ 11.93"
CONTENT_H = SLIDE_H - PAD_T - PAD_B  # ≈ 6.55"


# ============================================================================
# 2. Speech parser  (positional — tolerates "## 18-bis" and any non-integer label)
# ============================================================================
# Accepts:  "## 1 — Cover (45 s)" · "## 18-bis — Microservice IA (45 s)"
# Rejects:  "## Timing global"  (no dash after the label)
HEADING_RE = re.compile(r"^##\s+([\w\-]+)\s+[—-]\s+(.+?)(?:\s*\(([^)]+)\))?\s*$")
QUOTE_RE = re.compile(r"^>\s?(.*)$")


def parse_speech(md_path: Path) -> dict[int, dict]:
    """Return {slide_index: {title, duration, text}} keyed by positional slot
    (1..N) — the Nth `## <label> — <title>` heading maps to slide N regardless
    of the label value. Prevents drift when the source MD uses "18-bis" etc.
    """
    if not md_path.exists():
        return {}
    lines = md_path.read_text(encoding="utf-8").splitlines()
    entries: list[dict] = []
    cur: dict | None = None
    buf: list[str] = []

    def flush():
        nonlocal buf
        if cur is not None:
            cur["text"] = "\n".join(buf).strip()
            entries.append(cur)
        buf = []

    for line in lines:
        m = HEADING_RE.match(line)
        if m:
            flush()
            cur = {
                "label": m.group(1),
                "title": m.group(2).strip(),
                "duration": (m.group(3) or "").strip(),
            }
            buf = []
            continue
        if cur is None:
            continue
        q = QUOTE_RE.match(line)
        if q:
            buf.append(q.group(1))
    flush()

    return {i + 1: e for i, e in enumerate(entries)}


# ============================================================================
# 3. Low-level helpers
# ============================================================================
def paint_backdrop(slide, glow: bool = True):
    """Fill slide with navy_950 background + optional soft glow orbs."""
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, SLIDE_W, SLIDE_H)
    bg.line.fill.background()
    bg.fill.solid()
    bg.fill.fore_color.rgb = C.NAVY_950
    bg.shadow.inherit = False

    if glow:
        # Top-left navy_500 glow
        o1 = slide.shapes.add_shape(MSO_SHAPE.OVAL, Inches(-3), Inches(-2.5), Inches(9), Inches(6))
        o1.line.fill.background()
        o1.fill.solid()
        o1.fill.fore_color.rgb = C.NAVY_800
        _set_transparency(o1, 70)

        # Bottom-right orange faint glow
        o2 = slide.shapes.add_shape(MSO_SHAPE.OVAL, Inches(8), Inches(4.5), Inches(8), Inches(5))
        o2.line.fill.background()
        o2.fill.solid()
        o2.fill.fore_color.rgb = C.ORANGE_500
        _set_transparency(o2, 88)


def _set_transparency(shape, pct: int):
    """Set fill transparency (0-100). Works on solid-filled shapes."""
    from pptx.oxml.ns import qn
    from lxml import etree
    sp = shape.fill._xPr  # noqa
    solid = sp.find(qn("a:solidFill"))
    if solid is None:
        return
    rgb = solid.find(qn("a:srgbClr"))
    if rgb is None:
        return
    # remove any existing alpha
    for alpha in rgb.findall(qn("a:alpha")):
        rgb.remove(alpha)
    a = etree.SubElement(rgb, qn("a:alpha"))
    a.set("val", str(int((100 - pct) * 1000)))


def add_text(slide, x, y, w, h, text, *,
             font=BODY_FONT, size=18, bold=False, italic=False,
             color=C.WHITE, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP,
             letter_spacing_pct=0, line_spacing=1.1):
    tb = slide.shapes.add_textbox(x, y, w, h)
    tf = tb.text_frame
    tf.margin_left = tf.margin_right = 0
    tf.margin_top = tf.margin_bottom = 0
    tf.word_wrap = True
    tf.vertical_anchor = anchor
    p = tf.paragraphs[0]
    p.alignment = align
    p.line_spacing = line_spacing
    r = p.add_run()
    r.text = text
    f = r.font
    f.name = font
    f.size = Pt(size)
    f.bold = bold
    f.italic = italic
    f.color.rgb = color
    if letter_spacing_pct:
        _set_letter_spacing(r, letter_spacing_pct)
    return tb


def add_multiline(slide, x, y, w, h, blocks, *,
                  anchor=MSO_ANCHOR.TOP, align=PP_ALIGN.LEFT, line_spacing=1.2):
    """
    blocks: list of dicts with keys text, size, font, bold, color, align (optional)
    """
    tb = slide.shapes.add_textbox(x, y, w, h)
    tf = tb.text_frame
    tf.margin_left = tf.margin_right = 0
    tf.margin_top = tf.margin_bottom = 0
    tf.word_wrap = True
    tf.vertical_anchor = anchor
    for i, b in enumerate(blocks):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = b.get("align", align)
        p.line_spacing = b.get("line_spacing", line_spacing)
        if "space_before" in b:
            p.space_before = Pt(b["space_before"])
        r = p.add_run()
        r.text = b["text"]
        f = r.font
        f.name = b.get("font", BODY_FONT)
        f.size = Pt(b["size"])
        f.bold = b.get("bold", False)
        f.italic = b.get("italic", False)
        f.color.rgb = b.get("color", C.WHITE)
        if b.get("letter_spacing_pct"):
            _set_letter_spacing(r, b["letter_spacing_pct"])
    return tb


def _set_letter_spacing(run, pct):
    """Positive int = expanded, in 1/100 pt."""
    from pptx.oxml.ns import qn
    rPr = run._r.get_or_add_rPr()
    rPr.set("spc", str(int(pct)))


def add_rrect(slide, x, y, w, h, *, fill=None, line=None, line_w=1.0,
              corner_pct=8):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, w, h)
    # corner radius
    shape.adjustments[0] = corner_pct / 100.0
    if fill is None:
        shape.fill.background()
    else:
        shape.fill.solid()
        shape.fill.fore_color.rgb = fill
        if isinstance(fill, tuple) and len(fill) == 2:  # (color, transparency)
            _set_transparency(shape, fill[1])
    if line is None:
        shape.line.fill.background()
    else:
        shape.line.color.rgb = line
        shape.line.width = Pt(line_w)
    shape.shadow.inherit = False
    return shape


def add_glass_card(slide, x, y, w, h, *, accent=C.ORANGE_500, alpha_pct=88,
                   border=True, corner_pct=6):
    """Rounded rectangle with faint navy fill + orange border — the deck's card look."""
    card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, w, h)
    card.adjustments[0] = corner_pct / 100.0
    card.fill.solid()
    card.fill.fore_color.rgb = C.NAVY_800
    _set_transparency(card, alpha_pct)
    if border:
        card.line.color.rgb = accent
        card.line.width = Pt(0.75)
    else:
        card.line.fill.background()
    card.shadow.inherit = False
    return card


def add_pill(slide, x, y, w, h, text, *,
             fill=None, border=C.ORANGE_500, text_color=C.ORANGE_300,
             font=MONO_FONT, size=9, bold=True, letter_spacing_pct=100):
    pill = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, w, h)
    pill.adjustments[0] = 0.5
    if fill:
        pill.fill.solid()
        pill.fill.fore_color.rgb = fill
        _set_transparency(pill, 78)
    else:
        pill.fill.background()
    if border:
        pill.line.color.rgb = border
        pill.line.width = Pt(0.75)
    else:
        pill.line.fill.background()
    pill.shadow.inherit = False
    tf = pill.text_frame
    tf.margin_left = Inches(0.12)
    tf.margin_right = Inches(0.12)
    tf.margin_top = Inches(0.02)
    tf.margin_bottom = Inches(0.02)
    tf.vertical_anchor = MSO_ANCHOR.MIDDLE
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = text
    f = r.font
    f.name = font
    f.size = Pt(size)
    f.bold = bold
    f.color.rgb = text_color
    if letter_spacing_pct:
        _set_letter_spacing(r, letter_spacing_pct)
    return pill


def write_notes(slide, text: str):
    if not text:
        return
    ns = slide.notes_slide
    tf = ns.notes_text_frame
    tf.text = ""
    p = tf.paragraphs[0]
    r = p.add_run()
    r.text = text
    r.font.name = BODY_FONT
    r.font.size = Pt(12)


# ============================================================================
# 4. Common chrome (kicker, title, subtitle, footer, section label)
# ============================================================================
def add_section_label(slide, text):
    """Small orange pill at top-left corner."""
    add_pill(slide, PAD_L, Inches(0.35), Inches(2.6), Inches(0.32), text,
             fill=C.NAVY_800, border=C.ORANGE_500, text_color=C.ORANGE_300,
             font=MONO_FONT, size=9, letter_spacing_pct=140)


def add_kicker(slide, text, y=Inches(1.0)):
    add_text(slide, PAD_L, y, CONTENT_W, Inches(0.3), text,
             font=MONO_FONT, size=10, bold=True, color=C.ORANGE_400,
             letter_spacing_pct=180)


def add_title(slide, text, y=Inches(1.35), size=44, color=C.WHITE):
    add_text(slide, PAD_L, y, CONTENT_W, Inches(1.0), text,
             font=DISPLAY_FONT, size=size, bold=True, color=color,
             line_spacing=1.05)


def add_subtitle(slide, text, y=Inches(2.05), size=17, color=C.GREY_300):
    add_text(slide, PAD_L, y, CONTENT_W, Inches(0.6), text,
             font=BODY_FONT, size=size, color=color, line_spacing=1.3)


def add_footer(slide, text):
    add_text(slide, PAD_L, SLIDE_H - Inches(0.35), CONTENT_W, Inches(0.25),
             text, font=MONO_FONT, size=9, color=C.GREY_500,
             letter_spacing_pct=120)


def add_slide_number(slide, n, total=33):
    add_text(slide, SLIDE_W - Inches(1.5), SLIDE_H - Inches(0.35),
             Inches(1.2), Inches(0.25),
             f"{n:02d} / {total}",
             font=MONO_FONT, size=9, color=C.GREY_500, align=PP_ALIGN.RIGHT,
             letter_spacing_pct=100)


# ============================================================================
# 5. Standard content layouts
# ============================================================================
def add_stat_block(slide, x, y, w, h, number, label, sub=None, *,
                   number_color=C.ORANGE_400, size_num=48):
    """Big number + label. Used on Cover, Probleme, KPIs."""
    card = add_glass_card(slide, x, y, w, h, accent=C.ORANGE_500, alpha_pct=85)
    inner_x = x + Inches(0.2)
    inner_w = w - Inches(0.4)

    add_text(slide, inner_x, y + Inches(0.25), inner_w, Inches(1.0),
             number, font=DISPLAY_FONT, size=size_num, bold=True,
             color=number_color, align=PP_ALIGN.CENTER, line_spacing=1.0)

    add_text(slide, inner_x, y + Inches(1.15), inner_w, Inches(0.35),
             label, font=BODY_FONT, size=12, bold=True, color=C.WHITE,
             align=PP_ALIGN.CENTER)

    if sub:
        add_text(slide, inner_x, y + Inches(1.5), inner_w, Inches(0.35),
                 sub, font=MONO_FONT, size=9, color=C.GREY_500,
                 align=PP_ALIGN.CENTER, letter_spacing_pct=80)


def add_content_card(slide, x, y, w, h, title, body=None, *,
                     accent=C.ORANGE_500, number=None, tag=None):
    """Card with optional number badge, title, body."""
    add_glass_card(slide, x, y, w, h, accent=accent, alpha_pct=82)
    inner_x = x + Inches(0.25)
    inner_w = w - Inches(0.5)
    cur_y = y + Inches(0.22)

    if number:
        add_text(slide, inner_x, cur_y, inner_w, Inches(0.28),
                 number, font=MONO_FONT, size=10, bold=True,
                 color=C.ORANGE_400, letter_spacing_pct=150)
        cur_y += Inches(0.32)

    if tag:
        # small tag pill at top-right
        add_pill(slide, x + w - Inches(1.25), y + Inches(0.2),
                 Inches(1.0), Inches(0.28), tag,
                 fill=C.ORANGE_500, border=None, text_color=C.NAVY_950,
                 size=8, letter_spacing_pct=140)

    add_text(slide, inner_x, cur_y, inner_w, Inches(0.5),
             title, font=DISPLAY_FONT, size=16, bold=True, color=C.WHITE,
             line_spacing=1.15)

    if body:
        add_text(slide, inner_x, cur_y + Inches(0.55), inner_w, h - Inches(1.0),
                 body, font=BODY_FONT, size=11, color=C.GREY_300,
                 line_spacing=1.35)


def layout_grid_cards(slide, cards, *, cols=None, top=Inches(2.9),
                      bottom=SLIDE_H - Inches(0.7)):
    """
    cards: list of dicts {number?, title, body?, accent?, tag?}
    cols: default = len(cards) up to 4
    """
    n = len(cards)
    if cols is None:
        cols = min(n, 4)
    rows = (n + cols - 1) // cols
    gap = Inches(0.25)
    total_w = CONTENT_W
    total_h = bottom - top
    card_w = (total_w - gap * (cols - 1)) / cols
    card_h = (total_h - gap * (rows - 1)) / rows
    for i, c in enumerate(cards):
        col = i % cols
        row = i // cols
        cx = PAD_L + col * (card_w + gap)
        cy = top + row * (card_h + gap)
        add_content_card(slide, cx, cy, card_w, card_h,
                         c.get("title", ""), c.get("body"),
                         accent=c.get("accent", C.ORANGE_500),
                         number=c.get("number"), tag=c.get("tag"))


def layout_list_rows(slide, items, *, top=Inches(2.9),
                     bottom=SLIDE_H - Inches(0.7)):
    """Vertical stack of rows: number + title + body."""
    n = len(items)
    gap = Inches(0.14)
    total_h = bottom - top
    row_h = (total_h - gap * (n - 1)) / n
    for i, it in enumerate(items):
        y = top + i * (row_h + gap)
        add_glass_card(slide, PAD_L, y, CONTENT_W, row_h,
                       accent=it.get("accent", C.ORANGE_500), alpha_pct=82)
        inner_x = PAD_L + Inches(0.35)
        # number
        if it.get("number"):
            add_text(slide, inner_x, y + row_h / 2 - Inches(0.2),
                     Inches(0.9), Inches(0.4), it["number"],
                     font=DISPLAY_FONT, size=22, bold=True,
                     color=C.ORANGE_400, anchor=MSO_ANCHOR.MIDDLE)
            title_x = inner_x + Inches(1.0)
        else:
            title_x = inner_x
        title_w = Inches(4.0)
        add_text(slide, title_x, y, title_w, row_h,
                 it["title"], font=DISPLAY_FONT, size=15, bold=True,
                 color=C.WHITE, anchor=MSO_ANCHOR.MIDDLE, line_spacing=1.2)
        if it.get("body"):
            body_x = title_x + title_w + Inches(0.2)
            body_w = PAD_L + CONTENT_W - body_x - Inches(0.3)
            add_text(slide, body_x, y, body_w, row_h,
                     it["body"], font=BODY_FONT, size=12, color=C.GREY_300,
                     anchor=MSO_ANCHOR.MIDDLE, line_spacing=1.3)


# ============================================================================
# 6. Per-slide renderers
# ============================================================================
def render_cover(slide):
    paint_backdrop(slide, glow=True)
    # top-left kicker
    add_text(slide, PAD_L, Inches(0.7), CONTENT_W, Inches(0.32),
             "PROJET DE FIN D'ÉTUDES · MASTÈRE 2",
             font=MONO_FONT, size=11, bold=True, color=C.ORANGE_400,
             letter_spacing_pct=200)
    # main title
    add_text(slide, PAD_L, Inches(1.6), CONTENT_W, Inches(1.4),
             "Maintenance prédictive.",
             font=DISPLAY_FONT, size=72, bold=True, color=C.WHITE,
             line_spacing=1.0)
    # subtitle
    add_text(slide, PAD_L, Inches(3.1), CONTENT_W, Inches(0.6),
             "Machines Komax Alpha 433 H & Gamma 333 PC.",
             font=BODY_FONT, size=22, color=C.GREY_300)
    # encadreurs (bottom-left block)
    add_multiline(slide, PAD_L, Inches(4.35), Inches(5.0), Inches(1.8), [
        {"text": "MOUTIA BENSAAD", "size": 14, "bold": True, "font": DISPLAY_FONT, "color": C.WHITE, "letter_spacing_pct": 120},
        {"text": "ISET Nabeul · Mastère 2 Systèmes Embarqués et Mobile", "size": 11, "color": C.GREY_300, "space_before": 4},
        {"text": " ", "size": 6},
        {"text": "Encadrant académique  ·  M. Imed Hidri", "size": 11, "color": C.ORANGE_300},
        {"text": "Encadrant société  ·  M. Yassine Hammami", "size": 11, "color": C.ORANGE_300},
    ])
    # 3 stat pills (bottom-right)
    stats = [("40 ans", "d'expérience"),
             ("1600+", "salariés"),
             ("3", "secteurs")]
    sx = Inches(7.5)
    sw = Inches(1.7)
    gap = Inches(0.15)
    for i, (n, l) in enumerate(stats):
        x = sx + i * (sw + gap)
        add_glass_card(slide, x, Inches(4.5), sw, Inches(1.4),
                       accent=C.ORANGE_500, alpha_pct=80)
        add_text(slide, x, Inches(4.65), sw, Inches(0.55), n,
                 font=DISPLAY_FONT, size=26, bold=True, color=C.ORANGE_400,
                 align=PP_ALIGN.CENTER)
        add_text(slide, x, Inches(5.25), sw, Inches(0.4), l,
                 font=BODY_FONT, size=11, color=C.GREY_300,
                 align=PP_ALIGN.CENTER)
    # footer
    add_text(slide, PAD_L, SLIDE_H - Inches(0.4), CONTENT_W, Inches(0.3),
             "ISET NABEUL · 2026",
             font=MONO_FONT, size=10, color=C.GREY_500,
             align=PP_ALIGN.CENTER, letter_spacing_pct=180)


def render_plan(slide):
    paint_backdrop(slide)
    add_section_label(slide, "PLAN DE LA PRÉSENTATION")
    add_title(slide, "Six étapes.", y=Inches(1.0), size=48)
    add_subtitle(slide, "Six sections, une progression logique.", y=Inches(1.85))

    plan_cards = [
        {"number": "01", "title": "Introduction et contexte", "body": "ICEM · machines · problématique"},
        {"number": "02", "title": "État de l'art",             "body": "Scrum · matériels · stack"},
        {"number": "03", "title": "Conception",                "body": "Architecture 5 couches · UML · Pipeline"},
        {"number": "04", "title": "Développement",             "body": "Backend · IA · web · mobile · déploiement"},
        {"number": "05", "title": "Démonstration",             "body": "Passage à la démo live"},
        {"number": "06", "title": "Résultats et conclusion",   "body": "KPI · perspectives · merci"},
    ]
    # 3 x 2 grid
    top = Inches(2.7)
    bottom = SLIDE_H - Inches(0.7)
    gap = Inches(0.22)
    cols = 3
    rows = 2
    total_w = CONTENT_W
    total_h = bottom - top
    card_w = (total_w - gap * (cols - 1)) / cols
    card_h = (total_h - gap * (rows - 1)) / rows
    for i, c in enumerate(plan_cards):
        col = i % cols
        row = i // cols
        cx = PAD_L + col * (card_w + gap)
        cy = top + row * (card_h + gap)
        add_content_card(slide, cx, cy, card_w, card_h,
                         c["title"], c["body"], number=c["number"])


def render_section_divider(slide, kicker, title, subtitle):
    paint_backdrop(slide, glow=True)
    # giant kicker in top-right
    add_text(slide, SLIDE_W - Inches(4.5), Inches(0.8), Inches(4.0), Inches(3.5),
             kicker, font=DISPLAY_FONT, size=200, bold=True,
             color=C.ORANGE_500, align=PP_ALIGN.RIGHT, line_spacing=1.0)
    # section label
    add_text(slide, PAD_L, Inches(2.0), CONTENT_W, Inches(0.35),
             "SECTION", font=MONO_FONT, size=11, bold=True,
             color=C.ORANGE_400, letter_spacing_pct=240)
    # title
    add_text(slide, PAD_L, Inches(2.5), Inches(8.5), Inches(1.8),
             title, font=DISPLAY_FONT, size=60, bold=True,
             color=C.WHITE, line_spacing=1.02)
    # subtitle
    add_text(slide, PAD_L, Inches(4.6), Inches(9.5), Inches(0.5),
             subtitle, font=BODY_FONT, size=18, color=C.GREY_300)
    # thin orange divider line under title
    line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE,
                                  PAD_L, Inches(4.35), Inches(2.5), Emu(6350))
    line.line.fill.background()
    line.fill.solid()
    line.fill.fore_color.rgb = C.ORANGE_500
    line.shadow.inherit = False


def render_icem(slide, n):
    paint_backdrop(slide)
    add_section_label(slide, "01 · INTRODUCTION")
    add_kicker(slide, "L'ENTREPRISE")
    add_title(slide, "ICEM Nabeul.")
    add_subtitle(slide, "Sous-traitant faisceaux électriques. Automobile · électroménager · médical.")

    # Left column — description
    add_multiline(slide, PAD_L, Inches(2.9), Inches(6.5), Inches(3.5), [
        {"text": "Coficab group · site industriel Nabeul", "size": 12, "color": C.ORANGE_300, "font": MONO_FONT, "letter_spacing_pct": 120},
        {"text": " ", "size": 8},
        {"text": "ICEM est spécialisée dans la fabrication de faisceaux électriques pour l'automobile, l'électroménager et le médical.",
         "size": 15, "color": C.WHITE, "line_spacing": 1.4, "space_before": 6},
        {"text": " ", "size": 8},
        {"text": "L'usine intègre coupe, sertissage, torsadage et contrôle qualité. Les machines Komax constituent le cœur de la ligne de production.",
         "size": 13, "color": C.GREY_300, "line_spacing": 1.4, "space_before": 6},
    ])

    # Right column — 3 stats stacked
    stats = [("40 ans", "d'expérience industrielle"),
             ("1600+", "salariés"),
             ("3", "secteurs (auto · maison · médical)")]
    sx = Inches(7.9)
    sw = Inches(4.8)
    sh = Inches(1.05)
    for i, (n_, l) in enumerate(stats):
        y = Inches(3.0) + i * (sh + Inches(0.15))
        add_glass_card(slide, sx, y, sw, sh, accent=C.ORANGE_500, alpha_pct=82)
        add_text(slide, sx + Inches(0.3), y + Inches(0.15),
                 Inches(2.0), Inches(0.75), n_,
                 font=DISPLAY_FONT, size=32, bold=True, color=C.ORANGE_400,
                 anchor=MSO_ANCHOR.MIDDLE, line_spacing=1.0)
        add_text(slide, sx + Inches(2.3), y, sw - Inches(2.5), sh,
                 l, font=BODY_FONT, size=13, color=C.GREY_300,
                 anchor=MSO_ANCHOR.MIDDLE, line_spacing=1.3)
    add_slide_number(slide, n)


def render_machines(slide, n):
    paint_backdrop(slide)
    add_section_label(slide, "01 · INTRODUCTION")
    add_kicker(slide, "LES DEUX MACHINES CIBLES")
    add_title(slide, "Alpha 433 H · Gamma 333 PC.")
    add_subtitle(slide, "Machines Komax de coupe et sertissage de fil.")

    # 2 columns, one per machine
    top = Inches(2.9)
    bottom = SLIDE_H - Inches(0.7)
    gap = Inches(0.3)
    col_w = (CONTENT_W - gap) / 2
    col_h = bottom - top

    def _machine_card(x, name, subtitle, specs):
        add_glass_card(slide, x, top, col_w, col_h,
                       accent=C.ORANGE_500, alpha_pct=82)
        pad = Inches(0.4)
        add_text(slide, x + pad, top + Inches(0.35), col_w - 2 * pad, Inches(0.4),
                 "KOMAX", font=MONO_FONT, size=10, bold=True,
                 color=C.ORANGE_400, letter_spacing_pct=200)
        add_text(slide, x + pad, top + Inches(0.7), col_w - 2 * pad, Inches(0.7),
                 name, font=DISPLAY_FONT, size=28, bold=True, color=C.WHITE)
        add_text(slide, x + pad, top + Inches(1.35), col_w - 2 * pad, Inches(0.4),
                 subtitle, font=BODY_FONT, size=13, italic=True,
                 color=C.ORANGE_300)
        # spec rows
        sy = top + Inches(1.9)
        for label, val in specs:
            add_text(slide, x + pad, sy, Inches(1.9), Inches(0.35),
                     label.upper(), font=MONO_FONT, size=10,
                     color=C.GREY_500, letter_spacing_pct=140)
            add_text(slide, x + pad + Inches(2.0), sy,
                     col_w - 2 * pad - Inches(2.0), Inches(0.35),
                     val, font=BODY_FONT, size=13, bold=True, color=C.WHITE)
            sy += Inches(0.5)

    _machine_card(PAD_L, "Alpha 433 H",
                  "Servomoteurs électriques", [
                      ("Actionneurs", "6 servos BLDC"),
                      ("Cycle", "Ultra-rapide"),
                      ("Section du fil", "0,5 – 6 mm²"),
                      ("Positionnement", "Entrée / milieu de gamme"),
                  ])
    _machine_card(PAD_L + col_w + gap, "Gamma 333 PC",
                  "Actionneurs pneumatiques + servos", [
                      ("Actionneurs", "Pneumatique + servos"),
                      ("Cycle", "Standard"),
                      ("Section du fil", "0,22 – 4 mm²"),
                      ("Positionnement", "Milieu de gamme"),
                  ])
    add_slide_number(slide, n)


def render_probleme(slide, n):
    paint_backdrop(slide)
    add_section_label(slide, "01 · INTRODUCTION")
    add_kicker(slide, "LA PROBLÉMATIQUE")
    add_title(slide, "Une panne coûte cher.")
    add_subtitle(slide, "Maintenance corrective : trop tard, trop long, trop cher.")

    stats = [
        ("1467", "Pannes documentées", "Historique ICEM · 2019 – 2024"),
        ("12 zones", "Sous-ensembles touchés", "Alpha 433 H · Gamma 333 PC"),
        ("40 %", "Pannes évitables", "Avec détection préalable"),
    ]
    top = Inches(2.9)
    stat_h = Inches(2.5)
    gap = Inches(0.3)
    col_w = (CONTENT_W - 2 * gap) / 3
    for i, (num, lbl, sub) in enumerate(stats):
        x = PAD_L + i * (col_w + gap)
        add_stat_block(slide, x, top, col_w, stat_h, num, lbl, sub, size_num=48)

    # callout
    callout_y = top + stat_h + Inches(0.4)
    add_glass_card(slide, PAD_L, callout_y, CONTENT_W, Inches(0.95),
                   accent=C.ORANGE_500, alpha_pct=70)
    add_text(slide, PAD_L, callout_y, CONTENT_W, Inches(0.95),
             "Notre solution  ·  prédire avant la panne.",
             font=DISPLAY_FONT, size=20, bold=True, color=C.ORANGE_300,
             align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    add_slide_number(slide, n)


def render_objectif(slide, n):
    paint_backdrop(slide)
    add_section_label(slide, "01 · INTRODUCTION")
    add_kicker(slide, "OBJECTIF DU PROJET")
    add_title(slide, "Trois verbes.")
    add_subtitle(slide, "Une chaîne simple, de la mesure à la décision.")

    cards = [
        {"number": "01", "title": "Prédire",
         "body": "Modèles ML par cause (Random Forest, XGBoost) entraînés sur historique + signaux synthétiques ancrés physiquement."},
        {"number": "02", "title": "Alerter",
         "body": "Notifications mobile en temps réel via Firebase — technicien prévenu en moins d'une minute."},
        {"number": "03", "title": "Réduire",
         "body": "Coût de maintenance et arrêts de production, en intervenant au bon moment plutôt qu'à date fixe."},
    ]
    layout_grid_cards(slide, cards, cols=3, top=Inches(2.9))
    add_slide_number(slide, n)


def render_scrum(slide, n):
    paint_backdrop(slide)
    add_section_label(slide, "02 · ÉTAT DE L'ART")
    add_kicker(slide, "MÉTHODOLOGIE DE TRAVAIL")
    add_title(slide, "Méthodologie Scrum.")
    add_subtitle(slide, "Cycle itératif adopté pendant les 6 mois du stage.")

    items = [
        {"number": "01", "title": "Backlog produit",  "body": "Besoins ICEM · exigences fonctionnelles priorisées"},
        {"number": "02", "title": "Sprints",           "body": "2 à 4 semaines · livrable incrémental à chaque itération"},
        {"number": "03", "title": "Daily stand-up",    "body": "10 min · état d'avancement · blocages identifiés"},
        {"number": "04", "title": "Revue de sprint",   "body": "Livrable présenté aux encadreurs · feedback intégré"},
        {"number": "05", "title": "Rétrospective",     "body": "Améliorer le cycle suivant · dette technique traitée"},
    ]
    layout_list_rows(slide, items, top=Inches(2.85))
    add_slide_number(slide, n)


def render_capteurs(slide, n):
    paint_backdrop(slide)
    add_section_label(slide, "02 · ÉTAT DE L'ART")
    add_kicker(slide, "MATÉRIEL D'INSTRUMENTATION")
    add_title(slide, "Cinq capteurs.")
    add_subtitle(slide, "Quatre grandeurs physiques · une seule vérité terrain.")

    cards = [
        {"title": "DS18B20 ×2",   "body": "Température · sonde 1-Wire\nMoteur + armoire électrique", "tag": "×2"},
        {"title": "MPU-6050",     "body": "Vibrations · accéléromètre 3 axes\nChâssis moteur"},
        {"title": "AMG8833",      "body": "Imagerie thermique · grille 8×8\nVue armoire"},
        {"title": "SCT-013",      "body": "Courant électrique · pince ampèremétrique\nFeeder armoire (via ADS1015)"},
    ]
    layout_grid_cards(slide, cards, cols=4, top=Inches(2.9))
    add_footer(slide, "ÉCHANTILLONNAGE 1 s   ·   TRANSMISSION 60 s   ·   JSON HTTP POST")
    add_slide_number(slide, n)


def render_stack(slide, n):
    paint_backdrop(slide)
    add_section_label(slide, "02 · ÉTAT DE L'ART")
    add_kicker(slide, "STACK TECHNIQUE")
    add_title(slide, "Stack technique.")
    add_subtitle(slide, "Trois familles technologiques mobilisées.")

    stacks = [
        ("Backend", "Node.js · Express\nMongoDB · JWT\nMongoose ODM\nasyncHandler pattern"),
        ("Intelligence artificielle", "Python · FastAPI\nscikit-learn\nXGBoost\nUvicorn"),
        ("Frontend & Mobile", "React · Vite\nFlutter · Dart\nFirebase (push)\nMaterial 3"),
    ]
    top = Inches(2.95)
    bottom = SLIDE_H - Inches(0.7)
    gap = Inches(0.3)
    col_w = (CONTENT_W - 2 * gap) / 3
    col_h = bottom - top
    for i, (title, body) in enumerate(stacks):
        x = PAD_L + i * (col_w + gap)
        add_glass_card(slide, x, top, col_w, col_h, alpha_pct=82)
        add_text(slide, x + Inches(0.3), top + Inches(0.3),
                 col_w - Inches(0.6), Inches(0.4),
                 f"0{i+1}", font=MONO_FONT, size=11, bold=True,
                 color=C.ORANGE_400, letter_spacing_pct=180)
        add_text(slide, x + Inches(0.3), top + Inches(0.65),
                 col_w - Inches(0.6), Inches(0.6),
                 title, font=DISPLAY_FONT, size=20, bold=True, color=C.WHITE)
        # divider
        d = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE,
                                   x + Inches(0.3), top + Inches(1.4),
                                   Inches(0.8), Emu(6350))
        d.line.fill.background()
        d.fill.solid()
        d.fill.fore_color.rgb = C.ORANGE_500
        d.shadow.inherit = False
        add_text(slide, x + Inches(0.3), top + Inches(1.7),
                 col_w - Inches(0.6), col_h - Inches(2.0),
                 body, font=BODY_FONT, size=14, color=C.GREY_100,
                 line_spacing=1.6)
    add_slide_number(slide, n)


def render_architecture(slide, n):
    paint_backdrop(slide)
    add_section_label(slide, "03 · CONCEPTION")
    add_kicker(slide, "MODÈLE EN COUCHES")
    add_title(slide, "Cinq couches.")
    add_subtitle(slide, "Du capteur physique au téléphone du technicien.")

    items = [
        {"number": "05", "title": "Application",   "body": "React (web) · Flutter (mobile) · restitution utilisateur"},
        {"number": "04", "title": "Intelligence",  "body": "FastAPI · Random Forest · XGBoost · probabilité + cause"},
        {"number": "03", "title": "Backend",       "body": "Node.js · Express · MongoDB · REST + JWT"},
        {"number": "02", "title": "Edge",          "body": "Raspberry Pi 4 · lecture I²C / 1-Wire · agrégation 60 s"},
        {"number": "01", "title": "Perception",    "body": "5 capteurs IoT : DS18B20 ×2 · MPU-6050 · AMG8833 · SCT-013"},
    ]
    layout_list_rows(slide, items, top=Inches(2.85))
    add_footer(slide, "MODÈLE DE RÉFÉRENCE ITU-T Y.2060  ·  SÉPARATION DES RESPONSABILITÉS")
    add_slide_number(slide, n)


def render_edge(slide, n):
    paint_backdrop(slide)
    add_section_label(slide, "03 · CONCEPTION")
    add_kicker(slide, "COUCHE EDGE")
    add_title(slide, "Raspberry Pi.")
    add_subtitle(slide, "Un mini-ordinateur, cinq capteurs, une machine.")

    # 2 columns: left = specs, right = live diagram card
    top = Inches(2.9)
    bottom = SLIDE_H - Inches(0.7)
    gap = Inches(0.3)
    col_w = (CONTENT_W - gap) / 2
    col_h = bottom - top

    # LEFT — specs list
    specs = [
        ("Lecture",     "1-Wire · I²C · GPIO"),
        ("Agrégation",  "Fenêtres glissantes de 60 s"),
        ("Envoi",       "HTTP POST /api/capteurs/ingest"),
        ("Autonomie",   "systemd · redémarrage auto · retry"),
    ]
    add_glass_card(slide, PAD_L, top, col_w, col_h, alpha_pct=82)
    sy = top + Inches(0.35)
    add_text(slide, PAD_L + Inches(0.3), sy, col_w - Inches(0.6), Inches(0.35),
             "SPÉCIFICATIONS", font=MONO_FONT, size=10, bold=True,
             color=C.ORANGE_400, letter_spacing_pct=200)
    sy += Inches(0.55)
    for label, val in specs:
        add_text(slide, PAD_L + Inches(0.3), sy, Inches(2.0), Inches(0.35),
                 label.upper(), font=MONO_FONT, size=10,
                 color=C.GREY_500, letter_spacing_pct=140)
        add_text(slide, PAD_L + Inches(2.3), sy, col_w - Inches(2.5), Inches(0.4),
                 val, font=BODY_FONT, size=13, bold=True, color=C.WHITE)
        sy += Inches(0.6)

    # RIGHT — flow diagram card
    rx = PAD_L + col_w + gap
    add_glass_card(slide, rx, top, col_w, col_h, accent=C.CYAN, alpha_pct=82)
    add_pill(slide, rx + Inches(0.3), top + Inches(0.35), Inches(1.6), Inches(0.32),
             "EN DIRECT · 1 min", fill=C.CYAN, border=None,
             text_color=C.NAVY_950, size=9, letter_spacing_pct=150)
    add_text(slide, rx + Inches(0.3), top + Inches(0.9), col_w - Inches(0.6), Inches(0.5),
             "Flux de données",
             font=DISPLAY_FONT, size=20, bold=True, color=C.WHITE)
    # 3 flow steps
    steps = [
        ("① CAPTEURS",  "5 sondes lues à 1 s"),
        ("② RASPBERRY", "Agrégation 60 s · moyenne, min, max"),
        ("③ BACKEND",   "POST /api/capteurs/ingest · JSON"),
    ]
    sy2 = top + Inches(1.65)
    for lbl, val in steps:
        add_pill(slide, rx + Inches(0.3), sy2, Inches(1.9), Inches(0.32), lbl,
                 fill=C.NAVY_800, border=C.CYAN, text_color=C.CYAN,
                 size=9, letter_spacing_pct=160)
        add_text(slide, rx + Inches(2.35), sy2, col_w - Inches(2.65), Inches(0.35),
                 val, font=BODY_FONT, size=12, color=C.GREY_100,
                 anchor=MSO_ANCHOR.MIDDLE, line_spacing=1.2)
        sy2 += Inches(0.55)
    add_slide_number(slide, n)


def render_uml(slide, n):
    paint_backdrop(slide)
    add_section_label(slide, "03 · CONCEPTION")
    add_kicker(slide, "MODÉLISATION")
    add_title(slide, "Modélisation UML.")
    add_subtitle(slide, "Cas d'utilisation et diagramme de classes.")

    cards = [
        {"number": "01", "title": "Diagramme de cas d'utilisation",
         "body": "4 acteurs (Responsable, Chef de Ligne, Technicien, système IA) · 12 cas d'utilisation globaux couvrant supervision, intervention, notification et analyse."},
        {"number": "02", "title": "Diagramme de classes",
         "body": "9 classes métier — Machine, Utilisateur, Intervention, Alerte, Capteur, Maintenance (type enum), AnalyseTCO, PreventiveChecklist, Notification."},
    ]
    top = Inches(2.9)
    bottom = SLIDE_H - Inches(0.7)
    gap = Inches(0.35)
    card_w = (CONTENT_W - gap) / 2
    card_h = bottom - top
    for i, c in enumerate(cards):
        cx = PAD_L + i * (card_w + gap)
        add_content_card(slide, cx, top, card_w, card_h,
                         c["title"], c["body"], number=c["number"])
        # placeholder for the diagram image
        add_pill(slide, cx + card_w - Inches(2.2), top + card_h - Inches(0.7),
                 Inches(2.0), Inches(0.35),
                 "voir diagramme joint",
                 fill=C.NAVY_800, border=C.ORANGE_500, text_color=C.ORANGE_300,
                 size=9, letter_spacing_pct=120)
    add_slide_number(slide, n)


def render_pipeline(slide, n):
    paint_backdrop(slide)
    add_section_label(slide, "03 · CONCEPTION")
    add_kicker(slide, "PIPELINE TEMPS RÉEL")
    add_title(slide, "Du capteur à l'alerte.")
    add_subtitle(slide, "Cinq étapes · moins d'une minute · sans intervention humaine.")

    # 5 horizontal steps with arrows
    steps = [
        ("① CAPTEUR",   "5 sondes · 1 s"),
        ("② EDGE",       "Raspberry · 60 s"),
        ("③ BACKEND",    "POST /ingest"),
        ("④ IA",         "proba > 80 %"),
        ("⑤ ALERTE",     "Push Firebase"),
    ]
    top = Inches(3.0)
    gap = Inches(0.15)
    n_steps = len(steps)
    total_w = CONTENT_W
    step_w = (total_w - gap * (n_steps - 1)) / n_steps
    step_h = Inches(2.0)
    for i, (lbl, sub) in enumerate(steps):
        x = PAD_L + i * (step_w + gap)
        add_glass_card(slide, x, top, step_w, step_h, accent=C.ORANGE_500, alpha_pct=80)
        add_text(slide, x, top + Inches(0.35), step_w, Inches(0.5),
                 lbl, font=DISPLAY_FONT, size=18, bold=True,
                 color=C.ORANGE_300, align=PP_ALIGN.CENTER)
        add_text(slide, x, top + Inches(1.0), step_w, Inches(0.5),
                 sub, font=BODY_FONT, size=12, color=C.GREY_100,
                 align=PP_ALIGN.CENTER)

    # 3 stat pills below
    bottom_y = top + step_h + Inches(0.4)
    stats = [("~60 s", "Latence bout-en-bout"),
             ("Automatique", "Zéro action manuelle"),
             ("Terrain", "Notification mobile")]
    sgap = Inches(0.3)
    sw = (CONTENT_W - 2 * sgap) / 3
    sh = Inches(0.95)
    for i, (num, lbl) in enumerate(stats):
        x = PAD_L + i * (sw + sgap)
        add_glass_card(slide, x, bottom_y, sw, sh, accent=C.CYAN, alpha_pct=82)
        add_text(slide, x + Inches(0.3), bottom_y, Inches(2.5), sh,
                 num, font=DISPLAY_FONT, size=22, bold=True, color=C.ORANGE_400,
                 anchor=MSO_ANCHOR.MIDDLE)
        add_text(slide, x + Inches(2.8), bottom_y, sw - Inches(3.1), sh,
                 lbl, font=BODY_FONT, size=12, color=C.GREY_300,
                 anchor=MSO_ANCHOR.MIDDLE)
    add_slide_number(slide, n)


def render_backend(slide, n):
    paint_backdrop(slide)
    add_section_label(slide, "04 · DÉVELOPPEMENT")
    add_kicker(slide, "BACKEND API")
    add_title(slide, "Node.js + MongoDB.")
    add_subtitle(slide, "API REST · 8 collections · trois rôles utilisateur.")

    top = Inches(2.9)
    bottom = SLIDE_H - Inches(0.7)
    gap = Inches(0.3)
    col_w = (CONTENT_W - gap) / 2
    col_h = bottom - top

    # LEFT — endpoints
    add_glass_card(slide, PAD_L, top, col_w, col_h, alpha_pct=82)
    add_text(slide, PAD_L + Inches(0.3), top + Inches(0.3),
             col_w - Inches(0.6), Inches(0.4),
             "ENDPOINTS PRINCIPAUX", font=MONO_FONT, size=10, bold=True,
             color=C.ORANGE_400, letter_spacing_pct=200)
    endpoints = [
        ("POST", "/api/capteurs/ingest",  "Ingestion IoT"),
        ("GET",  "/api/machines",         "Liste machines"),
        ("POST", "/api/interventions",    "Créer intervention"),
        ("GET",  "/api/alertes",          "Alertes actives"),
        ("POST", "/api/auth/login",       "Auth JWT"),
    ]
    sy = top + Inches(0.85)
    for verb, path, desc in endpoints:
        color_v = C.GREEN if verb == "GET" else C.ORANGE_400
        add_text(slide, PAD_L + Inches(0.3), sy, Inches(0.6), Inches(0.35),
                 verb, font=MONO_FONT, size=10, bold=True, color=color_v)
        add_text(slide, PAD_L + Inches(0.95), sy, Inches(3.4), Inches(0.35),
                 path, font=MONO_FONT, size=11, color=C.WHITE)
        add_text(slide, PAD_L + Inches(0.3), sy + Inches(0.32),
                 col_w - Inches(0.6), Inches(0.3),
                 desc, font=BODY_FONT, size=10, color=C.GREY_500)
        sy += Inches(0.72)

    # RIGHT — collections
    rx = PAD_L + col_w + gap
    add_glass_card(slide, rx, top, col_w, col_h, accent=C.CYAN, alpha_pct=82)
    add_text(slide, rx + Inches(0.3), top + Inches(0.3),
             col_w - Inches(0.6), Inches(0.4),
             "COLLECTIONS MONGODB", font=MONO_FONT, size=10, bold=True,
             color=C.CYAN, letter_spacing_pct=200)
    cols = [
        "User", "Machine", "Capteur", "Intervention",
        "Alerte", "Maintenance", "AnalyseTCO", "PreventiveChecklist",
    ]
    ny = top + Inches(0.85)
    pill_w = (col_w - Inches(0.9)) / 2
    for i, name in enumerate(cols):
        row = i // 2
        col = i % 2
        px = rx + Inches(0.3) + col * (pill_w + Inches(0.3))
        py = ny + row * Inches(0.55)
        add_pill(slide, px, py, pill_w, Inches(0.4), name,
                 fill=C.NAVY_800, border=C.CYAN, text_color=C.NAVY_100,
                 font=MONO_FONT, size=11, letter_spacing_pct=80)

    # tag row at bottom of right col
    add_text(slide, rx + Inches(0.3), top + col_h - Inches(0.55),
             col_w - Inches(0.6), Inches(0.35),
             "3 rôles  ·  JWT auth  ·  x-api-key pour l'IoT",
             font=MONO_FONT, size=10, color=C.GREY_500,
             letter_spacing_pct=100, align=PP_ALIGN.CENTER)
    add_slide_number(slide, n)


def render_ia(slide, n):
    paint_backdrop(slide)
    add_section_label(slide, "04 · DÉVELOPPEMENT")
    add_kicker(slide, "MICROSERVICE INTELLIGENCE ARTIFICIELLE")
    add_title(slide, "Trois modèles ML.")
    add_subtitle(slide, "Un microservice FastAPI · scikit-learn + XGBoost.")

    cards = [
        {"number": "RF v1", "title": "Historique · zones",
         "body": "Baseline entraînée sur l'historique ICEM.\nSortie : zone probable de la panne.",
         "tag": "F1 0.15"},
        {"number": "RF v2", "title": "IoT synthétique · causes",
         "body": "Réentraîné sur signaux IoT étiquetés par cause physique (13 classes).",
         "tag": "F1 0.45"},
        {"number": "XGB v3", "title": "Probabilité · horizon 2 h",
         "body": "Gradient boosting · sortie probabilité + cause + fenêtre 2 h.",
         "tag": "F1 0.83", "accent": C.ORANGE_500},
    ]
    layout_grid_cards(slide, cards, cols=3, top=Inches(2.9),
                      bottom=SLIDE_H - Inches(1.6))
    # callout at bottom
    cy = SLIDE_H - Inches(1.4)
    add_glass_card(slide, PAD_L, cy, CONTENT_W, Inches(0.85),
                   accent=C.ORANGE_500, alpha_pct=70)
    add_text(slide, PAD_L, cy, CONTENT_W, Inches(0.85),
             "Seuil 80 %   ⇒   création automatique d'une maintenance prédictive.",
             font=DISPLAY_FONT, size=17, bold=True, color=C.ORANGE_300,
             align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    add_slide_number(slide, n)


def render_dataset(slide, n):
    paint_backdrop(slide)
    add_section_label(slide, "04 · DÉVELOPPEMENT")
    add_kicker(slide, "DONNÉES D'ENTRAÎNEMENT")
    add_title(slide, "Deux sources de données.")
    add_subtitle(slide, "Historique réel · signaux synthétiques ancrés physiquement.")

    top = Inches(2.9)
    gap = Inches(0.35)
    card_w = (CONTENT_W - gap) / 2
    card_h = Inches(2.7)

    # Card 1 — Historique
    x1 = PAD_L
    add_glass_card(slide, x1, top, card_w, card_h, alpha_pct=82)
    add_text(slide, x1 + Inches(0.3), top + Inches(0.3),
             card_w - Inches(0.6), Inches(0.4),
             "SOURCE 01 · HISTORIQUE ICEM",
             font=MONO_FONT, size=10, bold=True, color=C.ORANGE_400,
             letter_spacing_pct=180)
    add_text(slide, x1 + Inches(0.3), top + Inches(0.85),
             card_w - Inches(0.6), Inches(0.7),
             "1 467 événements",
             font=DISPLAY_FONT, size=32, bold=True, color=C.WHITE)
    add_text(slide, x1 + Inches(0.3), top + Inches(1.55),
             card_w - Inches(0.6), Inches(0.4),
             "ICEM · période 2019 – 2024 · 5 ans",
             font=BODY_FONT, size=13, color=C.GREY_300)
    add_text(slide, x1 + Inches(0.3), top + Inches(2.0),
             card_w - Inches(0.6), Inches(0.6),
             "Champs : machine · zone · cause · durée · date · technicien",
             font=BODY_FONT, size=11, color=C.GREY_500)

    # Card 2 — Synthétique
    x2 = PAD_L + card_w + gap
    add_glass_card(slide, x2, top, card_w, card_h,
                   accent=C.CYAN, alpha_pct=82)
    add_text(slide, x2 + Inches(0.3), top + Inches(0.3),
             card_w - Inches(0.6), Inches(0.4),
             "SOURCE 02 · SYNTHÉTIQUE IoT",
             font=MONO_FONT, size=10, bold=True, color=C.CYAN,
             letter_spacing_pct=180)
    add_text(slide, x2 + Inches(0.3), top + Inches(0.85),
             card_w - Inches(0.6), Inches(0.7),
             "64 800 lignes  ·  1 min",
             font=DISPLAY_FONT, size=32, bold=True, color=C.WHITE)
    add_text(slide, x2 + Inches(0.3), top + Inches(1.55),
             card_w - Inches(0.6), Inches(0.4),
             "Physique + FMEA · 13 causes ancrées",
             font=BODY_FONT, size=13, color=C.GREY_300)
    add_text(slide, x2 + Inches(0.3), top + Inches(2.0),
             card_w - Inches(0.6), Inches(0.6),
             "Signaux : DHT22 · MPU-6050 · AMG8833 · SCT-013",
             font=BODY_FONT, size=11, color=C.GREY_500)

    # Bottom info bar
    by = top + card_h + Inches(0.3)
    add_glass_card(slide, PAD_L, by, CONTENT_W, Inches(0.75),
                   accent=C.ORANGE_500, alpha_pct=75)
    add_text(slide, PAD_L, by, CONTENT_W, Inches(0.75),
             "Découpage stratifié   ·   80 % entraînement   ·   20 % test   ·   shuffle par cause (12 960 test)",
             font=MONO_FONT, size=12, color=C.ORANGE_300,
             align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE,
             letter_spacing_pct=100)
    add_slide_number(slide, n)


def render_causes(slide, n):
    paint_backdrop(slide)
    add_section_label(slide, "04 · DÉVELOPPEMENT")
    add_kicker(slide, "TAXONOMIE DES CAUSES")
    add_title(slide, "Treize causes.")
    add_subtitle(slide, "Grille FMEA validée par le technicien d'atelier.")

    causes = [
        ("C01", "Cellule K obstruée"),
        ("C02", "Lame émoussée"),
        ("C03", "MINI / Terminale mal ajustée"),
        ("C04", "Vérin pneumatique HS"),
        ("C05", "Fuite pneumatique"),
        ("C06", "Frein bobine déréglé"),
        ("C07", "Détecteur fil HS"),
        ("C08", "Encodeur dérive"),
        ("C09", "Guide-fil usé"),
        ("C10", "Câble / phase HS"),
        ("C11", "Servomoteur surcharge"),
        ("C12", "Roue Gommino usée"),
        ("C13", "Autre / hors catalogue"),
    ]
    # 4 cols x 4 rows (last row 1 item)
    top = Inches(2.9)
    bottom = SLIDE_H - Inches(1.0)
    cols = 4
    rows = (len(causes) + cols - 1) // cols
    gap = Inches(0.18)
    cw = (CONTENT_W - gap * (cols - 1)) / cols
    ch = (bottom - top - gap * (rows - 1)) / rows
    for i, (code, name) in enumerate(causes):
        col = i % cols
        row = i // cols
        x = PAD_L + col * (cw + gap)
        y = top + row * (ch + gap)
        add_glass_card(slide, x, y, cw, ch, accent=C.ORANGE_500, alpha_pct=82)
        add_text(slide, x + Inches(0.2), y + Inches(0.15),
                 cw - Inches(0.4), Inches(0.35),
                 code, font=MONO_FONT, size=11, bold=True, color=C.ORANGE_400,
                 letter_spacing_pct=150)
        add_text(slide, x + Inches(0.2), y + Inches(0.5),
                 cw - Inches(0.4), ch - Inches(0.6),
                 name, font=BODY_FONT, size=12, color=C.WHITE, line_spacing=1.25)
    add_footer(slide, "10 causes → signature capteur claire    ·    3 causes → signal manuel uniquement")
    add_slide_number(slide, n)


def render_f1(slide, n):
    paint_backdrop(slide)
    add_section_label(slide, "04 · DÉVELOPPEMENT")
    add_kicker(slide, "RÉSULTATS DES MODÈLES")
    add_title(slide, "F1 par modèle.")
    add_subtitle(slide, "XGBoost gagne · l'écart n'est pas anodin.")

    # LEFT — bar chart (drawn with rectangles)
    top = Inches(2.9)
    bottom = SLIDE_H - Inches(0.7)
    gap = Inches(0.35)
    col_w = (CONTENT_W - gap) / 2
    col_h = bottom - top

    add_glass_card(slide, PAD_L, top, col_w, col_h, alpha_pct=82)
    add_text(slide, PAD_L + Inches(0.3), top + Inches(0.3),
             col_w - Inches(0.6), Inches(0.4),
             "F1 SCORE (MACRO)",
             font=MONO_FONT, size=10, bold=True, color=C.ORANGE_400,
             letter_spacing_pct=200)

    # bars
    bars = [("RF v1", 0.15, C.GREY_500),
            ("RF v2", 0.45, C.NAVY_300),
            ("XGBoost v3", 0.83, C.ORANGE_500)]
    bar_area_x = PAD_L + Inches(0.8)
    bar_area_y = top + Inches(1.0)
    bar_area_w = col_w - Inches(1.1)
    bar_area_h = col_h - Inches(1.8)
    bar_h = Inches(0.55)
    row_gap = Inches(0.4)
    for i, (label, val, col) in enumerate(bars):
        y = bar_area_y + i * (bar_h + row_gap)
        add_text(slide, PAD_L + Inches(0.3), y, Inches(1.6), bar_h,
                 label, font=BODY_FONT, size=13, color=C.WHITE,
                 anchor=MSO_ANCHOR.MIDDLE)
        # bar bg
        bg = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE,
                                    bar_area_x, y, bar_area_w, bar_h)
        bg.adjustments[0] = 0.4
        bg.fill.solid(); bg.fill.fore_color.rgb = C.NAVY_800
        bg.line.fill.background(); bg.shadow.inherit = False
        # bar fg
        fw = int(bar_area_w * val)
        if fw > 0:
            fg = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE,
                                        bar_area_x, y, fw, bar_h)
            fg.adjustments[0] = 0.4
            fg.fill.solid(); fg.fill.fore_color.rgb = col
            fg.line.fill.background(); fg.shadow.inherit = False
        # value label
        add_text(slide, bar_area_x + fw + Inches(0.1), y,
                 Inches(1.2), bar_h, f"{val:.3f}",
                 font=MONO_FONT, size=13, bold=True, color=col,
                 anchor=MSO_ANCHOR.MIDDLE)

    # RIGHT — takeaways
    rx = PAD_L + col_w + gap
    add_glass_card(slide, rx, top, col_w, col_h, accent=C.CYAN, alpha_pct=82)
    add_text(slide, rx + Inches(0.3), top + Inches(0.3),
             col_w - Inches(0.6), Inches(0.4),
             "POURQUOI XGBOOST",
             font=MONO_FONT, size=10, bold=True, color=C.CYAN,
             letter_spacing_pct=200)
    bullets = [
        ("Gradient boosting", "apprend les erreurs séquentiellement, contrairement à un vote de random forest."),
        ("Robuste au déséquilibre", "F1 macro > accuracy quand certaines causes sont rares."),
        ("Rapide en inférence", "~15 ms par prédiction — compatible temps réel."),
    ]
    by = top + Inches(0.9)
    for title, body in bullets:
        add_text(slide, rx + Inches(0.3), by, col_w - Inches(0.6), Inches(0.4),
                 "▸  " + title, font=DISPLAY_FONT, size=16, bold=True,
                 color=C.WHITE)
        add_text(slide, rx + Inches(0.6), by + Inches(0.4),
                 col_w - Inches(0.9), Inches(0.85),
                 body, font=BODY_FONT, size=12, color=C.GREY_300,
                 line_spacing=1.35)
        by += Inches(1.35)
    add_slide_number(slide, n)


def render_confusion(slide, n):
    paint_backdrop(slide)
    add_section_label(slide, "04 · DÉVELOPPEMENT")
    add_kicker(slide, "ÉVALUATION")
    add_title(slide, "Confusion & courbe ROC.")
    add_subtitle(slide, "Un modèle qui sépare bien les classes majoritaires.")

    top = Inches(2.9)
    bottom = SLIDE_H - Inches(0.7)
    gap = Inches(0.3)
    col_w = (CONTENT_W - gap) / 2
    col_h = bottom - top

    # LEFT — confusion matrix placeholder
    add_glass_card(slide, PAD_L, top, col_w, col_h, alpha_pct=82)
    add_text(slide, PAD_L + Inches(0.3), top + Inches(0.3),
             col_w - Inches(0.6), Inches(0.4),
             "MATRICE DE CONFUSION · RF v2",
             font=MONO_FONT, size=10, bold=True, color=C.ORANGE_400,
             letter_spacing_pct=180)
    # simple 5x5 diagonal to hint the shape
    grid_x = PAD_L + Inches(0.8)
    grid_y = top + Inches(1.0)
    cell = Inches(0.5)
    n_ = 5
    for i in range(n_):
        for j in range(n_):
            intensity = 0.85 if i == j else 0.15 + 0.05 * ((i + j) % 3)
            r = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE,
                                       grid_x + j * cell, grid_y + i * cell,
                                       cell, cell)
            r.line.color.rgb = C.NAVY_700
            r.line.width = Pt(0.5)
            r.fill.solid()
            r.fill.fore_color.rgb = C.ORANGE_500
            _set_transparency(r, int(100 - intensity * 100))
            r.shadow.inherit = False
    add_text(slide, PAD_L + Inches(0.3), top + col_h - Inches(0.55),
             col_w - Inches(0.6), Inches(0.4),
             "Diagonale = prédictions correctes",
             font=BODY_FONT, size=11, color=C.GREY_500, italic=True,
             align=PP_ALIGN.CENTER)

    # RIGHT — metrics
    rx = PAD_L + col_w + gap
    add_glass_card(slide, rx, top, col_w, col_h, accent=C.CYAN, alpha_pct=82)
    add_text(slide, rx + Inches(0.3), top + Inches(0.3),
             col_w - Inches(0.6), Inches(0.4),
             "COURBE ROC · XGBoost v3",
             font=MONO_FONT, size=10, bold=True, color=C.CYAN,
             letter_spacing_pct=180)
    # 3 metric pills
    metrics = [("0.86", "Précision"),
               ("0.81", "Rappel"),
               ("0.91", "AUC (moyen)")]
    my = top + Inches(1.0)
    mgap = Inches(0.2)
    mw = (col_w - Inches(0.6) - 2 * mgap) / 3
    for i, (num, lbl) in enumerate(metrics):
        x = rx + Inches(0.3) + i * (mw + mgap)
        add_glass_card(slide, x, my, mw, Inches(1.4), accent=C.CYAN, alpha_pct=80)
        add_text(slide, x, my + Inches(0.2), mw, Inches(0.7),
                 num, font=DISPLAY_FONT, size=32, bold=True, color=C.CYAN,
                 align=PP_ALIGN.CENTER)
        add_text(slide, x, my + Inches(0.9), mw, Inches(0.35),
                 lbl, font=BODY_FONT, size=11, color=C.GREY_300,
                 align=PP_ALIGN.CENTER)
    add_text(slide, rx + Inches(0.3), top + Inches(2.7),
             col_w - Inches(0.6), Inches(1.0),
             "Seuil de décision fixé à 0.80 : au-dessus, création automatique d'une maintenance prédictive côté backend.",
             font=BODY_FONT, size=13, color=C.GREY_100, line_spacing=1.4)
    add_slide_number(slide, n)


def render_web_fonc(slide, n):
    paint_backdrop(slide)
    add_section_label(slide, "04 · DÉVELOPPEMENT")
    add_kicker(slide, "APPLICATION WEB — RESPONSABLE MAINTENANCE")
    add_title(slide, "Fonctionnalités web.")
    add_subtitle(slide, "Application React.js pour la supervision.")

    bullets = [
        ("01", "Authentification JWT",     "Rôles Responsable · Chef de ligne · Technicien"),
        ("02", "Tableau de bord",          "KPI MTBF · MTTR · disponibilité machine"),
        ("03", "Gestion des machines",     "Fiche technique · historique · état courant"),
        ("04", "Interventions",            "Création · suivi · badge de score IA"),
        ("05", "Planning et alertes",      "Calendrier maintenance · notifications"),
        ("06", "Analyse de fiabilité",     "Génération de rapport PDF exportable"),
    ]
    # 2 cols x 3 rows
    top = Inches(2.9)
    bottom = SLIDE_H - Inches(0.7)
    gap = Inches(0.2)
    cols = 2
    rows = 3
    cw = (CONTENT_W - gap) / cols
    ch = (bottom - top - gap * (rows - 1)) / rows
    for i, (num, title, body) in enumerate(bullets):
        col = i % cols
        row = i // cols
        x = PAD_L + col * (cw + gap)
        y = top + row * (ch + gap)
        add_glass_card(slide, x, y, cw, ch, accent=C.ORANGE_500, alpha_pct=82)
        add_text(slide, x + Inches(0.3), y + Inches(0.15),
                 Inches(0.5), Inches(0.4),
                 num, font=MONO_FONT, size=11, bold=True, color=C.ORANGE_400,
                 letter_spacing_pct=150)
        add_text(slide, x + Inches(0.9), y + Inches(0.1),
                 cw - Inches(1.2), Inches(0.5),
                 title, font=DISPLAY_FONT, size=15, bold=True, color=C.WHITE)
        add_text(slide, x + Inches(0.9), y + Inches(0.55),
                 cw - Inches(1.2), ch - Inches(0.7),
                 body, font=BODY_FONT, size=11, color=C.GREY_300,
                 line_spacing=1.35)
    add_slide_number(slide, n)


def render_web_exemples(slide, n):
    paint_backdrop(slide)
    add_section_label(slide, "04 · DÉVELOPPEMENT")
    add_kicker(slide, "APPLICATION WEB — INTERFACES")
    add_title(slide, "Tableau de bord.")
    add_subtitle(slide, "Pilotage complet pour le responsable maintenance.")

    screens = [
        ("Dashboard",    "MTBF · MTTR · pannes"),
        ("Équipements",  "Fiches machines"),
        ("Interventions","Score IA affiché"),
        ("Diagnostic IA","Cause instantanée"),
        ("Alertes",      "Temps réel"),
        ("Fiabilité",    "Rapport PDF"),
    ]
    # 3 cols x 2 rows of image placeholders
    top = Inches(2.85)
    bottom = SLIDE_H - Inches(0.75)
    cols = 3
    rows = 2
    gap = Inches(0.18)
    cw = (CONTENT_W - gap * (cols - 1)) / cols
    ch = (bottom - top - gap * (rows - 1)) / rows
    for i, (name, desc) in enumerate(screens):
        col = i % cols
        row = i // cols
        x = PAD_L + col * (cw + gap)
        y = top + row * (ch + gap)
        add_glass_card(slide, x, y, cw, ch, accent=C.ORANGE_500, alpha_pct=82)
        # image placeholder banner
        img_h = ch - Inches(0.9)
        img = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE,
                                     x + Inches(0.2), y + Inches(0.25),
                                     cw - Inches(0.4), img_h)
        img.fill.solid()
        img.fill.fore_color.rgb = C.NAVY_900
        img.line.color.rgb = C.NAVY_700
        img.line.width = Pt(0.5)
        img.shadow.inherit = False
        add_text(slide, x + Inches(0.2), y + Inches(0.25),
                 cw - Inches(0.4), img_h,
                 "[ capture web ]",
                 font=MONO_FONT, size=10, color=C.GREY_700,
                 align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
        add_text(slide, x + Inches(0.3), y + ch - Inches(0.62),
                 cw - Inches(0.6), Inches(0.3),
                 name, font=DISPLAY_FONT, size=13, bold=True, color=C.WHITE)
        add_text(slide, x + Inches(0.3), y + ch - Inches(0.33),
                 cw - Inches(0.6), Inches(0.28),
                 desc, font=BODY_FONT, size=10, color=C.GREY_500)
    add_footer(slide, "komax-gmao.render.com")
    add_slide_number(slide, n)


def render_mobile_fonc(slide, n):
    paint_backdrop(slide)
    add_section_label(slide, "04 · DÉVELOPPEMENT")
    add_kicker(slide, "APPLICATION MOBILE — TECHNICIEN TERRAIN")
    add_title(slide, "Fonctionnalités mobile.")
    add_subtitle(slide, "Application Flutter pour les techniciens terrain.")

    bullets = [
        ("01", "Connexion sécurisée",       "JWT · rôles Technicien et Chef de ligne"),
        ("02", "Tableau de bord",           "Machines assignées · alertes récentes"),
        ("03", "Interventions terrain",     "Créer · consulter · photo avant / après"),
        ("04", "Checklist journalière",     "Contrôle quotidien · photo OK / NOK"),
        ("05", "Notifications push",        "Firebase · alertes IA temps réel"),
    ]
    # left grid 5 rows, right mock device
    top = Inches(2.85)
    bottom = SLIDE_H - Inches(0.7)
    gap = Inches(0.3)
    left_w = Inches(8.0)
    right_w = CONTENT_W - left_w - gap
    total_h = bottom - top
    row_h = (total_h - Inches(0.14) * (len(bullets) - 1)) / len(bullets)
    for i, (num, title, body) in enumerate(bullets):
        y = top + i * (row_h + Inches(0.14))
        add_glass_card(slide, PAD_L, y, left_w, row_h,
                       accent=C.ORANGE_500, alpha_pct=82)
        add_text(slide, PAD_L + Inches(0.25), y + row_h / 2 - Inches(0.2),
                 Inches(0.6), Inches(0.4), num,
                 font=DISPLAY_FONT, size=20, bold=True, color=C.ORANGE_400,
                 anchor=MSO_ANCHOR.MIDDLE)
        add_text(slide, PAD_L + Inches(0.95), y, Inches(3.2), row_h,
                 title, font=DISPLAY_FONT, size=14, bold=True, color=C.WHITE,
                 anchor=MSO_ANCHOR.MIDDLE)
        add_text(slide, PAD_L + Inches(4.2), y, left_w - Inches(4.4), row_h,
                 body, font=BODY_FONT, size=11, color=C.GREY_300,
                 anchor=MSO_ANCHOR.MIDDLE)
    # right — mock phone
    rx = PAD_L + left_w + gap
    add_glass_card(slide, rx, top, right_w, total_h,
                   accent=C.CYAN, alpha_pct=82)
    # phone frame (rounded rectangle)
    phone_w = right_w - Inches(0.8)
    phone_h = total_h - Inches(1.4)
    px = rx + (right_w - phone_w) / 2
    py = top + Inches(0.7)
    frame = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE,
                                   px, py, phone_w, phone_h)
    frame.adjustments[0] = 0.12
    frame.fill.solid()
    frame.fill.fore_color.rgb = C.NAVY_900
    frame.line.color.rgb = C.CYAN
    frame.line.width = Pt(1.5)
    frame.shadow.inherit = False
    add_text(slide, px, py, phone_w, phone_h,
             "[ Flutter ]",
             font=MONO_FONT, size=12, color=C.CYAN,
             align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    add_text(slide, rx, top + total_h - Inches(0.5),
             right_w, Inches(0.35),
             "FLUTTER · ANDROID",
             font=MONO_FONT, size=10, bold=True, color=C.CYAN,
             align=PP_ALIGN.CENTER, letter_spacing_pct=180)
    add_slide_number(slide, n)


def render_mobile_exemples(slide, n):
    paint_backdrop(slide)
    add_section_label(slide, "04 · DÉVELOPPEMENT")
    add_kicker(slide, "APPLICATION MOBILE — INTERFACES")
    add_title(slide, "Terrain, dans la poche.")
    add_subtitle(slide, "Le technicien reçoit une alerte en 60 secondes.")

    screens = [
        ("Tableau de bord",   "Vue synthétique"),
        ("Interventions",     "Créer / consulter"),
        ("Alertes push",      "Temps réel"),
        ("Checklists",        "Preuve photo OK/NOK"),
    ]
    top = Inches(2.9)
    bottom = SLIDE_H - Inches(0.9)
    gap = Inches(0.25)
    cols = 4
    cw = (CONTENT_W - gap * (cols - 1)) / cols
    ch = bottom - top
    for i, (name, desc) in enumerate(screens):
        x = PAD_L + i * (cw + gap)
        add_glass_card(slide, x, top, cw, ch, accent=C.CYAN, alpha_pct=82)
        # phone-shaped image placeholder
        phone_w = cw - Inches(0.6)
        phone_h = ch - Inches(1.2)
        px = x + Inches(0.3)
        py = top + Inches(0.4)
        frame = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE,
                                       px, py, phone_w, phone_h)
        frame.adjustments[0] = 0.1
        frame.fill.solid(); frame.fill.fore_color.rgb = C.NAVY_950
        frame.line.color.rgb = C.CYAN
        frame.line.width = Pt(1.0)
        frame.shadow.inherit = False
        add_text(slide, px, py, phone_w, phone_h,
                 "[ capture ]",
                 font=MONO_FONT, size=10, color=C.GREY_700,
                 align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
        add_text(slide, x, top + ch - Inches(0.72),
                 cw, Inches(0.35),
                 name, font=DISPLAY_FONT, size=13, bold=True, color=C.WHITE,
                 align=PP_ALIGN.CENTER)
        add_text(slide, x, top + ch - Inches(0.4),
                 cw, Inches(0.3),
                 desc, font=BODY_FONT, size=10, color=C.GREY_500,
                 align=PP_ALIGN.CENTER)
    add_footer(slide, "Flutter · Android · Firebase (push)   ·   Preuve photo OK/NOK   ·   Brouillon hors-ligne")
    add_slide_number(slide, n)


def render_fiabilite(slide, n):
    paint_backdrop(slide)
    add_section_label(slide, "04 · DÉVELOPPEMENT")
    add_kicker(slide, "MODULE FIABILITÉ")
    add_title(slide, "Analyse de fiabilité.")
    add_subtitle(slide, "Régression linéaire · rapport PDF généré automatiquement.")

    top = Inches(2.9)
    bottom = SLIDE_H - Inches(0.7)
    gap = Inches(0.35)
    col_w = (CONTENT_W - gap) / 2
    col_h = bottom - top

    # LEFT — PDF placeholder
    add_glass_card(slide, PAD_L, top, col_w, col_h, alpha_pct=82)
    pdf = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE,
                                 PAD_L + Inches(0.6), top + Inches(0.4),
                                 col_w - Inches(1.2), col_h - Inches(0.8))
    pdf.fill.solid(); pdf.fill.fore_color.rgb = C.NAVY_900
    pdf.line.color.rgb = C.ORANGE_500; pdf.line.width = Pt(1.0)
    pdf.shadow.inherit = False
    add_text(slide, PAD_L + Inches(0.6), top + Inches(0.4),
             col_w - Inches(1.2), col_h - Inches(0.8),
             "[ Rapport PDF fiabilité ]",
             font=MONO_FONT, size=12, color=C.GREY_500,
             align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)

    # RIGHT — content bullets
    rx = PAD_L + col_w + gap
    add_glass_card(slide, rx, top, col_w, col_h,
                   accent=C.CYAN, alpha_pct=82)
    add_text(slide, rx + Inches(0.3), top + Inches(0.3),
             col_w - Inches(0.6), Inches(0.4),
             "CONTENU DU RAPPORT",
             font=MONO_FONT, size=10, bold=True, color=C.CYAN,
             letter_spacing_pct=200)
    bullets = [
        ("↗", "Disponibilité",   "projection sur 24 mois glissants"),
        ("!", "Nombre de pannes","tendance et courbe évolutive"),
        ("↓", "Export PDF",       "signé · daté · logo ICEM intégré"),
        ("=", "Comparaison",     "Alpha 433 H vs Gamma 333 PC"),
    ]
    by = top + Inches(0.95)
    for icon, lbl, sub in bullets:
        add_text(slide, rx + Inches(0.3), by, Inches(0.5), Inches(0.55),
                 icon, font=DISPLAY_FONT, size=22, bold=True, color=C.CYAN,
                 anchor=MSO_ANCHOR.MIDDLE)
        add_text(slide, rx + Inches(0.9), by, Inches(2.5), Inches(0.3),
                 lbl, font=DISPLAY_FONT, size=14, bold=True, color=C.WHITE)
        add_text(slide, rx + Inches(0.9), by + Inches(0.3),
                 col_w - Inches(1.2), Inches(0.3),
                 sub, font=BODY_FONT, size=11, color=C.GREY_300)
        by += Inches(0.72)
    add_slide_number(slide, n)


def render_deploiement(slide, n):
    paint_backdrop(slide)
    add_section_label(slide, "04 · DÉVELOPPEMENT")
    add_kicker(slide, "DÉPLOIEMENT LOCAL")
    add_title(slide, "Déploiement local.")
    add_subtitle(slide, "Réseau interne ICEM — pas de cloud, données restent sur site.")

    top = Inches(2.9)
    bottom = SLIDE_H - Inches(0.7)
    gap = Inches(0.35)
    col_w = (CONTENT_W - gap) / 2
    col_h = bottom - top

    # LEFT — fake terminal
    add_glass_card(slide, PAD_L, top, col_w, col_h, alpha_pct=90, accent=C.GREEN)
    # terminal top bar with 3 dots
    add_text(slide, PAD_L + Inches(0.25), top + Inches(0.2),
             col_w - Inches(0.5), Inches(0.3),
             "●  ●  ●     pm2 status",
             font=MONO_FONT, size=11, color=C.GREY_500)
    # divider
    d = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE,
                               PAD_L + Inches(0.25), top + Inches(0.55),
                               col_w - Inches(0.5), Emu(6350))
    d.line.fill.background()
    d.fill.solid(); d.fill.fore_color.rgb = C.GREY_700
    d.shadow.inherit = False
    terminal = [
        ("$ ", "pm2 start ecosystem.config.js",           C.WHITE),
        ("",   "[PM2] Starting backend-express...",       C.GREEN),
        ("",   "[PM2] Starting fastapi-uvicorn...",       C.GREEN),
        ("",   "backend-express  | 0 | online | 82.4mb", C.GREY_300),
        ("",   "fastapi-uvicorn  | 1 | online | 94.1mb", C.GREY_300),
        ("$ ", "curl http://localhost:3000/health",       C.WHITE),
        ("",   '{"status":"ok","db":"connected"}',       C.CYAN),
    ]
    ty = top + Inches(0.75)
    for prefix, line, col in terminal:
        add_text(slide, PAD_L + Inches(0.35), ty, Inches(0.35), Inches(0.3),
                 prefix, font=MONO_FONT, size=11, bold=True, color=C.ORANGE_400)
        add_text(slide, PAD_L + Inches(0.65), ty, col_w - Inches(0.9), Inches(0.32),
                 line, font=MONO_FONT, size=11, color=col)
        ty += Inches(0.38)

    # RIGHT — 5 numbered steps
    rx = PAD_L + col_w + gap
    steps = [
        ("01", "Serveur local Windows",     "Réseau interne ICEM · pas de cloud"),
        ("02", "Backend Express.js",        "PM2 · port 3000"),
        ("03", "MongoDB local",             "Base métier centralisée"),
        ("04", "Microservices FastAPI",     "Uvicorn · port 8001"),
        ("05", "App web + mobile",          "Accès LAN sur postes utilisateurs"),
    ]
    sy = top
    row_h = (col_h - Inches(0.15) * (len(steps) - 1)) / len(steps)
    for i, (num, title, body) in enumerate(steps):
        y = sy + i * (row_h + Inches(0.15))
        add_glass_card(slide, rx, y, col_w, row_h,
                       accent=C.ORANGE_500, alpha_pct=82)
        add_text(slide, rx + Inches(0.25), y + row_h / 2 - Inches(0.2),
                 Inches(0.6), Inches(0.4),
                 num, font=DISPLAY_FONT, size=18, bold=True, color=C.ORANGE_400,
                 anchor=MSO_ANCHOR.MIDDLE)
        add_text(slide, rx + Inches(0.95), y, Inches(3.0), row_h,
                 title, font=DISPLAY_FONT, size=13, bold=True, color=C.WHITE,
                 anchor=MSO_ANCHOR.MIDDLE)
        add_text(slide, rx + Inches(4.1), y, col_w - Inches(4.3), row_h,
                 body, font=BODY_FONT, size=11, color=C.GREY_300,
                 anchor=MSO_ANCHOR.MIDDLE)
    add_slide_number(slide, n)


def render_kpis(slide, n):
    paint_backdrop(slide)
    add_section_label(slide, "06 · CONCLUSION")
    add_kicker(slide, "CE QUE NOUS AVONS LIVRÉ")
    add_title(slide, "Ce qui a été livré.")
    add_subtitle(slide, "Quatre chiffres qui résument six mois de travail.")

    stats = [
        ("0.835",  "F1-score",   "XGBoost v3 · macro"),
        ("5",      "Couches",     "Perception → App"),
        ("3",      "Modèles ML",  "RF · RF · XGBoost"),
        ("40",     "Endpoints",   "API REST + IA"),
    ]
    top = Inches(2.85)
    stat_h = Inches(2.4)
    gap = Inches(0.25)
    cols = 4
    cw = (CONTENT_W - gap * (cols - 1)) / cols
    for i, (num, lbl, sub) in enumerate(stats):
        x = PAD_L + i * (cw + gap)
        add_stat_block(slide, x, top, cw, stat_h, num, lbl, sub, size_num=44)

    # callout at bottom
    cy = top + stat_h + Inches(0.35)
    add_glass_card(slide, PAD_L, cy, CONTENT_W, Inches(1.0),
                   accent=C.ORANGE_500, alpha_pct=70)
    add_multiline(slide, PAD_L, cy, CONTENT_W, Inches(1.0), [
        {"text": "Chaîne complète de bout en bout — du capteur physique jusqu'à l'écran mobile.",
         "size": 15, "color": C.WHITE, "align": PP_ALIGN.CENTER},
        {"text": "PROTOTYPE OPÉRATIONNEL", "size": 12, "bold": True,
         "font": MONO_FONT, "color": C.ORANGE_400,
         "align": PP_ALIGN.CENTER, "letter_spacing_pct": 220, "space_before": 4},
    ], anchor=MSO_ANCHOR.MIDDLE)
    add_slide_number(slide, n)


def render_perspectives(slide, n):
    paint_backdrop(slide)
    add_section_label(slide, "06 · CONCLUSION")
    add_kicker(slide, "PISTES D'ÉVOLUTION")
    add_title(slide, "Et après ?")
    add_subtitle(slide, "Quatre pistes concrètes, priorisées.")

    cards = [
        {"number": "01", "title": "Edge AI",
         "body": "Déployer le modèle XGBoost sur le Raspberry — décision locale sans réseau.",
         "tag": "COURT TERME"},
        {"number": "02", "title": "Weibull",
         "body": "Remplacer la régression linéaire par une loi de Weibull pour la durée de vie.",
         "tag": "MOYEN TERME"},
        {"number": "03", "title": "Calibration par machine",
         "body": "Deltas capteur spécifiques Alpha vs Gamma · F1 stratifié par modèle.",
         "tag": "MOYEN TERME"},
        {"number": "04", "title": "Vision",
         "body": "Caméra + CV pour détecter les défauts de sertissage en sortie de machine.",
         "tag": "LONG TERME"},
    ]
    layout_grid_cards(slide, cards, cols=2, top=Inches(2.9))
    add_slide_number(slide, n)


def render_merci(slide):
    paint_backdrop(slide, glow=True)
    # big centered "Merci."
    add_text(slide, PAD_L, Inches(1.8), CONTENT_W, Inches(2.5),
             "Merci.",
             font=DISPLAY_FONT, size=160, bold=True, color=C.WHITE,
             align=PP_ALIGN.CENTER, line_spacing=1.0)
    # subtitle
    add_text(slide, PAD_L, Inches(4.4), CONTENT_W, Inches(0.7),
             "Place aux questions du jury.",
             font=BODY_FONT, size=24, color=C.ORANGE_300,
             align=PP_ALIGN.CENTER)
    # bottom signature
    add_text(slide, PAD_L, SLIDE_H - Inches(1.1), CONTENT_W, Inches(0.4),
             "MOUTIA BENSAAD  ·  ISET NABEUL  ·  2026",
             font=MONO_FONT, size=12, bold=True, color=C.GREY_300,
             align=PP_ALIGN.CENTER, letter_spacing_pct=250)


# ============================================================================
# 7. Slide roster (mirrors presentation/src/slides/index.js `slides` array)
# ============================================================================
SLIDE_ROSTER = [
    ("cover",              render_cover),
    ("plan",               render_plan),
    ("section_intro",      lambda s: render_section_divider(s, "01", "Introduction et contexte",
                                                             "ICEM · Machines Komax · Problématique · Objectifs")),
    ("icem",               lambda s: render_icem(s, 4)),
    ("machines",           lambda s: render_machines(s, 5)),
    ("probleme",           lambda s: render_probleme(s, 6)),
    ("objectif",           lambda s: render_objectif(s, 7)),
    ("section_etat",       lambda s: render_section_divider(s, "02", "Étude préliminaire et état de l'art",
                                                             "Méthodologie · Matériels · Stack technique")),
    ("scrum",              lambda s: render_scrum(s, 9)),
    ("capteurs",           lambda s: render_capteurs(s, 10)),
    ("stack",              lambda s: render_stack(s, 11)),
    ("section_conception", lambda s: render_section_divider(s, "03", "Conception du système",
                                                             "Architecture 5 couches · Edge · UML · Pipeline temps réel")),
    ("architecture",       lambda s: render_architecture(s, 13)),
    ("edge",               lambda s: render_edge(s, 14)),
    ("uml",                lambda s: render_uml(s, 15)),
    ("pipeline",           lambda s: render_pipeline(s, 16)),
    ("section_dev",        lambda s: render_section_divider(s, "04", "Développement et implémentation",
                                                             "Backend · IA · Applications web et mobile · Déploiement")),
    ("backend",            lambda s: render_backend(s, 18)),
    ("ia",                 lambda s: render_ia(s, 19)),
    ("dataset",            lambda s: render_dataset(s, 20)),
    ("causes",             lambda s: render_causes(s, 21)),
    ("f1",                 lambda s: render_f1(s, 22)),
    ("confusion",          lambda s: render_confusion(s, 23)),
    ("web_fonc",           lambda s: render_web_fonc(s, 24)),
    ("web_exemples",       lambda s: render_web_exemples(s, 25)),
    ("mobile_fonc",        lambda s: render_mobile_fonc(s, 26)),
    ("mobile_exemples",    lambda s: render_mobile_exemples(s, 27)),
    ("fiabilite",          lambda s: render_fiabilite(s, 28)),
    ("deploiement",        lambda s: render_deploiement(s, 29)),
    ("section_demo",       lambda s: render_section_divider(s, "05", "Démonstration",
                                                             "Passage à la démo live du système")),
    ("kpis",               lambda s: render_kpis(s, 31)),
    ("perspectives",       lambda s: render_perspectives(s, 32)),
    ("merci",              render_merci),
]


# ============================================================================
# 8. Build entry
# ============================================================================
def build(speech_md_name: str, out_path: Path):
    speech = parse_speech(ROOT / speech_md_name)

    prs = Presentation()
    prs.slide_width = SLIDE_W
    prs.slide_height = SLIDE_H
    blank_layout = prs.slide_layouts[6]  # blank

    for idx, (slug, renderer) in enumerate(SLIDE_ROSTER, start=1):
        slide = prs.slides.add_slide(blank_layout)
        renderer(slide)
        entry = speech.get(idx)
        if entry:
            title = entry.get("title", "")
            dur = entry.get("duration", "")
            text = entry.get("text", "")
            header = f"[{idx:02d}] {title}"
            if dur:
                header += f"  ({dur})"
            body = header + "\n\n" + text if text else header
            write_notes(slide, body)

    prs.save(out_path)
    print(f"  -> wrote {out_path.name}  ({len(SLIDE_ROSTER)} slides)")


def main(argv):
    targets = {
        "simple": ("SPEECH_FR_SIMPLE.md", ROOT / "KOMAX_deck_SIMPLE.pptx"),
        "full":   ("SPEECH_FR.md",        ROOT / "KOMAX_deck_COMPLET.pptx"),
    }
    if len(argv) > 1:
        keys = [argv[1].lower()]
    else:
        keys = ["simple", "full"]
    for k in keys:
        if k not in targets:
            print(f"unknown target: {k}"); sys.exit(1)
        md, out = targets[k]
        print(f"[{k}] speech={md}  out={out.name}")
        build(md, out)


if __name__ == "__main__":
    main(sys.argv)
