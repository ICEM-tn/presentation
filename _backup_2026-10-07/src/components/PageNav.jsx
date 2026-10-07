import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { slides } from '../slides/index.js';

// The full-scale slide dimensions used for thumbnails.
// Kept in 16:9 to match a typical defense projector.
const THUMB_W_REAL = 1600;
const THUMB_H_REAL = 900;
// Rendered thumbnail size.
const THUMB_W = 138;
const THUMB_H = 78;
const SCALE = THUMB_W / THUMB_W_REAL;

// `embedded` : bande intégrée dans la fenêtre du texte oral (pas en position fixe).
export default function PageNav({ currentIndex, goTo, embedded = false }) {
  const stripRef = useRef(null);
  const activeRef = useRef(null);

  // Auto-scroll the strip so the current thumbnail stays visible.
  useEffect(() => {
    if (activeRef.current && stripRef.current) {
      activeRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentIndex]);

  const noop = () => {};

  return (
    <div className={`page-nav ${embedded ? 'embedded' : ''}`}>
      <div className="page-nav-strip" ref={stripRef}>
        {slides.map((s, i) => {
          const Comp = s.component;
          const isCurrent = i === currentIndex;
          return (
            <button
              key={s.id}
              ref={isCurrent ? activeRef : null}
              onClick={() => goTo && goTo(i)}
              className={`thumb ${isCurrent ? 'is-current' : ''}`}
              title={`Slide ${i + 1}`}
              aria-label={`Aller à la slide ${i + 1}`}
            >
              <div className="thumb-preview">
                <div
                  className="thumb-scale"
                  style={{
                    width: THUMB_W_REAL,
                    height: THUMB_H_REAL,
                    transform: `scale(${SCALE})`,
                  }}
                >
                  <Comp goTo={noop} currentIndex={i} />
                </div>
              </div>
              <div className="thumb-num">{i + 1}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
