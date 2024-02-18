const { sequelize } = require("./postgres");
const { DataTypes } = require("sequelize");

const Fitness = sequelize.define("fitness", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    height: {
        type: DataTypes.STRING,
        allowNull: false
    },
    physical_activity: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fitness_goals: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    todaysPoints: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    sequelize
});

module.exports = Fitness;
