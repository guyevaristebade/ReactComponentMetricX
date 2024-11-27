# ReactComponentMétricX

RCMX est un projet qui vise à recolter des feedbacks sur l'utilisation des librairies de composants react.



## Introduction

Il y n'a aucune application qui propose de feedback sur l'utilisation de composant, voila comment est né ce projet.

Il a pour but de mettre à disposition d'une communauté des feedback sur l'utilisation de librairie de composant.

Dans cette application, il sera possible de : 
- Poster des feedbacks 
- Voir les feedbacks sur les composants
- Voir le nombre de composant utilisé par un projet et par date 
- Consulter les statistiques d'un composant parmi tous les projet 
- Consulter le changelog 
- etc......


## Technologies Utilisées

- [React.js](https://reactjs.org/) pour le front-end de l'application
- [Node js avec Express ](lien-vers-le-site-du-framework) pour le back-end de l'application
- [Ant Design](https://ant.design/components/overview/) pour quelques composants 
- [SASS](https://expressjs.com/fr/) pour la personnalisation le style et la mise en page 
- [MongoDB Compas](https://www.mongodb.com/products/tools/compass) pour la visualisation des données
- [Postman](https://www.postman.com/) pour les tests API 

## Installation

Installation du projet avec le package manager npm 
```bash
  git clone https://dwarves.iut-fbleau.fr/gitiut/bade/ReactCompoMetricsX.git
  cd react_compo_metric_x	
```
    
## Configuration

Il n'y a pas de configuration spéfique à appliquer au projet 

## Structure du Projet

Le projet contient deux répertoire principaux 
- front 
- back 

qui sont architecturé de la façon suivante

```
react_compo_metric_x/
|-- back/
| |-- node_modules/
| | |-- package.json
| | |-- package-lock.json
| | |-- acces.log
| | |-- prettierrc
| | |-- .env.example
| |-- src/
| | |-- app.js
| | |-- routes/
| | |-- models/
| | |-- controllers/
| | |-- helpers/
|
|-- front/
| |-- node_modules/
| |-- public/
| | |-- index.html
| |-- src/
| | |-- App.js
| | |-- index.js
| | |-- components/
| |-- package.json
| |-- package-lock.json
|-- .gitignore
|-- README.md
```


## back
```
cd back
```
Intaller les différents packages

```
npm i 
```

```
cp .env.example .env
``` 

.env 
```
MONGO_URI=url_de_votre_bd
PORT=2024
```

Puis lancer le projet avec la commande 
```
npm start 

``` 
## front
```
cd front
```
Intaller les différents packages

```
npm i 
```

Pour lancer le projet 
```
npm start  
``` 