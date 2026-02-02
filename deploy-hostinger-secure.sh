#!/bin/bash

# ==========================================
# Script de déploiement FTP SÉCURISÉ
# Lit les identifiants depuis .ftpconfig
# ==========================================

echo "🚀 Déploiement sécurisé vers Hostinger"
echo "======================================="
echo ""

# Vérifier si le fichier de config existe
if [ ! -f ".ftpconfig" ]; then
    echo "❌ Fichier .ftpconfig non trouvé"
    echo ""
    echo "Créez le fichier .ftpconfig à partir de .ftpconfig.example :"
    echo "  cp .ftpconfig.example .ftpconfig"
    echo "  # Puis éditez .ftpconfig avec vos identifiants"
    echo ""
    exit 1
fi

# Charger la configuration
source .ftpconfig

# Vérifier que les variables sont définies
if [ -z "$FTP_HOST" ] || [ -z "$FTP_USER" ] || [ -z "$FTP_PASS" ]; then
    echo "❌ Configuration FTP incomplète dans .ftpconfig"
    exit 1
fi

# Vérifier si lftp est installé
if ! command -v lftp &> /dev/null; then
    echo "❌ lftp n'est pas installé."
    echo ""
    echo "Installation :"
    echo "  macOS : brew install lftp"
    echo "  Linux : sudo apt install lftp"
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
echo "📤 Étape 2/3 : Upload vers Hostinger..."
echo "   Serveur : $FTP_HOST"
echo "   Dossier : $FTP_DIR"
echo ""

# Déploiement via FTP
lftp -e "
set ftp:ssl-allow no;
set ssl:verify-certificate no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
lcd $(pwd);
cd $FTP_DIR;
mirror --reverse \
       --delete \
       --verbose \
       --parallel=4 \
       --exclude .git/ \
       --exclude .gitignore \
       --exclude .DS_Store \
       --exclude .ftpconfig \
       --exclude .ftpconfig.example \
       --exclude node_modules/ \
       --exclude build-production.sh \
       --exclude deploy-hostinger.sh \
       --exclude deploy-hostinger-secure.sh \
       --exclude index-production.html \
       --exclude '*.md' \
       --exclude netlify.toml \
       --exclude _headers \
       --exclude package*.json;
bye
" 2>&1 | grep -v "Removing old"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Étape 3/3 : Déploiement réussi !"
    echo ""
    echo "🌐 Votre site est en ligne :"
    echo "   https://doucespattes.fr"
    echo ""
    echo "🧪 Tests recommandés :"
    echo "   • Vérifier le formulaire de contact"
    echo "   • Tester sur mobile"
    echo "   • PageSpeed Insights"
    echo ""
else
    echo ""
    echo "❌ Erreur lors du déploiement"
    exit 1
fi
