const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');
const { categoryValidationRules } = require('../validators/categoryValidator');
const validateRequest = require('../middleware/validateRequest');
const { authenticateToken, authorize } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 * - name: Categories
 * description: Gestion des catégories
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Récupérer toutes les catégories
 *     tags:
 *       - Categories
 *     responses:
 *       '200':
 *         description: Liste des catégories
 */
router.get('/', categoryController.getAllCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Récupérer une catégorie par ID
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Détails de la catégorie
 *       '404':
 *         description: Catégorie non trouvée
 */
router.get('/:id', categoryController.getCategoryById);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Créer une catégorie (Admin uniquement)
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Catégorie créée
 */
router.post('/', 
    authenticateToken, 
    authorize(['admin']), 
    categoryValidationRules, 
    validateRequest, 
    categoryController.createCategory
);

module.exports = router;