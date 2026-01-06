const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret_temporaire_dev';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token invalide ou expiré.' });
        }
        req.user = user;
        next();
    });
};

const authorize = (roles = []) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Utilisateur non authentifié' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Accès interdit. Droits insuffisants.' });
        }
        next();
    };
};

module.exports = { authenticateToken, authorize };