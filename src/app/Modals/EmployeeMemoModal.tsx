import React from 'react'

import { useAppContext } from '../GlobalContext' 

const EmployeeMemoModal = () => {

    const { imageListForModal, setImageListForModal } = useAppContext() 

  return (
    <dialog id="EmployeeMemoModal" className="modal ">
        <div className="modal-box bg-transparent shadow-none gap-2 flex flex-col w-full h-full justify-center items-center relative bg-white">  
            <form className='absolute top-2 right-2' method="dialog"> 
                <button onClick={()=>setImageListForModal([])} 
                    className=" btn btn-error text-white btn-sm rounded-full h-8 w-8">X</button>
            </form>
        </div>
    </dialog>
  )
}

export default EmployeeMemoModal
