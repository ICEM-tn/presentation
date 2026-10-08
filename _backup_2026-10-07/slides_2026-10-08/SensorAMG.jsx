import SensorSpec from './SensorSpec.jsx';

export default function SensorAMG() {
  return (
    <SensorSpec
      sectionLabel="Capteur 3/4 · Imagerie thermique"
      name="AMG8833"
      measure="Caméra thermique matricielle sans contact"
      image="img/sensors/amg8833.jpg"
      specs={[
        'Matrice 8 × 8 pixels · plage −20 à +80 °C',
        'Précision ±2,5 °C · rafraîchissement 10 Hz',
        'Champ de vue 60° × 60° · interface I²C',
        'Coût ≈ 30 €  (vs FLIR industrielle > 500 €)',
      ]}
      why="Vision globale de l'armoire sans contact avec la machine. Résolution faible mais suffisante pour repérer un point chaud sur une carte, un câble ou un moteur. Alternative très accessible aux caméras thermiques professionnelles."
      accent="var(--orange-400)"
    />
  );
}
