const Sequelize = require("sequelize");
require("dotenv").config();

const mysql = require("mysql2");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
  }
);
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Ju!cebox1124",
  database: "EMPtracker_db",
});
module.exports = connection;
module.exports = sequelize;
