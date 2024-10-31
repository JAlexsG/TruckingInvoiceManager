// src/components/InvoiceForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InvoiceForm = ({ onSubmit }) => {
    const [invoiceData, setInvoiceData] = useState({
        invoiceNumber: '',
        loadNumber: '',
        pickUpAddress: '',
        pickUpDate: '',
        deliveryAddress: '',
        deliveryDate: '',
        rate: '',
        invoiceDate: '',
        companyId: '' // New field for company selection
    });

    const [companies, setCompanies] = useState([]); // Store companies for dropdown

    // Fetch companies when the component mounts
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/companies');
                setCompanies(response.data);
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        };
        fetchCompanies();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvoiceData({ ...invoiceData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(invoiceData);
        setInvoiceData({
            invoiceNumber: '',
            loadNumber: '',
            pickUpAddress: '',
            pickUpDate: '',
            deliveryAddress: '',
            deliveryDate: '',
            rate: '',
            invoiceDate: '',
            companyId: ''
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="invoiceNumber" placeholder="Invoice Number" value={invoiceData.invoiceNumber} onChange={handleChange} />
            <input type="text" name="loadNumber" placeholder="Load Number" value={invoiceData.loadNumber} onChange={handleChange} />
            <input type="text" name="pickUpAddress" placeholder="Pick-Up Address" value={invoiceData.pickUpAddress} onChange={handleChange} />
            <input type="date" name="pickUpDate" value={invoiceData.pickUpDate} onChange={handleChange} />
            <input type="text" name="deliveryAddress" placeholder="Delivery Address" value={invoiceData.deliveryAddress} onChange={handleChange} />
            <input type="date" name="deliveryDate" value={invoiceData.deliveryDate} onChange={handleChange} />
            <input type="number" name="rate" placeholder="Rate" value={invoiceData.rate} onChange={handleChange} />
            <input type="date" name="invoiceDate" value={invoiceData.invoiceDate} onChange={handleChange} />

            {/* Company Dropdown */}
            <select name="companyId" value={invoiceData.companyId} onChange={handleChange} required>
                <option value="">Select a Company</option>
                {companies.map((company) => (
                    <option key={company.id_company} value={company.id_company}>
                        {company.company_name}
                    </option>
                ))}
            </select>

            <button type="submit">Submit</button>
        </form>
    );
};

export default InvoiceForm;
