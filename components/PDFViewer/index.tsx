import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styles from "./PDFViewer.module.scss";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer: React.FC<{ file: string }> = ({ file }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages: num }) {
        setNumPages(num);
    }

    const nextPage = () => {
        if (pageNumber + 1 <= numPages) {
            setPageNumber(pageNumber + 1);
        }
    };
    const prevPage = () => {
        if (pageNumber - 1 > 0) {
            setPageNumber(pageNumber - 1);
        }
    };

    console.log("PDFViewer file", file);
    return (
        <div className={styles.container}>
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                <Page
                    pageNumber={pageNumber}
                    height={window?.innerWidth < 1200 ? 280 : 500}
                />
            </Document>
            <div className={styles.controls}>
                <button onClick={prevPage}>
                    <img src="/images/back-arrow.svg" alt="prev" />
                </button>
                Page {pageNumber} of {numPages}
                <button onClick={nextPage}>
                    <img
                        className={styles.reverse}
                        src="/images/back-arrow.svg"
                        alt="next"
                    />
                </button>
            </div>
        </div>
    );
};
export default PDFViewer;
