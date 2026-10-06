# Presentation soutenance PFE — Komax

Deck React + Framer Motion pour la soutenance du **20 aout 2026** (Moutia Bensaad, ISET Nabeul).

23 slides · texte court · francais A2 · animations codees a la main.

## Demarrer

```powershell
cd presentation
npm install
npm run dev
```

Ouvre automatiquement `http://localhost:5175`.

## Commandes clavier

- `←` `→` `Espace` — naviguer entre slides
- `Home` `End` — premier / dernier slide
- `F11` — 1er appui : ouvre la fenetre du texte oral (a glisser sur l'ecran du PC, affichage Windows en mode « Etendre ») ; 2e appui (sur la fenetre des slides) : plein ecran. `N` ouvre aussi le texte oral, `F` bascule le plein ecran
- En plein ecran, fleches, compteur et vignettes disparaissent du projecteur : on navigue depuis la fenetre du texte oral (← →, boutons ou vignettes)
- `N` — rouvrir la fenetre du texte oral si elle a ete fermee
- Boutons cercle en haut a gauche/droite — navigation souris

## Build pour deploiement

```powershell
npm run build
```

Sortie dans `dist/` — dossier statique, deployable sur n'importe quel hebergeur (Netlify, GitHub Pages, ou serveur local via `npm run preview`).

## Structure

```
presentation/
├── public/img/          # Images copiees depuis rapport/ et Machines/
│   ├── entreprise/      # ICEM logo, produits, organigramme
│   ├── machines/        # Alpha 433 H, Gamma 333 PC
│   ├── sensors/         # DHT22, MPU-6050, AMG8833, STC013, Pi
│   ├── stack/           # Logos Node, React, Flutter, MongoDB…
│   ├── uml/             # Synoptique, use cases, class diagram
│   ├── web/             # Screenshots app React
│   ├── flutter/         # Screenshots app Flutter
│   ├── ml/              # ROC, confusion, TCO PDF
│   └── institution/     # Logo ISET Nabeul
├── src/
│   ├── App.jsx          # Deck + navigation
│   ├── main.jsx         # Entree React
│   ├── components/
│   │   ├── Slide.jsx           # Wrapper stagger + label
│   │   ├── AnimatedCounter.jsx # Compteur numerique anime
│   │   ├── BarChart.jsx        # Graphique a barres anime
│   │   ├── PipelineFlow.jsx    # Flow anime capteur→alerte
│   │   └── FloatIn.jsx         # Utilitaire d'entree
│   ├── slides/                 # 23 slides, un fichier par slide
│   │   ├── 01_Cover.jsx        # Page de garde
│   │   ├── 02_Plan.jsx
│   │   ├── 03_ICEM.jsx         # Contexte entreprise
│   │   ├── 04_Probleme.jsx     # Chiffres pannes
│   │   ├── 05_Machines.jsx     # Alpha + Gamma
│   │   ├── 06_Objectif.jsx     # Predire · Alerter · Reduire
│   │   ├── 07_Architecture.jsx # 5 couches
│   │   ├── 08_Capteurs.jsx     # 5 capteurs IoT
│   │   ├── 09_Edge.jsx         # Raspberry Pi
│   │   ├── 10_Backend.jsx      # Node + Mongo + endpoints
│   │   ├── 11_IA.jsx           # RF v1 · RF v2 · XGBoost
│   │   ├── 12_Applications.jsx # Web + Mobile
│   │   ├── 13_Dataset.jsx      # Historique + synthetique
│   │   ├── 14_Causes.jsx       # 13 causes C01–C13
│   │   ├── 15_F1.jsx           # Bar chart F1
│   │   ├── 16_Confusion.jsx    # Matrice + ROC
│   │   ├── 17_Pipeline.jsx     # Flow anime end-to-end
│   │   ├── 18_Web.jsx          # Carousel screenshots
│   │   ├── 19_Mobile.jsx       # Telephones inclinees
│   │   ├── 20_Fiabilite.jsx    # Rapport PDF
│   │   ├── 21_KPIs.jsx         # 4 grands chiffres
│   │   ├── 22_Perspectives.jsx # 4 pistes futures
│   │   └── 23_Merci.jsx        # Slide de fin
│   │   └── index.js            # Registre des slides
│   └── styles/
│       └── globals.css         # Design tokens + layout
├── index.html
├── package.json
└── vite.config.js
```

## Personnalisation rapide

- **Reordonner / ajouter / retirer un slide** : editer `src/slides/index.js` (tableau `slides`).
- **Changer un texte** : editer le fichier `src/slides/XX_Nom.jsx` correspondant. Les textes sont tres courts, faciles a retrouver.
- **Changer une image** : remplacer le fichier dans `public/img/…` avec le meme nom.
- **Ajuster les couleurs** : editer les variables `--navy-*`, `--orange-*` dans `src/styles/globals.css`.
- **Ajuster les vitesses d'animation** : modifier `duration` / `delay` dans chaque slide (unites en secondes).

## Design system

- Couleur primaire : **navy 950** (fond)
- Accent : **orange 500** (`#ff7a1a`)
- Accents secondaires : cyan (capteurs), vert (backend), rouge (alerte)
- Typo titres : **Space Grotesk 700-800**
- Typo corps : **Inter 400-500**
- Typo mono : **JetBrains Mono** (numeros, endpoints, hints)

## Livrables inclus dans le deck

- Toutes les captures ecran (`rapport/images/chap3/`) — Web + Flutter
- Photos capteurs et Raspberry
- Photos & drawings des deux machines
- Resultats ML (matrice de confusion RF, courbe ROC XGBoost)
- Rapport PDF fiabilite (preview)
- Logo ISET Nabeul, logo & produits ICEM

## Notes techniques

- **Vite 5 + React 18 + Framer Motion 11** — pas de framework de presentation externe.
- **Aucune dependance runtime lourde** : bundle < 100 KB gzipped.
- **Fonctionne offline** apres premier chargement des fonts Google.
- **Compatible** : Chrome, Edge, Firefox recents. Pas de garantie sur Safari <15.
- **Projection** : F pour plein ecran avant de commencer.

## Ce qui n'est PAS dans le deck (a ajouter si besoin)

- Video demo temps reel (a enregistrer separement)
- Slides bonus questions techniques (voir `../defense_notes.docx` et `../jury_prep_20QR.docx`)
- Backup slide si le projecteur tombe (garder un PDF de secours via `npm run build` + capture)
"# presentation" 
