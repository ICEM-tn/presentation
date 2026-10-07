import React from 'react';
import ReactDOM from 'react-dom/client';
import { MotionGlobalConfig } from 'framer-motion';
import App from './App.jsx';
import './styles/globals.css';

// ?noanim=1 → freeze all Framer Motion animations at their target state.
// Used by build_pdf.mjs so screenshots capture fully-rendered slides.
if (new URLSearchParams(window.location.search).get('noanim') === '1') {
  MotionGlobalConfig.skipAnimations = true;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
