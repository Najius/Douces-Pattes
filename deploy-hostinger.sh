#!/bin/bash

# ==========================================
# Script de déploiement automatique FTP
# Douces Pattes → Hostinger
# ==========================================

echo "🚀 Déploiement automatique vers Hostinger"
echo "=========================================="
echo ""

# ⚠️ CONFIGURATION À MODIFIER
FTP_HOST="ftp.doucespattes.fr"  # ou l'IP du serveur Hostinger
FTP_USER="u123456789"             # votre nom d'utilisateur FTP
FTP_PASS="VOTRE_MOT_DE_PASSE"    # votre mot de passe FTP
FTP_DIR="/public_html"            # dossier distant (généralement /public_html)

# Vérifier si lftp est installé
if ! command -v lftp &> /dev/null; then
    echo "❌ lftp n'est pas installé."
    echo ""
    echo "Installation requise :"
    echo "  macOS  : brew install lftp"
    echo "  Linux  : sudo apt install lftp"
    echo ""
    exit 1
fi

echo "📦 Étape 1/3 : Build de production..."
echo ""

# Exécuter le build
./build-production.sh
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build"
    exit 1
fi

echo ""
echo "📤 Étape 2/3 : Upload des fichiers via FTP..."
echo ""

# Upload via lftp avec miroir
lftp -e "
set ftp:ssl-allow no;
set ssl:verify-certificate no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
lcd $(pwd);
cd $FTP_DIR;
mirror --reverse \
       --delete \
       --verbose \
       --exclude .git/ \
       --exclude .DS_Store \
       --exclude node_modules/ \
       --exclude build-production.sh \
       --exclude deploy-hostinger.sh \
       --exclude *.md \
       --exclude DEPLOIEMENT_*.md \
       --exclude GUIDE_*.md \
       --exclude OPTIMISATION*.md \
       --exclude README.md \
       --exclude MIGRATION*.md \
       --exclude NETLIFY*.md \
       --exclude REPONSE*.md \
       --exclude PERFORMANCE*.md \
       --exclude netlify.toml \
       --exclude _headers;
bye
"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Étape 3/3 : Déploiement terminé !"
    echo ""
    echo "🌐 Votre site est accessible sur :"
    echo "   https://doucespattes.fr"
    echo ""
else
    echo ""
    echo "❌ Erreur lors du déploiement FTP"
    exit 1
fi
