const { body } = require('express-validator');

exports.categoryValidationRules = [
    body('name').notEmpty().withMessage('Le nom est requis').isLength({ min: 3 }).withMessage('Min 3 caractères'),
    body('description').optional()
];