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
