const sequelize = require('../config/database.js');
const courseService = require('../service/courseService.js');
const categoryService = require('../service/categoryService.js');
const { Course, Category } = require('../config/associations.js');

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe('Course Service', () => {
    let categoryId;

    beforeEach(async () => {
        const cat = await Category.create({
            name: 'Dev ' + Math.random(),
            description: 'Test'
        });
        categoryId = cat.id;
    });

    test('devrait créer un cours', async () => {
        const courseData = {
            title: 'Test Course',
            description: 'Description longue test',
            duration: 60,
            level: 'débutant',
            price: 10,
            published: true,
            instructor: 'Prof Test',
            categoryId: categoryId
        };

        const course = await courseService.createCourse(courseData);
        expect(course.id).toBeDefined();
        expect(course.title).toBe(courseData.title);
    });

    test('devrait récupérer uniquement les cours publiés', async () => {
        await courseService.createCourse({
            title: 'Publié',
            description: 'Desc',
            duration: 10,
            level: 'avancé',
            price: 0,
            published: true,
            instructor: 'A',
            categoryId: categoryId
        });
        await courseService.createCourse({
            title: 'Brouillon',
            description: 'Desc',
            duration: 10,
            level: 'avancé',
            price: 0,
            published: false,
            instructor: 'A',
            categoryId: categoryId
        });

        const courses = await courseService.getAllCourses();
        const titles = courses.map(c => c.title);
        
        expect(titles).toContain('Publié');
        expect(titles).not.toContain('Brouillon');
    });
});