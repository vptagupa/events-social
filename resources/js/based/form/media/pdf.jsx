import { useState, forwardRef, memo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Modal, Title, Footer } from "@/js/components/modal";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { Button } from "@/js/components/buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faChevronLeft,
    faChevronRight,
    faCircleXmark,
    faFilePdf,
} from "@fortawesome/free-solid-svg-icons";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default forwardRef(function Pdf({ src }, ref) {
    return <ModalView src={src} />;
});

const ModalView = ({ src }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <FontAwesomeIcon
                className="h-12 text-center text-cyan-800"
                icon={faFilePdf}
                onClick={(e) => setOpen(true)}
            />
            <Modal open={open} className="w-[90%] md:w-3/4 p-3 bg-slate-700">
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="h-6 !cursor-pointer text-slate-200 hover:text-slate-300 transition-all ease-in-out duration-100 hover:scale-125 absolute right-2 top-2"
                    title="Close Form"
                    onClick={(e) => setOpen(false)}
                />

                <Pdf src={src} />
            </Modal>
        </>
    );
};

const Pdf = memo(({ src }) => {
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
