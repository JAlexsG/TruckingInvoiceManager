// backend/routes/invoiceRoutes.js
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
require('dotenv').config({ path: 'backend/.env' });
console.log("Current working directory:", process.cwd());


// Log the environment variables to verify they are being loaded correctly
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

// ======================================================================
// New Route: Fetch all companies (for company dropdown in frontend form)
// ======================================================================
router.get('/companies', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM company');
        res.json(result.rows); // Send all companies
    } catch (error) {
        console.error("Error retrieving companies:", error.message);
        res.status(500).json({ message: 'Error retrieving companies' });
    }
});

// ================================================================
// Updated Route: Create a new invoice with `company_id` reference
// ================================================================
router.post('/invoices', async (req, res) => {
    const { invoiceNumber, loadNumber, pickUpAddress, pickUpDate, deliveryAddress, deliveryDate, rate, invoiceDate, companyId } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO invoices (invoice_number, load_number, pick_up_address, pick_up_date, delivery_address, delivery_date, rate, invoice_date, company_id)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [invoiceNumber, loadNumber, pickUpAddress, pickUpDate, deliveryAddress, deliveryDate, rate, invoiceDate, companyId]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error creating invoice:", error.message);
        res.status(500).json({ message: 'Error creating invoice' });
    }
});

// ============================================================================
// Updated Route: Retrieve all invoices with joined company information
// ============================================================================
router.get('/invoices', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT i.*, 
                   c.company_name, 
                   c.company_address, 
                   c.company_mc_number, 
                   c.company_dot_number, 
                   c.company_fein, 
                   c.company_city, 
                   c.company_state, 
                   c.company_zip
            FROM invoices i
            LEFT JOIN company c ON i.company_id = c.id_company
        `);
        res.json(result.rows);
    } catch (error) {
        console.error("Error retrieving invoices:", error.message);
        res.status(500).json({ message: 'Error retrieving invoices' });
    }
});

module.exports = router;