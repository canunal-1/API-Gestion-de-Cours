const User = require('../model/user.js');
const Category = require('../model/category.js');
const Course = require('../model/course.js');

Category.hasMany(Course, 
    { 
        foreignKey: 'categoryId', 
        onDelete: 'CASCADE' 
    });

Course.belongsTo(Category, 
    {
        foreignKey: 'categoryId'
    });

module.exports = { User, Category, Course };