// backend/testDbConnection.js
const { Pool } = require('pg');
require('dotenv').config({ path: 'backend/.env' }); // Specify the path to .env

// Log the current working directory to confirm where the script is running from
console.log("Current working directory:", process.cwd());

// Log environment variables to verify they are being loaded
console.log("Database user:", process.env.DB_USER);
console.log("Database password:", process.env.DB_PASSWORD ? "****" : "Not set");
console.log("Database host:", process.env.DB_HOST);
console.log("Database port:", process.env.DB_PORT);
console.log("Database name:", process.env.DB_DATABASE);

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.connect()
    .then(() => {
        console.log("Connected to the database successfully!");
        pool.end();
    })
    .catch((err) => {
        console.error("Database connection error:", err.message);
        pool.end();
    });
