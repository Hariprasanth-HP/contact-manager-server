const { Pool } = require("pg");
require("dotenv").config();
const cn = {
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
};
const pool = new Pool(cn);
module.exports = pool;
