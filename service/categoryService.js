const { Category, Course } = require('../config/associations.js');

exports.getAllCategories = async () => {
    return await Category.findAll();
};

exports.getCategoryById = async (id) => {
    return await Category.findByPk(id, {
        include: [{ model: Course }]
    });
};

exports.createCategory = async (data) => {
    return await Category.create(data);
};