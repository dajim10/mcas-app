import React, { useState } from 'react';
import { PDFDocument, PDFName, PDFWriter, rgb } from 'pdf-lib';

function PdfMerge() {
    const [pdfFiles, setPdfFiles] = useState([]);
    const [mergedPdf, setMergedPdf] = useState(null);

    const handleFileChange = (e) => {
        const files = e.target.files;
        setPdfFiles(files);
    };

    const mergePDFs = async () => {
        const pdfDoc = await PDFDocument.create();
        for (const file of pdfFiles) {
            const pdfBytes = await file.arrayBuffer();
            const externalPdfDoc = await PDFDocument.load(pdfBytes);
            const copiedPages = await pdfDoc.copyPages(externalPdfDoc, externalPdfDoc.getPageIndices());
            copiedPages.forEach((page) => pdfDoc.addPage(page));
        }
        const mergedPdfBytes = await pdfDoc.save();
        const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
        setMergedPdf(URL.createObjectURL(blob));
    };

    return (
        <div className="App">
            <h1>PDF Merger</h1>
            <input type="file" multiple onChange={handleFileChange} />
            <button onClick={mergePDFs}>Merge PDFs</button>
            {mergedPdf && <iframe title="Merged PDF" src={mergedPdf} width="100%" height="600px" />}
        </div>
    );
}

export default PdfMerge;
