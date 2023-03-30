const { Sequelize } = require('sequelize');

// sequelize configuration to connect with mysql
const DB = process.env.DB;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_DIALECT = process.env.DB_DIALECT;

const sequelize = new Sequelize(DB, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,

    //otherwise it will display logs for queries it running behind
    logging: false
})

//testing if the connection is OK or not
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

//drop table if already exists and create new one
sequelize.sync()
    .then(() => console.log('database synced'))
    .catch((err) => console.log(err.message))

module.exports = sequelize;