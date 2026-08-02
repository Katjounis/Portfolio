# Portfolio — mode d'emploi

Site statique (HTML/CSS/JS), sans outil à installer, hébergé gratuitement sur
GitHub Pages.

---

## 1. Structure du dépôt

```
katjounis.github.io/
├── index.html              ← page d'accueil (parcours, projets, compétences)
├── moi.html                ← page personnelle
├── 404.html                ← page affichée si l'URL n'existe pas
├── README.md               ← ce fichier
├── .gitignore              ← liste des fichiers à ne jamais publier
├── .nojekyll               ← désactive Jekyll (sinon les dossiers en _ sont ignorés)
└── assets/
    ├── css/
    │   ├── base.css        ← couleurs, polices, composants communs
    │   ├── accueil.css     ← styles de index.html
    │   └── moi.css         ← styles de moi.html
    ├── js/
    │   ├── app.js          ← animations au défilement, images manquantes
    │   └── moi.js          ← compteurs, bandeau défilant
    ├── img/
    │   ├── projets/        ← visuels de projets
    │   ├── parcours/       ← photos Édimbourg, stage, école
    │   ├── logos/          ← blasons, favicon
    │   └── moi/            ← portrait, tatouages, 3D, rugby, voyages
    └── docs/
        └── cv.pdf          ← ton CV (à déposer)
```

---

## 2. Ce qu'il faut modifier

Ouvre `index.html` et `moi.html` et cherche le symbole **✏️** : il marque
chaque endroit à personnaliser. Récapitulatif :

| Quoi | Où |
|---|---|
| Prénom, nom, initiales | `index.html` + `moi.html`, balises `<title>`, `.sigle`, `.nom` |
| Adresse e-mail | pieds de page des deux fichiers |
| LinkedIn, GitHub, TikTok | pieds de page + section Tatouage |
| Phrase d'accroche | `.accroche` dans `index.html`, `.moi-intro` dans `moi.html` |
| Niveaux de compétences | tableau `.nomenclature` — `class="on"` = case remplie |
| Compteurs de la page Moi | attribut `data-vers` dans `.compteur` |
| Date de disponibilité PFE | `.role` et le bloc `.bloc-grille` |

Pour changer les couleurs : uniquement dans `assets/css/base.css`, bloc
`:root` en haut du fichier.

---

## 3. Les images

Le site fonctionne même sans aucune image : un cadre hachuré apparaît à la
place, avec le nom du fichier attendu. Tu remplis au fur et à mesure.

Noms de fichiers attendus (respecte-les exactement, ou modifie le HTML) :

**`assets/img/projets/`**
`tep-revit-01.jpg` · `eurocodes-01.jpg` · `incendie-01.jpg` · `gpr-01.jpg`

**`assets/img/parcours/`**
`edimbourg-01.jpg` · `edimbourg-02.jpg` · `edimbourg-03.jpg`

**`assets/img/logos/`**
`edinburgh.png` (blason de l'université) · `favicon.png` (carré, 64×64)

**`assets/img/moi/`**
`portrait.jpg` · `tattoo-01.jpg` à `tattoo-04.jpg` · `3d-01.jpg` · `3d-02.jpg`
· `design-01.jpg` · `rugby-01.jpg` · `voyage-01.jpg` · `voyage-02.jpg`

**Conseils :**
- Redimensionne à **1600 px de large maximum** et compresse (squoosh.app,
  gratuit). Une photo de téléphone brute fait 5 Mo et ralentit tout le site.
- Formats : `.jpg` pour les photos, `.png` pour les logos et dessins au trait.
- Noms de fichiers en minuscules, sans accents ni espaces. GitHub Pages est
  sensible à la casse : `Photo.JPG` ≠ `photo.jpg`.
- **Supprime les données EXIF** de tes photos avant publication : elles
  contiennent souvent les coordonnées GPS du lieu de prise de vue.

---

## 4. Sécurité — à lire avant le premier envoi

Un dépôt GitHub Pages est **public**. Tout ce que tu committes est visible par
n'importe qui, et **reste dans l'historique Git même après suppression**.

**À ne jamais mettre dans ce dépôt :**

- **`.env`, clés d'API, mots de passe, identifiants de base de données.**
  Un site statique n'en a aucun besoin. S'il t'en faut un jour, c'est que le
  projet doit vivre dans un autre dépôt, privé.
- **Documents de stage.** Plans, notes de calcul, tarifs, noms de clients :
  tout cela appartient à l'entreprise. Publie des captures recadrées ou des
  rendus flous, jamais le livrable. En cas de doute, demande à ton tuteur.
- **Rendus scolaires notés** que ton école interdit de diffuser.
- **Documents personnels** : CIN, attestations, bulletins, adresse postale,
  numéro de téléphone si tu ne veux pas le voir aspiré par des robots.
- **Photos d'autres personnes** sans leur accord.

**Si tu as déjà commité un secret par erreur :** le supprimer et recommiter ne
suffit pas, il reste dans l'historique. Considère la clé comme compromise et
révoque-la immédiatement.

**Vérification rapide avant chaque envoi :**

```bash
git status          # liste ce qui va partir
git diff --cached   # affiche le contenu exact des fichiers ajoutés
```

---

## 5. Mise en ligne

1. Sur GitHub : **New repository** → nom exact `katjounis.github.io` →
   **Public** → Create repository.
2. Sur la page du dépôt vide, clique **uploading an existing file**, glisse
   **tout le contenu** de ce dossier (y compris `assets/`), puis
   **Commit changes**.
3. **Settings** → **Pages** → Source : *Deploy from a branch* → Branch `main`,
   dossier `/ (root)` → **Save**.
4. Attends 1 à 2 minutes : le site est en ligne sur
   `https://katjounis.github.io`.

Chaque modification commitée se redéploie automatiquement en ~1 minute.

> `.gitignore` et `.nojekyll` commencent par un point : certains systèmes les
> masquent. Dans l'explorateur Windows, active « Éléments masqués » ; sur Mac,
> `Cmd + Maj + .`. S'ils manquent, crée-les directement sur GitHub avec
> **Add file → Create new file**.

---

## 6. Modifier après coup

**Sans rien installer :** sur GitHub, ouvre le fichier → icône crayon →
modifie → *Commit changes*.

**En local (recommandé dès que tu changes plusieurs fichiers) :**

```bash
git clone https://github.com/katjounis/katjounis.github.io.git
cd katjounis.github.io
python3 -m http.server 8000     # aperçu sur http://localhost:8000
# … tes modifications …
git add .
git commit -m "Ajout des photos d'Édimbourg"
git push
```

L'aperçu local est important : ouvrir `index.html` par double-clic
(`file://`) fonctionne, mais certains comportements diffèrent du serveur réel.

---

## 7. Nom de domaine personnalisé (optionnel)

1. Achète `prenom-nom.fr` (~10 €/an chez OVH, Gandi, Namecheap).
2. Chez le registrar, crée quatre enregistrements **A** pour `@` :
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   et un **CNAME** pour `www` → `katjounis.github.io`.
3. Sur GitHub : **Settings → Pages → Custom domain** → saisis ton domaine.
4. Une fois le certificat émis, coche **Enforce HTTPS**.

La propagation DNS prend de quelques minutes à 24 h.
