// backend/generatePdf.js
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateInvoicePdf = (invoiceData, companyData) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const filePath = path.join(__dirname, 'invoices', `invoice_${invoiceData.invoice_number}.pdf`);
        const writeStream = fs.createWriteStream(filePath);

        // Resolve when the file is done writing
        writeStream.on('finish', () => resolve(filePath));
        writeStream.on('error', reject);

        doc.pipe(writeStream);

        // Add content to the PDF
        doc.fontSize(20).text(`Invoice No: ${invoiceData.invoice_number}`, { align: 'right' });//Invoice number to the right
        doc.fontSize(12).text(`Invoice Date: ${new Date(invoiceData.invoice_date).toLocaleDateString()}`, { align: 'right' });//Bellow invoice date
        doc.fontSize(14).text(companyData.company_name);
        doc.fontSize(14).text(`${companyData.company_address}`);
        doc.fontSize(14).text(`${companyData.company_city}, ${companyData.company_state} ${companyData.company_zip}`);
        doc.moveTo(100,100);
        doc.lineTo(100,100);
        doc.stroke();
        doc.moveDown();
        doc.fontSize(14).text(`Load#: ${invoiceData.load_number}`,{align:'center'});//Centered Load Number
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.fontSize(14).text(`Pick-Up Address: ${invoiceData.pick_up_address}`);
        doc.fontSize(14).text(`Pick-Up Date: ${new Date(invoiceData.pick_up_date).toLocaleDateString()}`);
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.fontSize(14).text(`Delivery Address: ${invoiceData.delivery_address}`);
        doc.fontSize(14).text(`Delivery Date: ${new Date(invoiceData.delivery_date).toLocaleDateString()}`);
        doc.moveDown();
        doc.moveDown();
        doc.fontSize(14).text(`Rate: $${invoiceData.rate}`, { align: 'left' });
        

        // Finalize the PDF
        doc.end();
    });
};

module.exports = generateInvoicePdf;
