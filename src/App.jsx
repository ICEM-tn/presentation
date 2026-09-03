import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { slides } from './slides/index.js';
import PageNav from './components/PageNav.jsx';
import PresenterView from './PresenterView.jsx';

const CHANNEL = 'komax-deck';

export default function App() {
  const isPresenter = typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('present') === '1';

  if (isPresenter) return <PresenterView />;

  return <MainDeck />;
}

function MainDeck() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [presenterOpen, setPresenterOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const chanRef = useRef(null);
  const suppressBroadcast = useRef(false);
  const presenterWinRef = useRef(null);

  const clamp = useCallback(
    (n) => Math.max(0, Math.min(slides.length - 1, n)),
    []
  );

  const go = useCallback(
    (delta) => {
      setDirection(delta > 0 ? 1 : -1);
      setIndex((prev) => clamp(prev + delta));
    },
    [clamp]
  );

  const goTo = useCallback(
    (target) => {
      setIndex((prev) => {
        const next = clamp(target);
        setDirection(next >= prev ? 1 : -1);
        return next;
      });
    },
    [clamp]
  );

  useEffect(() => {
    const chan = new BroadcastChannel(CHANNEL);
    chanRef.current = chan;
    chan.postMessage({ type: 'main-hello' });

    chan.onmessage = (e) => {
      const msg = e.data;
      if (!msg) return;
      if (msg.type === 'index') {
        suppressBroadcast.current = true;
        setIndex((prev) => {
          setDirection(msg.value >= prev ? 1 : -1);
          return msg.value;
        });
      } else if (msg.type === 'presenter-ready' || msg.type === 'request-index') {
        chan.postMessage({ type: 'index', value: index });
      }
    };

    return () => chan.close();
  }, []);

  useEffect(() => {
    if (suppressBroadcast.current) {
      suppressBroadcast.current = false;
      return;
    }
    chanRef.current?.postMessage({ type: 'index', value: index });
  }, [index]);

  const openPresenter = useCallback(() => {
    const existing = presenterWinRef.current;
    if (existing && !existing.closed) {
      existing.focus();
      return;
    }
    const url = `${window.location.pathname}?present=1`;
    const features = 'popup=yes,width=1400,height=850,menubar=no,toolbar=no,location=no,status=no';
    const win = window.open(url, 'komax-presenter', features);
    presenterWinRef.current = win;
    if (win) setPresenterOpen(true);
  }, []);

  useEffect(() => {
    if (!presenterOpen) return;
    const t = setInterval(() => {
      const w = presenterWinRef.current;
      if (!w || w.closed) {
        presenterWinRef.current = null;
        setPresenterOpen(false);
      }
    }, 800);
    return () => clearInterval(t);
  }, [presenterOpen]);

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
        setDirection(-1);
        setIndex(0);
      } else if (e.key === 'End') {
        setDirection(1);
        setIndex(slides.length - 1);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'h' || e.key === 'H') {
        setDirection(-1);
        setIndex(1);
      } else if (e.key === 'n' || e.key === 'N') {
        openPresenter();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, openPresenter]);

  const Slide = useMemo(() => slides[index].component, [index]);

  const progress = ((index + 1) / slides.length) * 100;

  return (
    <div className="deck-root">
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

      <div className="slide-counter">
        <span className="current">{String(index + 1).padStart(2, '0')}</span>
        <span className="sep">/</span>
        <span className="total">{String(slides.length).padStart(2, '0')}</span>
      </div>
      {!presenterOpen && !isFullscreen && (
        <button
          className="presenter-launch"
          onClick={openPresenter}
          title="Ouvrir le mode présentateur (N)"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="12" rx="2" />
            <path d="M8 20h8M12 16v4" />
          </svg>
          Mode présentateur
        </button>
      )}
      <div className="hint">← → naviguer &nbsp;·&nbsp; F plein écran &nbsp;·&nbsp; H plan &nbsp;·&nbsp; N notes présentateur</div>

      <PageNav currentIndex={index} goTo={goTo} />
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
