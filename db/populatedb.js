#!/usr/bin/env node

require('dotenv').config();

const { Client } = require("pg");

const dbUrl = process.env.DB_URL;
if (!dbUrl) {
  console.error("Error: DB_URL environment variable is not set.");
  process.exit(1);
}

const SQL = `

`;

async function main() {
  console.log("Seeding database...");
  
  const client = new Client({ connectionString: dbUrl });
  
  try {
    await client.connect();
    await client.query(SQL);
    console.log("Seeding complete.");
  } catch (err) {
    console.error("Error during seeding:", err.message);
  } finally {
    await client.end();
  }
}

main();