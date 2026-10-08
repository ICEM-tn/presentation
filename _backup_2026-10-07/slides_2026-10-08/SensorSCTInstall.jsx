import SensorInstall from './SensorInstall.jsx';

export default function SensorSCTInstall() {
  return (
    <SensorInstall
      sectionLabel="Emplacement · SCT-013"
      name="SCT-013 · 100 A"
      image="img/sensors/placement/sct013_placement.png"
      where="Clampée autour d'un câble à l'intérieur de l'armoire électrique. Le signal, converti en tension par une résistance de 33 Ω, est ramené au Raspberry Pi (paquet essai) via le convertisseur ADS1015 posé sur la breadboard."
      whyHere="Ce câble porte le courant tiré par les moteurs. Une seule pince suffit à voir l'état électrique global. La pose est non-invasive et se fait sans arrêter la production."
      accent="var(--green-400)"
    />
  );
}
