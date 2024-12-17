import React from "react";

import { useAppContext } from "../GlobalContext";

import Image from "next/image";

const ImageModal = () => {
  const { imageListForModal, setImageListForModal, router } = useAppContext();

  const imageModalRef = React.useRef<HTMLDialogElement>(null);

  const [hash, setHash] = React.useState("#item0");

  const handleClose = () => {
    setHash("#item0");
    router.replace(window.location.pathname, undefined);
    setImageListForModal([]);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    imageModalRef.current?.addEventListener("keydown", handleKeyDown);

    return () => {
      imageModalRef.current?.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <dialog id="imageModal" className="modal w-full " ref={imageModalRef}>
      <div className="modal-box bg-transparent shadow-none gap-2 flex flex-col w-full h-full justify-center items-center relative ">
        <form className="absolute top-2 right-2" method="dialog">
          <button onClick={handleClose} className="close-button">
            
          </button>
        </form>

        <div className="carousel h-[90%] w-full ">
          {imageListForModal.map((item, index) => (
            <div
              key={`item${index}`}
              id={`item${index}`}
              className="carousel-item w-full h-full relative "
            >
              <Image
                src={item}
                loading="eager"
                className="h-full w-full"
                // width={1000} height={1000}
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                alt={`#item${index}`}
              />
            </div>
          ))}
          {/* <span className='absolute top-2 left-3 font-bold bg-white rounded-full w-8 h-8 grid place-content-center'>{index + 1}</span> */}
        </div>

        <div className="flex absolute bottom-0 z-50 gap-2">
          {imageListForModal.map((item, index) => (
            <a
              key={`item${index}`}
              href={`#item${index}`}
              onClick={() => setHash(`#item${index}`)}
              className={`${
                hash == `#item${index}` && " border-info bg-info text-white"
              } btn btn-sm `}
            >
              {index + 1}
            </a>
          ))}
        </div>
      </div>
    </dialog>
  );
};

export default ImageModal;
