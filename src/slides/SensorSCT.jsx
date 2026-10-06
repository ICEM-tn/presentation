import SensorSpec from './SensorSpec.jsx';

export default function SensorSCT() {
  return (
    <SensorSpec
      sectionLabel="Capteur 4/4 · Courant électrique"
      name="SCT-013 · 100 A"
      measure="Pince ampèremétrique non-invasive"
      image="img/sensors/sct013.jpg"
      specs={[
        'Variante SCT-013-000 · plage 0-100 A alternatif',
        'Sortie 0-50 mA · résistance de charge 33 Ω · précision ±1 %',
        'Fréquence secteur 50/60 Hz',
        'Numérisation via ADS1015 · 12 bits sur I²C',
      ]}
      why="Non-invasive : on clippe la pince autour du câble, sans le couper ni interrompre la production. Le courant total de l'armoire reflète l'état mécanique agrégé de tous les moteurs — une surintensité signale une contrainte cachée."
      accent="var(--green-400)"
    />
  );
}
