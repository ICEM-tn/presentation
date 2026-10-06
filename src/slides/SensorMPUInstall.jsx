import SensorInstall from './SensorInstall.jsx';

export default function SensorMPUInstall() {
  return (
    <SensorInstall
      sectionLabel="Emplacement · MPU-6050"
      name="MPU-6050"
      image="img/sensors/placement/mpu6050_placement.png"
      where="Collé directement sur le carter métallique, à proximité immédiate de la tête de coupe."
      whyHere="Le signal de vibration se perd très vite dans l'air ou dans une gaine. Un contact direct sur la pièce vibrante donne un signal propre, sans atténuation. On capte ainsi la vraie signature de la mécanique."
      accent="var(--cyan-400)"
    />
  );
}
