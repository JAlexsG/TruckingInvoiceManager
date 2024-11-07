const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateTestPdf = () => {
    const doc = new PDFDocument();
    const filePath = path.join(__dirname, 'hello_world_test.pdf');
    
    // Pipe the document to a file
    doc.pipe(fs.createWriteStream(filePath));
    
    // Add "Hello, World!" text
    doc.fontSize(25).text('Hello, World!', 100, 100);
    
    // Finalize the PDF file
    doc.end();

    console.log(`PDF generated at ${filePath}`);
};

// Run the test function
generateTestPdf();
