const mariadb = require("mariadb");
const database = require("../config/database");

const env = process.env.NODE_ENV || "development";

const pool = mariadb.createPool({
  host: database[env].host,
  port: database[env].port,
  user: database[env].username,
  password: database[env].password,
});

async function asyncFunction() {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(`CREATE DATABASE ${database[env].database}`);
    console.log(`Database ${database[env].database} created`);
    await pool.end();
    process.exit();
  } catch (err) {
    console.log(`Database create error !!! (${err.code})`);
    await pool.end();
    process.exit();
  }
}

asyncFunction();
