"use client";

import React from "react";

const style: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: "24px",
  outline: 0,
  overflow: "clip",
};

import html2canvas from "html2canvas-pro";

import jsPDF from "jspdf";

import { Offense } from "../schemas/OffenseSchema";

import OffenseTable from "./OffenseTable"; 


interface OffenseTableModalProps {
  offenseList: Offense[];
}

const OffenseTableModal: React.FC<OffenseTableModalProps> = ({
  offenseList,
}) => {
  const contentRef = React.useRef<HTMLDivElement>(null);

  const [loading, setLoading] = React.useState(false);

  const resolution = 1;
  

  const convertToPdf = async () => {
    // Ensure element exists before proceeding
    setLoading(true);
    const element = contentRef.current;
    if (!element) {
      console.error("Element not found");
      return;
    }

    try {
      // Capture the element with html2canvas (without limiting height)
      const canvas = await html2canvas(element, {
        scale: resolution, // Higher scale for better quality
        useCORS: true, // Handles cross-origin images
        windowWidth: element?.scrollWidth, // Capture full width of the content
        windowHeight: element?.scrollHeight, // Capture full height of the content
      });

      // Get the image data from the canvas
      const imgData = canvas.toDataURL("image/png");

      // Create a new jsPDF instance
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt", 

      });

      // A4 dimensions in points
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Calculate scaling to fit the page width, maintaining the aspect ratio
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const scaleFactor = Math.min(pageWidth / imgWidth, 1); // Limit scaling to fit width, no height limitation

      const scaledWidth = imgWidth * scaleFactor;
      const scaledHeight = imgHeight * scaleFactor;

      // Start adding pages if content exceeds the page height
      let yOffset = 0; // Track the Y position for image placement on each page
      let pageIndex = 0;

      // Add image to the first page
      pdf.addImage(imgData, "PNG", 0, yOffset, scaledWidth, scaledHeight);

      // Check if content exceeds the page height and add more pages if necessary
      while (scaledHeight + yOffset > pageHeight) {
        pageIndex++;
        pdf.addPage(); // Add new page
        yOffset = -(pageHeight * pageIndex); // Adjust Y offset for the next page
        pdf.addImage(imgData, "PNG", 0, yOffset, scaledWidth, scaledHeight); // Add the same image to the new page
      }

      // Save the generated PDF
      pdf.save("house-rules.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  const [year] = React.useState(new Date().getFullYear());

  return (
    <dialog className=" modal " id="OffenseDownloadModal">
      <div
        style={style}
        className={` relative h-[90vh] w-[98vw] md:w-[80vw] 2xl:w-[70vw] border bg-white text-black rounded-box`}
      >
        <div className="w-full h-full overflow-auto py-[8vh]">
          {/* CLOSE BUTTON */}
          <form
            className="absolute top-2 right-2 z-10"
            method="dialog"
            id="closeButton"
          >
            <button className=" close-button "></button>
          </form>

          {/* </ content ref */}
          <div ref={contentRef}>
            {/* COMPANY HOUSE  */}
            <div className="w-full flex justify-center pt-10 text-start">
              <h1 className="text-xl md:text-2xl xl:text-3xl tracking-wider font-bold">
                COMPANY HOUSE RULES - {year}
              </h1>
            </div>
            {/* REMEDIAL ACTION */}
            <div className="w-full flex justify-center pb-10 text-start">
              <h2 className="text-xl md:text-2xl xl:text-3xl tracking-wider font-bold">
                TABLE OF OFFENSES AND REMEDIAL ACTION
              </h2>
            </div>

            {/* OffenseTable */}
            {/* <div className=" rounded-box rounded-t-none w-full ">
              <OffenseTable offenseList={offenseList} hideFooter={true} />
            </div> */}

            {/* THE MANAGEMENT */}
            <div className="flex justify-end gap-2 px-10 pt-16">
              <div className="text-xl w-[30%] font-bold tracking-wider">
                THE MANAGEMENT
              </div>
            </div>

            {/*  Printed Name< */}
            <div className="flex items-center flex-col gap-2 px-10 pt-16 w-[80%] md:w-[40%] ">
              <div className=" border-b w-full border-black"></div>
              <div>Signature Over Printed Name</div>
            </div>

            {/* Date */}
            <div className="flex items-center flex-col gap-2 px-10 pt-20 pb-10 w-[80%] md:w-[40%] ">
              <div className=" border-b border-black w-full "></div>
              <div>Date</div>
            </div>
          </div>
          {/* content ref /> */}

          <div className="absolute bottom-5 w-full justify-center flex">
            <button onClick={convertToPdf} className="btn btn-info" disabled={loading}>
              {!loading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              ) : (
                <div className="text-xl animate-spin font-normal">C</div>
              )}
              Download
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default OffenseTableModal;
