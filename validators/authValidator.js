const { body } = require('express-validator');

exports.registerValidationRules = [
    body('username').notEmpty().isLength({ min: 3 }),
    body('email').isEmail().withMessage('Email invalide'),
    body('password').isLength({ min: 6 }).withMessage('Mot de passe trop court'),
    body('role').optional().isIn(['instructor', 'admin'])
];