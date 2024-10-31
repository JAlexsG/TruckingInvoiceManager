// src/components/InvoiceForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InvoiceForm = ({ onSubmit, initialData, onClear }) => {
    // Helper function to get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const [invoiceData, setInvoiceData] = useState({
        invoiceNumber: '',
        loadNumber: '',
        pickUpAddress: '',
        pickUpDate: initialData ? '' : getTodayDate(), // Default to today's date if no initial data
        deliveryAddress: '',
        deliveryDate: initialData ? '' : getTodayDate(), // Default to today's date if no initial data
        rate: '',
        invoiceDate: initialData ? '' : getTodayDate(), // Default to today's date if no initial data
        companyId: ''
    });

    const [companies, setCompanies] = useState([]); // For the company dropdown

    // Helper function to format date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Returns only the 'YYYY-MM-DD' part
    };

    // Populate the form with initial data if editing
    useEffect(() => {
        if (initialData) {
            setInvoiceData({
                invoiceNumber: initialData.invoice_number || '',
                loadNumber: initialData.load_number || '',
                pickUpAddress: initialData.pick_up_address || '',
                pickUpDate: formatDate(initialData.pick_up_date), // Format date
                deliveryAddress: initialData.delivery_address || '',
                deliveryDate: formatDate(initialData.delivery_date), // Format date
                rate: initialData.rate || '',
                invoiceDate: formatDate(initialData.invoice_date), // Format date
                companyId: initialData.company_id || ''
            });
        }
    }, [initialData]);

    // Fetch companies for dropdown when component mounts
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
            pickUpDate: getTodayDate(), // Reset to today's date after submission
            deliveryAddress: '',
            deliveryDate: getTodayDate(), // Reset to today's date after submission
            rate: '',
            invoiceDate: getTodayDate(), // Reset to today's date after submission
            companyId: ''
        });
    };

    const handleClear = () => {
        setInvoiceData({
            invoiceNumber: '',
            loadNumber: '',
            pickUpAddress: '',
            pickUpDate: getTodayDate(), // Set to today's date on clear
            deliveryAddress: '',
            deliveryDate: getTodayDate(), // Set to today's date on clear
            rate: '',
            invoiceDate: getTodayDate(), // Set to today's date on clear
            companyId: ''
        });
        onClear(); // Notify App.js to exit "Update Mode"
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="invoiceNumber" 
                placeholder="Invoice Number" 
                value={invoiceData.invoiceNumber} 
                onChange={handleChange} 
            />
            <input 
                type="text" 
                name="loadNumber" 
                placeholder="Load Number" 
                value={invoiceData.loadNumber} 
                onChange={handleChange} 
            />
            <input 
                type="text" 
                name="pickUpAddress" 
                placeholder="Pick-Up Address" 
                value={invoiceData.pickUpAddress} 
                onChange={handleChange} 
            />
            <input 
                type="date" 
                name="pickUpDate" 
                value={invoiceData.pickUpDate} 
                onChange={handleChange} 
            />
            <input 
                type="text" 
                name="deliveryAddress" 
                placeholder="Delivery Address" 
                value={invoiceData.deliveryAddress} 
                onChange={handleChange} 
            />
            <input 
                type="date" 
                name="deliveryDate" 
                value={invoiceData.deliveryDate} 
                onChange={handleChange} 
            />
            <input 
                type="number" 
                name="rate" 
                placeholder="Rate" 
                value={invoiceData.rate} 
                onChange={handleChange} 
            />
            <input 
                type="date" 
                name="invoiceDate" 
                value={invoiceData.invoiceDate} 
                onChange={handleChange} 
            />

            {/* Company Dropdown */}
            <select 
                name="companyId" 
                value={invoiceData.companyId} 
                onChange={handleChange} 
                required
            >
                <option value="">Select a Company</option>
                {companies.map((company) => (
                    <option key={company.id_company} value={company.id_company}>
                        {company.company_name}
                    </option>
                ))}
            </select>

            <button type="submit">
                {initialData ? 'Update Invoice' : 'Create Invoice'}
            </button>

            {/* Clear Button */}
            {initialData && (
                <button type="button" onClick={handleClear}>
                    Clear
                </button>
            )}
        </form>
    );
};

export default InvoiceForm;
