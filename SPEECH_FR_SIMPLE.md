# Script oral SIMPLE — soutenance PFE (43 slides)

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

**Cible orale** : ~25 min · 43 slides · dividers 5 s · Cover 45 s · autres 30–55 s

**Pièges de prononciation à éviter dans ce script** : *faisceau*, *sertissage* (utilisés 1 seule fois avec explication), *dévidage/dénudage* (remplacés), *au sein d'*, *notamment*, *cependant*, *afin de*, *s'articule*, *par ailleurs*, *à l'échelle*, *instrumenter*, *restituer*, *orchestrer*, *hiérarchiser*, *cadencer*, *échantillonner*, *passerelle* (remplacé par *Raspberry Pi*).

---

## 1 — Cover (45 s)

> Bonjour à tous. Je m'appelle **Moutia Bensaad**. Je suis étudiant en Mastère 2, Systèmes Embarqués et Mobile, à l'ISET Nabeul. J'ai fait mon stage à ICEM Nabeul. Mon encadrant académique est **Monsieur Imed Hidri**. Mon encadrant société est **Monsieur Yassine Hammami**. Mon projet parle de *maintenance prédictive intelligente*. Il concerne 2 machines Komax : la **Alpha 433 H** et la **Gamma 333 PC**. L'idée est simple. On installe des capteurs sur les machines. On envoie les données à une carte Raspberry Pi. On entraîne un modèle qui prédit les pannes. On montre les alertes sur une application web et une application mobile. Voici maintenant le plan.

---

## 2 — Plan de la présentation (30 s)

> La présentation a **6 parties**. D'abord, l'introduction et le contexte. Ensuite, l'état de l'art. Puis la conception. Après, le développement, qui est la partie principale. Puis une démonstration en direct. Et à la fin, les résultats et les perspectives.

---

## 3 — Section 1 · Introduction et contexte (5 s)

> Commençons par le contexte.

---

## 4 — ICEM Nabeul (40 s)

> ICEM est une filiale du groupe **Coficab**. L'entreprise fabrique des câbles électriques pour l'industrie automobile. L'usine de Nabeul emploie plusieurs centaines de personnes. Chaque jour, elle produit des milliers de câbles. Les machines principales sont les machines **Komax**. Elles coupent et préparent les fils à grande vitesse. Si une machine tombe en panne, toute la ligne s'arrête. C'est pour ça que la maintenance prédictive est importante ici. 2 machines nous intéressent en particulier.

---

## 5 — Machines Alpha 433 H et Gamma 333 PC (50 s)

> Le projet cible 2 machines. La première est la **Komax Alpha 433 H**. C'est une machine d'entrée de gamme. Elle a **4 postes** et **6 moteurs pas-à-pas**. Son cycle a 7 étapes. La deuxième est la **Gamma 333 PC**. C'est une machine plus haut de gamme. Elle a une unité de sertissage double. Elle utilise des courroies avec une tension calibrée. Sur les 2 machines, on trouve les mêmes zones critiques : la tête de coupe, les courroies, les capteurs et l'armoire électrique. On a analysé **1 467 interventions** dans l'historique ICEM sur 5 ans. Ça nous a aidé à choisir ces zones. Mais pourquoi la maintenance actuelle ne suffit pas ?

---

## 6 — Problématique (45 s)

> Aujourd'hui, la maintenance à ICEM est surtout **corrective**. On répare après la panne. Il y a aussi une maintenance **préventive**. On change des pièces à date fixe. Les 2 méthodes ont des limites. La corrective coûte cher, parce que la ligne s'arrête. La préventive gaspille des pièces qui marchent encore. La maintenance **prédictive** est différente. Elle intervient au bon moment, avec les données des capteurs. Mais sans capteurs, c'est impossible. Notre projet apporte ces capteurs, le traitement des données et les interfaces. On a fixé 3 objectifs clairs.

---

## 7 — Objectifs (40 s)

> On a fixé **3 objectifs**. **Premier objectif** : installer 4 types de capteurs sur les 2 machines. Température, vibration, image thermique, et courant. **Deuxième objectif** : construire toute la chaîne, du capteur jusqu'à la notification. **Troisième objectif** : livrer 2 applications. Une application web pour le responsable maintenance. Une application mobile pour le technicien. On a aussi ajouté un module de fiabilité, pour aider aux décisions.

---

## 8 — Section 2 · État de l'art (5 s)

> Passons à l'état de l'art.

---

## 9 — Méthodologie Scrum (35 s)

> Le projet a duré **6 mois**, de mars à août 2026. On a utilisé la méthode **Scrum**. On a fait **6 sprints**. Chaque sprint traite un cas d'utilisation. Sprint 1 : l'authentification et les comptes. Sprint 2 : les machines et le parc. Sprint 3 : la maintenance et les interventions. Sprint 4 : la surveillance IoT — c'est ce sprint qui a livré les capteurs qu'on voit dans les prochaines slides. Sprint 5 : l'IA et les alertes. Sprint 6 : la fiabilité et la recommandation. À la fin de chaque sprint, on a fait une revue avec l'encadreur. On commence par les 4 types de capteurs, un par un.

---

## 10 — DHT22 · caractéristiques (35 s)

> Le **premier capteur** est le **DHT22**. C'est une petite sonde de **température**. Ses caractéristiques : elle mesure de **-40 à +80 degrés**, avec une précision de **plus ou moins un demi degré**. Elle donne aussi l'humidité. Elle coûte environ **3 euros**. Pourquoi ce choix ? Un moteur **chauffe avant de tomber en panne**. Ce capteur détecte ce signal très tôt. Il est simple, robuste, très peu cher. C'est le meilleur compromis pour surveiller un moteur.

---

## 11 — MPU-6050 · caractéristiques (35 s)

> Le **deuxième capteur** est le **MPU-6050**. Il mesure les **vibrations** sur **3 axes**. Sa plage va de **plus ou moins 2 g à 16 g**. Il a aussi un gyroscope. Il communique en **I2C**. Pourquoi ce capteur ? Parce qu'il est très **utilisé et bien documenté**. Les 3 axes donnent une signature de vibration riche. Ça permet de **distinguer** une **courroie détendue** d'un **roulement usé**. Ce sont 2 causes de panne différentes.

---

## 12 — AMG8833 · caractéristiques (40 s)

> Le **troisième capteur** est l'**AMG8833**. C'est une **caméra thermique**. Elle donne une image de chaleur en **8 par 8 pixels**. Sa plage va de **-20 à +80 degrés**. Son champ de vue est de **60 degrés**. Elle communique en **I2C**. Pourquoi ce capteur ? Parce qu'elle donne une **vision globale** de la zone chaude, **sans contact** avec la machine. La résolution est faible, mais elle suffit pour repérer un **point chaud**. C'est une alternative à une caméra FLIR à **500 euros**. L'AMG8833 coûte **30 euros**.

---

## 13 — SCT-013 · caractéristiques (40 s)

> Le **quatrième capteur** est la **pince SCT-013**. Elle mesure le **courant électrique**. C'est une pince **non-invasive** : on ne coupe pas le câble, on la clippe simplement autour. On utilise la variante **SCT-013-000**. Elle mesure jusqu'à **100 ampères**. Elle donne un petit courant, de **0 à 50 milliampères**. Une **résistance de 33 ohms** le transforme en tension. On le lit avec un petit convertisseur, le **ADS1015**, en 12 bits. Pourquoi ce choix ? Parce que le **courant total** de l'armoire reflète l'état de tous les moteurs. Un moteur qui force **tire plus de courant**. Cette signature électrique complète bien les autres capteurs. Ces 4 types de capteurs s'appuient sur 3 blocs logiciels.

---

## 14 — Stack technique (35 s)

> On a utilisé **3 blocs** logiciels. Pour le **backend** : Node.js, Express, MongoDB, et JWT pour l'authentification. Pour l'**IA** : Python, FastAPI, et scikit-learn. On a **3 modèles** : Random Forest pour la cause, XGBoost pour la panne dans 24 heures, et une régression linéaire pour la fiabilité. Pour le **frontend** : React pour le web, Flutter pour le mobile. On utilise aussi Firebase pour les notifications push. Tout est déployé sur le serveur interne d'ICEM, pas sur le cloud. Voyons comment ces briques s'organisent dans l'architecture.

---

## 15 — Section 3 · Conception (5 s)

> Voici la conception.

---

## 16 — Architecture 5 couches (50 s)

> L'architecture a **5 couches**. **1** : la couche perception. Ce sont les 5 capteurs sur la machine. **2** : la couche edge. C'est la Raspberry Pi. Elle lit les capteurs et envoie les mesures au serveur en HTTP, toutes les 60 secondes. **3** : la couche backend. C'est le serveur Node.js avec la base MongoDB. Il garde toutes les données. **4** : la couche intelligence. C'est un microservice FastAPI avec 2 modules : la prédiction et la fiabilité. **5** : la couche application. Le web et le mobile montrent les résultats et les alertes. Chaque couche a son rôle. On peut changer une couche sans casser les autres. Zoom d'abord sur la Raspberry Pi, la carte terrain.

---

## 17 — Raspberry Pi terrain (40 s)

> La Raspberry Pi est notre carte terrain. Elle lit les **5 capteurs**. 3 composants sont sur le même bus I2C : le MPU-6050, l'AMG8833, et le convertisseur de la pince SCT-013. Les 2 DHT22 utilisent 2 broches GPIO séparées. Un script Python lit les capteurs toutes les **60 secondes**. Puis il envoie les mesures en **JSON** au serveur. Si l'envoi échoue, il réessaie automatiquement. Un service Linux redémarre le script si besoin. Voyons maintenant où chaque capteur est placé sur la machine.

---

## 18 — DHT22 · emplacement (30 s)

> Voici **où on a placé le DHT22**. On le voit ici, **fixé sur le corps du servomoteur**. Il est en contact direct avec le métal. Pourquoi cet endroit ? Parce que **le moteur chauffe en premier** quand un roulement fatigue. Un contact direct donne une lecture **rapide et fiable**.

---

## 19 — MPU-6050 · emplacement (30 s)

> Voici **où on a placé le MPU-6050**. On le voit ici, **collé sur le carter métallique**. Il est très près de la **tête de coupe**. Pourquoi cet endroit ? Parce que le signal de vibration **se perd très vite** dans l'air ou dans une gaine. Un contact direct donne un **signal propre**. On capte ainsi la **vraie signature** de la mécanique.

---

## 20 — AMG8833 · emplacement (35 s)

> Voici **où on a placé l'AMG8833**. On la voit ici, **fixée en hauteur** sur le châssis de la machine. Elle est à environ **50 centimètres**. Elle regarde vers le bas, sur la **tête de coupe** et la **zone Gommino**. Pourquoi cet endroit ? Parce que son champ de **60 degrés** couvre toute la **zone chaude** d'un seul coup. Elle surveille le Gommino et le carter de la tête de coupe. Et elle ne touche **aucune pièce en mouvement**.

---

## 21 — Armoire électrique · SCT-013 + DHT22 (35 s)

> Voici l'**armoire électrique**. On y a placé 2 capteurs. La **pince SCT-013**, la pince bleue, clampée autour d'un câble. Et **un deuxième DHT22**, pour la température de l'armoire. Le signal est ramené au **Raspberry Pi** (le paquet essai en bas) par le convertisseur **ADS1015** posé sur la breadboard. Pourquoi cet endroit ? Parce que ce câble porte le **courant tiré par les moteurs**. **Une seule pince** suffit pour voir l'état électrique. La pose se fait **sans arrêter la production**. Le DHT22 surveille la **chaleur de l'armoire**. La couche physique est posée. Passons à la modélisation logicielle.

---

## 22 — Diagramme de cas d'utilisation (25 s)

> Voici le **diagramme de cas d'utilisation**. Il a **6 acteurs** et **12 cas d'utilisation**. 3 acteurs humains : responsable maintenance, chef de ligne, technicien. 3 acteurs système : l'IA maintenance, l'IA fiabilité et l'IoT. Pour chaque action, on doit d'abord **s'authentifier**. Ces cas s'appuient sur 9 classes.

---

## 23 — Diagramme de classes (25 s)

> Voici le **diagramme de classes**. Il a **9 classes**. 5 pour le métier : utilisateur, ligne, machine, maintenance, alerte. 2 pour l'IoT : capteur et Raspberry Pi. 2 pour l'IA : pannes et fiabilité. Pour la maintenance, **une seule classe** avec un champ *type* à 5 valeurs. Ces classes s'enchaînent en temps réel.

---

## 24 — Pipeline temps réel (45 s)

> Le pipeline a **5 étapes**. **1** : la Raspberry Pi lit les capteurs toutes les **10 à 60 secondes**. **2** : le backend enregistre la mesure dans MongoDB. **3** : toutes les **5 minutes**, il envoie à l'IA les mesures des **2 dernières heures**. **4** : l'IA répond avec la probabilité de panne et la cause. **5** : à **60 %**, une alerte. À **80 %**, une alerte critique et une intervention prédictive. Le responsable reçoit une notification.

---

## 25 — Section 4 · Développement (5 s)

> Passons au développement.

---

## 26 — Backend Express + MongoDB (45 s)

> Le backend est une API REST, avec Node.js et Express. MongoDB garde **9 collections principales**. Ce sont les mêmes que dans le diagramme de classes. Il y a aussi les checklists et le planning. L'authentification utilise **JWT**. Il y a **3 rôles** : responsable, chef de ligne, et technicien. Côté API, un middleware vérifie le rôle sur chaque route. Côté interface, un seul fichier de permissions cache les pages et les boutons selon le rôle. La Raspberry Pi utilise une clé d'API spéciale. Un script *seed* initialise la base avec des données de démonstration. Toutes les 5 minutes, le backend envoie à l'IA les mesures des 2 dernières heures.

---

## 27 — Microservice IA FastAPI (45 s)

> Le microservice IA est en Python, avec FastAPI. On a **3 modèles**. Le **Random Forest** dit **pourquoi** : la cause parmi 5. Le **XGBoost** dit **quand** : la probabilité de panne dans les 24 heures. La **régression linéaire** calcule la fiabilité sur 3 mois. Voyons sur quoi on a entraîné ces modèles.

---

## 28 — Dataset d'entraînement (35 s)

> Tout commence avec l'historique ICEM : **1 467 interventions**, surtout en 2022. Seul, il ne suffit pas : le score est **0,15**, car il n'a pas de mesures. Mais il nous dit où mettre les capteurs, les horaires et la durée des arrêts. Avec ça, on a créé **112 680 mesures** : 12 mois, 2 machines, **69 pannes**. Pour tester, on coupe **par semaines**.

---

## 29 — Causes suivies (30 s)

> Le modèle suit **5 causes**. Ce sont les pannes qu'un capteur peut voir. **Vibration** : usure et courroie. **Chaleur du moteur** : ventilation sale et surcharge. Pour la surcharge, le courant monte aussi. **Chaleur de l'armoire** : ventilateur ou filtre en panne. Les autres pannes, l'IHM Komax les montre déjà.

---

## 30 — Performances Random Forest (35 s)

> Le Random Forest a **0,85** de F1 et **96 %** de bonnes réponses. La meilleure cause : la surchauffe armoire, **0,95**. La plus difficile : l'usure, **0,67**, car elle monte lentement. Quand le modèle donne une cause, il a presque toujours raison. Voyons les erreurs.

---

## 31 — Matrice de confusion (35 s)

> En vertical, la **cause réelle**. En horizontal, la **cause prédite**. Chaque case donne un pourcentage. La **diagonale** foncée, ce sont les bonnes réponses : **0,92** pour la surchauffe armoire. L'erreur principale est dans la colonne **« Normal »** : **0,39** pour l'usure, car au début la panne est trop faible. Et **0,16** : la courroie est lue comme usure, car les 2 vibrent. Passons au XGBoost.

---

## 32 — XGBoost · panne dans 24 h (40 s)

> À gauche, la **courbe ROC**. En x, les **fausses alertes**. En y, les **pannes détectées**. La courbe monte vite en haut à gauche : c'est bon signe. La ligne pointillée, c'est le hasard. L'**AUC** est de **0,94**. À droite, en x la **probabilité**. Le bleu, pas de panne, reste près de 0. L'orange, panne dans 24 h, va près de 1. Les 2 traits pointillés sont nos seuils : **60 %** alerte, **80 %** intervention. Résultat : **69 pannes sur 69** annoncées, environ **20 heures** avant. Ces prédictions arrivent ensuite sur le web.

---

## 33 — Fonctionnalités web (30 s)

> L'application web sert les **3 profils** : responsable, chef de ligne et technicien. Elle a **6 modules**. Le tableau de bord montre MTBF, MTTR et disponibilité. La page Équipements montre les 13 machines et les capteurs en direct. Dans les interventions, un bouton lance le diagnostic IA. Il y a aussi la maintenance préventive, le suivi journalier, la fiabilité avec rapport PDF, et les alertes. Voici quelques écrans.

---

## 34 — Web · exemples d'écrans (30 s)

> Voici les vrais écrans, côté responsable maintenance. Le **tableau de bord** résume les machines, les interventions et la disponibilité. La fiche machine montre les **4 capteurs en direct**, toutes les 30 secondes. Les **interventions** sont préventives, correctives ou prédictives. La page **Alertes** montre la probabilité de panne et la cause proposée par l'IA. La page **Analyses** donne MTBF, MTTR et disponibilité. Passons au mobile.

---

## 35 — Fonctionnalités mobile (30 s)

> L'application mobile est en **Flutter**. Elle est pour le **technicien** et le **chef de ligne**, à côté de la machine. On gère les **interventions**, avec photos avant et après. Le **diagnostic IA** marche aussi sur le téléphone. Le **suivi journalier** et les **checklists préventives** se remplissent sur place, avec une photo. Et **Firebase** envoie une notification pour chaque alerte critique ou intervention assignée. Voici les écrans.

---

## 36 — Mobile · exemples d'écrans (30 s)

> Voici les vrais écrans, sur Android. Le **tableau de bord** reprend les indicateurs du web. Les **interventions** sont en cartes, avec le type et l'état. Le bouton **Diagnostiquer avec l'IA** donne la cause probable, la confiance et les 4 capteurs. L'écran **Alertes** reçoit les notifications, triées par criticité. Reste un dernier module : l'analyse de fiabilité.

---

## 37 — Analyse de fiabilité (30 s)

> Le module de fiabilité aide à décider : garder la machine ou la changer. Pour chaque machine, il calcule **MTBF**, **MTTR**, **disponibilité** et nombre de pannes. Une **régression linéaire** prévoit la disponibilité sur **3 mois**. Le backend crée un **rapport PDF** avec une recommandation. Ici, la Gamma 333 a **99,2 %** de disponibilité : il faut la **surveiller**. Tout cela tourne sur une infrastructure locale.

---

## 38 — Déploiement (30 s)

> Tout est installé sur le **serveur interne d'ICEM**. Un serveur Windows héberge le backend, le web et la base MongoDB. Le backend est un service Windows ; le web est publié sous IIS. La base ne sort pas du réseau. Le Raspberry Pi et les téléphones passent par le Wi-Fi de l'usine. Seules les notifications Firebase sortent. Les données restent chez ICEM. Passons à la démonstration.

---

## 39 — Section 5 · Démonstration (5 s)

> Passons à la démonstration.

---

## 40 — KPI et résultats (30 s)

> En chiffres : **5 couches**, du capteur à l'application. **5 capteurs** par machine. **3 modèles** d'IA ; le XGBoost annonce **69 pannes sur 69**, environ 20 heures avant. **2 applications** sur la même API, testée avec plus de **120 requêtes** Postman. Les 3 objectifs sont atteints. Ces chiffres nous amènent à la conclusion.

---

## 41 — Conclusion (30 s)

> Pour conclure, on a livré un **prototype qui marche**, sur 3 axes. **1** — instrumenter : 5 capteurs par machine, une analyse toutes les 5 minutes. **2** — prédire : le Random Forest trouve la cause parmi 5 ; le XGBoost annonce la panne dans les 24 heures. Au-dessus de **80 %**, une maintenance est créée toute seule. **3** — restituer : web et mobile, notifications, rapport PDF, tout installé chez ICEM. Place aux perspectives.

---

## 42 — Perspectives (30 s)

> D'abord, ré-entraîner les modèles avec les **vraies mesures**. Ensuite, **4 pistes**. **1** : l'IA directement sur le **Raspberry Pi**, même sans réseau. **2** : lire les **alarmes de la machine Komax** et les comparer avec notre diagnostic. **3** : une **caméra** pour voir les défauts de sertissage. **4** : proposer **l'action à faire**, les pièces et le bon moment.

---

## 43 — Merci (30 s)

> Je vous remercie pour votre attention. Je remercie aussi **Monsieur Imed Hidri**, mon encadrant académique. Et **Monsieur Yassine Hammami**, mon encadrant société. Merci aussi à toute l'équipe ICEM Nabeul, qui m'a accueilli pendant 6 mois. Je suis prêt pour répondre à vos questions.

---

## Timing global (version SIMPLE)

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

---

## Mots-pièges à répéter avant la soutenance

**Ton propre nom** — dis-le lentement : *Mou-tia Ben-sa-ad*.

**Chiffres techniques** — répète à voix haute :
- « cent douze mille six cent quatre-vingts » (112 680)
- « mille quatre cent soixante-sept » (1 467)
- « zéro virgule quatre-vingt-cinq » (0,85)
- « zéro virgule quatre-vingt-quatorze » (0,94)
- « soixante-neuf pannes sur soixante-neuf » (69 / 69)
- « dix-neuf heures et demie » (19,5 h)

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
