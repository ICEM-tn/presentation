# Script oral — soutenance PFE (deck React, 43 slides)

**Étudiant** : Moutia Bensaad — Mastère 2 Systèmes Embarqués et Mobile, ISET Nabeul
**Encadreurs** : Imed Hidri (académique) · Yassine Hammami (société)
**Sujet** : Maintenance prédictive intelligente — Komax Alpha 433 H et Gamma 333 PC
**Cible orale** : ~25 min (43 slides ; contenu ~42 s/slide, dividers 5 s, Cover 45 s, Plan 30 s)

**Règles orales** :
- Français A2/B1, phrases courtes, zéro anglais mixé (sauf IoT, API, ML, JSON)
- Alterner *on / nous / impersonnel* pour éviter le ton IA
- Toujours **Alpha 433 H avant Gamma 333 PC**
- Vocabulaire supervision : *interface opérateur*, *console*, *supervision* — jamais *grafcet, automate, PLC, ladder*
- Chaque notion technique ancrée à Komax en une phrase

---

## 1 — Cover (45 s)

> Bonjour à tous. Je m'appelle Moutia Bensaad, étudiant en Mastère 2 Systèmes Embarqués et Mobile à l'ISET Nabeul. J'ai réalisé ce projet de fin d'études au sein d'ICEM Nabeul, sous l'encadrement académique de Monsieur Imed Hidri et l'encadrement société de Monsieur Yassine Hammami. Mon sujet porte sur une plateforme de **maintenance prédictive intelligente** appliquée à 2 machines de câblage : la Komax Alpha 433 H et la Gamma 333 PC. L'idée : instrumenter ces machines avec des capteurs, remonter les données via une Raspberry Pi, entraîner un modèle qui anticipe les pannes, puis restituer les alertes sur une interface web et mobile. Je vous propose maintenant le plan de la présentation.

---

## 2 — Plan de la présentation (30 s)

> La présentation s'articule en 6 sections. D'abord l'introduction et le contexte industriel chez ICEM. Ensuite l'état de l'art — méthodologie, matériel, briques logicielles. Puis la conception : architecture 5 couches et modélisation UML. Le développement occupe la partie la plus dense — backend, intelligence artificielle, web, mobile, déploiement. Une courte démonstration live suivra. Et nous conclurons sur les résultats mesurés et les perspectives.

---

## 3 — Section 1 · Introduction et contexte (5 s)

> Commençons par le contexte industriel.

---

## 4 — ICEM Nabeul (40 s)

> ICEM est une filiale du groupe Coficab, spécialisée dans la production de faisceaux électriques pour l'industrie automobile. L'usine de Nabeul emploie plusieurs centaines de personnes et produit chaque jour des milliers de sous-ensembles câblés. Le parc machine repose principalement sur des équipements Komax, qui coupent, dénudent et sertissent le fil à grande cadence. Toute panne sur ces machines interrompt une ligne entière et impacte directement le rendement. C'est dans cet environnement que le besoin de maintenance prédictive a émergé. 2 machines concentrent ce besoin.

---

## 5 — Machines Alpha 433 H et Gamma 333 PC (50 s)

> 2 machines sont ciblées par le projet. **La Komax Alpha 433 H** — une machine d'entrée de gamme, 4 postes, cadence moyenne, 6 moteurs pas-à-pas et un cycle en 7 étapes : dévidage, mesure, coupe, dénudage, transfert, sertissage, éjection. **La Gamma 333 PC**, plus haut de gamme — automate compact, unité de sertissage double, entraînement par courroies crantées à tension calibrée. Sur les 2 machines, on retrouve les mêmes zones critiques : la tête de coupe, les courroies, les capteurs de position et l'armoire électrique. Une analyse historique de 1 467 interventions ICEM sur 5 ans nous a permis de hiérarchiser ces zones. Reste à comprendre pourquoi la maintenance actuelle ne suffit pas.

---

## 6 — Problématique (45 s)

> Aujourd'hui, la maintenance chez ICEM est majoritairement **corrective** — on répare après la panne — ou **préventive systématique** — on remplace à intervalle fixe. Les 2 approches présentent des limites : la corrective coûte cher en arrêt de production, la préventive systématique gaspille des pièces encore fonctionnelles. L'objectif de la maintenance prédictive est d'intervenir *au bon moment*, à partir de signaux mesurés en continu. Sans instrumentation, cet objectif est hors d'atteinte. Le projet vise justement à fournir cette instrumentation, la chaîne de traitement associée et les interfaces métier. De ce constat naissent 3 objectifs mesurables.

---

## 7 — Objectifs (40 s)

> Trois objectifs mesurables ont été fixés. Premier : instrumenter les 2 machines avec 4 familles de capteurs — température, vibration, thermique matricielle, courant. Deuxième : construire une chaîne complète de la donnée, du capteur jusqu'à la notification opérateur, en passant par le backend et le microservice d'intelligence artificielle. Troisième : livrer 2 interfaces — une application web pour les responsables de maintenance, une application mobile pour les techniciens sur le terrain. Un microservice de fiabilité complète l'ensemble pour l'aide à la décision d'investissement.

---

## 8 — Section 2 · État de l'art (5 s)

> Passons à l'état de l'art et aux choix technologiques.

---

## 9 — Méthodologie Scrum (35 s)

> Le projet s'étale sur 6 mois, de mars à août 2026. Nous avons adopté la méthodologie **Scrum**, découpée en 6 sprints organisés par cas d'utilisation. Sprint 1 : authentification et gestion des comptes. Sprint 2 : gestion des machines et consultation du parc. Sprint 3 : maintenance et interventions. Sprint 4 : surveillance temps réel et collecte des données capteurs — c'est ce sprint qui a livré la couche capteurs que nous détaillons dans les prochaines slides. Sprint 5 : analyse des pannes, alertes et notifications. Sprint 6 : analyse de fiabilité et recommandation. Chaque sprint est validé par une revue avec l'encadreur et alimente le backlog du sprint suivant. Nous ouvrons donc directement sur le sprint 4 — les 4 types de capteurs choisis, un par un.

---

## 10 — DHT22 · caractéristiques (40 s)

> Le premier capteur est le **DHT22**, une sonde numérique de température à contact. Ses caractéristiques : plage de mesure de **-40 à +80 degrés**, précision de plus ou moins un **demi-degré**, sortie numérique sur un seul fil de données (single-wire, distinct du bus 1-Wire), sans conversion analogique. Il fournit également l'humidité relative en bonus. Son coût unitaire tourne autour de **3 euros**. Pourquoi ce choix ? Le moteur électrique chauffe systématiquement avant de tomber en panne — c'est le premier symptôme d'un roulement fatigué ou d'un bobinage en souffrance. Le DHT22 capte ce signal très tôt, avec une intégration triviale et une robustesse éprouvée.

---

## 11 — MPU-6050 · caractéristiques (40 s)

> Le deuxième capteur est le **MPU-6050**, un accéléromètre 3 axes couplé à un gyroscope 3 axes. Sa plage de mesure est réglable de plus ou moins **2 g à 16 g**, avec une fréquence d'échantillonnage pouvant atteindre un kilohertz. Il communique par bus I²C, sous alimentation 3 à 5 volts. Pourquoi ce composant ? C'est un standard très documenté, avec un excellent rapport qualité-prix — environ 4 euros. Les 3 axes fournissent une signature vibratoire riche, exploitable pour distinguer 2 causes physiques distinctes : une courroie détendue produit un pic basse fréquence, tandis qu'un roulement usé donne une signature harmonique haute fréquence.

---

## 12 — AMG8833 · caractéristiques (45 s)

> Le troisième capteur est l'**AMG8833**, une caméra thermique matricielle sans contact. Elle produit une image de chaleur en **8 par 8 pixels** — soit 64 points de mesure — sur une plage de **-20 à +80 degrés**, avec un champ de vue de **60 degrés par 60 degrés** et un rafraîchissement de 10 hertz. Elle communique par I²C. Pourquoi ce capteur ? 2 raisons : d'abord une vision globale de la zone chaude sans aucun contact mécanique avec les organes en mouvement ; ensuite, sa faible résolution reste largement suffisante pour cartographier les points chauds. C'est une alternative très accessible aux caméras thermiques industrielles type FLIR, dont le prix dépasse aisément 500 euros — l'AMG8833 coûte environ **30 euros**.

---

## 13 — SCT-013 · caractéristiques (45 s)

> Le quatrième capteur est la **pince ampèremétrique SCT-013**, dans sa variante **SCT-013-000**. Ses caractéristiques : plage 0 à 100 ampères alternatif, sortie en courant de 0 à 50 milliampères convertie en tension par une résistance de charge de 33 ohms, précision de plus ou moins **1 %**, et lecture aux fréquences secteur 50 ou 60 hertz. Le signal analogique est numérisé par un convertisseur externe **ADS1015 12 bits**, connecté au Raspberry Pi par I²C. Pourquoi ce choix ? La pince est **non-invasive** — on la clippe simplement autour du câble, sans le couper. Or le courant total de l'armoire reflète l'état mécanique agrégé de tous les moteurs : une surintensité soudaine signale une contrainte cachée, un moteur qui force ou un début de blocage. Ces 4 types de capteurs s'appuient sur une pile logicielle en 3 couches.

---

## 14 — Stack technique (35 s)

> 3 briques logicielles principales. Côté **backend** : Node.js avec Express, MongoDB via Mongoose, authentification JWT. Côté **intelligence artificielle** : Python avec FastAPI, scikit-learn et XGBoost, pour **3 modèles** : Random Forest pour la cause de la panne, XGBoost pour la panne dans les 24 heures, et une régression linéaire pour la fiabilité. Côté **frontend** : React.js pour l'interface web des responsables, Flutter pour l'application mobile des techniciens, et Firebase Cloud Messaging pour les notifications push. L'ensemble est déployé sur le serveur interne d'ICEM, sans exposition cloud. Voyons comment ces briques s'articulent dans une architecture cohérente.

---

## 15 — Section 3 · Conception (5 s)

> Voici la conception architecturale.

---

## 16 — Architecture 5 couches (50 s)

> Notre architecture repose sur **5 couches**, empilées du terrain vers l'utilisateur. **Perception** : les 5 capteurs installés sur la machine — 2 DHT22, un MPU-6050, un AMG8833 et une pince SCT-013. **Edge** : la Raspberry Pi 4, passerelle locale qui lit les capteurs en I²C et GPIO, prétraite les mesures et les envoie au serveur en HTTP POST JSON, toutes les 60 secondes. **Backend** : le serveur Node.js avec Express et MongoDB, qui expose l'API REST, gère l'authentification JWT et stocke toutes les données. **Intelligence** : un microservice FastAPI avec 2 modules — Random Forest et XGBoost pour la maintenance prédictive, régression linéaire pour la fiabilité — appelés par le backend en REST. **Application** : l'interface web React et l'application mobile Flutter, qui reçoivent les alertes en push. Chaque couche a un rôle précis : on peut remplacer un capteur ou ré-entraîner un modèle sans toucher aux autres couches. Zoomons d'abord sur la couche Edge — la Raspberry Pi.

---

## 17 — Passerelle Edge (Raspberry Pi) (40 s)

> La Raspberry Pi joue le rôle de passerelle terrain. Elle centralise les **5 capteurs** : le MPU-6050, l'AMG8833 et le convertisseur ADS1015 de la pince SCT-013 partagent le même bus I2C, et les 2 DHT22 utilisent chacun une broche GPIO dédiée. Un script Python lit les capteurs toutes les 60 secondes, calcule les indicateurs utiles — par exemple la valeur efficace du courant — et envoie chaque mesure en JSON par HTTP POST vers l'API, avec une clé d'authentification IoT. Si un envoi échoue, le script réessaie automatiquement avec un délai croissant. Un service systemd relance le script au démarrage ou en cas d'arrêt. Voyons maintenant où chacun de ces capteurs prend physiquement place sur la machine.

---

## 18 — DHT22 · emplacement (35 s)

> Voici où le **DHT22** est installé sur la machine. On le voit ici, fixé sur le corps du **servomoteur**, en contact direct avec le carter métallique. Pourquoi cette position ? Parce que le moteur chauffe avant tout autre composant en cas de problème mécanique — roulement fatigué, sur-effort, défaut de lubrification. Un contact direct donne une lecture rapide, non atténuée par l'air, ce qui maximise la sensibilité aux dérives précoces.

---

## 19 — MPU-6050 · emplacement (35 s)

> Voici où le **MPU-6050** est installé. On le voit ici, collé directement sur le carter métallique à proximité immédiate de la **tête de coupe** — la pièce la plus sollicitée mécaniquement. Pourquoi ce placement au contact ? Parce que le signal de vibration s'atténue extrêmement vite dans l'air, dans une gaine ou dans un support flexible. Un contact rigide sur la pièce vibrante fournit un signal propre, non atténué, riche en harmoniques — indispensable pour distinguer les signatures d'usure des différents éléments mécaniques.

---

## 20 — AMG8833 · emplacement (40 s)

> Voici où l'**AMG8833** est installée. On la voit ici, fixée en hauteur sur le châssis de la machine, à environ **50 centimètres**, en vue plongeante sur la **tête de coupe** et la **zone Gommino**. Pourquoi cette position ? Son champ de 60 degrés par 60 degrés couvre la totalité de la zone chaude critique, avec une résolution de l'ordre de 6 centimètres par pixel. On surveille ainsi conjointement les composants les plus exposés à l'échauffement — le Gommino et le carter de la tête de coupe — sans aucune intrusion mécanique sur les organes en mouvement.

---

## 21 — Armoire électrique · SCT-013 + DHT22 (40 s)

> Voici l'**armoire électrique**. On y voit 2 capteurs. D'abord la **pince SCT-013** — la pince bleue — clampée autour d'un câble. Ensuite un **second DHT22**, qui mesure la température ambiante de l'armoire. Le signal, converti en tension par une résistance de charge de 33 ohms, est ramené au Raspberry Pi, visible dans le paquet essai en bas, via le convertisseur **ADS1015 12 bits** posé sur la breadboard. Pourquoi cette position ? Parce que ce câble porte le courant tiré par les moteurs — une seule pince suffit à obtenir une vision agrégée de l'état électrique. Comme la mesure est non-invasive, la pose et le retrait se font sans interruption de production. Le DHT22, lui, surveille l'échauffement de l'électronique de l'armoire. La couche physique posée, passons à la modélisation logicielle du système.

---

## 22 — Diagramme de cas d'utilisation (25 s)

> Le **diagramme de cas d'utilisation** montre **6 acteurs** et **12 cas d'utilisation**. 3 acteurs humains : le responsable maintenance, le chef de ligne et le technicien. 3 acteurs système : l'IA maintenance, l'IA analyse de fiabilité et l'IoT. Chaque action humaine passe d'abord par l'**authentification**. Ces cas d'utilisation s'appuient sur 9 classes.

---

## 23 — Diagramme de classes (25 s)

> Le **diagramme de classes** contient **9 classes** en 3 groupes. Le métier : utilisateur, ligne, machine, maintenance et alerte. L'IoT : capteur et Raspberry Pi. L'IA : analyse des pannes et analyse de fiabilité. Une seule classe Maintenance porte un **type** à 5 valeurs, au lieu de 5 classes séparées. Ces classes s'enchaînent dans un pipeline temps réel.

---

## 24 — Pipeline de données temps réel (45 s)

> Le pipeline temps réel enchaîne 5 étapes, sans aucune action humaine. **1** — la Raspberry Pi lit les capteurs toutes les 10 à 60 secondes et envoie un JSON au backend. **2** — le backend enregistre la mesure dans MongoDB. **3** — toutes les 5 minutes, il envoie à l'IA les mesures des **2 dernières heures**. **4** — FastAPI renvoie la probabilité de panne dans les 24 heures et la cause probable. **5** — à **60 %**, une alerte ; à **80 %**, une alerte critique, une intervention prédictive en attente et une notification push. L'inférence prend moins de 70 millisecondes.

---

## 25 — Section 4 · Développement (5 s)

> Nous entrons dans la partie développement, la plus dense.

---

## 26 — Backend Express + MongoDB (45 s)

> Le backend expose une API REST avec Node.js et Express. MongoDB stocke 9 collections principales — les mêmes que le diagramme de classes : utilisateurs, lignes, machines, maintenances, alertes, capteurs, Raspberry Pi, analyses IA et analyses de fiabilité — plus les checklists et le planning. L'authentification repose sur JWT avec 3 rôles : responsable, chef de ligne, technicien. Côté API, un middleware vérifie le rôle sur chaque route. Côté interface, un fichier de permissions unique masque les pages et les boutons selon le rôle. La Raspberry Pi, elle, s'authentifie par une clé d'API dédiée. Les controllers utilisent un pattern *asyncHandler* pour propager proprement les erreurs. Le seed script initialise la base avec des machines, utilisateurs et checklists de démonstration. Toutes les 5 minutes, le backend envoie au microservice IA les mesures des 2 dernières heures.

---

## 27 — Microservice IA FastAPI (45 s)

> Le microservice IA est en Python, avec FastAPI. Il porte **3 modèles**. Le **Random Forest** répond à « pourquoi ? » : la cause parmi 5. Le **XGBoost** répond à « quand ? » : la probabilité de panne dans les 24 heures. La **régression linéaire** projette la fiabilité sur 3 mois. Les 2 premiers lisent uniquement les mesures des capteurs. Reste à savoir sur quoi ils ont été entraînés.

---

## 28 — Dataset d'entraînement (35 s)

> Tout part de l'historique ICEM : **1 467 interventions**, surtout en 2022. Seul, il ne suffit pas : un modèle entraîné dessus n'atteint que **0,15** de F1, car il n'y a aucune mesure physique. Mais il nous apprend où placer les capteurs, les horaires de travail et la durée des arrêts. À partir de là, on a généré **112 680 mesures** : 12 mois, 2 machines, **69 pannes**. Pour tester, on coupe **par semaines**, jamais au hasard.

---

## 29 — Causes suivies (30 s)

> Le modèle suit **5 causes** : celles qu'un capteur voit vraiment. La **vibration** : usure mécanique et courroie détendue. La **chaleur moteur** : ventilation encrassée et surcharge, qui fait aussi monter le courant. La **chaleur de l'armoire** : un ventilateur ou un filtre en panne. Les autres pannes, comme une casse ou un réglage, restent signalées par l'IHM Komax.

---

## 30 — Performances Random Forest (35 s)

> Le Random Forest atteint **0,85** de F1 macro et **0,96** d'accuracy. La meilleure cause est la surchauffe armoire, à **0,95** : elle est la seule à chauffer l'armoire. La plus difficile est l'usure, à **0,67**, car elle monte lentement. Quand le modèle annonce une cause, il a raison dans **80 à 99 %** des cas. Voyons les erreurs.

---

## 31 — Matrice de confusion (35 s)

> Sur l'axe vertical, la **cause réelle**. Sur l'axe horizontal, la **cause prédite** par le modèle. Chaque case donne la part des cas réels de la ligne. La **diagonale** foncée, ce sont les bonnes réponses : par exemple **0,92** pour la surchauffe armoire. L'erreur principale est dans la colonne **« Normal »** : **0,39** pour l'usure, car au début la panne est encore trop faible. Autre point : **0,16** de courroie lue comme usure, car les 2 font vibrer. Passons au XGBoost.

---

## 32 — XGBoost · panne dans 24 h (40 s)

> À gauche, la **courbe ROC**. En x, le taux de **fausses alertes**. En y, le taux de **pannes détectées**. La courbe monte vite vers le coin en haut à gauche : beaucoup de pannes détectées, peu de fausses alertes. La ligne pointillée, c'est le hasard. L'aire sous la courbe donne l'**AUC : 0,94**. À droite, en x la **probabilité prédite**, en y la densité. Le bleu, pas de panne, reste près de 0. L'orange, panne dans 24 h, monte près de 1. Les 2 traits pointillés sont nos seuils : **60 %** alerte, **80 %** intervention prédictive. Résultat : **69 pannes sur 69** annoncées, **19,5 heures** avant en médiane. Ces prédictions arrivent ensuite sur le web.

---

## 33 — Fonctionnalités web (30 s)

> L'application web sert les 3 profils : responsable maintenance, chef de ligne et technicien. Elle a 6 modules. Le tableau de bord montre MTBF, MTTR et disponibilité. La page Équipements affiche les 13 machines et leurs capteurs en direct. Les interventions ont un bouton « Diagnostiquer avec l'IA ». Viennent ensuite la maintenance préventive, le suivi journalier FOR MAI 52, puis la fiabilité avec son rapport PDF et les alertes. Voici quelques écrans.

---

## 34 — Web · exemples d'écrans (30 s)

> Voici les écrans réels, vus par le responsable maintenance. Le tableau de bord résume les équipements, les interventions et la disponibilité. La fiche d'une machine affiche ses 4 capteurs en direct, rafraîchis toutes les 30 secondes. Les interventions sont classées en préventive, corrective et prédictive. La page Alertes montre les prédictions de l'IA : probabilité de panne et cause suggérée. Enfin, Analyses donne MTBF, MTTR et disponibilité. Passons au mobile.

---

## 35 — Fonctionnalités mobile (30 s)

> L'application mobile Flutter sert le technicien et le chef de ligne, au pied de la machine. Elle reprend les modules clés du web. On y gère les interventions, avec photos avant et après. Le bouton « Diagnostiquer avec l'IA » marche aussi sur mobile. Le suivi journalier et les checklists préventives se remplissent sur le téléphone, avec une photo pour chaque contrôle. Enfin, Firebase envoie une notification push pour chaque alerte critique ou intervention assignée. Voici les écrans.

---

## 36 — Mobile · exemples d'écrans (30 s)

> Voici les écrans réels sur Android. Le tableau de bord reprend les indicateurs du web. Les interventions s'affichent en cartes, avec leur type et leur état ; le responsable approuve celles en attente. Sur une intervention, le bouton « Diagnostiquer avec l'IA » donne la cause probable, la confiance et les 4 capteurs lus. Enfin, l'écran Alertes reçoit les notifications push, triées par criticité. Reste un module transverse : l'analyse de fiabilité.

---

## 37 — Analyse de fiabilité (30 s)

> Le module de fiabilité aide à décider : garder une machine ou la renouveler. Pour chaque machine, il calcule MTBF, MTTR, disponibilité et nombre de pannes. Une régression linéaire projette la disponibilité sur 3 mois. Le backend en fait un rapport PDF, avec une recommandation : maintenir, surveiller, planifier le remplacement ou remplacer. Ici, la Gamma 333 : 99,2 % de disponibilité, recommandation « surveiller ». Pas de coûts en dinars : ils demandent la validation de la direction financière. Tout cela tourne sur une infrastructure locale.

---

## 38 — Déploiement (30 s)

> Tout est déployé sur le **serveur interne d'ICEM**. Un Windows Server héberge le backend, l'application web et la base MongoDB. Le backend tourne comme service Windows avec NSSM ; le web est publié sous IIS. MongoDB n'écoute que le réseau interne. Le Raspberry Pi et les téléphones passent par le Wi-Fi d'usine ; le mobile est installé par APK. Seules les notifications Firebase sortent du réseau. Les données de production restent donc chez ICEM. Passons à la démonstration.

---

## 39 — Section 5 · Démonstration (5 s)

> Passons à la démonstration live.

---

## 40 — KPI et résultats (30 s)

> En chiffres : une architecture en 5 couches, de la perception à l'application. 5 capteurs par machine. **3 modèles** d'apprentissage ; le XGBoost annonce **69 pannes sur 69**, environ 20 heures avant. 2 applications sur la même API, testée par plus de **120 requêtes** Postman. Les 3 objectifs sont atteints : instrumenter, prédire, restituer. Ces chiffres nous amènent à la conclusion.

---

## 41 — Conclusion (30 s)

> En conclusion, nous livrons un **prototype opérationnel** sur 3 axes. **1** — instrumenter : 5 capteurs par machine, une analyse toutes les 5 minutes. **2** — prédire : le Random Forest trouve la cause parmi 5 avec **0,85** de F1, le XGBoost annonce la panne dans les 24 heures ; au-delà de 80 %, une maintenance prédictive est créée automatiquement. **3** — restituer : web et mobile sur la même API, notifications push, rapport de fiabilité, le tout déployé chez ICEM. Place aux perspectives.

---

## 42 — Perspectives (30 s)

> Première étape : ré-entraîner les modèles avec les vraies mesures des capteurs. Ensuite, 4 pistes. **1** — l'Edge AI : faire tourner XGBoost sur le Raspberry Pi, même sans réseau. **2** — l'intégration HMI : lire les alarmes de la machine Komax et les croiser avec notre diagnostic. **3** — la vision industrielle : une caméra et un réseau CNN pour les défauts de sertissage. **4** — la maintenance prescriptive : proposer l'action, les pièces et le bon créneau.

---

## 43 — Merci (30 s)

> Je vous remercie pour votre attention. Je remercie également Monsieur Imed Hidri pour son encadrement académique, Monsieur Yassine Hammami pour son encadrement société, ainsi que l'équipe ICEM Nabeul qui m'a accueilli pendant ces 6 mois. Je suis à votre disposition pour toutes vos questions.

---

## Timing global

| Bloc | Slides | Durée |
|---|---|---|
| Cover + Plan | 2 | 1 min 15 |
| Section 1 (Intro + contexte) | 5 | 3 min 20 |
| Section 2 (État de l'art) | 6 | 4 min 05 |
| Section 3 (Conception) | 10 | 5 min 15 |
| Section 4 (Développement) | 14 | 9 min 15 |
| Section 5 (Démo) | 1 | 5 s (+ démo live hors chrono) |
| Section 6 (Résultats + conclusion) | 5 | 2 min 40 |
| **Total oral** | **43** | **~25 min** |

> Réserve 3–5 min de démo live entre Section 5 et KPI selon le temps restant.
