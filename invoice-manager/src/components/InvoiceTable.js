// src/components/InvoiceTable.js
import React from 'react';

const InvoiceTable = ({ invoices, onEdit, onDelete }) => {
    // Helper function to format date to YYYY-MM-DD
    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toISOString().split('T')[0];
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Invoice Number</th>
                    <th>Load Number</th>
                    <th>Pick-Up Address</th>
                    <th>Pick-Up Date</th>
                    <th>Delivery Address</th>
                    <th>Delivery Date</th>
                    <th>Rate</th>
                    <th>Invoice Date</th>
                    <th>Company Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {invoices.map((invoice) => (
                    <tr key={invoice.id}>
                        <td>{invoice.invoice_number}</td>
                        <td>{invoice.load_number}</td>
                        <td>{invoice.pick_up_address}</td>
                        <td>{formatDate(invoice.pick_up_date)}</td> {/* Formatted Date */}
                        <td>{invoice.delivery_address}</td>
                        <td>{formatDate(invoice.delivery_date)}</td> {/* Formatted Date */}
                        <td>{invoice.rate}</td>
                        <td>{formatDate(invoice.invoice_date)}</td> {/* Formatted Date */}
                        <td>{invoice.company_name}</td>
                        <td>
                            <button onClick={() => onEdit(invoice)}>Edit</button>
                            <button onClick={() => onDelete(invoice.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default InvoiceTable;
