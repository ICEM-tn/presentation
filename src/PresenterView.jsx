import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { slides } from './slides/index.js';
import { getSpeechForIndex, getSpeechMode, setSpeechMode } from './speeches.js';
import PageNav from './components/PageNav.jsx';
import { createSync } from './sync.js';

const SLIDE_W = 1600;
const SLIDE_H = 900;
const CURRENT_W = 560;
const CURRENT_H = (SLIDE_H * CURRENT_W) / SLIDE_W;
const CURRENT_SCALE = CURRENT_W / SLIDE_W;
const NEXT_W = 320;
const NEXT_H = (SLIDE_H * NEXT_W) / SLIDE_W;
const NEXT_SCALE = NEXT_W / SLIDE_W;
const noop = () => {};

export default function PresenterView() {
  const [index, setIndex] = useState(0);
  const [clock, setClock] = useState(() => new Date());
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [paused, setPaused] = useState(false);
  const [pauseAccum, setPauseAccum] = useState(0);
  const [pausedAt, setPausedAt] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [fontSize, setFontSize] = useState(20);
  const [speechModeState, setSpeechModeState] = useState(() => getSpeechMode());
  const indexRef = useRef(0);
  const syncRef = useRef(null);

  // Même logique que le deck : on n'envoie l'index que pour un changement local.
  const show = useCallback((target, send = true) => {
    const next = Math.max(0, Math.min(slides.length - 1, target));
    if (next === indexRef.current) return;
    indexRef.current = next;
    setIndex(next);
    if (send) syncRef.current?.send({ type: 'index', value: next });
  }, []);

  const toggleSpeechMode = useCallback(() => {
    setSpeechModeState((prev) => {
      const next = prev === 'simple' ? 'full' : 'simple';
      setSpeechMode(next);
      return next;
    });
  }, []);

  useEffect(() => {
    const sync = createSync(
      () => window.opener,
      (msg) => {
        if (msg.type === 'index') {
          show(msg.value, false);
        } else if (msg.type === 'main-hello') {
          sync.send({ type: 'request-index' });
        }
      }
    );
    syncRef.current = sync;
    sync.send({ type: 'presenter-ready' });
    return () => sync.close();
  }, [show]);

  useEffect(() => {
    const t = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      if (paused) return;
      setElapsed(Math.floor((Date.now() - startedAt - pauseAccum) / 1000));
    }, 250);
    return () => clearInterval(t);
  }, [startedAt, pauseAccum, paused]);

  const go = useCallback((delta) => show(indexRef.current + delta), [show]);

  const resetTimer = useCallback(() => {
    setStartedAt(Date.now());
    setPauseAccum(0);
    setPausedAt(null);
    setPaused(false);
    setElapsed(0);
  }, []);

  const togglePause = useCallback(() => {
    if (paused) {
      setPauseAccum((acc) => acc + (Date.now() - pausedAt));
      setPausedAt(null);
      setPaused(false);
    } else {
      setPausedAt(Date.now());
      setPaused(true);
    }
  }, [paused, pausedAt]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        go(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        go(-1);
      } else if (e.key === '+' || e.key === '=') {
        setFontSize((s) => Math.min(40, s + 2));
      } else if (e.key === '-' || e.key === '_') {
        setFontSize((s) => Math.max(12, s - 2));
      } else if (e.key === 'r' || e.key === 'R') {
        resetTimer();
      } else if (e.key === 'p' || e.key === 'P') {
        togglePause();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, resetTimer, togglePause]);

  const current = slides[index];
  const next = slides[Math.min(slides.length - 1, index + 1)];
  const speech = useMemo(
    () => getSpeechForIndex(index, speechModeState),
    [index, speechModeState]
  );
  const nextSpeech = useMemo(
    () => getSpeechForIndex(index + 1, speechModeState),
    [index, speechModeState]
  );

  const CurrentComp = current?.component;
  const NextComp = next?.component;

  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const timeStr = clock.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="presenter-root">
      <header className="presenter-header">
        <div className="clock">{timeStr}</div>
        <div className={`timer ${paused ? 'paused' : ''}`}>
          <span className="timer-value">{fmt(elapsed)}</span>
          <button className="ctrl-btn" onClick={togglePause} title="Pause / Reprise (P)">
            {paused ? '▶' : '❚❚'}
          </button>
          <button className="ctrl-btn" onClick={resetTimer} title="Réinitialiser (R)">
            ↺
          </button>
        </div>
        <div className="slide-pos">
          <span className="pos-current">{String(index + 1).padStart(2, '0')}</span>
          <span className="pos-sep">/</span>
          <span className="pos-total">{String(slides.length).padStart(2, '0')}</span>
        </div>
      </header>

      <main className="presenter-main">
        <section className="preview-col">
          <div className="preview-block current-preview">
            <div className="preview-label">Slide actuelle</div>
            <div
              className="preview-frame"
              style={{ width: CURRENT_W, height: CURRENT_H }}
            >
              <div
                className="preview-scale"
                style={{
                  width: SLIDE_W,
                  height: SLIDE_H,
                  transform: `scale(${CURRENT_SCALE})`,
                }}
              >
                {CurrentComp ? <CurrentComp goTo={noop} currentIndex={index} /> : null}
              </div>
            </div>
            <div className="preview-meta">
              {speech.title && <span className="meta-title">{speech.title}</span>}
              {speech.duration && <span className="meta-duration">{speech.duration}</span>}
            </div>
          </div>

          <div className="preview-block next-preview">
            <div className="preview-label">Suivante</div>
            <div
              className="preview-frame small"
              style={{ width: NEXT_W, height: NEXT_H }}
            >
              {NextComp && next !== current ? (
                <div
                  className="preview-scale small"
                  style={{
                    width: SLIDE_W,
                    height: SLIDE_H,
                    transform: `scale(${NEXT_SCALE})`,
                  }}
                >
                  <NextComp goTo={noop} currentIndex={index + 1} />
                </div>
              ) : (
                <div className="preview-empty">— fin du deck —</div>
              )}
            </div>
            <div className="preview-meta small">
              {nextSpeech.title && <span className="meta-title">{nextSpeech.title}</span>}
            </div>
          </div>
        </section>

        <section className="speech-col">
          <div className="speech-header">
            <div className="speech-title-line">
              <span className="speech-num">{String(index + 1).padStart(2, '0')}</span>
              <h2 className="speech-title">{speech.title || current?.id || 'Slide'}</h2>
            </div>
            <div className="speech-controls">
              <button
                className={`ctrl-btn mode-btn ${speechModeState === 'simple' ? 'active' : ''}`}
                onClick={toggleSpeechMode}
                title="Basculer entre version SIMPLE (A2) et version complète"
              >
                {speechModeState === 'simple' ? 'A2 SIMPLE' : 'COMPLET'}
              </button>
              <button
                className="ctrl-btn"
                onClick={() => setFontSize((s) => Math.max(12, s - 2))}
                title="Diminuer (-)"
              >
                A−
              </button>
              <button
                className="ctrl-btn"
                onClick={() => setFontSize((s) => Math.min(40, s + 2))}
                title="Augmenter (+)"
              >
                A+
              </button>
            </div>
          </div>
          <div className="speech-body" style={{ fontSize: `${fontSize}px` }}>
            {speech.text ? (
              speech.text
                .split(/\n{2,}/)
                .map((p, i) => <p key={i}>{renderInline(p)}</p>)
            ) : (
              <p className="speech-empty">Aucun texte oral pour cette slide.</p>
            )}
          </div>
        </section>
      </main>

      <PageNav currentIndex={index} goTo={show} embedded />

      <footer className="presenter-footer">
        <button className="foot-btn" onClick={() => go(-1)} disabled={index === 0}>
          ← Précédente
        </button>
        <div className="foot-hint">
          ← → ou vignettes pour naviguer · P pause · R remise à zéro · +/− taille texte
        </div>
        <button
          className="foot-btn primary"
          onClick={() => go(1)}
          disabled={index === slides.length - 1}
        >
          Suivante →
        </button>
      </footer>
    </div>
  );
}

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return <strong key={i}>{p.slice(2, -2)}</strong>;
    }
    if (p.startsWith('*') && p.endsWith('*') && p.length > 2) {
      return <em key={i}>{p.slice(1, -1)}</em>;
    }
    return <span key={i}>{p}</span>;
  });
}
