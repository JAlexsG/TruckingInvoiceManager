// src/components/InvoiceForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InvoiceForm = ({ onSubmit, initialData, onClear }) => {
    // Helper function to get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    // State for form data, initializing dates with today's date if no initial data
    const [invoiceData, setInvoiceData] = useState({
        invoiceNumber: '', // Will display generated number after invoice creation
        loadNumber: '',
        pickUpAddress: '',
        pickUpDate: initialData ? '' : getTodayDate(),
        deliveryAddress: '',
        deliveryDate: initialData ? '' : getTodayDate(),
        rate: '',
        invoiceDate: getTodayDate(), // Automatically set to today's date
        companyId: ''
    });

    const [companies, setCompanies] = useState([]);

    // Helper function to format a date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    // Populate form fields with initial data if editing
    useEffect(() => {
        if (initialData) {
            setInvoiceData({
                invoiceNumber: initialData.invoice_number || '',
                loadNumber: initialData.load_number || '',
                pickUpAddress: initialData.pick_up_address || '',
                pickUpDate: formatDate(initialData.pick_up_date),
                deliveryAddress: initialData.delivery_address || '',
                deliveryDate: formatDate(initialData.delivery_date),
                rate: initialData.rate || '',
                invoiceDate: initialData.invoice_date ? formatDate(initialData.invoice_date) : getTodayDate(),
                companyId: initialData.company_id || ''
            });
        }
    }, [initialData]);

    // Fetch companies for the dropdown
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

    // Handle changes in form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvoiceData({ ...invoiceData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const generatedInvoice = await onSubmit({ ...invoiceData, invoiceDate: getTodayDate() }); // Set invoiceDate to today's date

        // Check if generatedInvoice exists and has invoice_number
        setInvoiceData({
            invoiceNumber: generatedInvoice?.invoice_number || '', // Display generated invoice number
            loadNumber: '',
            pickUpAddress: '',
            pickUpDate: getTodayDate(),
            deliveryAddress: '',
            deliveryDate: getTodayDate(),
            rate: '',
            invoiceDate: getTodayDate(), // Reset invoice date to today's date
            companyId: ''
        });
    };

    // Handle clearing the form and resetting to Create Mode
    const handleClear = () => {
        setInvoiceData({
            invoiceNumber: '',
            loadNumber: '',
            pickUpAddress: '',
            pickUpDate: getTodayDate(),
            deliveryAddress: '',
            deliveryDate: getTodayDate(),
            rate: '',
            invoiceDate: getTodayDate(), // Reset invoice date to today's date
            companyId: ''
        });
        onClear(); // Notify App.js to exit Update Mode
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Display generated invoice number if available */}
            {invoiceData.invoiceNumber && (
                <div>
                    <strong>Invoice Number: {invoiceData.invoiceNumber}</strong>
                </div>
            )}
            
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
