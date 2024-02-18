const { sequelize } = require("../db/postgres");

const initServer = async () => {
    try {
        await sequelize.sync();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = { initServer };
