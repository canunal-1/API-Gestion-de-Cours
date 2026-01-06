const { body } = require('express-validator');

exports.courseValidationRules = [
    body('title').notEmpty().withMessage('Titre requis').isLength({ min: 3 }).withMessage('Min 3 caractères'),
    body('description').notEmpty().isLength({ min: 10 }).withMessage('Min 10 caractères'),
    body('duration').isInt({ min: 1 }).withMessage('Doit être un entier positif'),
    body('level').isIn(['débutant', 'intermédiaire', 'avancé']).withMessage('Niveau invalide'),
    body('price').isFloat({ min: 0 }).withMessage('Prix invalide'),
    body('instructor').notEmpty().withMessage('Instructeur requis'),
    body('categoryId').isInt().withMessage('ID de catégorie requis')
];