# 🐱 Douces Pattes - Cat Sitter Bordeaux

Site web professionnel pour un service de cat sitting à domicile à Bordeaux.

## 📁 Structure du projet

```
windsurf-project-3/
├── assets/
│   ├── images/
│   │   ├── logos/          # Logos du site (logo.jpg, logov2.png)
│   │   ├── cats/           # Photos de chats clients (mogi1-3)
│   │   └── patterns/       # Éléments graphiques décoratifs (pattern.png → pattern11.png)
│   └── [autres fichiers]   # Icônes et illustrations diverses
├── css/
│   ├── variables.css       # Variables CSS globales (couleurs, espacements, etc.)
│   ├── styles.css          # Styles principaux du site
│   └── patterns.css        # Styles des patterns décoratifs
├── js/
│   └── script.js           # JavaScript principal (navigation, formulaire, animations)
└── index.html              # Page principale

```

## 🎨 Architecture CSS

### Variables (variables.css)
Contient toutes les variables CSS réutilisables :
- **Couleurs** : `--terracotta`, `--warm-brown`, `--text`, etc.
- **Espacements** : `--spacing-xs` à `--spacing-xxl`
- **Border radius** : `--radius-sm`, `--radius-md`, `--radius-lg`
- **Opacités des patterns** : `--pattern-opacity-light` à `--pattern-opacity-strong`
- **Transitions** : `--transition-fast`, `--transition-normal`, `--transition-slow`
- **Ombres** : `--shadow-sm`, `--shadow-md`, `--shadow-lg`

### Styles principaux (styles.css)
- Reset et styles de base
- Layout (header, footer, sections)
- Composants (cards, buttons, formulaires)
- Grilles et conteneurs
- Responsive design

### Patterns décoratifs (patterns.css)
Gestion centralisée de tous les éléments graphiques décoratifs :
- 11 patterns différents positionnés sur les sections
- Utilisation des variables CSS pour les opacités
- Responsive (masquage sur mobile)

## 🚀 Fonctionnalités JavaScript

- **Smooth scroll** : Navigation fluide entre sections
- **Reveal animations** : Apparition progressive des éléments au scroll
- **Formulaire de contact** : Ouverture automatique du client email
- **Logo loading** : Gestion des différents formats d'images
- **Année dynamique** : Mise à jour automatique du copyright

## 📱 Responsive Design

- **Desktop** : Layout complet avec tous les patterns
- **Mobile (≤980px)** : 
  - Navigation simplifiée
  - Masquage des patterns décoratifs
  - Grilles adaptatives
  - Logo redimensionné

## 🎯 Sections du site

1. **Hero** - Présentation principale avec CTA
2. **Avantages** - 4 points forts du service
3. **À propos** - Présentation de Noémie
4. **Galerie** - Photos de chats
5. **Avis clients** - 10 témoignages avec photos et noms des chats
6. **Confiance & sérénité** - Labels et certifications
7. **Services** - Détails des prestations
8. **Fonctionnement** - Processus en 4 étapes
9. **Tarifs** - Grille tarifaire
10. **FAQ** - Questions fréquentes
11. **Contact** - Formulaire et coordonnées

## 🛠️ Optimisations appliquées

### Structure
- ✅ Séparation assets en sous-dossiers (images/logos, images/cats, images/patterns)
- ✅ CSS modulaire (variables, styles, patterns)
- ✅ JavaScript dans dossier dédié

### Performance
- ✅ Lazy loading des images
- ✅ Preload du logo principal
- ✅ Async/defer pour les scripts non critiques
- ✅ Utilisation de `decoding="async"` sur les images

### Accessibilité
- ✅ Attributs ARIA sur les éléments interactifs
- ✅ `role="presentation"` sur les images décoratives
- ✅ Skip link pour la navigation clavier
- ✅ Labels sur les formulaires

### SEO
- ✅ Meta description optimisée
- ✅ Balise canonical
- ✅ Meta robots (index, follow)
- ✅ Structure sémantique HTML5

## 📝 Maintenance

### Ajouter un nouveau pattern
1. Ajouter le fichier dans `assets/images/patterns/`
2. Créer le style dans `css/patterns.css`
3. Utiliser les variables CSS pour l'opacité

### Modifier les couleurs
Éditer `css/variables.css` - tous les changements se propageront automatiquement.

### Ajouter un témoignage
Structure HTML dans `index.html` :
```html
<figure class="quote" data-reveal>
  <div class="quote-gallery">
    <img class="quote-cat" src="..." alt="..." />
    <!-- 3 images au total -->
  </div>
  <div class="quote-pet">Nom du chat</div>
  <blockquote>« Témoignage... »</blockquote>
  <div class="quote-rating" aria-label="Note 5/5">
    <!-- 5 étoiles SVG -->
  </div>
  <figcaption>Prénom, Quartier</figcaption>
</figure>
```

## 🔧 Configuration

### Email de contact
Modifier dans `js/script.js` :
```javascript
const CONFIG = {
  emailTo: "contact@doucevisite.fr",
  // ...
};
```

### Animations
Ajuster dans `js/script.js` :
```javascript
const CONFIG = {
  revealThreshold: 0.12,
  revealMargin: "0px 0px -10% 0px"
};
```

## 🌐 Déploiement

Le site est hébergé via Git et déployé automatiquement :

```bash
# Ajouter les modifications
git add .

# Commiter
git commit -m "Description des changements"

# Pousser en production
git push origin main
```

---

**Dernière mise à jour** : Janvier 2026  
**Technologies** : HTML5, CSS3, Vanilla JavaScript  
**Auteur** : Enguerran Avril
