import { motion } from 'framer-motion';

/**
 * Maillage de nœuds connectés — représentation "neural net" / réseau IoT.
 * Utilisé comme fond animé sur les slides IA.
 */
export default function NetworkMesh({ opacity = 0.3, color = 'var(--cyan-400)' }) {
  const nodes = [
    { x: 100, y: 150 }, { x: 260, y: 100 }, { x: 420, y: 180 },
    { x: 200, y: 300 }, { x: 380, y: 320 }, { x: 540, y: 250 },
    { x: 120, y: 480 }, { x: 300, y: 460 }, { x: 480, y: 500 },
    { x: 640, y: 400 }, { x: 780, y: 320 }, { x: 900, y: 200 },
    { x: 1040, y: 300 }, { x: 1180, y: 220 }, { x: 1320, y: 380 },
    { x: 960, y: 500 }, { x: 1120, y: 480 }, { x: 1280, y: 560 },
    { x: 700, y: 620 }, { x: 500, y: 680 }, { x: 260, y: 640 },
  ];

  // Connect each node to its 2 nearest neighbors
  const edges = [];
  nodes.forEach((n, i) => {
    const dists = nodes
      .map((m, j) => ({ j, d: Math.hypot(n.x - m.x, n.y - m.y) }))
      .filter((x) => x.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    dists.forEach((x) => edges.push([i, x.j]));
  });

  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity,
        zIndex: 0,
      }}
      viewBox="0 0 1400 800"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Arêtes */}
      <g stroke={color} strokeWidth="0.5" fill="none" opacity="0.55">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} />
        ))}
      </g>

      {/* Nœuds */}
      <g fill={color}>
        {nodes.map((n, i) => (
          <g key={i}>
            <motion.circle
              cx={n.x} cy={n.y}
              initial={{ r: 2.5 }}
              animate={{ r: [2.5, 5, 2.5] }}
              transition={{ duration: 2.4, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle
              cx={n.x} cy={n.y}
              initial={{ r: 4, opacity: 0.6 }}
              animate={{ r: 18, opacity: 0 }}
              transition={{ duration: 2.4, delay: i * 0.15 + 0.5, repeat: Infinity, ease: 'easeOut' }}
              fill="none"
              stroke={color}
              strokeWidth="0.6"
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
