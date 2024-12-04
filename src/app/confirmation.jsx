'use client';
import React from 'react'

import { useAppContext } from './GlobalContext'; 

const Confirmation = () => {

    const { confirmationOptions, setConfirmationOptions } = useAppContext();    

    if(!confirmationOptions.open) return null;

    const clearedOptions = {open: false,  question: '', consequence: "", type: '', onConfirm: () => {}, onCancel: () => {}};

    const handleConfirm = () => {
        confirmationOptions.onConfirm();
        setConfirmationOptions(clearedOptions);
    }

    const handleCancel = () => {
        confirmationOptions.onCancel(); 
        setConfirmationOptions(clearedOptions);
    }  

  return (
    <div 
        className={` ${confirmationOptions.open ? ' fixed !z-[9999] ' : ' hidden '}
            w-[99vw] h-[99vh] z-[999] top-[0%] left-1/2 right-1/2 translate-x-[-50%]  
            flex justify-center items-center backdrop-blur-sm bg-inherit alert
        `}
        role="alert" 
    > 
        <div 
            className={`gap-5 w-max rounded-lg shadow-2xl bg-base-300 !z-[9999]
            flex flex-col justify-center items-center overflow-clip
        `}
        > 
            <span 
                className='  flex gap-2 justify-start text-start w-full font-bold text-lg px-10 border-b pt-8 pb-6 ' 
            >{confirmationOptions?.question}</span>

            <span className='text-start px-10 py-4'>{confirmationOptions?.consequence}</span>

            <div className='flex flex-col md:flex-row-reverse gap-2 justify-evenly w-full pt-4 pb-6 '>
                <button className="btn bg-info text-white border-none" id='confirm-button' onClick={handleConfirm}>Confirm</button>
                <button className={`btn btn-ghost`} id='cancel-button' onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default Confirmation
