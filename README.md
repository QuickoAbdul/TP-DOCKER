# SHAHZAD ABDUL RAHMAN - TP - Docker Vue.js/Node.js/MongoDB

Ce TP à pour but d'en apprendre plus sur docker. Le TP consiste à créer une application Vue.js avec une API backend en Node.js et une base de données MongoDB, entièrement dockerisée.

## Prérequis

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/download/)

## Structure du Projet

- `vue-project/` : Application Frontend 
- `backend/` : API Backend 
- `docker-compose.yml` : Orchestration des conteneurs (Frontend, Backend, Mongo)

## Installation et Démarrage
1. **Information** : 
    Il n'est pas forcément nécessaire d'avoir les dossiers backend et frontend. Puisque le `docker-compose.yml` va importer l'image des services directement depuis le registry DockerHub.
    
    En cas d'erreur déplacer vous dans les dossiers `backend` et `vue-project` et exécutez `npm install` pour installer les dépendances.
    Renommé `OLD_docker-compose.yml` en `docker-compose.yml` et utilisez ce fichier pour démarrer les conteneurs.

2.  **Lancement** :
    Clonez le repository git : 
    ```sh
    git clone https://github.com/QuickoAbdul/TP-DOCKER.git
    ```

    Déplacez vous & ouvrez un terminal à la racine du projet et exécutez :
    ```sh
    docker-compose up
    ```

3.  **Utilisation** :
    -   **Frontend** : [http://localhost:8080](http://localhost:8080)
    -   **Backend** : [http://localhost:3000](http://localhost:3000)
    -   **Base de données** : MongoDBCompass ou `mongodb://localhost:27017` 

## Explication

1. **DockerCompose** :
    - Le docker-compose est constitué de 3 services. Il va importer 3 images Docker déjà publier et les exécuter.

    - MongoDB qui tourne sur le port default 27017, et qui stocke les données dans un volume.

    - Backend (quickoabdul/tpdocker-backend) qui va importer l'image directement depuis DockerHub et tourne sur le port default 3000

    - Frontend (quickoabdul/tpdocker-backend) qui va importer l'image directement depuis DockerHub et tourne sur le port default 8080
    
    - Le frontend utilise un build multi-stage. Sa première image Node.js sert uniquement à la compilation du projet Vue.js. Le résultat (dist/) est ensuite copié dans une image Nginx légère utilisée en production. Cela permet de réduire la taille de l’image finale et d’améliorer la sécurité.

## Arrêt de l'Application

Pour arrêter les conteneurs et libérer les ressources :
```sh
docker-compose down
```

## Docker Scout & Amélioration possible
Le projet contient déjà des rapports de sécurité des images Docker.

Pour analyser la sécurité des images Docker vous pouvez utiliser la commande `docker scout`.

1.  **Installation de Docker Scout** :
    Assurez-vous que Docker Scout est installé [Docker Scout](https://docs.docker.com/scout/)

2.  **Analyse** :
    Exécutez les commandes suivantes pour scanner les images backend et frontend :
    ```sh
    docker scout cves quickoabdul/tpdocker-backend

    docker scout cves quickoabdul/tpdocker-frontend
    ```
    Ces commandes  fournis un rapport détaillé des Common Vulnerabilities and Exposures (CVEs) détectées dans les images.


3. **Amélioration possible**
La structure actuelle est la plus optimale avec le temps qui nous était impartis. Il était possible de publier le frontend/backend sur un Repo GitHUB et faire une importation des services afin d'avoir toujours la dernière version, ou mettre en place un pipeline CI/CD,celà permettrait d'alléger encore plus l'image (Actuellement à ~= 190MB).
Nous pouvions mettre en place également des variables d'environnement pour les ports, la base de données et autres paramètres afin d'améliorer la sécurité et utiliser le mécanisme des variables environment que docker compose fournit.

## Liens externes : 
Images Docker : 
- Backend : [quickoabdul/tpdocker-backend](https://hub.docker.com/r/quickoabdul/tpdocker-backend)
- Frontend : [quickoabdul/tpdocker-frontend](https://hub.docker.com/r/quickoabdul/tpdocker-frontend)
- MongoDB : [mongo](https://hub.docker.com/_/mongo)