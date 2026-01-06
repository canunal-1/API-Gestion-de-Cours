const authService = require('../service/authService.js');

exports.register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json({ message: 'Inscription réussie', user });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de l\'inscription (email ou username déjà pris ?)' });
    }
};

exports.login = async (req, res) => {
    try {
        const token = await authService.login(req.body.email, req.body.password);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};