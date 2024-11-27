# CAHIER DES CHARGES FONCTIONNEL

## PRESENTATION DU CONTEXTE

Le client de ce projet, monsieur Félix Legrelle, a identifié actuellement un manque crucial de retours utilisateurs concernant l'efficacité des librairies de composants react dans leurs applications.

Ce constat souligne la nécessité de mettre en place une solution permettant d'analyser des données sur l'utilisation des librairies de composant et collecter des feedbacks afin d'améliorer la qualité de développement des développeurs.

Cela permettra aux développeurs de la librairie d’avoir des retours automatique sur l’utilisation de la librairie et pour les consommateurs de voir plus facilement les mauvaises utilisations des props, avoir une aide pour la montée de version, pouvoir facilement faire des feedbacks

Actuellement, nous n'avons pas trouvés de dispositifs qui repondent à ce besoins.

Remarque : L'application ne nécessitera pas d'authentification pour être utilisée

L'application est destiné à deux types d'acteurs :

- Les consommateurs de la librairie
- Les développeurs de la librairie

## ETUDE DETAILLEE DES OBJECTIFS (ANALYSE DES BESOINS)

Le principal objectif de ce projet est de développer une application complète offrant des statistiques détaillées sur l'utilisation des composants, notamment les propriétés (props), les classes, premier enfant.

Cette application doit également fournir une interface permettant aux consommateurs de cette librairie de composant à visualiser ces statistiques et de donner leur feedback sur chaque composant.

L'interface pour les statistiques doit founir : - Un affichage du nombre de composants utilisé par une application par date - Des statistiques sur l'utilisation des props - Un niveau de confiance sur la montée de version en fonction de la version actuelle, de la version cible et de l'utilisation ou non des composants - Le nombre d'applications sur laquelle les versions de la librairie ont été déployées - Une vue par composant avec les changements lors des versions

Les statistiques seront visibles sous différents types de graphiques tels que :

- Line charts
- Bars charts
- Pie charts

Ces graphiques comporterons des légendes pour plus de compréhension.

Les utilisateurs de l'application pourront donner les feedbacks via un formulaire comportant plusieurs champs pour que les autres utilisateurs puissent les consulter et se servir de ces derniers pour faire leurs choix de librairie.
Les informations collectées lors d'un feeback seront les suivantes :

- Le nom, prenom
- Titre feedback
- Contenu du feeback

`` `{name : string, lastname : string, title : string, content : string}` ``

Toutes ces informations seront stockées dans une structure de données appropriées, pour ensuite les restituer aux autres utilisateurs qui souhaite les consulter

Ils pourront aussi consulter via une page les changements qui ont eu lieu sur différents projets

Les technologies qui ont été retenu pour ce projet sont les suivantes :

- React JS ( pour la partie front-end)
- Node JS ( pour la partie back-end)

Tous deux ont un point commun : le javascript, ce qui est plus pratique pour mener à bien. le projet

Dans le cadre de ce projet notre choix se portera sur Javascript avec ReactJS pour la partie front & Express pour le back

À noter tous les fichiers nous seront fournis par le client.

## CONTRAINTES ET DELAIS

### etapes du projet & délais

- Semaine 2 du S5 : proposition des sujets

- Semaine 3 du S5 : positionnement des étudiants sur les sujets et choix

- Semaine 5 du S5 : rendu du cahier des charges fonctionnelles, acceptation ou non par le tuteur, correction possible et nouvelle version en début de semaine 6. Le tuteur et les étudiants signent le document.

- Semaine 6 du S5 : rendu d’une première version du cahier des charges techniques et méthodologiques, corrections possibles et version finale évaluée semaine 8.

À fixer. Présentation vulgarisée en anglais du projet de 10 minutes (? Voir avec Jay).

- Semaine 10 :  Premier livrable du projet. Suggestion de corrections possibles.

- Semaine 13 :  Second livrable du projet, premier rapport, réunion de suivi de projet.

- Semaine 4 du S6 :  Troisième livrable du projet.

- Semaine 6 du S6 : Soutenance finale du projet. Rapport final, livrable final.

### Fonctionnalités

Les fonctionnalités du projet sont défini selon la méthode MoSCoW

- M : must have this, c'est-à-dire 'doit être fait' (vital).
- S : should have this if at all possible, c'est-à-dire devrait être fait dans la mesure du possible (essentiel).
- C : could have this if it does not affect anything else, pourrait être fait dans la mesure où cela n'a pas d'impact sur les autres tâches (confort).
- W : won't have this time but would like in the future, ne sera pas fait cette fois mais sera fait plus tard (luxe, c'est votre zone d'optimisation budgétaire).

#### MUST

- Afficher les statistiques sur les props
- Afficher le nombre de composants utilisés par une projet par date
- Récolter des feedbacks
- Afficher les feedbacks sur l'utilisation des librairies de composants

#### SHOULD

- Champs de recherche pour un pour un élement de l'application qui porte un interêt
- Afficher le "changelog" de la librairie (fichier des modifications par version, il sera forcément en .md et il ne faudra pas le stocker en base, ca sera un fichier que le front récupèrera directement)
- Donner un pourcentage de confiance de montée de version en fonction de (pour savoir si c'est une montée de version sans risque ou pas):
  - la version actuelle
  - la version cible
  - le nombre d'utilisation du composant / props du composant par le projet
  - les modifications entre la version actuelle et la version cible
  - vues des statistiques d'un composant par projet et globales.

#### A classer comme vous voulez

- Affichage des composants enfants les plus utilisés depuis la page des statistiques du composant (Sous forme de liste ? Graphique ? Il faudra avoir un lien pour amener vers la page du composant)

#### COULD

- Avoir la possibilité de filtrer les statistiques affichées
- Avoir la possibilité d'épingler des composant pour retrouver leurs statiques plus vite (utilisation du localStorage)

#### WON'T
