const { Course, Category } = require('../config/associations.js');
const { Op } = require('sequelize');

exports.getAllCourses = async () => {
    return await Course.findAll({
        where: { published: true },
        include: [{ model: Category, attributes: ['name'] }]
    });
};

exports.getCourseById = async (id) => {
    return await Course.findByPk(id, {
        include: [{ model: Category }]
    });
};

exports.createCourse = async (data) => {
    return await Course.create(data);
};

exports.updateCourse = async (id, data) => {
    const course = await Course.findByPk(id);
    if (!course) return null;
    return await course.update(data);
};

exports.deleteCourse = async (id) => {
    const course = await Course.findByPk(id);
    if (!course) return false;
    await course.destroy();
    return true;
};

exports.searchCourses = async (keyword) => {
    return await Course.findAll({
        where: {
            [Op.or]: [
                { title: { [Op.like]: `%${keyword}%` } },
                { description: { [Op.like]: `%${keyword}%` } }
            ],
            published: true
        }
    });
};