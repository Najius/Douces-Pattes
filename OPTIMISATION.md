# 🚀 Guide d'optimisation - Douces Pattes

## ✅ Optimisations appliquées

### Phase 1 - Quick Wins
- ✅ Variables CSS consolidées dans `styles.css` (suppression de `variables.css`)
- ✅ Variables inutilisées supprimées
- ✅ Preload ajouté pour ressources critiques (CSS, JS, fonts)
- ✅ Code CSS inutilisé supprimé (footer-links, footer-back-to-top)

### Phase 2 - Images WebP
📝 **Action manuelle requise**

Pour optimiser les images, convertir en WebP :

```bash
# Installation de cwebp (si nécessaire)
brew install webp  # macOS
# ou
sudo apt install webp  # Linux

# Conversion des images
cd assets/images
for file in *.jpg *.jpeg *.png; do
  cwebp -q 85 "$file" -o "${file%.*}.webp"
done
```

Ensuite, utiliser le format `<picture>` dans le HTML :
```html
<picture>
  <source type="image/webp" srcset="image.webp">
  <img src="image.jpg" alt="..." loading="lazy">
</picture>
```

**Gain estimé** : -35% poids images (~200 KB)

### Phase 3 - Performance avancée
- ✅ Service Worker créé (`sw.js`) pour cache offline
- ✅ Lazy loading amélioré avec Intersection Observer
- ✅ Stratégie de cache Network First avec fallback

---

## 📦 Minification pour production

### Étape 1 : Installation des outils

```bash
npm install -g csso terser
```

### Étape 2 : Minification CSS

```bash
# Minifier styles.css
csso css/styles.css -o css/styles.min.css

# Minifier patterns.css
csso css/patterns.css -o css/patterns.min.css
```

### Étape 3 : Minification JavaScript

```bash
# Minifier script.js
terser js/script.js -o js/script.min.js -c -m

# Minifier sw.js
terser sw.js -o sw.min.js -c -m
```

### Étape 4 : Mettre à jour index.html pour la prod

```html
<!-- Remplacer -->
<link rel="stylesheet" href="css/styles.css" />
<link rel="stylesheet" href="css/patterns.css" />

<!-- Par -->
<link rel="stylesheet" href="css/styles.min.css" />
<link rel="stylesheet" href="css/patterns.min.css" />

<!-- Et -->
<script src="js/script.js"></script>

<!-- Par -->
<script src="js/script.min.js"></script>
```

**Gain estimé** : -30% poids CSS/JS (~12 KB)

---

## 🎯 Critical CSS (optionnel)

Pour un rendu encore plus rapide, extraire le CSS critique et l'inliner :

```bash
npm install -g critical

critical index.html --base . --inline --minify > index-critical.html
```

Ou manuellement, copier dans `<head>` :
```html
<style>
/* CSS critique pour above-the-fold */
.site-header { ... }
.hero { ... }
.button { ... }
</style>
```

---

## 📊 Résultats attendus

### Avant optimisation
- **Poids total** : ~130 KB (sans images)
- **Requêtes HTTP** : 15
- **Temps de chargement** : ~2s
- **Score Lighthouse** : 85

### Après optimisation complète
- **Poids total** : ~70 KB (-46%) ✅
- **Requêtes HTTP** : 12 (-20%) ✅
- **Temps de chargement** : ~1.2s (-40%) ✅
- **Score Lighthouse** : 95+ (+10 points) ✅

---

## 🧪 Test en local

```bash
# Lancer le serveur local
python3 -m http.server 8000

# Tester le Service Worker
# Ouvrir : http://localhost:8000
# DevTools > Application > Service Workers
```

---

## ⚡ Checklist déploiement production

- [ ] Minifier CSS (`csso`)
- [ ] Minifier JS (`terser`)
- [ ] Convertir images en WebP
- [ ] Mettre à jour les liens vers `.min.css` et `.min.js`
- [ ] Tester Service Worker
- [ ] Vérifier Score Lighthouse (>90)
- [ ] Tester sur mobile (3G simulé)

---

## 🔧 Maintenance

### Mise à jour du cache Service Worker

Quand vous modifiez le site, incrémenter la version :

```javascript
// sw.js
const CACHE_NAME = 'douces-pattes-v2'; // v1 → v2
```

Le Service Worker va automatiquement :
1. Supprimer l'ancien cache
2. Créer le nouveau cache
3. Mettre à jour les ressources

---

**Documentation créée le** : 19 janvier 2026
