const sequelize = require('../config/database.js');
const categoryService = require('../service/categoryService.js');

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe('Category Service', () => {
    test('devrait créer une catégorie', async () => {
        const catData = { name: 'Marketing', description: 'Business' };
        const newCat = await categoryService.createCategory(catData);
        
        expect(newCat.id).toBeDefined();
        expect(newCat.name).toBe('Marketing');
    });

    test('devrait récupérer toutes les catégories', async () => {
        await categoryService.createCategory({ name: 'Design', description: 'Art' });
        
        const categories = await categoryService.getAllCategories();
        // On s'attend à trouver Marketing (créé avant) et Design
        expect(categories.length).toBeGreaterThanOrEqual(2);
    });
});