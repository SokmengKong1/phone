import React, { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { StPageFlip } from "@stimulsoft/react-pageflip";
import pdfFile from "./Com_Byte.pdf";
import "./Flip.css";

// Ensure workerSrc is correctly set for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function Flipbook() {
  const [numPages, setNumPages] = useState(null);
  const pageFlipRef = useRef();

  // Callback when the PDF document is loaded
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Render PDF pages into the flipbook
  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= numPages; i++) {
      pages.push(
        <div className="page" key={i}>
          <Page pageNumber={i} width={500} />
        </div>
      );
    }
    return pages;
  };

  return (
    <div className="flipbook-container">
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        {numPages && (
          <StPageFlip
            width={500}
            height={700}
            maxShadowOpacity={0.5}
            showCover={true}
            ref={pageFlipRef}
          >
            {renderPages()}
          </StPageFlip>
        )}
      </Document>
    </div>
  );
}

export default Flipbook;
