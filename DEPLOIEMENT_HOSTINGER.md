# 🚀 Guide de déploiement Hostinger - Douces Pattes

## 📋 Prérequis

- Un compte Hostinger (plan Premium ou Business recommandé pour un domaine personnalisé)
- Votre nom de domaine `doucespattes.fr` (configuré dans Hostinger)
- Accès FTP ou au File Manager Hostinger
- Les fichiers du site prêts à être uploadés

---

## 📦 Étape 1 : Préparation des fichiers

### 1.1 Minification des ressources (recommandé)

Avant de déployer, minifiez vos fichiers pour de meilleures performances :

```bash
# Installation des outils
npm install -g csso terser

# Minifier CSS
csso css/styles.css -o css/styles.min.css
csso css/patterns.css -o css/patterns.min.css

# Minifier JavaScript
terser js/script.js -o js/script.min.js -c -m
terser sw.js -o sw.min.js -c -m
```

### 1.2 Mettre à jour index.html pour la production

Modifiez les liens vers les fichiers minifiés dans `index.html`, `mentions-legales.html` et `merci.html` :

```html
<!-- CSS -->
<link rel="stylesheet" href="css/styles.min.css" />
<link rel="preload" href="css/patterns.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />

<!-- JavaScript -->
<script src="js/script.min.js"></script>
```

Et dans `index.html`, ligne avec le Service Worker :
```javascript
navigator.serviceWorker.register('/sw.min.js')
```

### 1.3 Vérifier le fichier .htaccess

Le fichier `.htaccess` est déjà configuré avec :
- ✅ Headers de sécurité
- ✅ Compression Gzip
- ✅ Cache navigateur
- ✅ Protection contre les injections
- ✅ Redirection 404 vers index.html

**Aucune modification nécessaire !**

---

## 🌐 Étape 2 : Configuration du domaine sur Hostinger

### 2.1 Pointer votre domaine

Si votre domaine n'est pas encore chez Hostinger :

1. Connectez-vous à votre **panel Hostinger** (hpanel)
2. Allez dans **Domaines** > **Ajouter un domaine**
3. Entrez `doucespattes.fr`
4. Notez les **Nameservers Hostinger** :
   - `ns1.dns-parking.com`
   - `ns2.dns-parking.com`
5. Allez chez votre registrar (OVH, Gandi, etc.) et changez les nameservers

⏱️ **Propagation DNS** : 24-48h (généralement 1-2h)

### 2.2 Configuration SSL/HTTPS

1. Dans **hPanel** > **Sécurité** > **SSL**
2. Activez le **SSL gratuit** (Let's Encrypt)
3. Cochez **Forcer HTTPS**

---

## 📤 Étape 3 : Upload des fichiers

### Option A : Via File Manager (recommandé pour débutants)

1. Connectez-vous au **hPanel Hostinger**
2. Allez dans **Fichiers** > **File Manager**
3. Naviguez vers `/public_html/` (ou le dossier de votre domaine)
4. **Supprimez** tous les fichiers par défaut (index.html de Hostinger)
5. **Uploadez** tous vos fichiers :
   ```
   ├── index.html
   ├── mentions-legales.html
   ├── merci.html
   ├── .htaccess
   ├── robots.txt
   ├── sitemap.xml
   ├── manifest.json
   ├── sw.js (ou sw.min.js)
   ├── favicon.ico
   ├── css/
   ├── js/
   └── assets/
   ```

6. **Important** : Vérifiez que `.htaccess` est bien uploadé (fichiers cachés)

### Option B : Via FTP (FileZilla)

#### Configuration FTP dans Hostinger

1. **hPanel** > **Fichiers** > **Comptes FTP**
2. Créez un nouveau compte FTP ou utilisez le principal
3. Notez les infos :
   - **Hôte** : `ftp.doucespattes.fr` ou IP serveur
   - **Nom d'utilisateur** : `u123456789` (exemple)
   - **Mot de passe** : votre mot de passe
   - **Port** : 21 (FTP) ou 22 (SFTP)

#### Upload avec FileZilla

1. Ouvrez **FileZilla**
2. Connectez-vous avec les identifiants FTP
3. À gauche : vos fichiers locaux
4. À droite : serveur Hostinger (`/public_html/`)
5. **Glissez-déposez** tous les fichiers vers `/public_html/`

---

## ⚙️ Étape 4 : Configuration post-déploiement

### 4.1 Vérifier les permissions des fichiers

Dans **File Manager** :
- **Fichiers** : permissions `644` (lecture pour tous)
- **Dossiers** : permissions `755` (exécution pour tous)
- **`.htaccess`** : permissions `644`

### 4.2 Tester le site

Ouvrez votre navigateur et testez :

1. **Page d'accueil** : `https://doucespattes.fr`
2. **Pages secondaires** :
   - `https://doucespattes.fr/mentions-legales.html`
   - `https://doucespattes.fr/merci.html`
3. **Redirection HTTPS** : tapez `http://doucespattes.fr` (doit rediriger vers `https://`)
4. **Service Worker** :
   - Ouvrir DevTools (F12)
   - Application > Service Workers
   - Vérifier qu'il est actif

### 4.3 Vérifier les headers de sécurité

Testez sur : **https://securityheaders.com/**

Vous devriez avoir un score **A** grâce au `.htaccess`

### 4.4 Tester les performances

1. **PageSpeed Insights** : https://pagespeed.web.dev/
2. **GTmetrix** : https://gtmetrix.com/
3. **Pingdom** : https://tools.pingdom.com/

**Score attendu** : 90-95+ sur mobile et desktop

---

## 🔧 Configuration avancée (optionnel)

### Email professionnel

Créez un email `contact@doucespattes.fr` :

1. **hPanel** > **Emails**
2. **Créer un compte email**
3. Utilisez-le dans votre formulaire de contact

### Sauvegardes automatiques

Hostinger fait des sauvegardes quotidiennes automatiques, mais vous pouvez :

1. **hPanel** > **Sauvegardes**
2. Télécharger une sauvegarde manuelle avant chaque mise à jour

### Redirections www

Si vous voulez `www.doucespattes.fr` → `doucespattes.fr`, ajoutez dans `.htaccess` :

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # Redirection www vers non-www
  RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
  RewriteRule ^(.*)$ https://%1/$1 [R=301,L]
</IfModule>
```

---

## 📊 Checklist finale de déploiement

- [ ] Fichiers minifiés (CSS, JS)
- [ ] `.htaccess` uploadé
- [ ] `robots.txt` et `sitemap.xml` uploadés
- [ ] SSL activé (HTTPS forcé)
- [ ] Domaine pointe vers Hostinger
- [ ] Page d'accueil s'affiche correctement
- [ ] Images chargent bien
- [ ] Formulaire de contact fonctionne
- [ ] Service Worker actif
- [ ] Test sur mobile
- [ ] Score PageSpeed > 90
- [ ] Headers de sécurité configurés
- [ ] Redirections 404 fonctionnent

---

## 🐛 Dépannage

### Le site n'affiche pas

1. **Vérifier la propagation DNS** : https://dnschecker.org/
2. **Vider le cache navigateur** : Ctrl+Shift+R (Windows) ou Cmd+Shift+R (Mac)
3. **Vérifier les fichiers** : assurez-vous que `index.html` est à la racine de `/public_html/`

### Les images ne chargent pas

1. **Vérifier les permissions** : dossier `assets/` doit être `755`
2. **Vérifier les chemins** : dans `index.html`, les chemins doivent être relatifs (`assets/images/...`)
3. **Vérifier la casse** : Linux est sensible à la casse (`logo.png` ≠ `Logo.PNG`)

### .htaccess ne fonctionne pas

1. **Vérifier qu'il est uploadé** : fichiers cachés parfois invisibles
2. **Vérifier les permissions** : doit être `644`
3. **Tester la syntaxe** : une erreur bloque tout le fichier
4. **Vérifier que mod_rewrite est activé** : contactez le support Hostinger si besoin

### Formulaire de contact ne fonctionne pas

**Attention** : Votre formulaire actuel envoie vers `mailto:` ce qui ouvre le client email.

**Solution recommandée** : utiliser un service backend :
- **Formspree** : https://formspree.io/ (gratuit, 50/mois)
- **EmailJS** : https://www.emailjs.com/ (gratuit, 200/mois)
- **Hostinger PHP** : créer un script PHP (voir ci-dessous)

#### Option PHP (à créer)

Créez un fichier `send-email.php` :

```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST['message']);
    
    $to = "contact@doucespattes.fr";
    $subject = "Nouveau message depuis doucespattes.fr";
    $body = "Nom: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $email\r\nReply-To: $email";
    
    if (mail($to, $subject, $body, $headers)) {
        header("Location: /merci.html");
    } else {
        echo "Erreur lors de l'envoi.";
    }
}
?>
```

Et modifiez votre formulaire :
```html
<form action="/send-email.php" method="POST">
```

---

## 📱 Configuration mobile-first

Votre site est déjà optimisé mobile, mais testez sur :

1. **Chrome DevTools** : Mode responsive
2. **BrowserStack** : vrais appareils
3. **Google Mobile-Friendly Test** : https://search.google.com/test/mobile-friendly

---

## 🎯 Optimisations supplémentaires

### Conversion images WebP

```bash
cd assets/images
for file in *.jpg *.png; do
  cwebp -q 85 "$file" -o "${file%.*}.webp"
done
```

Puis utilisez `<picture>` dans le HTML :
```html
<picture>
  <source type="image/webp" srcset="assets/images/image.webp">
  <img src="assets/images/image.jpg" alt="..." loading="lazy">
</picture>
```

### CDN Cloudflare (gratuit)

Pour encore plus de performance :

1. Créez un compte **Cloudflare** (gratuit)
2. Ajoutez votre domaine `doucespattes.fr`
3. Changez les nameservers vers Cloudflare
4. Activez :
   - **Auto Minify** (CSS, JS, HTML)
   - **Brotli compression**
   - **Rocket Loader**
   - **Mirage** (optimisation images)

---

## 📞 Support

- **Hostinger Support** : 24/7 chat live dans hPanel
- **Documentation** : https://support.hostinger.com/
- **Communauté** : Forum Hostinger

---

## ✅ Résumé : déploiement rapide

```bash
# 1. Minifier les fichiers
npm install -g csso terser
csso css/styles.css -o css/styles.min.css
terser js/script.js -o js/script.min.js -c -m

# 2. Se connecter à Hostinger hPanel

# 3. File Manager > /public_html/

# 4. Uploader tous les fichiers

# 5. Vérifier : https://doucespattes.fr

# 6. Tester performances : PageSpeed Insights
```

---

**Date de création** : 31 janvier 2026  
**Site** : Douces Pattes Pet Sitting Bordeaux  
**Hébergeur** : Hostinger  
**Domaine** : doucespattes.fr
