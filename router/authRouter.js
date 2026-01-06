const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const { registerValidationRules } = require('../validators/authValidator');
const validateRequest = require('../middleware/validateRequest');

/**
 * @swagger
 * tags:
 * - name: Auth
 * description: Gestion de l'authentification
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum:
 *                   - instructor
 *                   - admin
 *     responses:
 *       '201':
 *         description: Utilisateur créé avec succès
 *       '400':
 *         description: Erreur de validation
 */
router.post('/register', registerValidationRules, validateRequest, authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Connexion réussie, retourne le token
 *       '401':
 *         description: Identifiants invalides
 */
router.post('/login', authController.login);

module.exports = router;