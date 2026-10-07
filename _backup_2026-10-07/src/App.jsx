import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { slides } from './slides/index.js';
import PageNav from './components/PageNav.jsx';
import PresenterView from './PresenterView.jsx';
import { createSync } from './sync.js';

export default function App() {
  const isPresenter = typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('present') === '1';

  if (isPresenter) return <PresenterView />;

  return <MainDeck />;
}

function MainDeck() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const indexRef = useRef(0);
  const syncRef = useRef(null);
  const presenterWinRef = useRef(null);
  const [tip, setTip] = useState(null);
  const tipTimerRef = useRef(null);

  const flashTip = useCallback((text) => {
    clearTimeout(tipTimerRef.current);
    setTip(text);
    tipTimerRef.current = setTimeout(() => setTip(null), 4000);
  }, []);

  // Affiche la slide `target` ; `send` = false quand le changement vient de
  // la fenêtre présentateur (pas de renvoi, donc pas d'écho).
  const show = useCallback((target, send = true) => {
    const next = Math.max(0, Math.min(slides.length - 1, target));
    const prev = indexRef.current;
    if (next === prev) return;
    setDirection(next > prev ? 1 : -1);
    indexRef.current = next;
    setIndex(next);
    if (send) syncRef.current?.send({ type: 'index', value: next });
  }, []);

  const go = useCallback((delta) => show(indexRef.current + delta), [show]);
  const goTo = useCallback((target) => show(target), [show]);

  useEffect(() => {
    const sync = createSync(
      () => presenterWinRef.current,
      (msg) => {
        if (msg.type === 'index') {
          show(msg.value, false);
        } else if (msg.type === 'presenter-ready' || msg.type === 'request-index') {
          sync.send({ type: 'index', value: indexRef.current });
        }
      }
    );
    syncRef.current = sync;
    sync.send({ type: 'main-hello' });
    return () => sync.close();
  }, [show]);

  // Ouvre (ou ramène au premier plan) la fenêtre du texte oral.
  // Doit être appelée pendant un appui clavier, sinon le navigateur bloque la fenêtre.
  const openPresenter = useCallback(() => {
    const existing = presenterWinRef.current;
    if (existing && !existing.closed) {
      existing.focus();
      return;
    }
    const url = `${window.location.pathname}?present=1`;
    const features = 'popup=yes,width=1400,height=850,menubar=no,toolbar=no,location=no,status=no';
    presenterWinRef.current = window.open(url, 'komax-presenter', features);
  }, []);

  useEffect(() => {
    const detect = () => {
      const apiFs = !!document.fullscreenElement;
      const f11Fs = window.innerHeight >= screen.height - 2 &&
                    window.innerWidth >= screen.width - 2;
      setIsFullscreen(apiFs || f11Fs);
    };
    detect();
    document.addEventListener('fullscreenchange', detect);
    window.addEventListener('resize', detect);
    return () => {
      document.removeEventListener('fullscreenchange', detect);
      window.removeEventListener('resize', detect);
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        go(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        go(-1);
      } else if (e.key === 'Home') {
        show(0);
      } else if (e.key === 'End') {
        show(slides.length - 1);
      } else if (e.key === 'F11') {
        // Plein écran + ouverture de fenêtre dans le même appui = conflit
        // (Chrome : la fenêtre vole le focus ; Opera : popup bloquée).
        // 1er F11 : ouvre le texte oral. 2e F11 : plein écran via l'API.
        e.preventDefault();
        const w = presenterWinRef.current;
        if (!w || w.closed) {
          openPresenter();
          flashTip('Texte oral ouvert — placez-le sur l’écran du PC, cliquez ici puis F11');
        } else {
          toggleFullscreen();
        }
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'h' || e.key === 'H') {
        show(1);
      } else if (e.key === 'n' || e.key === 'N') {
        openPresenter();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, show, openPresenter, flashTip]);

  // Plein écran sans fenêtre texte oral (ex. F11 gardé par Opera) : petit rappel.
  useEffect(() => {
    if (!isFullscreen) return;
    const w = presenterWinRef.current;
    if (!w || w.closed) flashTip('N = ouvrir le texte oral');
  }, [isFullscreen, flashTip]);

  const Slide = useMemo(() => slides[index].component, [index]);

  const progress = ((index + 1) / slides.length) * 100;

  return (
    <div className={`deck-root ${isFullscreen ? 'fs' : ''}`}>
      <div className="grid-bg" />

      <motion.div
        className="progress-bar"
        initial={false}
        animate={{ width: `${progress}%` }}
        transition={{ type: 'spring', stiffness: 220, damping: 30 }}
      />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={index}
          className="slide-viewport"
          custom={direction}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -direction * 40 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="slide-inner">
            <Slide goTo={goTo} currentIndex={index} />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Numéro de slide : visible aussi en plein écran (coin bas-droit). */}
      <div className="slide-counter">
        <span className="current">{String(index + 1).padStart(2, '0')}</span>
        <span className="sep">/</span>
        <span className="total">{String(slides.length).padStart(2, '0')}</span>
      </div>

      {tip && <div className="fs-tip">{tip}</div>}

      {/* En plein écran, la navigation passe dans la fenêtre du texte oral. */}
      {!isFullscreen && (
        <>
          <button
            className="nav-btn nav-prev"
            onClick={() => go(-1)}
            aria-label="Slide precedente"
            style={{ opacity: index === 0 ? 0.3 : 1 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className="nav-btn nav-next"
            onClick={() => go(1)}
            aria-label="Slide suivante"
            style={{ opacity: index === slides.length - 1 ? 0.3 : 1 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>

          <div className="hint">← → naviguer &nbsp;·&nbsp; F11 : texte oral, F11 encore : plein écran &nbsp;·&nbsp; H plan</div>

          <PageNav currentIndex={index} goTo={goTo} />
        </>
      )}
    </div>
  );
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
}
