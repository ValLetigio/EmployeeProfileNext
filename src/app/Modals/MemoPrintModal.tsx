import React, { useRef } from "react";

import { useAppContext } from "../GlobalContext";

import { Memo } from "../schemas/MemoSchema";

import html2canvas from "html2canvas-pro";

import jsPDF from "jspdf";


const style: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: "24px",
  outline: 0,
  overflow: "clip",
};


const PrintMemorandumModal = () => {
  const memoRef = useRef(null);

  const { memoForPrintModal, setMemoForPrintModal } = useAppContext();

  const [resolution, setResolution] = React.useState(1);

  const convertToPdf = async () => {
    // Desktop dimensions to simulate
    const desktopWidth = 1200; // Adjust as needed for desktop
    const desktopHeight = 800; // Adjust as needed for desktop

    // Store the original dimensions of the window
    const originalWidth = window.innerWidth;
    const originalHeight = window.innerHeight;

    // Resize the window to simulate a desktop view
    window.innerWidth = desktopWidth;
    window.innerHeight = desktopHeight;

    // Trigger resize event to adjust the layout (if necessary)
    window.dispatchEvent(new Event("resize"));

    // Ensure element exists before proceeding
    const element = memoRef.current;
    if (!element) {
      console.error("Element not found");
      return;
    }

    try {
      // Capture the element with html2canvas
      const canvas = await html2canvas(element, {
        scale: resolution, // Higher scale for better quality
        useCORS: true, // Handles cross-origin images
      });

      // Get the image data from the canvas
      const imgData = canvas.toDataURL("image/png");

      // Create a new jsPDF instance, setting the format to match the canvas size
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height], // Match the canvas size
      });

      // Add the image data to the PDF, with appropriate scaling
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

      // Save the PDF with a filename based on the employee's name
      pdf.save(`${memoForPrintModal?.Employee?.name}-Memorandum.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      // Restore the original window dimensions after the process
      window.innerWidth = originalWidth;
      window.innerHeight = originalHeight;

      // Dispatch resize event to revert layout back to mobile (if necessary)
      window.dispatchEvent(new Event("resize"));
    }
  };

  // const convertToPdf = async () => {

  //     const element = memoRef.current;
  //     if (!element) return;

  //     const canvas = await html2canvas(element, {
  //         scale: 1, // Higher scale for better quality
  //         useCORS: true, // Handles cross-origin images
  //     });

  //     // Get image data from the canvas
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF({
  //         orientation: 'portrait',
  //         unit: 'px',
  //         format: [canvas.width, canvas.height], // Match the canvas size
  //     });

  //     pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  //     pdf.save(`${memoForPrintModal?.Employee?.name}-Memorandum.pdf`);
  // };

  const headerTextStyle = ` col-span-1 lg:col-span-4 indent-4 lg:indent-0 mb-4 lg:mb-0 text-sm md:text-base `;

  return (
    <dialog className=" modal " id="MemoPrintModal">
      <div
        style={style}
        className={` relative h-[90vh] w-[95vw] sm:w-[500px] md:min-w-[50vw] border bg-white `}
      >
        <div className="w-full h-full overflow-auto pt-8">
          <div className=' gap-2 flex flex-col justify-center items-center absolute top-3 left-2 tooltip-right tooltip group' data-tip='Resolution'> 
            <input 
                type="range"
                min={1} max="3" step="1"
                value={resolution} placeholder="Resolution" 
                className="range opacity-50 focus:opacity-100 hover:opacity-80 z-10 " 
                onChange={(e) => setResolution(parseInt(e.target.value))}
            />  
            <span className='absolute -z-10 text-xs'>Resolution</span> 
          </div>

          <form
            className="absolute top-2 right-2"
            method="dialog"
            id="closeButton"
          >
            <button
              onClick={() => setMemoForPrintModal({} as Memo)}
              className=" btn btn-error text-white btn-sm rounded-full h-8 w-8"
            >
              X
            </button>
          </form> 

          <div className="h-max w-full pt-8 px-4 md:px-8 pb-20 " ref={memoRef}>
            <h1 className="text-3xl"> Memorandum </h1>

            <br />

            {/* Header */}
            <div className="my-8 border-l pl-4 grid grid-cols-1 lg:grid-cols-5 items-center lg:gap-4">
              <div className="col-span-1 font-semibold">To:</div>
              <div className={headerTextStyle}>
                {memoForPrintModal?.Employee?.name}
              </div>

              <div className="col-span-1 font-semibold">From:</div>
              <div className={headerTextStyle}>THE MANAGEMENT</div>

              <div className="col-span-1 font-semibold">Date:</div>
              <div className={headerTextStyle}>
                {memoForPrintModal?.date?.substring(0, 16)}
              </div>

              <div className="col-span-1 font-semibold">Subject:</div>
              <div className={headerTextStyle}>
                {memoForPrintModal?.subject}
              </div>

              <div className="col-span-1 font-semibold">Code:</div>
              <div className={headerTextStyle}>
                {memoForPrintModal?.MemoCode?.description}
              </div>
            </div>

            <div className=" my-8 w-full border-b-2" />

            {/* memo message */}
            <div className="px-2 ">
              <h3>
                Dear Mr./Ms.{" "}
                <strong>{memoForPrintModal?.Employee?.name}</strong> ,
              </h3>
              <br />
              <p className="indent-4 whitespace-pre-line">
                {memoForPrintModal?.description}
              </p>
              <br />
              <br />
              <div className="float-end w-[75%] md:w-[50%] xl:w-[35%] border-b text-center pb-2 border-black">
                  THE MANAGEMENT  
              </div>
              <br />
              <br />
            </div>

            <div className="my-8 w-full border-b-2" />

            {/* employee explanation */}
            <div className=" w-full ">
              <span>Please write your explanation:</span>
              <br />
              <br />
              <br />
              {memoForPrintModal?.reason ? (
                <p className="indent-4 whitespace-pre-line ">
                  {memoForPrintModal?.reason}
                </p>
              ) : (
                [0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i}>
                    <div className="w-full border-b border-gray-500 mb-1.5 " />
                    <br />
                  </div>
                ))
              )}
              <br />
              <div className="float-end w-[75%] md:w-[50%] xl:w-[35%] ">
                <div className=" border-b text-center mb-2 border-black"></div>
                <div className=" text-center text-xs">
                  (Name, Signature, Date)
                </div>
              </div>
              <br />
              <br />
            </div>

            {/*  */}
            <div className="mt-8 w-full border-b-2" />
            <div className=" text-center w-full mt-2">
              {" "}
              For management use only{" "}
            </div>
          </div>
        </div>

        {/* Print Memo Button */}
        <div className="w-full absolute bottom-5 flex justify-center">
          <button
            className=" w-max btn bg-blue-500 text-white"
            onClick={() => convertToPdf()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
              />
            </svg>
            <span className=" ">Print</span>
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default PrintMemorandumModal;
