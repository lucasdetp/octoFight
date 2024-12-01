# 📱 OctoFight - Application Mobile / Web 🎮

## 📖 Présentation rapide du projet

**OctoFight** est une application mobile et web basée sur la thématique du rap, permettant aux utilisateurs de s'affronter en utilisant des "cartes" de rappeurs. Les utilisateurs peuvent acheter des rappeurs, gérer leur deck et participer à des battles avec d'autres joueurs. 

Le projet est construit avec **React Native** pour le frontend et **Laravel** pour le backend. Nous utilisons également l'API **Spotify** pour récupérer des informations sur les rappeurs et leurs statistiques.

---

## 🛠️ Prérequis pour le développement

Avant de commencer, assurez-vous que les outils suivants sont installés :

- **Node.js** (version 22.9.0 ou supérieure) : Pour gérer les dépendances JavaScript et exécuter le projet React Native.
- **Expo CLI** : Pour exécuter et tester l'application sur des appareils mobiles.
  - **Installation** : `npm install -g expo-cli`
- **PHP** (version 8.3.12 ou supérieure) : Pour le backend avec Laravel.
- **Composer** : Le gestionnaire de dépendances PHP.
- **MySQL** : Pour la gestion de la base de données.

---

## 🚀 Étapes pour installer et configurer le projet

### 1. **Cloner le projet**

Clonez le dépôt GitHub et accédez au répertoire du projet backend :

```
git clone https://github.com/lucasdetp/octoFightApi.git
cd octoFightApi
```

### 2. Installer les dépendances
Installez les dépendances PHP :

```
composer install
```

Installez les dépendances Node.js :
```
npm install
```

### 3. Configurer le .env
Connectez votre base de donnée MySQL
Ajoutez vos clés API pour Spotify et Pusher.


### 4. Exécuter les migrations
Lancez les migrations pour configurer la base de données 
```
php artisan migrate
```

**⚠️ Remarque** : Si vous rencontrez des erreurs liées à la taille des colonnes, essayez d'exécuter la commande 2 fois ou ajustez les migrations problématiques dans les fichiers de migration correspondant.

### 5. Récupérer les rappeurs depuis l'API Spotify
Exécuter la commande suivante pour remplir la base de données avec des rappeurs

```
php artisan fetch:rappeurs
```
Vous pouvez personnaliser les genres des rappeurs récupérés en modifiants la fonction 
```
searchFrenchRappers
```
Voici quelques exemples de genres disponibles dans l'api Spotify : 

```
french hip hip
```
```
pop urbaine
```
```
rap marseille
```
```
old school rap francais
```
```
rap conscient
```

### 6. Configurer le proxy dans le ```package.json```

Dans le fichier ```package.json``` du projet frontend, mettez à jour la valeur du proxy avec votre adresse IP et votre port backend. 

**Exemple :**

```"proxy": "http://adresse-ip:port",```

### 7. Lancer le backend
Pour démarrer le serveur Laravel 
```php artisan serve```

### 8. Configurer et démarrer le frontend
Clonez le projet frontend :
```
git clone https://github.com/lucasdetp/octoFight.git
cd octoFight

```
Installez les dépendances :

``` npm install ```

Lancez l'application :

``` npm start ```

Scannez le QR code avec l'application Expo Go (disponible sur votre appareil mobile). Si vous utilisez un simulateur, appuyez sur la touche i pour iOS ou a pour Android.

## 💻 Exemples de commandes Git pour les contributeurs

Créer une nouvelle branche 
```
git checkout -b nom_branche 
```

## 🎉 Bonne chance et amusez-vous en codant OctoFight ! 🎶