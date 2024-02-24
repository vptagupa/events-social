import { useState, forwardRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { Button } from "@/js/components/buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default forwardRef(function Pdf({ src }, ref) {
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const Paginator = () => (
        <div className="w-full flex gap-x-2 items-center justify-center text-white m-5">
            <Button
                type="button"
                className="!px-3 bg-slate-500  disabled:bg-slate-300 shadow-none"
                disabled={pageNumber <= 1}
                onClick={(e) => setPageNumber(pageNumber - 1)}
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </Button>
            <p className="w-[10%] text-xs text-center">
                Page {pageNumber} of {numPages}
            </p>
            <Button
                type="button"
                className="!px-3 bg-slate-500  disabled:bg-slate-300 shadow-none"
                disabled={pageNumber >= numPages}
                onClick={(e) => setPageNumber(pageNumber + 1)}
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </Button>
        </div>
    );
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <Paginator />
            <Document file={src} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
            </Document>
            <Paginator />
        </div>
    );
});
