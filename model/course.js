const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Course = sequelize.define('Course', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Duration in minutes'
    },
    level: {
        type: DataTypes.STRING,
        validate: {
            isIn: [['débutant', 'intermédiaire', 'avancé']]
        }
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    instructor: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Course;