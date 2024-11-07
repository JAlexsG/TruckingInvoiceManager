// backend/db.js
const { Pool } = require('pg');
//require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
require('dotenv').config({ path: 'backend/.env' }); // Ensure environment variables are loaded I will change the backend and will leave the .env

console.log("Database user:", process.env.DB_USER);
console.log("Database password:", process.env.DB_PASSWORD ? "****" : "Not set");
console.log("Database host:", process.env.DB_HOST);
console.log("Database port:", process.env.DB_PORT);
console.log("Database name:", process.env.DB_DATABASE);

// Create a new pool instance using environment variables for configuration
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});


// Export the pool object for use in other parts of the application
module.exports = pool;
