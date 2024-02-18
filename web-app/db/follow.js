const { sequelize } = require("./postgres");
const { DataTypes } = require("sequelize");

const Follow = sequelize.define("follow", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    follower: {
        type: DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    userBeingFollowed: {
        type: DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    sequelize
});

module.exports = Follow;
