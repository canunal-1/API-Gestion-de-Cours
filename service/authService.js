const { User } = require('../config/associations');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_temporaire_dev';

exports.register = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await User.create({
        ...userData,
        password: hashedPassword
    });
    return { id: user.id, username: user.username, email: user.email, role: user.role };
};

exports.login = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('Utilisateur non trouvé');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Mot de passe incorrect');
    }

    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
    );

    return token;
};