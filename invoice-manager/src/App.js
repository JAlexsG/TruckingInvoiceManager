// src/App.js
import React, { useState, useEffect } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoiceTable from './components/InvoiceTable';
import { fetchInvoices, createInvoice } from './services/invoiceService';

function App() {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const loadInvoices = async () => {
            const data = await fetchInvoices();
            setInvoices(data);
        };
        loadInvoices();
    }, []);

    const handleAddInvoice = async (invoiceData) => {
        const newInvoice = await createInvoice(invoiceData);
        setInvoices([...invoices, newInvoice]);
    };

    return (
        <div className="App">
            <h1>Invoice Manager</h1>
            <InvoiceForm onSubmit={handleAddInvoice} />
            <InvoiceTable invoices={invoices} />
        </div>
    );
}

export default App;
