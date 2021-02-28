const { Pool } = require("pg");
const pool = new Pool({
  user: "sdpadmin",
  host: "localhost",
  database: "servicedesk",
  password: "sdp@123",
  port: "65432",
});
module.exports = {
  query: async (text, params) => await pool.query(text, params),
};
