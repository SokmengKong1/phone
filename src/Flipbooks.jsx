import { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import pdfFile from "./Com_Type.pdf";

export const MyFlipbooks = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isFlipping, setIsFlipping] = useState(false);

    useEffect(() => {
        // Add event listeners for page turns
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                handlePageTurn('backward');
            } else if (e.key === 'ArrowRight') {
                handlePageTurn('forward');
            }
        });
        return () => {
            document.removeEventListener('keydown', () => { });
        };
    }, [currentPage]);

    const handlePageTurn = (direction) => {
        if (direction === 'forward') {
            setCurrentPage(currentPage + 1);
        } else if (direction === 'backward') {
            setCurrentPage(currentPage - 1);
        }
        setIsFlipping(true);
        setTimeout(() => {
            setIsFlipping(false);
        }, 500); // adjust the timeout duration as needed
    };

    return (
        <Document file={pdfFile}>
            <Page pageNumber={currentPage} />
            {isFlipping && (
                <div className="flipbook-animation">
                    {/* Add animation styles and elements here */}
                </div>
            )}
            {/* Add navigation buttons to call handlePageTurn */}
            <button onClick={() => handlePageTurn('backward')}>Previous Page</button>
            <button onClick={() => handlePageTurn('forward')}>Next Page</button>
        </Document>
    );
}