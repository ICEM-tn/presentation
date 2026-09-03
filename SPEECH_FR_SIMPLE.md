# Script oral SIMPLE — soutenance PFE (33 slides)

**Version A2 stricte** — rédigée après analyse de 271 messages vocaux + corrections ChatGPT (jours 8, 10, 14, 27, 47).

**Règles appliquées** :
- Phrases 8–12 mots max, une idée par phrase
- Zéro subordonnée complexe (pas de *dont*, pas de *que ... que*)
- Temps : **présent + passé composé uniquement**
- Préférer **on** à **nous** (plus court à dire, moins d'erreurs d'accord)
- Connecteurs simples : *mais*, *pour*, *aussi*, *surtout*, *par exemple*, *c'est pourquoi*
- Vocabulaire réduit à ce que tu utilises déjà en vocal
- Chiffres arrondis quand possible, jamais lus lettre par lettre
- Pattern par slide : **réponse directe → brève explication → conclusion** (recommandé par ChatGPT msg #797)

**Cible orale** : ~20 min · 33 slides · dividers 5 s · Cover 45 s · autres 30–55 s

**Pièges de prononciation à éviter dans ce script** : *faisceau*, *sertissage* (utilisés 1 seule fois avec explication), *dévidage/dénudage* (remplacés), *au sein d'*, *notamment*, *cependant*, *afin de*, *s'articule*, *par ailleurs*, *à l'échelle*, *instrumenter*, *restituer*, *orchestrer*, *hiérarchiser*, *cadencer*, *échantillonner*, *passerelle* (remplacé par *Raspberry Pi*).

---

## 1 — Cover (45 s)

> Bonjour à tous. Je m'appelle **Moutia Bensaad**. Je suis étudiant en Mastère 2, Systèmes Embarqués et Mobile, à l'ISET Nabeul. J'ai fait mon stage à ICEM Nabeul. Mon encadrant académique est **Monsieur Imed Hidri**. Mon encadrant société est **Monsieur Yassine Hammami**. Mon projet parle de *maintenance prédictive intelligente*. Il concerne deux machines Komax : la **Alpha 433 H** et la **Gamma 333 PC**. L'idée est simple. On installe des capteurs sur les machines. On envoie les données à une carte Raspberry Pi. On entraîne un modèle qui prédit les pannes. On montre les alertes sur une application web et une application mobile. Voici maintenant le plan.

---

## 2 — Plan de la présentation (30 s)

> La présentation a **six parties**. D'abord, l'introduction et le contexte. Ensuite, l'état de l'art. Puis la conception. Après, le développement, qui est la partie principale. Puis une démonstration en direct. Et à la fin, les résultats et les perspectives.

---

## 3 — Section 1 · Introduction et contexte (5 s)

> Commençons par le contexte.

---

## 4 — ICEM Nabeul (40 s)

> ICEM est une filiale du groupe **Coficab**. L'entreprise fabrique des câbles électriques pour l'industrie automobile. L'usine de Nabeul emploie plusieurs centaines de personnes. Chaque jour, elle produit des milliers de câbles. Les machines principales sont les machines **Komax**. Elles coupent et préparent les fils à grande vitesse. Si une machine tombe en panne, toute la ligne s'arrête. C'est pour ça que la maintenance prédictive est importante ici.

---

## 5 — Machines Alpha 433 H et Gamma 333 PC (50 s)

> Le projet cible deux machines. La première est la **Komax Alpha 433 H**. C'est une machine d'entrée de gamme. Elle a **quatre postes** et **six moteurs pas-à-pas**. Son cycle a sept étapes. La deuxième est la **Gamma 333 PC**. C'est une machine plus haut de gamme. Elle a une unité de sertissage double. Elle utilise des courroies avec une tension calibrée. Sur les deux machines, on trouve les mêmes zones critiques : la tête de coupe, les courroies, les capteurs et l'armoire électrique. On a analysé **environ mille pannes** dans l'historique ICEM. Ça nous a aidé à choisir ces zones.

---

## 6 — Problématique (45 s)

> Aujourd'hui, la maintenance à ICEM est surtout **corrective**. On répare après la panne. Il y a aussi une maintenance **préventive**. On change des pièces à date fixe. Les deux méthodes ont des limites. La corrective coûte cher, parce que la ligne s'arrête. La préventive gaspille des pièces qui marchent encore. La maintenance **prédictive** est différente. Elle intervient au bon moment, avec les données des capteurs. Mais sans capteurs, c'est impossible. Notre projet apporte ces capteurs, le traitement des données et les interfaces.

---

## 7 — Objectifs (40 s)

> On a fixé **trois objectifs**. **Premier objectif** : installer quatre types de capteurs sur les deux machines. Température, vibration, image thermique, et courant. **Deuxième objectif** : construire toute la chaîne, du capteur jusqu'à la notification. **Troisième objectif** : livrer deux applications. Une application web pour le responsable maintenance. Une application mobile pour le technicien. On a aussi ajouté un module de fiabilité, pour aider aux décisions.

---

## 8 — Section 2 · État de l'art (5 s)

> Passons à l'état de l'art.

---

## 9 — Méthodologie Scrum (35 s)

> Le projet a duré **six mois**, d'avril à septembre. On a utilisé la méthode **Scrum**. On a fait **six sprints** de trois à quatre semaines. Chaque sprint a livré une partie du projet. Sprint 1 : la modélisation. Sprint 2 : le backend. Sprint 3 : l'IA. Sprint 4 : le web. Sprint 5 : le mobile. Sprint 6 : l'intégration IoT. À la fin de chaque sprint, on a fait une revue pour valider.

---

## 10 — Capteurs et instrumentation (55 s)

> On a choisi **quatre types de capteurs**. Le **DS18B20** mesure la température. Il est placé sur le moteur, pour détecter la chaleur des roulements. Le **MPU-6050** mesure les vibrations. Il est placé près de la tête de coupe. Il détecte l'usure des courroies. La **caméra thermique AMG8833** donne une image de chaleur. Elle est placée au-dessus de la machine. Elle voit les points chauds. Enfin, la **pince SCT-013** mesure le courant électrique de l'armoire. Elle utilise un convertisseur ADS1015. Ces quatre capteurs couvrent les zones de panne les plus importantes.

---

## 11 — Stack technique (35 s)

> On a utilisé **trois blocs** logiciels. Pour le **backend** : Node.js, Express, MongoDB, et JWT pour l'authentification. Pour l'**IA** : Python, FastAPI, et scikit-learn. Nos modèles sont Random Forest et XGBoost. Pour le **frontend** : React pour le web, Flutter pour le mobile. On utilise aussi Firebase pour les notifications push. Le backend et l'IA sont déployés sur Render.

---

## 12 — Section 3 · Conception (5 s)

> Voici la conception.

---

## 13 — Architecture cinq couches (50 s)

> L'architecture a **cinq couches**. **Un** : la couche perception. Ce sont les capteurs physiques. **Deux** : la couche acquisition. C'est la Raspberry Pi qui lit les capteurs. **Trois** : la couche transport. Les données passent par HTTPS vers le serveur. **Quatre** : la couche traitement. Le backend et l'IA analysent les données. **Cinq** : la couche application. Le web et le mobile montrent les résultats. Chaque couche a son rôle. On peut changer une couche sans casser les autres.

---

## 14 — Raspberry Pi terrain (40 s)

> La Raspberry Pi est notre carte terrain. Elle lit les quatre capteurs. Les trois capteurs I2C sont sur le même bus. Le DS18B20 utilise un fil séparé. Un script Python lit chaque capteur. Il calcule les valeurs importantes. Puis il envoie un fichier **JSON** toutes les cinq secondes. Un service Linux redémarre le script si besoin. Si le réseau tombe, les données sont gardées en local. Elles sont renvoyées après.

---

## 15 — Modélisation UML (45 s)

> On a fait **deux diagrammes** UML principaux. Le **diagramme de cas d'utilisation**. Il montre six acteurs : responsable maintenance, chef de ligne, technicien, et trois systèmes : IoT, IA, et notifications. Il montre aussi les fonctions principales. Le **diagramme de classes** montre cinq entités : machine, utilisateur, intervention, alerte, capteur. Pour la maintenance, on a utilisé un seul type avec un champ *type* : préventif, correctif, ou prédictif. C'est plus simple pour les requêtes.

---

## 16 — Pipeline temps réel (45 s)

> Le pipeline temps réel a **cinq étapes**. **Un** : la Raspberry Pi envoie un JSON toutes les cinq secondes. **Deux** : le backend valide le JSON et l'enregistre dans MongoDB. **Trois** : le backend appelle le microservice IA. **Quatre** : FastAPI répond avec la probabilité de panne et la cause. **Cinq** : si la probabilité est plus grande que **80%**, une maintenance prédictive est créée. Une notification est envoyée au technicien. Tout ça prend moins d'une seconde.

---

## 17 — Section 4 · Développement (5 s)

> Passons au développement.

---

## 18 — Backend Express + MongoDB (45 s)

> Le backend est une API REST. Il a **huit ressources** principales : machines, utilisateurs, interventions, alertes, capteurs, maintenances, checklists, et analyses de fiabilité. L'authentification utilise **JWT**. Il y a **trois rôles** : responsable, chef de ligne, et technicien. Un middleware contrôle les accès. Il utilise un seul fichier de permissions. Le même fichier protège aussi l'interface. Un script *seed* initialise la base avec des données de démonstration.

---

## 19 — Microservice IA FastAPI (45 s)

> Le microservice IA est en Python, avec FastAPI. Il a **quatre endpoints** : type de panne, cause probable, probabilité, et prévision de fiabilité. On a deux modèles : **Random Forest** pour les causes physiques, et **XGBoost** pour la probabilité. Un troisième modèle, une régression linéaire, calcule la fiabilité future. Le backend appelle ce microservice à chaque nouvelle mesure. Ça n'arrête pas la Raspberry Pi.

---

## 20 — Dataset d'entraînement (50 s)

> On n'a pas installé les capteurs physiquement. Alors on a créé un **dataset synthétique**. Mais il est basé sur des données réelles. On a généré **environ soixante-cinq mille lectures**. On a utilisé les fiches techniques Komax, les manuels moteur, et surtout **l'historique de mille pannes ICEM**. Chaque type de panne a sa signature physique. Par exemple : plus quatre à huit degrés pour l'usure d'un roulement. Ou six ampères de surcharge pour une panne multi-moteurs. Ce dataset peut être réutilisé quand les capteurs seront installés.

---

## 21 — Taxonomie des causes (45 s)

> Le modèle classe les pannes en **treize causes physiques**, codées C01 à C13. Par exemple : usure moteur, désalignement lame, courroie détendue, contamination, surintensité, échauffement carte, capteur défaillant, obstruction, défaut alimentation, dérive calibration, blocage éjection, défaut communication, et non-signature. Avant, on utilisait des zones. Maintenant, avec les causes, le modèle donne une information plus utile. Il complète le diagnostic humain, il ne le remplace pas.

---

## 22 — Performances F1 (50 s)

> On a testé **deux modèles** sur le même jeu de test. Le **Random Forest** est le modèle de référence. Il a un F1 de **quarante-cinq pour cent**. Il est correct sur les classes fréquentes, mais faible sur les rares. Le **XGBoost** est le modèle final. Il a un F1 de **quatre-vingt-treize pour cent**. Sa précision est plus de **90%** sur onze causes sur treize. XGBoost est meilleur parce qu'il gère mieux les données déséquilibrées. On a aussi utilisé **SMOTE** pour équilibrer les classes rares. Ces résultats valident notre architecture.

---

## 23 — Matrice de confusion (35 s)

> La matrice de confusion du XGBoost a une **diagonale forte**. La plupart des prédictions sont correctes. Les erreurs restantes concernent deux paires proches. **Un** : usure moteur et échauffement carte. Les deux donnent une signature de chaleur. **Deux** : courroie détendue et désalignement lame. Les deux donnent une signature de vibration. Ces confusions sont acceptables. En pratique, l'intervention corrige souvent les deux ensemble.

---

## 24 — Fonctionnalités web (45 s)

> L'application web est pour le **responsable maintenance**. Elle a **six modules**. Un tableau de bord avec les indicateurs MTBF et MTTR. Une gestion des machines et de leur historique. Un module d'interventions avec assignation. Un planning préventif dans un calendrier. Un centre d'alertes avec filtres. Un module de fiabilité avec rapport PDF. Tous les modules utilisent le même fichier de permissions du backend.

---

## 25 — Web · exemples d'écrans (40 s)

> Voici quelques écrans. Le **tableau de bord** montre les indicateurs par machine, avec des couleurs. Vert : normal. Orange : dégradé. Rouge : critique. La page **détail machine** montre l'historique, la checklist en cours, et les interventions passées. La page **interventions** a un badge *IA* quand la maintenance est créée automatiquement. Le module **fiabilité** génère un PDF prêt à archiver.

---

## 26 — Fonctionnalités mobile (40 s)

> L'application mobile est en **Flutter**. Elle est pour le **technicien** et le **chef de ligne**. Elle a **cinq écrans** principaux. Un tableau de bord simple. La liste des machines. Les interventions en cours, avec photos avant-après. Les alertes en direct, avec Firebase. Et le profil de l'utilisateur. Une règle importante : les photos doivent être prises avec la caméra, pas la galerie. C'est pour garantir la traçabilité.

---

## 27 — Mobile · exemples d'écrans (40 s)

> Voici les écrans mobile. La **liste d'interventions** montre chaque tâche avec sa priorité. Le **détail intervention** permet de saisir un état, de joindre deux photos, et de signer la clôture. Les **alertes** arrivent en direct, avec vibration et son. La **checklist préventive** est présentée en grille. Chaque ligne se verrouille après validation, pour éviter les modifications en même temps.

---

## 28 — Analyse de fiabilité (40 s)

> Le module de fiabilité aide à la décision. Pour chaque machine, il calcule : le nombre de pannes, le temps moyen entre pannes, le taux de disponibilité, et une projection sur trois mois. La projection utilise une **régression linéaire**. Un rapport **PDF** est généré côté serveur. Il est téléchargeable depuis le web et depuis le mobile. La recommandation finale est simple : **conserver**, **surveiller**, ou **remplacer**.

---

## 29 — Déploiement (35 s)

> Le backend et le microservice IA sont sur **Render**. C'est une plateforme cloud gérée. La base MongoDB est sur **MongoDB Atlas**, sur un cluster gratuit en Europe. En local, on utilise PM2 pour superviser. En production, c'est Render qui supervise. Un endpoint */health* permet de vérifier que tout marche. Le mobile est distribué en **APK signé**.

---

## 30 — Section 5 · Démonstration (5 s)

> Passons à la démonstration.

---

## 31 — KPI et résultats (45 s)

> Voici un résumé chiffré. **Quatre types de capteurs** par machine. **Environ soixante-cinq mille échantillons** d'entraînement. XGBoost à **quatre-vingt-treize pour cent** de F1. Latence bout-en-bout **moins d'une seconde**. **Deux applications**, web et mobile, sur la même API. Un microservice IA autonome. Un rapport de fiabilité en PDF. Les trois objectifs — capteurs, prédiction, interfaces — sont atteints.

---

## 32 — Perspectives (40 s)

> On a identifié **trois perspectives**. **Un** : installer les capteurs physiquement, et ré-entraîner le modèle sur les vraies données. **Deux** : étendre le système à d'autres machines du parc ICEM, par exemple les sertisseuses CFA. **Trois** : ajouter une couche de recommandation. Le système ne va pas juste détecter la panne. Il va aussi proposer l'action à faire. À plus long terme, on peut connecter notre système à la GMAO existante.

---

## 33 — Merci (30 s)

> Je vous remercie pour votre attention. Je remercie aussi **Monsieur Imed Hidri**, mon encadrant académique. Et **Monsieur Yassine Hammami**, mon encadrant société. Merci aussi à toute l'équipe ICEM Nabeul, qui m'a accueilli pendant six mois. Je suis prêt pour répondre à vos questions.

---

## Timing global (version SIMPLE)

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

---

## Mots-pièges à répéter avant la soutenance

**Ton propre nom** — dis-le lentement : *Mou-tia Ben-sa-ad*.

**Chiffres techniques** — répète à voix haute :
- « environ soixante-cinq mille » (65 000)
- « environ mille pannes » (~1160)
- « quatre-vingt-treize pour cent » (93%)
- « quarante-cinq pour cent » (45%)
- « moins d'une seconde »

**Sigles à épeler à la française** :
- IoT → « i-o-té »
- IA → « i-a »
- API → « a-pé-i »
- JWT → « ji-doubleu-té »
- PDF → « pé-dé-èf »
- MTBF → « èm-té-bé-èf »
- MTTR → « èm-té-té-èr »
- JSON → « ji-son » (accepté)
- I2C → « i-deux-cé »
- APK → « a-pé-ka »

**Mots à articuler lentement** :
- *Sertissage* — sèr-ti-ssage (n'apparaît qu'une fois, slide 5)
- *Raspberry* — ras-bè-ri
- *Firebase* — faï-ère-baze
- *Coficab* — co-fi-cab

**Anti-panique** : si tu bloques sur un mot, dis simplement « le composant qui fait la lecture » ou « le module qui envoie les données ». Passe au reste.
