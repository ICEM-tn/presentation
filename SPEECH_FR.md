# Script oral — soutenance PFE (deck React, 33 slides)

**Étudiant** : Moutia Bensaad — Mastère 2 Systèmes Embarqués et Mobile, ISET Nabeul
**Encadreurs** : Imed Hidri (académique) · Yassine Hammami (société)
**Sujet** : Maintenance prédictive intelligente — Komax Alpha 433 H et Gamma 333 PC
**Cible orale** : ~20 min (33 slides ; contenu ~42 s/slide, dividers 5 s, Cover 45 s, Plan 30 s)

**Règles orales** :
- Français A2/B1, phrases courtes, zéro anglais mixé (sauf IoT, API, ML, JSON)
- Alterner *on / nous / impersonnel* pour éviter le ton IA
- Toujours **Alpha 433 H avant Gamma 333 PC**
- Vocabulaire supervision : *interface opérateur*, *console*, *supervision* — jamais *grafcet, automate, PLC, ladder*
- Chaque notion technique ancrée à Komax en une phrase

---

## 1 — Cover (45 s)

> Bonjour à tous. Je m'appelle Moutia Bensaad, étudiant en Mastère 2 Systèmes Embarqués et Mobile à l'ISET Nabeul. J'ai réalisé ce projet de fin d'études au sein d'ICEM Nabeul, sous l'encadrement académique de Monsieur Imed Hidri et l'encadrement société de Monsieur Yassine Hammami. Mon sujet porte sur une plateforme de **maintenance prédictive intelligente** appliquée à deux machines de câblage : la Komax Alpha 433 H et la Gamma 333 PC. L'idée : instrumenter ces machines avec des capteurs, remonter les données via une Raspberry Pi, entraîner un modèle qui anticipe les pannes, puis restituer les alertes sur une interface web et mobile. Je vous propose maintenant le plan de la présentation.

---

## 2 — Plan de la présentation (30 s)

> La présentation s'articule en six sections. D'abord l'introduction et le contexte industriel chez ICEM. Ensuite l'état de l'art — méthodologie, matériel, briques logicielles. Puis la conception : architecture cinq couches et modélisation UML. Le développement occupe la partie la plus dense — backend, intelligence artificielle, web, mobile, déploiement. Une courte démonstration live suivra. Et nous conclurons sur les résultats mesurés et les perspectives.

---

## 3 — Section 1 · Introduction et contexte (5 s)

> Commençons par le contexte industriel.

---

## 4 — ICEM Nabeul (40 s)

> ICEM est une filiale du groupe Coficab, spécialisée dans la production de faisceaux électriques pour l'industrie automobile. L'usine de Nabeul emploie plusieurs centaines de personnes et produit chaque jour des milliers de sous-ensembles câblés. Le parc machine repose principalement sur des équipements Komax, qui coupent, dénudent et sertissent le fil à grande cadence. Toute panne sur ces machines interrompt une ligne entière et impacte directement le rendement. C'est dans cet environnement que le besoin de maintenance prédictive a émergé.

---

## 5 — Machines Alpha 433 H et Gamma 333 PC (50 s)

> Deux machines sont ciblées par le projet. **La Komax Alpha 433 H** — une machine d'entrée de gamme, quatre postes, cadence moyenne, six moteurs pas-à-pas et un cycle en sept étapes : dévidage, mesure, coupe, dénudage, transfert, sertissage, éjection. **La Gamma 333 PC**, plus haut de gamme — automate compact, unité de sertissage double, entraînement par courroies crantées à tension calibrée. Sur les deux machines, on retrouve les mêmes zones critiques : la tête de coupe, les courroies, les capteurs de position et l'armoire électrique. Une analyse historique de mille cent soixante pannes ICEM nous a permis de hiérarchiser ces zones.

---

## 6 — Problématique (45 s)

> Aujourd'hui, la maintenance chez ICEM est majoritairement **corrective** — on répare après la panne — ou **préventive systématique** — on remplace à intervalle fixe. Les deux approches présentent des limites : la corrective coûte cher en arrêt de production, la préventive systématique gaspille des pièces encore fonctionnelles. L'objectif de la maintenance prédictive est d'intervenir *au bon moment*, à partir de signaux mesurés en continu. Sans instrumentation, cet objectif est hors d'atteinte. Le projet vise justement à fournir cette instrumentation, la chaîne de traitement associée et les interfaces métier.

---

## 7 — Objectifs (40 s)

> Trois objectifs mesurables ont été fixés. Premier : instrumenter les deux machines avec quatre familles de capteurs — température, vibration, thermique matricielle, courant. Deuxième : construire une chaîne complète de la donnée, du capteur jusqu'à la notification opérateur, en passant par le backend et le microservice d'intelligence artificielle. Troisième : livrer deux interfaces — une application web pour les responsables de maintenance, une application mobile pour les techniciens sur le terrain. Un microservice de fiabilité complète l'ensemble pour l'aide à la décision d'investissement.

---

## 8 — Section 2 · État de l'art (5 s)

> Passons à l'état de l'art et aux choix technologiques.

---

## 9 — Méthodologie Scrum (35 s)

> Le projet s'étale sur six mois d'avril à septembre. Nous avons adopté la méthodologie **Scrum**, découpée en six sprints de trois à quatre semaines. Chaque sprint livre un incrément fonctionnel : sprint 1 la modélisation, sprint 2 le backend, sprint 3 l'IA, sprint 4 le web, sprint 5 le mobile, sprint 6 l'intégration IoT. Une revue en fin de sprint valide la production et alimente le backlog du sprint suivant. Cette itération courte a permis de réagir aux découvertes terrain — notamment sur le choix des capteurs.

---

## 10 — Capteurs et instrumentation (55 s)

> Quatre familles de capteurs équipent chaque machine. Le **DS18B20** — température numérique, précision d'un demi-degré — placé au contact du moteur M6 sur la Alpha et du moteur E117 sur la Gamma pour surveiller l'échauffement de roulement. Le **MPU-6050** — accéléromètre trois axes plus gyroscope — fixé sur le châssis près de la tête de coupe pour détecter l'usure des courroies et le désalignement lame. La **caméra thermique AMG8833** — matrice huit sur huit, champ soixante degrés — installée au-dessus de la machine pour cartographier les points chauds, en particulier le Gommino de la Gamma. Enfin la **pince SCT-013** — soixante ampères sortie tension — clampée sur l'alimentation principale de l'armoire, connectée via un convertisseur ADS1015 douze bits. Cette combinaison couvre les zones de panne les plus coûteuses identifiées dans l'historique ICEM.

---

## 11 — Stack technique (35 s)

> Trois briques logicielles principales. Côté **backend** : Node.js avec Express, MongoDB via Mongoose, authentification JWT. Côté **intelligence artificielle** : Python avec FastAPI, scikit-learn pour les modèles Random Forest, XGBoost pour la classification fine des causes. Côté **frontend** : React.js pour l'interface web des responsables, Flutter pour l'application mobile des techniciens, et Firebase Cloud Messaging pour les notifications push. Cette pile est déployée en production sur Render pour le backend et l'IA.

---

## 12 — Section 3 · Conception (5 s)

> Voici la conception architecturale.

---

## 13 — Architecture cinq couches (50 s)

> L'écosystème repose sur cinq couches conceptuelles empilées. **Perception** — les capteurs physiques et leurs signaux bruts. **Acquisition** — la Raspberry Pi qui échantillonne, filtre et met en forme. **Transport** — le réseau HTTPS qui achemine les mesures vers le serveur central. **Traitement** — le backend Node.js et le microservice FastAPI qui persistent, classifient et prédisent. **Application** — les interfaces web et mobile qui restituent l'information au bon acteur. Ce découpage isole les responsabilités et facilite la maintenance future : on peut remplacer un capteur, changer d'orchestrateur ou faire évoluer l'IA sans impacter les autres couches.

---

## 14 — Passerelle Edge (Raspberry Pi) (40 s)

> La Raspberry Pi joue le rôle de passerelle terrain. Elle centralise les quatre capteurs via un bus I2C partagé — MPU-6050, AMG8833, ADS1015 — et un fil dédié pour le DS18B20 en OneWire. Un script Python cadencé lit chaque capteur, calcule les indicateurs (RMS courant, delta température, magnitude vibration) et envoie une trame JSON toutes les cinq secondes vers l'API. Un service systemd assure le redémarrage automatique. En cas de coupure réseau, les mesures sont mises en cache localement puis rejouées à la reconnexion.

---

## 15 — Modélisation UML (45 s)

> Deux diagrammes structurent la modélisation. Le **diagramme de cas d'utilisation** identifie six acteurs — Responsable Maintenance, Chef de Ligne, Technicien, plus trois acteurs système : IoT, IA, notification — et une quinzaine de cas fonctionnels : gestion des machines, planification préventive, interventions correctives, supervision temps réel, classification de pannes, rapports de fiabilité. Le **diagramme de classes** modélise cinq entités principales : Machine, Utilisateur, Intervention, Alerte, Capteur. La classe Maintenance porte un type énuméré qui distingue préventif, correctif et prédictif — plutôt que trois classes séparées, ce qui simplifie les requêtes.

---

## 16 — Pipeline de données temps réel (45 s)

> Le pipeline temps réel enchaîne cinq étapes déterministes. Un — la Raspberry Pi publie un JSON toutes les cinq secondes sur l'endpoint capteurs. Deux — le backend valide le payload, l'associe à la machine cible et le persiste dans MongoDB. Trois — un service applicatif transmet automatiquement la mesure au microservice IA. Quatre — FastAPI renvoie la probabilité de panne, le type détecté et la cause probable. Cinq — si la probabilité dépasse quatre-vingts pour cent, une maintenance prédictive est créée automatiquement et une notification est poussée vers les techniciens concernés. L'ensemble tient dans une latence inférieure à la seconde.

---

## 17 — Section 4 · Développement (5 s)

> Nous entrons dans la partie développement, la plus dense.

---

## 18 — Backend Express + MongoDB (45 s)

> Le backend expose une API REST organisée en huit ressources principales : machines, utilisateurs, interventions, alertes, capteurs, maintenances, checklists et analyses de fiabilité. L'authentification repose sur JWT avec trois rôles : responsable, chef de ligne, technicien. Un middleware centralise le contrôle d'accès à partir d'un fichier de permissions unique — la même règle protège l'API et l'interface. Les controllers utilisent un pattern *asyncHandler* pour propager proprement les erreurs. Le seed script initialise la base avec des machines, utilisateurs et checklists de démonstration.

---

## 18-bis — Microservice IA FastAPI (45 s)

> Le microservice IA est écrit en Python avec FastAPI. Il expose quatre endpoints : prédiction du type de panne, classification de la cause probable, probabilité de défaillance à horizon court, prévision de fiabilité. Deux modèles sont embarqués : un Random Forest pour la classification de causes physiques, un XGBoost pour la probabilité fine. Un troisième modèle — régression linéaire — alimente le calcul de fiabilité prévisionnelle. Le backend appelle ce microservice à chaque ingestion de mesure, sans blocage de la Raspberry Pi.

---

## 19 — Dataset d'entraînement (50 s)

> Faute de déploiement matériel à l'échelle, le dataset d'entraînement est **synthétique et ancré sur des signaux réels**. Nous avons généré soixante-quatre mille huit cents lectures à partir d'un script paramétrique, calibré sur les fiches techniques Komax, les manuels moteur et surtout **l'historique réel de mille cent soixante pannes ICEM**. Chaque profil de défaut respecte la signature physique attendue — par exemple un delta température de plus quatre à huit degrés pour l'usure de roulement, une surcharge courant de six ampères sur une panne générale multi-moteurs. Ce jeu est ensuite rejouable tel quel lorsque les capteurs physiques seront installés.

---

## 20 — Taxonomie de causes (45 s)

> La classification distingue treize causes physiques codées C01 à C13 : usure moteur, désalignement lame, courroie détendue, contamination Gommino, surintensité armoire, échauffement carte, capteur défaillant, obstruction mécanique, défaut alimentation, dérive calibration, blocage éjection, défaut communication, non-signature. Cette taxonomie remplace un premier étiquetage par zones — désormais le modèle ne duplique plus la sortie de l'interface opérateur et fournit une information réellement complémentaire au diagnostic humain.

---

## 21 — Performances F1 (50 s)

> Deux modèles sont évalués sur le même jeu de test. Le **Random Forest** — modèle de référence — atteint un F1 macro de **zéro virgule quarante-cinq**, correct sur les classes majoritaires mais faible sur les causes rares. Le **XGBoost** — modèle final retenu — atteint un F1 macro de **zéro virgule quatre-vingt-treize**, avec une précision supérieure à quatre-vingt-dix pour cent sur onze des treize causes. Le gain vient du gradient boosting, plus adapté aux distributions déséquilibrées, combiné à un ré-échantillonnage SMOTE ciblé sur les classes minoritaires. Ces résultats valident l'architecture ; le modèle sera ré-entraîné sur données réelles après installation physique.

---

## 22 — Matrice de confusion (35 s)

> La matrice de confusion du XGBoost montre une diagonale dominante — la majorité des prédictions tombent sur la bonne classe. Les confusions résiduelles concernent principalement deux paires de causes physiquement proches : usure moteur avec échauffement carte — les deux produisent une signature thermique — et courroie détendue avec désalignement lame — les deux produisent une signature vibratoire. Ces confusions sont attendues et acceptables ; l'intervention corrective couvre souvent les deux hypothèses en même temps.

---

## 23 — Fonctionnalités web (45 s)

> L'application web s'adresse principalement au responsable de maintenance. Six modules la structurent. Un tableau de bord temps réel avec les indicateurs MTBF et MTTR par machine. Une gestion complète des machines et de leur historique. Un module d'interventions avec workflow d'assignation. Un planning préventif calendaire. Un centre d'alertes avec filtrage et acquittement. Un module de fiabilité prévisionnelle avec génération de rapport PDF. L'ensemble respecte le référentiel de permissions unique côté backend.

---

## 24 — Web · exemples d'écrans (40 s)

> Voici quelques écrans clés. Le tableau de bord présente les KPI par machine avec code couleur — vert nominal, orange dégradé, rouge critique. Le détail machine agrège son historique, sa checklist préventive en cours et ses interventions passées. L'écran interventions liste chaque événement avec un badge IA quand la maintenance a été créée automatiquement par le modèle. Le module fiabilité génère un PDF signé prêt à archiver.

---

## 25 — Fonctionnalités mobile (40 s)

> L'application mobile Flutter s'adresse au technicien terrain et au chef de ligne. Cinq écrans principaux : tableau de bord synthétique, liste des machines assignées, interventions en cours avec photos avant-après, alertes push en temps réel via Firebase Cloud Messaging, profil utilisateur. La contrainte forte : chaque preuve photographique doit être prise depuis la caméra native — pas de galerie — pour garantir la traçabilité de l'intervention.

---

## 26 — Mobile · exemples d'écrans (40 s)

> Voici les écrans mobile. La liste d'interventions présente chaque tâche avec priorité et machine associée. L'écran détail permet de saisir un état, joindre deux photos — avant et après — et signer la clôture. Les alertes remontent instantanément avec vibration et son distinctif. La checklist préventive quotidienne — sous forme de grille par équipement — verrouille automatiquement chaque ligne après commit pour éviter les modifications concurrentes.

---

## 27 — Analyse de fiabilité (40 s)

> Le module de fiabilité aide à la décision d'investissement. Il agrège pour chaque machine : nombre de pannes sur période, temps moyen entre pannes, taux de disponibilité, projection à trois mois via régression linéaire. Un rapport PDF est généré côté serveur et téléchargeable depuis le web comme depuis le mobile. La recommandation finale — conserver, surveiller, remplacer — repose sur la disponibilité et le nombre de pannes, sans intégrer de dimension monétaire par choix méthodologique.

---

## 28 — Déploiement (35 s)

> Le backend Express et le microservice FastAPI sont déployés sur **Render** — plateforme cloud gérée. La base MongoDB tourne sur MongoDB Atlas, cluster gratuit région Europe. Les processus sont supervisés par PM2 en local pour le développement, par Render pour la production. Un endpoint `/health` permet la vérification externe. Le mobile Flutter est distribué en APK signé, l'application web est livrée en build statique servi par Nginx.

---

## 29 — Section 5 · Démonstration (5 s)

> Passons à la démonstration live.

---

## 30 — KPI et résultats (45 s)

> Récapitulatif chiffré. Cinq capteurs par machine, quatre familles de mesure. Soixante-quatre mille huit cents échantillons d'entraînement. XGBoost à zéro virgule quatre-vingt-treize de F1 macro. Latence bout-en-bout inférieure à une seconde. Deux applications — web et mobile — synchronisées sur la même API. Un microservice IA autonome, redéployable indépendamment. Un rapport de fiabilité PDF généré à la demande. L'objectif initial des trois axes — instrumenter, prédire, restituer — est atteint sur le périmètre défini.

---

## 31 — Perspectives (40 s)

> Trois axes d'évolution se dessinent. Un — l'installation physique complète des capteurs sur les deux machines, avec ré-entraînement du modèle sur les données réelles collectées sur trois mois. Deux — l'extension à d'autres familles de machines du parc ICEM, notamment les sertisseuses CFA. Trois — l'ajout d'une couche de recommandation prescriptive : proposer directement l'action corrective optimale, pas seulement détecter la panne. À plus long terme, une passerelle vers le SI GMAO existant pour clôturer la boucle de gestion.

---

## 32 — Merci (30 s)

> Je vous remercie pour votre attention. Je remercie également Monsieur Imed Hidri pour son encadrement académique, Monsieur Yassine Hammami pour son encadrement société, ainsi que l'équipe ICEM Nabeul qui m'a accueilli pendant ces six mois. Je suis à votre disposition pour toutes vos questions.

---

## Timing global

| Bloc | Slides | Durée |
|---|---|---|
| Cover + Plan | 2 | 1 min 15 |
| Section 1 (Intro + contexte) | 5 | 3 min 20 |
| Section 2 (État de l'art) | 4 | 2 min 05 |
| Section 3 (Conception) | 5 | 3 min 05 |
| Section 4 (Développement) | 12 | 8 min 15 |
| Section 5 (Démo) | 1 | 5 s (+ démo live hors chrono) |
| Section 6 (Résultats + conclusion) | 4 | 2 min 00 |
| **Total oral** | **33** | **~20 min** |

> Réserve 3–5 min de démo live entre Section 5 et KPI selon le temps restant.
