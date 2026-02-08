# 🚀 Guide de Démarrage Rapide - ETF Analyzer Pro

## Installation en 3 étapes

### 1️⃣ Extraire le projet
```bash
# Extraire l'archive
unzip etf-analyzer-complete.zip
cd etf-analyzer
```

### 2️⃣ Installer les dépendances
```bash
npm install
```

### 3️⃣ Lancer l'application
```bash
npm start
```

✅ Ouvrez [http://localhost:3000](http://localhost:3000)

---

## 📊 Tester avec les données d'exemple

1. Cliquez sur **"Parcourir les fichiers"**
2. Sélectionnez le fichier `example_data.json` (fourni dans le projet)
3. Explorez les fonctionnalités !

---

## 🌐 Déployer sur GitHub Pages

### Prérequis
- Un compte GitHub
- Git installé sur votre machine

### Commandes

```bash
# 1. Initialiser Git
git init
git add .
git commit -m "Initial commit"

# 2. Créer un repository sur GitHub
# Nom : etf-analyzer
# Public (pour GitHub Pages gratuit)

# 3. Lier et pousser
git remote add origin https://github.com/VOTRE_USERNAME/etf-analyzer.git
git branch -M main
git push -u origin main

# 4. Déployer
npm run deploy
```

### Configurer GitHub Pages
1. Repository → **Settings** → **Pages**
2. Source : Branch `gh-pages`, Folder `/ (root)`
3. **Save**

🎉 Votre app sera sur : `https://VOTRE_USERNAME.github.io/etf-analyzer`

---

## 📝 Structure du JSON attendu

Votre fichier JSON doit contenir un tableau plat où chaque ligne = un point de prix :

```json
[
  {
    "ticker_original": "ETF1",
    "nom": "Nom de l'ETF (optionnel)",
    "date": "2020-01-02 09:00:00",
    "adjclose": 100.0,
    "open": 100.0,
    "high": 101.5,
    "low": 99.5,
    "close": 100.5,
    "volume": 10000,
    "currency": "EUR",
    "exchange": "PAR"
  },
  {
    "ticker_original": "ETF1",
    "nom": "Nom de l'ETF",
    "date": "2020-02-01 09:00:00",
    "adjclose": 102.5
  }
]
```

**Champs minimaux requis :**
- `ticker_original` : Identifiant unique de l'ETF
- `date` : Date du point de prix
- `adjclose` (ou `close`) : Prix ajusté

**L'application groupe automatiquement par ticker !**

---

## 🎯 Fonctionnalités principales

### Mode Sélection Unique
- Cliquez sur un ETF dans la liste
- Visualisez sa performance glissante
- Ajustez la fenêtre d'analyse (1-10 ans)

### Mode Comparaison
- Sélectionnez jusqu'à 4 ETFs
- Comparez leurs performances
- Cliquez sur ✕ pour retirer un ETF

### Contrôles
- 🔍 **Recherche** : Filtrez par nom, ticker ou ISIN
- 📅 **Fenêtre** : 1 à 10 ans de performance glissante
- 📈 **Tri** : CAGR, Sharpe, Volatilité, Nom

---

## 🛠️ Commandes utiles

```bash
# Développement
npm start              # Lance le serveur de dev

# Production
npm run build          # Crée un build optimisé
npm run deploy         # Déploie sur GitHub Pages

# Tests
npx serve -s build     # Teste le build en local
```

---

## ❓ Problèmes courants

### L'application ne démarre pas
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

### Erreur de déploiement
```bash
npm install --save-dev gh-pages
npm run deploy
```

### Page blanche sur GitHub Pages
Vérifiez `package.json` :
```json
{
  "homepage": "https://VOTRE_USERNAME.github.io/etf-analyzer"
}
```

---

## 📞 Support

- 📖 README complet : `README.md`
- 🚀 Guide déploiement : `DEPLOYMENT_GUIDE.md`
- 🐛 Issues GitHub : [Créer une issue](https://github.com/younesbelkhayat/etf-analyzer/issues)

---

**Bonne analyse ! 📊⚡**
