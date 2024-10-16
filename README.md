# Chat Application Fullstack - NestJS & React/Remix
Description

Ce projet est une application de chat fullstack que j'ai développé dans le cadre de mon apprentissage de TypeScript et de l'architecture scalable offerte par NestJS. L'objectif est de mettre en place une application moderne, sécurisée, et facile à maintenir. Le backend est construit avec NestJS et Prisma, tandis que le frontend utilise React/Remix pour la gestion des interfaces.

# Fonctionnalités (16/10/2024)

Backend (NestJS)

    - API REST : Création de routes pour l'authentification et la gestion des utilisateurs.
    - Prisma ORM : Utilisé pour la gestion des utilisateurs et la communication avec la base de données PostgreSQL.
    - Base de données : Les comptes utilisateurs sont stockés sur Neon (PostgreSQL).
    - Validation des données : Utilisation de ValidationPipe pour valider les entrées côté backend.
    - JWT : Un token JWT est attribué à chaque connexion pour sécuriser les échanges.
    + Bcrypt : Chiffrement des mots de passe pour garantir la sécurité des comptes utilisateurs.

Frontend (React/Remix)

    - Page de connexion : Création d'une interface utilisateur simple et efficace pour la connexion.
    - Validation des données : Utilisation de la bibliothèque Zod pour valider les données entrantes côté frontend.

Installation
Prérequis

    Node.js (version 16.x ou supérieure)
    Nest.js CLI
    Prisma CLI (npm install prisma)
    Remix CLI (npm install remix)

Installation des dépendances

Clonez le dépôt et installez les dépendances pour le backend et le frontend.


# Backend (NestJS)
cd backend
npm install

# Frontend (React/Remix)
cd frontend
npm install

Configuration

Créez un fichier .env dans les répertoires backend et frontend et renseignez les informations nécessaires :
Backend .env

    DATABASE_URL=postgresql://username:password@neon-db-url/dbname
    JWT_SECRET=your_jwt_secret


Démarrage

Lancez le serveur backend et le frontend :


    # Backend
    cd backend
    nest start --watch
    
    # Frontend
    cd frontend
    npm run dev


Technologies

    Backend : NestJS, Prisma, PostgreSQL, JWT, Bcrypt
    Frontend : React, Remix, Zod
    Base de données : Neon (PostgreSQL)

Améliorations futures

    Implémentation d'un système de messagerie en temps réel.
    Gestion des rôles d'utilisateur (admin, utilisateur standard).
    Amélioration de l'interface utilisateur (UI) et accessibilité.
