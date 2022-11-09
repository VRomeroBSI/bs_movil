const { Sequelize, Model, DataTypes } = require("sequelize");
const logger = require('../logger/api.logger');

const connect = () => {

    const hostName = process.env.HOST;
    const userName = "usertest";//process.env.USER;
    const password = "123456";//process.env.PASSWORD;
    const database = 'postgres';
    const dialect = 'postgres';
    const port=5432;

    const sequelize = new Sequelize(database, userName, password, {
        host: hostName,
        dialect: dialect,
        port : port,
        //operatorsAliases: false,
        pool: {
            max: 20,
            min: 0,
            acquire: 20000,
            idle: 5000,
            idleTimeoutMillis:30000,
            connectionTimeoutMillis:2000,
        }
    });

    const db = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    db.tasks = require("../model/task.model")(sequelize, DataTypes, Model);

    return db;

}

module.exports = {
    connect
}
