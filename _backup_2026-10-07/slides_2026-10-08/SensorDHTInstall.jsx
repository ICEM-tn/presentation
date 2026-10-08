import SensorInstall from './SensorInstall.jsx';

export default function SensorDHTInstall() {
  return (
    <SensorInstall
      sectionLabel="Emplacement · DHT22"
      name="DHT22"
      image="img/sensors/placement/dht22_placement.png"
      where="Fixé sur le corps du servomoteur, contre le métal. Un second DHT22 est placé à l'intérieur de l'armoire électrique pour la température ambiante."
      whyHere="Le moteur chauffe avant de tomber en panne. Un contact direct sur le carter donne une lecture rapide et fiable — c'est le premier signal utile pour anticiper un roulement fatigué."
      accent="var(--yellow-400)"
      imageMaxHeight={480}
    />
  );
}
