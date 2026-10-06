import SensorSpec from './SensorSpec.jsx';

export default function SensorMPU() {
  return (
    <SensorSpec
      sectionLabel="Capteur 2/4 · Vibrations"
      name="MPU-6050"
      measure="Accéléromètre + gyroscope 3 axes"
      image="img/sensors/mpu6050.jpg"
      specs={[
        'Accéléromètre : ±2 g à ±16 g (plage réglable)',
        'Gyroscope : ±250 à ±2000 °/s',
        'Interface I²C · fréquence jusqu’à 1 kHz',
        'Alimentation 3-5 V · coût ≈ 4 €',
      ]}
      why="Composant standard, très documenté. Les trois axes donnent une signature vibratoire riche. On peut ainsi distinguer une courroie détendue d'un roulement usé — deux causes physiques différentes."
      accent="var(--cyan-400)"
    />
  );
}
