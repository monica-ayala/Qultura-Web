const dotenv = require('dotenv');
const mysql = require('mysql2');

// configraration with env. 
dotenv.config();
const DB_INTERLINK = {
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  port: process.env.MYSQL_ADDON_PORT,
  database: process.env.MYSQL_ADDON_DB,
};

const DB_AWS = {
  host: 'localhost',
  user: 'cris',
  database: 'qtra',
  password: 'QuLtu22rA@',
  port: 3306
};

const DB_LOCAL = {
  host: 'localhost',
    user: 'root',
    database: 'qultura',
    password: ''
};

<<<<<<< HEAD
const pool = mysql.createPool(DB_AWS);
=======
const pool = mysql.createPool(DB_INTERLINK);
>>>>>>> develop

module.exports = pool.promise();