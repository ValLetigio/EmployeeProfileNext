import React from 'react'

import { useAppContext } from '../GlobalContext'

import Image from 'next/image' 

const ImageModal = () => {

    const { imageListForModal, setImageListForModal } = useAppContext() 

  return (
    <dialog id="imageModal" className="modal ">
        <div className="modal-box bg-transparent shadow-none gap-2 flex flex-col w-full h-full justify-center items-center relative">  
            <form className='absolute top-2 right-2' method="dialog"> 
                <button onClick={()=>setImageListForModal([])} 
                    className=" btn btn-error text-white btn-sm rounded-full">Close</button>
            </form>

            <div className="carousel h-[90%] w-full ">
                {imageListForModal.map((item, index) => ( 
                    <div id={`item${index}`} className="carousel-item w-full h-full active:border-2">
                        <Image
                            src={item}
                            className="h-full w-full" width={1} height={1} alt={`#item${index}`} />
                    </div> 
                ))} 
            </div> 

            <div className='flex absolute bottom-0 z-50 gap-2'>
                {imageListForModal.map((item, index) => (
                    <a href={`#item${index}`} className="btn btn-sm active:text-error" >{index + 1}</a>
                ))} 
            </div>
 
        </div>
    </dialog>
  )
}

export default ImageModal
