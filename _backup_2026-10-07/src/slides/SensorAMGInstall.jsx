import SensorInstall from './SensorInstall.jsx';

export default function SensorAMGInstall() {
  return (
    <SensorInstall
      sectionLabel="Emplacement · AMG8833"
      name="AMG8833"
      image="img/sensors/placement/amg8833_placement.png"
      where="Fixée en hauteur sur le châssis de la machine, à environ 50 cm, en vue plongeante sur la tête de coupe et la zone Gommino."
      whyHere="Son champ de 60° × 60° couvre toute la zone chaude critique, environ 6 cm par pixel. Elle surveille le Gommino et le carter de la tête de coupe sans toucher aux pièces en mouvement."
      accent="var(--orange-400)"
    />
  );
}
