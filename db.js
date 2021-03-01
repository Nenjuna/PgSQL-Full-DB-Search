const { Pool } = require("pg");

const config = require("./config.json");

const pool = new Pool({
  user: config["user"],
  host: config["host"],
  database: config["database"],
  password: config["password"],
  port: config["port"],
});
module.exports = {
  query: async (text, params) => await pool.query(text, params),
};
