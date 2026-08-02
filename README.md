# Portfolio, mode d'emploi

Site statique (HTML/CSS/JS), sans outil à installer, hébergé gratuitement sur
GitHub Pages.

---

## 1. Structure du dépôt

**Respecte impérativement cette arborescence.** Si les fichiers CSS et JS
atterrissent à la racine au lieu de `assets/`, le site s'affiche sans aucun
style.

```
Portfolio/
├── index.html              page d'accueil
├── moi.html                page personnelle
├── exp-edimbourg.html      détail : échange Erasmus
├── exp-guivibat.html       détail : stage bureau d'études
├── exp-builders.html       détail : formation
├── exp-ouvrier.html        détail : stage ouvrier
├── 404.html                page affichée si l'URL n'existe pas
├── README.md               ce fichier
├── .gitignore              fichiers à ne jamais publier
├── .nojekyll               désactive Jekyll
└── assets/
    ├── css/
    │   ├── base.css        couleurs, polices, composants communs
    │   ├── accueil.css     styles de index.html
    │   ├── experience.css  styles des 4 pages exp-*.html
    │   └── moi.css         styles de moi.html
    ├── js/
    │   ├── app.js          apparition au défilement, images manquantes
    │   └── moi.js          compteurs, bandeau défilant
    ├── img/
    │   ├── projets/        visuels de projets
    │   ├── parcours/       photos Édimbourg, stage, école, chantier
    │   ├── logos/          blasons, favicon
    │   └── moi/            portrait, tatouages, 3D, rugby, voyages
    └── docs/
        └── cv.pdf          ton CV
```

> **Pour envoyer un dossier sur GitHub :** Add file → Upload files, puis glisse
> le dossier `assets` entier, pas les fichiers un par un. Chrome conserve
> l'arborescence quand on dépose un dossier, pas quand on sélectionne des
> fichiers.

---

## 2. Ce qu'il faut modifier

Ouvre les fichiers `.html` et cherche le symbole **✏️** : il marque chaque
endroit à personnaliser.

| Quoi | Où |
|---|---|
| Prénom, nom, initiales | toutes les pages : `<title>`, `.sigle`, `.nom` |
| E-mail, LinkedIn, GitHub, TikTok | pieds de page |
| Phrase d'accroche | `.accroche` (accueil), `.moi-intro` (Moi) |
| Prépa PCSI, bac, point d'ancrage | `index.html`, les 3 niveaux sous le terrain naturel |
| Missions et détails d'expérience | les 4 fichiers `exp-*.html` |
| Niveaux de compétences | tableau `.nomenclature`, `class="on"` = case remplie |
| Compteurs de la page Moi | attribut `data-vers` |

Couleurs et polices : uniquement dans `assets/css/base.css`, bloc `:root`.

---

## 3. Les images

Le site fonctionne sans aucune image : un cadre hachuré apparaît avec le nom du
fichier attendu. Tu remplis au fur et à mesure.

**`assets/img/projets/`**
`aura-01.jpg` · `tep-revit-01.jpg` · `eurocodes-01.jpg` · `incendie-01.jpg`
· `gpr-01.jpg`

**`assets/img/parcours/`**
`edimbourg-01.jpg` à `edimbourg-05.jpg` · `guivibat-01.jpg` à `guivibat-03.jpg`
· `builders-01.jpg` à `builders-03.jpg` · `chantier-01.jpg` à `chantier-03.jpg`

**`assets/img/logos/`** (logos et écussons, fond transparent de préférence)
`edinburgh.png` · `builders.png` · `guivibat.png` · `stal-tp.png`
· `blaise-pascal.png` · `carnot.png` · `premiers-pas.png` · `favicon.png`

Tant qu'un logo n'est pas déposé, un cadre hachuré s'affiche à sa place avec le
nom du fichier attendu. Aucun risque de casser la mise en page.

**`assets/img/moi/`**
`portrait.jpg` · `tattoo-01.jpg` à `tattoo-04.jpg` · `3d-01.jpg` · `3d-02.jpg`
· `design-01.jpg` · `rugby-01.jpg` · `voyage-01.jpg` · `voyage-02.jpg`

**Conseils :**
- Redimensionne à 1600 px de large maximum et compresse (squoosh.app).
- Noms en minuscules, sans accents ni espaces. GitHub Pages distingue les
  majuscules : `Photo.JPG` n'est pas `photo.jpg`.
- Supprime les données EXIF avant publication : elles contiennent souvent les
  coordonnées GPS du lieu de prise de vue.

---

## 4. Sécurité, à lire avant le premier envoi

Un dépôt GitHub Pages est **public**, et l'historique Git conserve tout, même
après suppression d'un fichier.

**À ne jamais mettre dans ce dépôt :**

- `.env`, clés d'API, mots de passe, identifiants de base de données. Un site
  statique n'en a aucun besoin.
- Documents de stage : plans, notes de calcul, tarifs, noms de clients. Publie
  une capture recadrée ou un schéma que tu as refait, jamais le livrable. En
  cas de doute, demande à ton tuteur.
- Rendus scolaires que ton école interdit de diffuser.
- Documents personnels : pièce d'identité, attestations, adresse postale.
- Photos d'autres personnes sans leur accord.

Vérification avant chaque envoi :

```bash
git status          # liste ce qui va partir
git diff --cached   # affiche le contenu exact des fichiers ajoutés
```

---

## 5. Mise en ligne

Le dépôt s'appelle `Portfolio`, donc le site vit sur
`https://katjounis.github.io/Portfolio/`. C'est parfaitement valable. Pour
avoir l'adresse courte `https://katjounis.github.io`, il faut renommer le dépôt
en `katjounis.github.io` (Settings → Repository name).

1. **Settings → Pages** → Source : *Deploy from a branch* → Branch `main`,
   dossier `/ (root)` → Save.
2. Attends 1 à 2 minutes.
3. Recharge avec **Ctrl + F5** pour contourner le cache du navigateur.

Chaque commit redéploie automatiquement.

---

## 6. Modifier après coup

**Sans rien installer :** ouvre le fichier sur GitHub → icône crayon → modifie
→ Commit changes.

**En local :**

```bash
git clone https://github.com/Katjounis/Portfolio.git
cd Portfolio
python3 -m http.server 8000     # aperçu sur http://localhost:8000
git add .
git commit -m "Ajout des photos d'Edimbourg"
git push
```

Passe toujours par le serveur local plutôt que par un double-clic sur
`index.html` : certains comportements diffèrent en `file://`.

---

## 7. Ajouter une expérience au parcours

1. Duplique un fichier `exp-*.html` et renomme-le.
2. Dans `index.html`, copie un bloc `<article class="niveau cliquable revele">`
   et change l'altitude, le titre et le lien.
3. Si l'expérience est sous le niveau du sol, place-la dans le bloc
   `<div class="coupe sous-sol">` avec une cote négative.

Chaque carte porte son propre morceau de bâtiment dans la gouttière de gauche,
via un `<span class="etage">`. Les variantes disponibles :

| Classe | Rendu |
|---|---|
| `etage etage-toit` | toit-terrasse avec acrotère et garde-corps |
| `etage` | étage courant avec baie vitrée |
| `etage etage-rdc` | rez-de-chaussée avec porte et dalle épaisse à ±0.00 |
| `etage etage-sol sol-remblai` | strate de remblais |
| `etage etage-sol sol-argile` | strate d'argile |
| `etage etage-sol sol-rocher` | substratum rocheux |

La couleur d'un niveau se règle avec `style="--teinte:var(--vert)"` sur
l'`<article>` : bleu pour la formation, jaune pour les stages, vert pour
l'international, rouge pour l'objectif.
