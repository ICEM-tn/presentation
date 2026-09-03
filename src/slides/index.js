import Cover from './01_Cover.jsx';
import Plan from './02_Plan.jsx';

// Section 1 — Introduction et contexte
import SectionDivider_Intro from './SectionDivider_Intro.jsx';
import ICEM from './03_ICEM.jsx';
import Machines from './05_Machines.jsx';
import Probleme from './04_Probleme.jsx';
import Objectif from './06_Objectif.jsx';

// Section 2 — État de l'art
import SectionDivider_Etat from './SectionDivider_Etat.jsx';
import Scrum from './Scrum.jsx';
import Capteurs from './08_Capteurs.jsx';
import Stack from './Stack.jsx';

// Section 3 — Conception
import SectionDivider_Conception from './SectionDivider_Conception.jsx';
import Architecture from './07_Architecture.jsx';
import Edge from './09_Edge.jsx';
import UML from './UML.jsx';
import Pipeline from './17_Pipeline.jsx';

// Section 4 — Développement
import SectionDivider_Dev from './SectionDivider_Dev.jsx';
import Backend from './10_Backend.jsx';
import IA from './11_IA.jsx';
import Dataset from './13_Dataset.jsx';
import Causes from './14_Causes.jsx';
import F1 from './15_F1.jsx';
import Confusion from './16_Confusion.jsx';
import Web_Fonctionnalites from './Web_Fonctionnalites.jsx';
import Web from './18_Web.jsx';
import Mobile_Fonctionnalites from './Mobile_Fonctionnalites.jsx';
import Mobile from './19_Mobile.jsx';
import Fiabilite from './20_Fiabilite.jsx';
import Deploiement from './Deploiement.jsx';

// Section 5 — Démonstration
import SectionDivider_Demo from './SectionDivider_Demo.jsx';

// Section 6 — Résultats et conclusion
import KPIs from './21_KPIs.jsx';
import Perspectives from './22_Perspectives.jsx';
import Merci from './23_Merci.jsx';

export const slides = [
  // Front matter
  { id: 'cover', component: Cover },
  { id: 'plan', component: Plan },

  // Section 1 — Introduction et contexte
  { id: 'section_intro', component: SectionDivider_Intro },
  { id: 'icem', component: ICEM },
  { id: 'machines', component: Machines },
  { id: 'probleme', component: Probleme },
  { id: 'objectif', component: Objectif },

  // Section 2 — État de l'art
  { id: 'section_etat', component: SectionDivider_Etat },
  { id: 'scrum', component: Scrum },
  { id: 'capteurs', component: Capteurs },
  { id: 'stack', component: Stack },

  // Section 3 — Conception
  { id: 'section_conception', component: SectionDivider_Conception },
  { id: 'architecture', component: Architecture },
  { id: 'edge', component: Edge },
  { id: 'uml', component: UML },
  { id: 'pipeline', component: Pipeline },

  // Section 4 — Développement
  { id: 'section_dev', component: SectionDivider_Dev },
  { id: 'backend', component: Backend },
  { id: 'ia', component: IA },
  { id: 'dataset', component: Dataset },
  { id: 'causes', component: Causes },
  { id: 'f1', component: F1 },
  { id: 'confusion', component: Confusion },
  { id: 'web_fonc', component: Web_Fonctionnalites },
  { id: 'web_exemples', component: Web },
  { id: 'mobile_fonc', component: Mobile_Fonctionnalites },
  { id: 'mobile_exemples', component: Mobile },
  { id: 'fiabilite', component: Fiabilite },
  { id: 'deploiement', component: Deploiement },

  // Section 5 — Démonstration
  { id: 'section_demo', component: SectionDivider_Demo },

  // Section 6 — Résultats et conclusion
  { id: 'kpis', component: KPIs },
  { id: 'perspectives', component: Perspectives },
  { id: 'merci', component: Merci },
];
