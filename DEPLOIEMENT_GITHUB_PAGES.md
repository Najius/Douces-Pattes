# 🚀 Déploiement sur GitHub Pages - Douces Pattes

## ✅ Étape 1 : Code poussé sur GitHub

Votre site est maintenant sur GitHub : **https://github.com/Najius/Douces-Pattes**

---

## 🌐 Étape 2 : Activer GitHub Pages

### Configuration depuis GitHub

1. Allez sur votre dépôt : **https://github.com/Najius/Douces-Pattes**
2. Cliquez sur **Settings** (Paramètres)
3. Dans le menu de gauche, cliquez sur **Pages**
4. Dans la section **Source** :
   - Branch : **main**
   - Folder : **/ (root)**
5. Cliquez sur **Save**

### Votre site sera accessible à :
```
https://najius.github.io/Douces-Pattes/
```

⏱️ **Déploiement** : 1-2 minutes

---

## ⚠️ Important : Domaine personnalisé

Si vous voulez utiliser **doucespattes.fr** avec GitHub Pages :

### Configuration DNS chez votre registrar

Ajoutez ces enregistrements DNS :

```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: CNAME
Name: www
Value: najius.github.io
```

### Configuration dans GitHub Pages

1. GitHub > Settings > Pages
2. Section **Custom domain**
3. Entrez : `doucespattes.fr`
4. Cochez **Enforce HTTPS** (attendez quelques minutes)

---

## 📝 Limitations de GitHub Pages

**❌ Problème : Formulaire de contact**

GitHub Pages est **statique uniquement** - pas de PHP !

Votre fichier `send-email.php` **ne fonctionnera pas**.

### Solutions :

#### Option 1 : Formspree (recommandé)

1. Allez sur **https://formspree.io/**
2. Créez un compte gratuit (50 soumissions/mois)
3. Créez un nouveau formulaire
4. Copiez l'URL du formulaire (ex: `https://formspree.io/f/xyzabc123`)

Modifiez `index.html` :
```html
<form action="https://formspree.io/f/VOTRE_ID" method="POST">
  <input type="text" name="name" required>
  <input type="email" name="email" required>
  <textarea name="message" required></textarea>
  <button type="submit">Envoyer</button>
</form>
```

#### Option 2 : EmailJS

1. https://www.emailjs.com/ (gratuit, 200/mois)
2. Configurez un service email
3. Utilisez leur SDK JavaScript

#### Option 3 : Netlify (meilleure pour le formulaire)

Si le formulaire est crucial, restez sur **Netlify** au lieu de GitHub Pages.
Netlify supporte les formulaires natifs sans backend.

---

## 🔧 GitHub Pages vs Hostinger

| Critère | GitHub Pages | Hostinger |
|---------|--------------|-----------|
| **Hébergement** | ✅ Gratuit | 💰 Payant |
| **HTTPS** | ✅ Automatique | ✅ Let's Encrypt |
| **Domaine custom** | ✅ Oui | ✅ Oui |
| **Formulaire** | ❌ Statique seulement | ✅ PHP supporté |
| **Backend/PHP** | ❌ Non | ✅ Oui |
| **Déploiement** | ✅ Git push auto | 📤 FTP manuel |
| **Vitesse** | ⚡ CDN mondial | 🌐 Serveur unique |

### Recommandation

**Pour Douces Pattes** :
- ✅ **Hostinger** : formulaire de contact essentiel
- Ou **Netlify** : gratuit + formulaires intégrés

**GitHub Pages** est excellent pour :
- Sites statiques
- Documentation
- Portfolio sans formulaire
- Landing pages simples

---

## 🎯 Actions selon votre choix

### Choix A : Rester sur GitHub Pages

1. ✅ Site déjà déployé sur `https://najius.github.io/Douces-Pattes/`
2. ⚠️ Remplacer le formulaire par Formspree ou EmailJS
3. ⚠️ Supprimer `send-email.php` (inutile)

### Choix B : Migrer vers Hostinger

1. 📋 Suivre `DEPLOIEMENT_HOSTINGER.md`
2. 📤 Upload via FTP avec `./deploy-hostinger-secure.sh`
3. ✅ Formulaire PHP fonctionnel

### Choix C : Utiliser Netlify (recommandé)

1. 📋 Suivre `DEPLOIEMENT_NETLIFY.md`
2. ✅ Formulaires natifs (sans PHP)
3. ✅ Déploiement automatique via Git
4. ✅ Gratuit avec domaine custom

---

## 📊 Comparatif final

**Netlify** = Meilleur compromis :
- ✅ Gratuit
- ✅ Formulaires sans backend
- ✅ Déploiement Git automatique
- ✅ CDN mondial
- ✅ HTTPS auto
- ✅ Domaine custom gratuit

**Hostinger** = Si vous avez besoin de :
- Base de données
- Email professionnel inclus
- Support commercial
- Contrôle total du serveur

**GitHub Pages** = Si formulaire non critique :
- ✅ Totalement gratuit
- ✅ Déploiement ultra-simple
- ✅ Parfait pour portfolio/vitrine
- ❌ Pas de formulaire serveur

---

## 🚀 Déploiement automatique GitHub Pages

Votre site se met à jour automatiquement à chaque `git push` !

```bash
# Faire des modifications
git add .
git commit -m "Update site"
git push origin main

# ✅ Site mis à jour en 1-2 minutes
```

---

## 🔗 Liens utiles

- **Dépôt GitHub** : https://github.com/Najius/Douces-Pattes
- **Site GitHub Pages** : https://najius.github.io/Douces-Pattes/
- **Doc GitHub Pages** : https://docs.github.com/pages
- **Formspree** : https://formspree.io
- **EmailJS** : https://www.emailjs.com

---

**Date de création** : 2 février 2026  
**Status** : ✅ Code poussé sur GitHub  
**Prochaine étape** : Activer GitHub Pages dans Settings
