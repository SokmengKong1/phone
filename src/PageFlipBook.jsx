// PageFlipBook.js
import React, { useEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import  PageFlip  from './Com_Type.pdf';

const PageFlipBook = ({ pdf }) => {
    const bookRef = useRef(null);
    const pageFlipRef = useRef(null);
    const [numPages, setNumPages] = useState(null);

    useEffect(() => {
        if (bookRef.current) {
            pageFlipRef.current = new PageFlip(
                bookRef.current,
                {
                    width: 400, // Adjust as per your requirement
                    height: 600, // Adjust as per your requirement
                    size: 'stretch',
                    minWidth: 315,
                    maxWidth: 1000,
                    minHeight: 420,
                    maxHeight: 1350,
                    maxShadowOpacity: 0.5,
                    showCover: true,
                    mobileScrollSupport: false,
                }
            );
        }

        return () => {
            if (pageFlipRef.current) {
                pageFlipRef.current.destroy();
            }
        };
    }, []);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    useEffect(() => {
        if (numPages && pageFlipRef.current) {
            pageFlipRef.current.loadFromHTML(document.querySelectorAll('.page'));
        }
    }, [numPages]);

    const renderPages = () => {
        const pages = [];
        for (let i = 1; i <= numPages; i++) {
            pages.push(
                <div className="page" key={i}>
                    <Page pageNumber={i} width={400} />
                </div>
            );
        }
        return pages;
    };

    return (
        <div className="page-flip-book" ref={bookRef}>
            <Document
                file={pdf}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<div>Loading PDF...</div>}
            >
                {numPages && renderPages()}
            </Document>
        </div>
    );
};

export default PageFlipBook;
