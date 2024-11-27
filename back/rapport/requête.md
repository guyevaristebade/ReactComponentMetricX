Je rencontre un soucis que je ne peux expliquer, mais dans les lignes qui vont suivre je vais tenter de l'expliquer et j'espère que tu comprendra mon soucis.

-   J'ai suivie tes conseils concernant le fait de séparer les contrôler, les models et les routes.

-   J'ai refait mon diagramme
    ![bd](https://media.discordapp.net/attachments/1022656464256516106/1189973673176735844/Diagramme.png?ex=65a01c58&is=658da758&hm=585fb201df7bf3c6758f110d29461f681499935bf3236d85d3e7d7ae1ff41772&=&format=webp&quality=lossless&width=1410&height=814)

-   J'ai refait mon script de découpage et j'ai supprimé quelques models dans mon architecture

-   Le problème que je rencontre actuellement est le suivant :

    -   Dans mon script je créer un projet de la façon suivante :
        ```js
        const project = new projectModel({
            _teamId: teamId,
            project: el.project,
        })
        ```

    Lorsque je le fais de cette manière, j'obtiens le résultat suivant
    ![project](https://media.discordapp.net/attachments/1022656464256516106/1189973672874737814/Capture_decran_2023-12-28_a_17.44.38.png?ex=65a01c58&is=658da758&hm=bc8945b12407fe93d05bce8b6e233c3d7c0029e138a116fa16e4e09643593b57&=&format=webp&quality=lossless&width=1410&height=794)

Chaque project à un id différent et cela créer des doublons. Pour moi ceci est un problème car lors de restitution au front-end on devras éliminer les doublons ce qui nous empêchera d'utiliser les id des projects en question.

Concernant cette fonctionnalité

```txt
        Donner un pourcentage de confiance de montée de version en fonction de (pour savoir si c'est une montée de version sans risque ou pas):
    la version actuelle
    la version cible
    le nombre d'utilisation du composant / props du composant par le projet
    les modifications entre la version actuelle et la version cible
    vues des statistiques d'un composant par projet et globales.
```

j'aimerais avoir un indice sur la partie back-end de cette fonctionnalité, parce que j'ai réfléchis mais je ne vois pas comment je peux travailler pour le front-end exploite les données
