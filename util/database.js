// Configuración con la base de datos
const dotenv = require('dotenv');
const mysql = require('mysql2');
dotenv.config();

// Clevercloud database
const DB_INTERLINK = {
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  port: process.env.MYSQL_ADDON_PORT,
  database: process.env.MYSQL_ADDON_DB,
};

// Database for deployment in AWS
const DB_AWS = {
  host: 'localhost',
  user: 'cris',
  database: 'qtra',
  password: 'QuLtu22rA@',
  port: 3306
};

// Local database
const DB_LOCAL = {
  host: 'localhost',
    user: 'root',
    database: 'qultura',
    password: ''
};

// Current database
const pool = mysql.createPool(DB_LOCAL);
module.exports = pool.promise();