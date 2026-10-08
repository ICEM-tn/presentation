import SensorSpec from './SensorSpec.jsx';

export default function SensorDHT() {
  return (
    <SensorSpec
      sectionLabel="Capteur 1/4 · Température"
      name="DHT22"
      measure="Sonde numérique de contact"
      image="img/sensors/dht22.jpg"
      specs={[
        'Température : −40 à +80 °C · précision ±0,5 °C',
        'Humidité relative : 0-100 % · précision ±2 %',
        'Interface single-wire · alimentation 3-5 V',
        'Coût unitaire ≈ 3 €',
      ]}
      why="Le moteur chauffe avant de tomber en panne. Le DHT22 détecte ce signal très tôt. Il est simple, fiable, et peu cher — deux unités par machine restent dans le budget."
      accent="var(--yellow-400)"
    />
  );
}
