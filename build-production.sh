#!/bin/bash

# ==========================================
# Script de build pour production Hostinger
# Douces Pattes Pet Sitting
# ==========================================

echo "🚀 Build de production pour Hostinger - Douces Pattes"
echo "======================================================="
echo ""

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé. Installation requise."
    echo "   Installez Node.js depuis https://nodejs.org/"
    exit 1
fi

# Installer les outils de minification si nécessaire
echo "📦 Vérification des outils de minification..."
if ! command -v csso &> /dev/null || ! command -v terser &> /dev/null; then
    echo "Installation de csso et terser..."
    npm install -g csso-cli terser
else
    echo "✅ Outils déjà installés"
fi

echo ""
echo "🔨 Minification des fichiers..."
echo ""

# Minification CSS
echo "  → Minification de styles.css..."
csso css/styles.css -o css/styles.min.css
if [ $? -eq 0 ]; then
    echo "    ✅ styles.min.css créé"
else
    echo "    ❌ Erreur lors de la minification de styles.css"
    exit 1
fi

echo "  → Minification de patterns.css..."
csso css/patterns.css -o css/patterns.min.css
if [ $? -eq 0 ]; then
    echo "    ✅ patterns.min.css créé"
else
    echo "    ❌ Erreur lors de la minification de patterns.css"
    exit 1
fi

# Minification JavaScript
echo "  → Minification de script.js..."
terser js/script.js -o js/script.min.js -c -m
if [ $? -eq 0 ]; then
    echo "    ✅ script.min.js créé"
else
    echo "    ❌ Erreur lors de la minification de script.js"
    exit 1
fi

echo "  → Minification de sw.js..."
terser sw.js -o sw.min.js -c -m
if [ $? -eq 0 ]; then
    echo "    ✅ sw.min.js créé"
else
    echo "    ❌ Erreur lors de la minification de sw.js"
    exit 1
fi

echo ""
echo "📊 Statistiques des fichiers..."
echo ""

# Fonction pour afficher la taille d'un fichier
show_size() {
    if [ -f "$1" ] && [ -f "$2" ]; then
        original=$(wc -c < "$1" | tr -d ' ')
        minified=$(wc -c < "$2" | tr -d ' ')
        reduction=$(echo "scale=1; (1 - $minified / $original) * 100" | bc)
        echo "  $1"
        echo "    Original  : $(numfmt --to=iec-i --suffix=B $original 2>/dev/null || echo "${original} bytes")"
        echo "    Minifié   : $(numfmt --to=iec-i --suffix=B $minified 2>/dev/null || echo "${minified} bytes")"
        echo "    Réduction : ${reduction}%"
        echo ""
    fi
}

show_size "css/styles.css" "css/styles.min.css"
show_size "css/patterns.css" "css/patterns.min.css"
show_size "js/script.js" "js/script.min.js"
show_size "sw.js" "sw.min.js"

echo ""
echo "✅ Build de production terminé !"
echo ""
echo "📋 Prochaines étapes :"
echo "  1. Vérifiez les fichiers .min.css et .min.js générés"
echo "  2. Modifiez index.html pour utiliser les fichiers minifiés"
echo "  3. Uploadez tous les fichiers sur Hostinger via FTP ou File Manager"
echo "  4. Testez le site sur https://doucespattes.fr"
echo ""
echo "📖 Consultez DEPLOIEMENT_HOSTINGER.md pour plus de détails"
echo ""
