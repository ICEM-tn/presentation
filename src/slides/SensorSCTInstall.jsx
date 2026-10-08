import SensorInstall from './SensorInstall.jsx';

export default function SensorSCTInstall() {
  return (
    <SensorInstall
      sectionLabel="Emplacement · Armoire électrique"
      name="SCT-013 + DHT22"
      image="img/sensors/placement/sct013_placement.png"
      where="La pince SCT-013 est clampée autour d'un câble à l'intérieur de l'armoire. Son signal passe par une résistance de 33 Ω puis par le convertisseur ADS1015 vers le Raspberry Pi (paquet essai). Un second DHT22 mesure la température ambiante de l'armoire."
      whyHere="Ce câble porte le courant tiré par les moteurs : une seule pince suffit à voir l'état électrique global, sans arrêter la production. Le DHT22 de l'armoire surveille l'échauffement de l'électronique."
      accent="var(--green-400)"
    />
  );
}
