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
// backend/routes/invoiceRoutes.js
router.post('/invoices', async (req, res) => {
    const { loadNumber, pickUpAddress, pickUpDate, deliveryAddress, deliveryDate, rate, invoiceDate, companyId } = req.body;

    try {
        // Query to get the last invoice number
        const lastInvoice = await pool.query('SELECT invoice_number FROM invoices ORDER BY id DESC LIMIT 1');
        let newInvoiceNumber = 4000; // Start invoice numbering from 4000

        if (lastInvoice.rows.length > 0) {
            newInvoiceNumber = parseInt(lastInvoice.rows[0].invoice_number) + 1; // Increment the last invoice number by 1
        }

        const result = await pool.query(
            `INSERT INTO invoices (invoice_number, load_number, pick_up_address, pick_up_date, delivery_address, delivery_date, rate, invoice_date, company_id)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [newInvoiceNumber, loadNumber, pickUpAddress, pickUpDate, deliveryAddress, deliveryDate, rate, invoiceDate, companyId]
        );
        
        res.json(result.rows[0]); // Send back the entire invoice, including the generated invoice number
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

// Delete an invoice by ID
router.delete('/invoices/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM invoices WHERE id = $1', [id]);
        res.json({ message: 'Invoice deleted successfully' });
    } catch (error) {
        console.error("Error deleting invoice:", error.message);
        res.status(500).json({ message: 'Error deleting invoice' });
    }
});

// Update an invoice by ID
router.put('/invoices/:id', async (req, res) => {
    const { id } = req.params;
    const { invoiceNumber, loadNumber, pickUpAddress, pickUpDate, deliveryAddress, deliveryDate, rate, invoiceDate, companyId } = req.body;

    try {
        const result = await pool.query(
            `UPDATE invoices 
             SET invoice_number = $1, load_number = $2, pick_up_address = $3, pick_up_date = $4, 
                 delivery_address = $5, delivery_date = $6, rate = $7, invoice_date = $8, company_id = $9
             WHERE id = $10 RETURNING *`,
            [invoiceNumber, loadNumber, pickUpAddress, pickUpDate, deliveryAddress, deliveryDate, rate, invoiceDate, companyId, id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error updating invoice:", error.message);
        res.status(500).json({ message: 'Error updating invoice' });
    }
});

module.exports = router;