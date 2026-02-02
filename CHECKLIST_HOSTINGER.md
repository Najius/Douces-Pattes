# ✅ Checklist de déploiement Hostinger - Douces Pattes

## 🎯 Avant le déploiement

### 1. Préparation des fichiers

- [ ] Exécuter `./build-production.sh` pour minifier CSS et JS
- [ ] Vérifier que les fichiers `.min.css` et `.min.js` sont créés
- [ ] Modifier **send-email.php** ligne 10 : remplacer l'email par le vôtre
  ```php
  $to_email = "VOTRE_EMAIL@doucespattes.fr";
  ```

### 2. Modification du formulaire de contact

Dans `index.html`, ligne **696**, modifier la balise `<form>` :

**AVANT (Netlify)** :
```html
<form class="form" id="contact-form" name="contact" method="POST" 
      data-netlify="true" data-netlify-honeypot="website" 
      action="/merci.html" novalidate data-reveal>
```

**APRÈS (Hostinger)** :
```html
<form class="form" id="contact-form" method="POST" 
      action="/send-email.php" novalidate data-reveal>
```

- [ ] Supprimer `data-netlify="true"`
- [ ] Supprimer `data-netlify-honeypot="website"`
- [ ] Supprimer `name="contact"`
- [ ] Changer `action="/merci.html"` en `action="/send-email.php"`

### 3. Supprimer la ligne du hidden input Netlify

Dans `index.html`, ligne **759**, supprimer :
```html
<input type="hidden" name="form-name" value="contact" />
```

- [ ] Ligne 759 supprimée

### 4. Mettre à jour les liens CSS/JS

Dans `index.html` :

**CSS (ligne 36)** :
```html
<link rel="stylesheet" href="css/styles.min.css" />
```

**CSS Patterns (ligne 37)** :
```html
<link rel="preload" href="css/patterns.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
<noscript><link rel="stylesheet" href="css/patterns.min.css" /></noscript>
```

- [ ] CSS vers `.min.css` (lignes 36-38)

Dans `js/script.js`, modifier l'enregistrement du Service Worker :
```javascript
navigator.serviceWorker.register('/sw.min.js')
```

- [ ] Service Worker vers `sw.min.js`
- [ ] Re-minifier `script.js` après modification

---

## 🌐 Configuration Hostinger

### 5. Configuration du domaine

- [ ] Se connecter au **hPanel Hostinger**
- [ ] Aller dans **Domaines** > Ajouter `doucespattes.fr`
- [ ] Noter les nameservers Hostinger
- [ ] Changer les nameservers chez votre registrar
- [ ] Attendre propagation DNS (1-48h)

### 6. Configuration SSL

- [ ] Dans hPanel > **Sécurité** > **SSL**
- [ ] Activer **SSL gratuit** (Let's Encrypt)
- [ ] Cocher **Forcer HTTPS**

### 7. Configuration Email (optionnel)

- [ ] hPanel > **Emails** > Créer `contact@doucespattes.fr`
- [ ] Noter les identifiants
- [ ] Utiliser cet email dans `send-email.php`

---

## 📤 Upload des fichiers

### 8. Connexion FTP ou File Manager

**Option A : File Manager** (recommandé)
- [ ] hPanel > **Fichiers** > **File Manager**
- [ ] Aller dans `/public_html/`
- [ ] Supprimer les fichiers par défaut de Hostinger

**Option B : FTP (FileZilla)**
- [ ] hPanel > **Fichiers** > **Comptes FTP**
- [ ] Noter les identifiants FTP
- [ ] Se connecter avec FileZilla

### 9. Upload des fichiers

Uploader tous ces fichiers dans `/public_html/` :

**Fichiers HTML** :
- [ ] `index.html` (modifié avec formulaire PHP)
- [ ] `mentions-legales.html`
- [ ] `merci.html`

**Fichiers de configuration** :
- [ ] `.htaccess` (important !)
- [ ] `robots.txt`
- [ ] `sitemap.xml`
- [ ] `manifest.json`

**Fichiers PHP** :
- [ ] `send-email.php` (avec votre email)

**Fichiers JavaScript** :
- [ ] `sw.min.js` (Service Worker minifié)

**Dossiers complets** :
- [ ] `css/` (avec `.min.css`)
- [ ] `js/` (avec `.min.js`)
- [ ] `assets/` (images, fonts, etc.)
- [ ] `favicon.ico`

### 10. Vérification des permissions

- [ ] Fichiers : `644`
- [ ] Dossiers : `755`
- [ ] `.htaccess` : `644`

---

## 🧪 Tests post-déploiement

### 11. Tests fonctionnels

- [ ] Ouvrir `https://doucespattes.fr`
- [ ] Page d'accueil charge correctement
- [ ] Images s'affichent
- [ ] CSS appliqué (pas de texte brut)
- [ ] Menu burger fonctionne (mobile)
- [ ] Scroll smooth fonctionne
- [ ] Animations au scroll fonctionnent

### 12. Test du formulaire de contact

- [ ] Remplir le formulaire
- [ ] Cliquer sur "Envoyer"
- [ ] Redirection vers `/merci.html`
- [ ] Email reçu à `contact@doucespattes.fr`
- [ ] Vérifier le contenu de l'email

### 13. Test HTTPS

- [ ] Taper `http://doucespattes.fr` (sans s)
- [ ] Doit rediriger vers `https://`
- [ ] Cadenas vert dans la barre d'adresse
- [ ] Certificat SSL valide

### 14. Test Service Worker

- [ ] Ouvrir DevTools (F12)
- [ ] Onglet **Application** > **Service Workers**
- [ ] Vérifier que `sw.min.js` est activé
- [ ] Tester le mode offline (décocher "Network")
- [ ] Le site doit toujours charger

### 15. Test des pages secondaires

- [ ] `https://doucespattes.fr/mentions-legales.html`
- [ ] Vérifier le lien "Retour à l'accueil"

---

## 📊 Tests de performance

### 16. PageSpeed Insights

- [ ] Aller sur https://pagespeed.web.dev/
- [ ] Tester `https://doucespattes.fr`
- [ ] Score mobile > 90
- [ ] Score desktop > 95

### 17. Security Headers

- [ ] Aller sur https://securityheaders.com/
- [ ] Tester `https://doucespattes.fr`
- [ ] Score : **A** ou **A+**

### 18. GTmetrix

- [ ] Aller sur https://gtmetrix.com/
- [ ] Tester le site
- [ ] Grade : **A** ou **B**

### 19. Mobile-Friendly Test

- [ ] https://search.google.com/test/mobile-friendly
- [ ] Vérifier que le site est "Mobile-friendly"

---

## 🔧 Configuration avancée (optionnel)

### 20. Google Search Console

- [ ] Ajouter le site sur https://search.google.com/search-console
- [ ] Vérifier la propriété (méthode DNS ou fichier)
- [ ] Soumettre le `sitemap.xml`

### 21. Google Analytics (optionnel)

- [ ] Créer un compte Google Analytics
- [ ] Ajouter le code de suivi dans `index.html`

### 22. Cloudflare (optionnel, pour CDN)

- [ ] Créer un compte Cloudflare
- [ ] Ajouter le domaine
- [ ] Changer les nameservers vers Cloudflare
- [ ] Activer Auto Minify et Brotli

---

## ✅ Validation finale

### 23. Checklist complète

- [ ] Site accessible via `https://doucespattes.fr`
- [ ] HTTPS forcé (redirection automatique)
- [ ] Formulaire de contact fonctionne
- [ ] Emails reçus correctement
- [ ] Service Worker actif
- [ ] Score PageSpeed > 90
- [ ] Score Security Headers : A
- [ ] Site mobile-friendly
- [ ] Toutes les images chargent
- [ ] Pas d'erreurs console (F12)

### 24. Sauvegarde

- [ ] Télécharger une sauvegarde depuis hPanel
- [ ] Garder une copie locale de tous les fichiers
- [ ] Noter les identifiants FTP/hPanel en lieu sûr

---

## 🎉 Félicitations !

Votre site **Douces Pattes** est maintenant en ligne sur Hostinger !

### Prochaines étapes recommandées :

1. **Monitorer les emails** du formulaire de contact
2. **Vérifier Google Analytics** (si configuré) pour voir le trafic
3. **Mettre à jour le contenu** régulièrement
4. **Partager le site** sur les réseaux sociaux
5. **Créer des profils locaux** : Google Business Profile, PagesJaunes, etc.

### En cas de problème :

- Consultez `DEPLOIEMENT_HOSTINGER.md` (section Dépannage)
- Contactez le support Hostinger (chat 24/7)
- Vérifiez les logs d'erreur PHP dans hPanel

---

**Date de création** : 31 janvier 2026  
**Version** : 1.0
