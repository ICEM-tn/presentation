// Synchronisation deck <-> fenêtre présentateur.
// BroadcastChannel (version hébergée / npm run dev) + postMessage direct entre
// les deux fenêtres (indispensable en double-clic file://, où BroadcastChannel
// ne passe pas). Les messages en double sont sans effet : chaque fenêtre
// n'envoie l'index que lorsqu'elle change de slide elle-même.
const CHANNEL = 'komax-deck';
const TAG = 'komax-deck';

export function createSync(getPeer, onMessage) {
  let chan = null;
  try {
    chan = new BroadcastChannel(CHANNEL);
    chan.onmessage = (e) => e.data && onMessage(e.data);
  } catch {
    chan = null;
  }

  const onWindowMessage = (e) => {
    if (e.data && e.data.__tag === TAG) onMessage(e.data);
  };
  window.addEventListener('message', onWindowMessage);

  return {
    send(msg) {
      const m = { ...msg, __tag: TAG };
      try { chan?.postMessage(m); } catch { /* canal fermé */ }
      const peer = getPeer();
      if (peer && !peer.closed) {
        try { peer.postMessage(m, '*'); } catch { /* fenêtre fermée */ }
      }
    },
    close() {
      chan?.close();
      window.removeEventListener('message', onWindowMessage);
    },
  };
}
