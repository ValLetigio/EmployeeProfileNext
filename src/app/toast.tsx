'use client';

import React, { useEffect, useState } from 'react'; 
import { useAppContext } from './GlobalContext'; 

const Toast = () => { 
    const { toastOptions, setToastOptions } = useAppContext();    
    const [timer, setTimer] = useState(toastOptions?.timer);

    const startTimer = () => {
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
    };

    useEffect(() => {
        if (toastOptions?.open) {
            setTimer(toastOptions?.timer); 
            startTimer();
        }
    }, [toastOptions?.open, toastOptions?.timer]);

    const closeToast = () => {
        setToastOptions({ open: false, message: '', type: '', timer: 0 });
        setTimer(0); 
    };  

    const getToastType = () => {
        switch (toastOptions?.type) {
            case 'success':
                return ['bg-success', 'progress-success'];
            case 'error':
                return ['bg-error', 'progress-error'];
            case 'info':
                return ['bg-info', 'progress-info'];
            case 'warning':
                return ['bg-warning', 'progress-warning'];
            default:
                return [' ', ' '];
        }
    }


    return (
        <div className={`${toastOptions?.open ? 'toast-top toast-center lg:toast-start lg:toast-bottom' : 'hidden'} toast z-[100]`} key={toastOptions?.message}>
            <div className={`max-w-[50vw] lg:max-w-[30vw] alert  text-white text-wrap px-5 rounded-none ${getToastType()[0]}`}
                onClick={() => closeToast()}>
                <span className='break-words'>{toastOptions?.message}</span>
            </div>
            
            <progress 
                className={`progress w-full rounded-none  ${getToastType()[1]}`} 
                value={(timer / toastOptions?.timer) * 100} 
                max={100} 
            /> 
        </div>
    );
}

export default Toast;
