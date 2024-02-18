const Fitness = require("./fitness");
const Follow = require("./follow");
const { sequelize } = require("./postgres");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize
});

User.hasOne(Fitness);
User.hasMany(Follow);

module.exports = User;
