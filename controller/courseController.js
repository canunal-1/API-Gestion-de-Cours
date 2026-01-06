const courseService = require('../service/courseService.js');
const { Category } = require('../config/associations.js');

exports.getAllCourses = async (req, res) => {
    try {
        if (req.query.keyword) {
            const results = await courseService.searchCourses(req.query.keyword);
            return res.json(results);
        }
        
        const courses = await courseService.getAllCourses();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await courseService.getCourseById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Cours non trouvé' });
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createCourse = async (req, res) => {
    try {
        const category = await Category.findByPk(req.body.categoryId);
        if (!category) return res.status(400).json({ message: 'Catégorie invalide' });

        const newCourse = await courseService.createCourse(req.body);
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const updatedCourse = await courseService.updateCourse(req.params.id, req.body);
        if (!updatedCourse) return res.status(404).json({ message: 'Cours non trouvé' });
        res.json(updatedCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const success = await courseService.deleteCourse(req.params.id);
        if (!success) return res.status(404).json({ message: 'Cours non trouvé' });
        res.json({ message: 'Cours supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};