import React from 'react';

const InvoiceTable = ({ invoices }) => {
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
                    <th>Company Address</th>
                </tr>
            </thead>
            <tbody>
                {invoices.map((invoice, index) => (
                    <tr key={index}>
                        <td>{invoice.invoice_number}</td>
                        <td>{invoice.load_number}</td>
                        <td>{invoice.pick_up_address}</td>
                        <td>{invoice.pick_up_date}</td>
                        <td>{invoice.delivery_address}</td>
                        <td>{invoice.delivery_date}</td>
                        <td>{invoice.rate}</td>
                        <td>{invoice.invoice_date}</td>
                        <td>{invoice.company_name}</td>
                        <td>{invoice.company_address}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default InvoiceTable;