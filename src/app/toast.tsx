'use client';

import React, { useState, useCallback, useEffect } from 'react'; 
import { useAppContext } from './GlobalContext'; 

const Toast = () => { 
    const { toastOptions, setToastOptions } = useAppContext();    
    const [timer, setTimer] = useState(toastOptions?.timer);

    const closeToast = useCallback(() => {
        setToastOptions({ open: false, message: '', type: '', timer: 0 });
        setTimer(0); 
    },[setToastOptions]);  

    const startTimer = useCallback(() => {
        const remainingTime = timer || 5; 
        const decrement = remainingTime / 1000;

        const interval = setInterval(() => {
            setTimer(prevTimer => {  
                if (prevTimer <= 0) {
                    clearInterval(interval);
                    closeToast(); 
                    return 0;
                }
                return prevTimer - decrement; 
            });
        }, decrement); 
    }, [timer])

    useEffect(() => {
        if (toastOptions?.open) {
            setTimer(toastOptions?.timer); 
            startTimer();
        }
    }, [toastOptions]);
 
    const getToastType = () => {
        switch (toastOptions?.type) {
            case 'success':
                return ['bg-success', 'progress-success', 'tooltip-success'];
            case 'error':
                return ['bg-error', 'progress-error', 'tooltip-error'];
            case 'info':
                return ['bg-info', 'progress-info', 'tooltip-info'];
            case 'warning':
                return ['bg-warning', 'progress-warning', 'tooltip-warning'];
            default:
                return [' ', ' ', ' '];
        }
    }
  
    return (
        <div 
            className={` flex items-center justify-center 
                ${toastOptions?.open ? 'toast-top toast-center lg:toast-start lg:toast-bottom' : 'hidden'} toast z-[100]
            `}  
                key={toastOptions?.message}
                
        >
            <div className={`min-w-[50vw] md:min-w-max md:max-w-[20vw] alert text-white text-wrap px-5 rounded ${getToastType()[0]}`}
                onClick={() => {
                    closeToast()
                    navigator.clipboard.writeText(toastOptions?.message)
                }} 
                onMouseEnter={() => setTimer(50)} 
                onMouseLeave={() => setTimer(toastOptions?.timer)}
            >
                <span 
                    className={` text-start break-words tooltip tooltip-top ${getToastType()[2]} whitespace-pre-line`} 
                    data-tip="Copy and Close"
                >{toastOptions?.message}</span>
            </div>
            
            <progress 
                className={`progress w-full ${getToastType()[1]} rounded-none -mt-2 `} 
                value={(timer / toastOptions?.timer) * 100} 
                max={100} 
            /> 
        </div>
    );
}

export default Toast;