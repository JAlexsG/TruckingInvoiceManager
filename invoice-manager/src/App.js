// src/App.js
import React, { useState, useEffect } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoiceTable from './components/InvoiceTable';
import { fetchInvoices, createInvoice, deleteInvoice, updateInvoice } from './services/invoiceService';

function App() {
    const [invoices, setInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    // Load invoices from the backend
    useEffect(() => {
        loadInvoices();
    }, []);

    const loadInvoices = async () => {
        const data = await fetchInvoices();
        setInvoices(data);
    };

    const handleAddInvoice = async (invoiceData) => {
        if (selectedInvoice) {
            // Update existing invoice
            const updatedInvoice = await updateInvoice(selectedInvoice.id, invoiceData);
            setInvoices(invoices.map((inv) => (inv.id === updatedInvoice.id ? updatedInvoice : inv)));
            setSelectedInvoice(null);
            return updatedInvoice;
        } else {
            // Create new invoice and refresh the list
            await createInvoice(invoiceData);
            loadInvoices(); // Refresh invoices after creation
        }
    };

    const handleDeleteInvoice = async (id) => {
        await deleteInvoice(id);
        setInvoices(invoices.filter((invoice) => invoice.id !== id));
    };

    const handleEditInvoice = (invoice) => {
        setSelectedInvoice(invoice);
    };

    const handleClear = () => {
        setSelectedInvoice(null);
    };

    return (
        <div className="App">
            <h1>Invoice Manager</h1>
            <InvoiceForm onSubmit={handleAddInvoice} initialData={selectedInvoice} onClear={handleClear} />
            <InvoiceTable invoices={invoices} onDelete={handleDeleteInvoice} onEdit={handleEditInvoice} />
        </div>
    );
}

export default App;
