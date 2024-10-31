// src/services/invoiceService.js
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const fetchInvoices = async () => {
    const response = await axios.get(`${API_URL}/invoices`);
    return response.data;
};

export const createInvoice = async (invoiceData) => {
    const response = await axios.post(`${API_URL}/invoices`, invoiceData);
    return response.data;
};

// Add the updateInvoice function
export const updateInvoice = async (id, invoiceData) => {
    const response = await axios.put(`${API_URL}/invoices/${id}`, invoiceData);
    return response.data;
};

// Add the deleteInvoice function
export const deleteInvoice = async (id) => {
    await axios.delete(`${API_URL}/invoices/${id}`);
};
