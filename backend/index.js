const express = require('express');
const cors = require('cors');
const invoiceRoutes = require('./routes/invoiceRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', invoiceRoutes); // Prefix all routes with /api

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
