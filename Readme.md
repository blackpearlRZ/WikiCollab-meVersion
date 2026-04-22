# Presentation generale de projet 

## Nom du projet

WikiCollab – Éditeur de documentation collaborative en temps réel

## Contexte

Dans les entreprises et équipes techniques, le partage de connaissances est essentiel. Les outils existants comme Notion ou Confluence sont puissants mais :

dépendants du cloud
parfois complexes
peu personnalisables

👉 L’objectif est donc de créer une plateforme interne, flexible et collaborative.

## Objectif

Développer une application web permettant :

la création de documentation collaborative
l’édition en temps réel
l’organisation par espaces et pages
la gestion des versions et commentaires

# ANALYSE DES BESOINS

##  Acteurs du système
👤 Utilisateur
accède à la plateforme
crée et modifie du contenu
collabore en temps réel

## Besoins fonctionnels
🔐 Authentification

* inscription
* connexion sécurisée

🏢 Gestion des espaces

* créer un espace
* consulter les espaces
* définir type : public / privé

📄 Gestion des pages

* créer page
* modifier contenu
* supprimer page
* hiérarchie (pages enfants)

✍️ Édition collaborative

* édition Markdown
* prévisualisation
* édition multi-utilisateurs
* synchronisation temps réel

💬 Commentaires

* commentaire sur une partie du texte
* affichage des commentaires

🕓 Historique

* sauvegarde des versions
* consultation des anciennes versions
* comparaison simple

## Besoins non fonctionnels

⚡ Performance

* temps réel fluide (WebSocket)

🔒 Sécurité

* authentification JWT
* mots de passe hashés

📱 UX/UI

* interface simple et responsive

🔄 Scalabilité

* architecture modulaire

# ARCHITECTURE DU SYSTÈME

## Architecture globale

Architecture client / serveur + temps réel

Frontend (React)
        ↓
Backend (Node + Express)
        ↓
Database (MongoDB)
        ↕
WebSocket (Socket.IO)

## Stack technique

*Frontend*
-----------

React.js
CSS / Tailwind
Axios
React Router

*Backend*

Node.js
Express.js
Temps réel
Socket.IO

*Base de données*

MongoDB

*Sécurité*

JWT
bcrypt