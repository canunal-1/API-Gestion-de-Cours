require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const sequelize = require('./config/database');
const associations = require('./config/associations.js');
const swaggerSpecs = require('./config/swagger.js');

const courseRouter = require('./router/courseRouter.js');
const authRouter = require('./router/authRouter.js');
const categoryRouter = require('./router/categoryRouter.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use('/courses', courseRouter);
app.use('/auth', authRouter);
app.use('/categories', categoryRouter);

// Route de base
app.get('/', (req, res) => {
    res.send('API Courses en ligne est active. Documentation sur /api-docs');
});

app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint non trouvé' });
});

sequelize.sync({ force: false }) 
    .then(() => {
        console.log('Base de données synchronisée');
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur http://localhost:${PORT}`);
            console.log(`Swagger disponible sur http://localhost:${PORT}/api-docs`);
        });
    })
    .catch(err => {
        console.error('Erreur de connexion DB:', err);
    });