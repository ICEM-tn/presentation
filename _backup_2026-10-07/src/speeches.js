import speechRawFull from '../SPEECH_FR.md?raw';
import speechRawSimple from '../SPEECH_FR_SIMPLE.md?raw';

function parseSpeeches(md) {
  const lines = md.split(/\r?\n/);
  const map = {};
  let currentNum = null;
  let currentTitle = '';
  let currentDuration = '';
  let buffer = [];

  const flush = () => {
    if (currentNum != null) {
      map[currentNum] = {
        title: currentTitle,
        duration: currentDuration,
        text: buffer.join('\n').trim(),
      };
    }
    buffer = [];
  };

  for (const line of lines) {
    const h = line.match(/^##\s+(\d+)\s+[—-]\s+(.+?)(?:\s*\(([^)]+)\))?\s*$/);
    if (h) {
      flush();
      currentNum = parseInt(h[1], 10);
      currentTitle = h[2].trim();
      currentDuration = (h[3] || '').trim();
      continue;
    }
    if (currentNum == null) continue;
    const q = line.match(/^>\s?(.*)$/);
    if (q) buffer.push(q[1]);
  }
  flush();
  return map;
}

const bySlideNumber = {
  full: parseSpeeches(speechRawFull),
  simple: parseSpeeches(speechRawSimple),
};

const STORAGE_KEY = 'komax-speech-mode';

export function getSpeechMode() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'full' ? 'full' : 'simple';
  } catch {
    return 'simple';
  }
}

export function setSpeechMode(mode) {
  const clean = mode === 'full' ? 'full' : 'simple';
  try {
    localStorage.setItem(STORAGE_KEY, clean);
  } catch {
    // ignore
  }
  return clean;
}

export function getSpeechForIndex(index, mode) {
  const m = mode === 'full' ? 'full' : 'simple';
  const slideNumber = index + 1;
  return bySlideNumber[m][slideNumber] || { title: '', duration: '', text: '' };
}

export function getAllSpeeches(mode) {
  const m = mode === 'full' ? 'full' : 'simple';
  return bySlideNumber[m];
}
