const express = require('express');
const router = express.Router();
const courseController = require('../controller/courseController');
const { courseValidationRules } = require('../validators/courseValidator');
const validateRequest = require('../middleware/validateRequest');
const { authenticateToken, authorize } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 * - name: Courses
 * description: Gestion des cours
 */

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Récupérer la liste des cours publiés
 *     tags:
 *       - Courses
 *     responses:
 *       '200':
 *         description: Liste des cours
 */
router.get('/', courseController.getAllCourses);

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Récupérer un cours par son ID
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Détails du cours
 *       '404':
 *         description: Cours non trouvé
 */
router.get('/:id', courseController.getCourseById);

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Créer un nouveau cours (Instructeur/Admin)
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - duration
 *               - price
 *               - instructor
 *               - categoryId
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               duration:
 *                 type: integer
 *               level:
 *                 type: string
 *                 enum:
 *                   - débutant
 *                   - intermédiaire
 *                   - avancé
 *               price:
 *                 type: number
 *               published:
 *                 type: boolean
 *               instructor:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: Cours créé
 *       '401':
 *         description: Non authentifié
 */
router.post('/', 
    authenticateToken, 
    authorize(['instructor', 'admin']), 
    courseValidationRules, 
    validateRequest, 
    courseController.createCourse
);

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Mettre à jour un cours
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Cours mis à jour
 */
router.put('/:id', 
    authenticateToken, 
    authorize(['instructor', 'admin']), 
    courseValidationRules, 
    validateRequest, 
    courseController.updateCourse
);

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Supprimer un cours (Admin uniquement)
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Cours supprimé
 */
router.delete('/:id', 
    authenticateToken, 
    authorize(['admin']), 
    courseController.deleteCourse
);

module.exports = router;