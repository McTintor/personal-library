require('dotenv').config(); // Load environment variables from .env
const { Pool } = require("pg");

// Read the database URL from the environment variable
const dbUrl = process.env.DB_URL;
if (!dbUrl) {
  console.error("Error: Please provide a database URL via the DB_URL environment variable.");
  process.exit(1);
}

// Create and export the pool
const pool = new Pool({
  connectionString: dbUrl,
});

module.exports = pool;