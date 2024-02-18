const { Sequelize } = require("sequelize");

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

const sequelize = new Sequelize("gamified_healthcare", DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "postgres"
});

module.exports = { sequelize };
