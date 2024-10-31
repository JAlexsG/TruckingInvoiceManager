import React, { useState, useEffect } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoiceTable from './components/InvoiceTable';
import { fetchInvoices, createInvoice, deleteInvoice, updateInvoice } from './services/invoiceService';

function App() {
    const [invoices, setInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null); // New state to hold the invoice to be edited

    useEffect(() => {
        const loadInvoices = async () => {
            const data = await fetchInvoices();
            setInvoices(data);
        };
        loadInvoices();
    }, []);

    const handleAddInvoice = async (invoiceData) => {
        if (selectedInvoice) {
            // Update existing invoice
            const updatedInvoice = await updateInvoice(selectedInvoice.id, invoiceData);
            setInvoices(invoices.map((inv) => (inv.id === updatedInvoice.id ? updatedInvoice : inv)));
            setSelectedInvoice(null); // Reset after editing
        } else {
            // Create new invoice
            const newInvoice = await createInvoice(invoiceData);
            setInvoices([...invoices, newInvoice]);
        }
    };

    const handleDeleteInvoice = async (id) => {
        await deleteInvoice(id);
        setInvoices(invoices.filter((invoice) => invoice.id !== id));
    };

    const handleEditInvoice = (invoice) => {
        setSelectedInvoice(invoice);
    };

    return (
        <div className="App">
            <h1>Invoice Manager</h1>
            <InvoiceForm onSubmit={handleAddInvoice} initialData={selectedInvoice} />
            <InvoiceTable invoices={invoices} onDelete={handleDeleteInvoice} onEdit={handleEditInvoice} />
        </div>
    );
}

export default App;
