# 🚀 Guide de Déploiement GitHub Pages

## Étape 1 : Créer le Repository GitHub

1. Connectez-vous sur [GitHub](https://github.com)
2. Cliquez sur le bouton **+** en haut à droite → **New repository**
3. Remplissez les informations :
   - **Repository name** : `etf-analyzer`
   - **Description** : "ETF Performance Analyzer - Analyse multi-stratégie"
   - Laissez **Public** (nécessaire pour GitHub Pages gratuit)
   - **NE PAS** cocher "Initialize with README"
4. Cliquez sur **Create repository**

## Étape 2 : Initialiser Git dans votre projet local

Ouvrez un terminal dans le dossier `etf-analyzer` et exécutez :

```bash
# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit: ETF Analyzer Pro"

# Ajouter le repository distant
git remote add origin https://github.com/younesbelkhayat/etf-analyzer.git

# Renommer la branche principale en main (si nécessaire)
git branch -M main

# Pousser vers GitHub
git push -u origin main
```

## Étape 3 : Installer les dépendances et tester localement

```bash
# Installer les dépendances
npm install

# Tester en local
npm start
```

Vérifiez que l'application fonctionne correctement sur [http://localhost:3000](http://localhost:3000)

## Étape 4 : Déployer sur GitHub Pages

```bash
# Déployer
npm run deploy
```

Cette commande va automatiquement :
1. ✅ Créer un build de production optimisé
2. ✅ Créer une branche `gh-pages`
3. ✅ Pousser le contenu vers GitHub
4. ✅ Activer le déploiement

⏱️ **Temps d'attente** : 2-5 minutes pour que le site soit en ligne

## Étape 5 : Activer GitHub Pages (si nécessaire)

1. Allez sur votre repository : `https://github.com/younesbelkhayat/etf-analyzer`
2. Cliquez sur **Settings** (⚙️)
3. Dans le menu de gauche, cliquez sur **Pages**
4. Dans **Source** :
   - Branch : `gh-pages`
   - Folder : `/ (root)`
5. Cliquez sur **Save**

## Étape 6 : Accéder à votre application

Votre application sera accessible à :

🌐 **https://younesbelkhayat.github.io/etf-analyzer**

## 🔄 Mettre à jour l'application

Après avoir fait des modifications :

```bash
# 1. Sauvegarder les modifications
git add .
git commit -m "Description de vos modifications"
git push

# 2. Redéployer
npm run deploy
```

## 🐛 Résolution de problèmes

### Problème : Le site affiche une page blanche

**Solution** : Vérifiez que `package.json` contient :
```json
{
  "homepage": "https://younesbelkhayat.github.io/etf-analyzer"
}
```

### Problème : Les routes ne fonctionnent pas

**Solution** : GitHub Pages ne supporte qu'une application single-page. Utilisez HashRouter si nécessaire.

### Problème : Les fichiers CSS ne se chargent pas

**Solution** : Assurez-vous que tous les chemins sont relatifs dans votre code.

### Problème : Erreur lors du déploiement

**Solutions** :
```bash
# Nettoyer le cache
rm -rf node_modules package-lock.json
npm install

# Réinstaller gh-pages
npm install --save-dev gh-pages

# Redéployer
npm run deploy
```

## 📝 Commandes utiles

```bash
# Développement local
npm start

# Build de production
npm run build

# Déployer sur GitHub Pages
npm run deploy

# Tester le build en local
npm run build
npx serve -s build
```

## 🎯 Checklist de déploiement

- [ ] Repository GitHub créé
- [ ] Git initialisé et code poussé
- [ ] `package.json` contient le bon `homepage`
- [ ] Dépendances installées (`npm install`)
- [ ] Application testée en local (`npm start`)
- [ ] Déployée avec `npm run deploy`
- [ ] GitHub Pages activé dans Settings
- [ ] Site accessible et fonctionnel

## 🔒 Permissions Git

Si vous avez des problèmes de permissions, configurez Git :

```bash
# Configurer votre identité
git config --global user.name "Younes Belkhayat"
git config --global user.email "votre-email@example.com"

# Si vous utilisez HTTPS, vous aurez besoin d'un Personal Access Token
# Allez dans GitHub Settings → Developer settings → Personal access tokens
```

## 🌟 Fonctionnalités optionnelles

### Domaine personnalisé

1. Créez un fichier `CNAME` dans le dossier `public/` :
   ```
   www.votre-domaine.com
   ```

2. Configurez votre DNS pour pointer vers GitHub Pages

### CI/CD avec GitHub Actions

Créez `.github/workflows/deploy.yml` pour un déploiement automatique à chaque push.

## 📞 Support

Si vous rencontrez des problèmes :
1. Consultez la [documentation GitHub Pages](https://docs.github.com/pages)
2. Vérifiez les logs de déploiement
3. Consultez les issues du projet

---

✅ **Votre application est maintenant déployée et accessible au monde entier !**
