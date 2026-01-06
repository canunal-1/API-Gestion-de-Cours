📚 API de Gestion de Cours en Ligne

Ce projet est une API REST complète développée en Node.js. Elle permet la gestion des cours, des catégories et des utilisateurs avec différents niveaux d'accès (Instructeur et Admin).

🚀 Fonctionnalités

- Authentification Sécurisée : Inscription et connexion via JWT (JSON Web Tokens).

- Rôles et Permissions :

    - Public : Consulter les cours et catégories.

    - Instructeur : Créer et modifier ses cours.

    - Admin : Accès total (gestion catégories, suppression cours).

- CRUD Complet : Gestion des Cours et des Catégories.

- Documentation API : Interface Swagger UI interactive intégrée.

- Base de données : SQLite (via Sequelize ORM) pour une installation facile sans configuration serveur.

🛠️ Stack Technique

- Serveur : Node.js & Express

- Sécurité : Bcryptjs & JWT

- Base de données : SQLite3 & Sequelize

- Validation : Express-Validator

- Documentation : Swagger UI Express

- Tests : Jest

⚙️ Installation

1. Cloner le dépôt

git clone [https://github.com/VOTRE_PSEUDO/tp-courses-api.git](https://github.com/VOTRE_PSEUDO/tp-courses-api.git)
cd tp-courses-api



2. Installer les dépendances

npm install



▶️ Utilisation

1. Lancer le serveur

npm start



Le serveur démarrera sur http://localhost:3000.

2. Accéder à la documentation (Swagger)
Ouvrez votre navigateur à l'adresse suivante pour tester l'API :
👉 http://localhost:3000/api-docs

3. Lancer les tests

npm test



🧪 Exemples de Tests (Swagger)

- Créer un Admin : POST /auth/register (role: "admin")

- Se connecter : POST /auth/login -> Copier le token.

- S'authentifier : Cliquez sur le cadenas 🔒 dans Swagger et collez le token.

- Créer une catégorie : POST /categories (Requis avant de créer un cours).

- Créer un cours : POST /courses.