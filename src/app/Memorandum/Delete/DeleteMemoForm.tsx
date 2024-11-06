'use client'

import React, { useState, useEffect } from 'react';

import { useAppContext } from '@/app/GlobalContext';

import { Employee, Offense, Memo } from '@/app/Schema';
 
const DeleteMemoForm = () => {

  const { setToastOptions, serverRequests, userData } = useAppContext()

  const defaultMemo = {
    date: '',
    Employee: {} as Employee, 
    description: '',
    subject: '',
    mediaList: [] as string[],
    memoPhotosList: [] as string[],
    MemoCode: {} as Offense,
    reason: '',
    submitted: false 
  }


  const [ formData, setFormData ] = useState(defaultMemo) 

  const [ memoOptions, setMemoOptions ] = useState<Memo[]>([])

  
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()  
      try{
          const form = e.target as HTMLFormElement;   

          console.log("formData", formData)
          console.log("userData", userData)

          const res = await serverRequests.deleteMemo(formData, userData)
          

          if(res&&res.data){
            setToastOptions({ open: true, message: res?.message || "Memo Deleted successfully", type: 'success', timer: 5 });
  
            form.reset()
            setFormData(defaultMemo)

            getAllMemoThatsNotSubmitted()
          }
      }catch(e:unknown){ 
        console.error('Error creating employee:', e)
        setToastOptions({ open: true, message: (e as Error).message || "Error", type: 'error', timer: 5 });
      }  
  }  


  const getAllMemoThatsNotSubmitted = async () => { 
    try{
      const res = await serverRequests.getAllMemoThatsNotSubmitted(userData)
      if(res){
        setMemoOptions(res.data) 
      }
    }catch(e:unknown){ 
      console.error('Error getting all memo:', e)
      setToastOptions({ open: true, message: (e as Error).message || "Error", type: 'error', timer: 5 });
    }  
  }


  useEffect(()=>{
    if(userData&&userData._id){
      getAllMemoThatsNotSubmitted()
    }
  },[userData])  


  return (
    <form
      className={` form-style `} 
      onSubmit={handleSubmit}
    >
      <h2 className='font-semibold'>Memorandum Deletion</h2>

      {/* Memorandum to Submit */} 
      <div className='flex flex-col text-sm gap-2 '>Memo to Submit 
        <select className="select select-bordered w-full " id='Memo' required
          onChange={(e:any)=>{ 
            e.target.value=="null"?setFormData(defaultMemo):setFormData({ ...memoOptions[e.target.value], reason: memoOptions[e.target.value].reason || '' })
          }}  
        >
          <option disabled selected value={""}>Select Memo </option>
          {memoOptions&&memoOptions.map((memo, index) => (
            <option key={index} value={index}>{`${memo?.Employee?.name}, (${memo?.subject})`}</option>
          ))}
          <option value="null">None</option>
        </select>
      </div>


      {/* date */}
      <label className="flex flex-col items-start gap-2 text-sm">
        Date
        <input type="date" className="grow input input-bordered w-full" placeholder="Date" id='date' 
        value={formData?.date?new Date(formData?.date).toISOString().split('T')[0]:''}/>
      </label>   

      {/* employee */} 
      <div className='flex flex-col text-sm gap-2 '>Employee  
        <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-gray-500">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
            </svg> 
            <input type="text" className="grow" placeholder="Name" id="name" value={formData?.Employee?.name || ""}  />
        </label>  
      </div> 

      {/* memo */}
      <div className='flex flex-col gap-2 text-sm'>Memo
        {/* subject */}
        <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-gray-500">
                <path fillRule="evenodd" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z" clipRule="evenodd" />
                <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />
            </svg>
    
            <input type="text" className="grow placeholder:font-light" placeholder="Subject" id="subject" value={formData?.subject}/>
        </label>

        {/* description */} 
        <textarea className="textarea textarea-bordered mt-1 min-h-[20vh]" placeholder="Description" id='description' 
        value={formData?.MemoCode?.description || ""} 
        > 
        </textarea>  
      </div>
      
      {/* Reason */}
      <div className='flex flex-col gap-2 text-sm'>Reason  
        {/* Reason */} 
        <textarea className="textarea textarea-bordered mt-1 min-h-[20vh]" placeholder="Reason" id='reason'   > 
        </textarea>  
      </div>  

      <div className='text-sm flex flex-col md:flex-row justify-evenly '>
        {/* medialist */}
        <div className={`${!formData?.mediaList[0]&&"hidden"} flex flex-col items-center mb-1 gap-1 w-full md:w-[48%] bg-gray-100 p-1 rounded-lg `}>  
          <img src={formData?.mediaList[0]} className={` h-20 `} alt="mediaList" />
          Photo  
        </div>   
        {/* memoPhotosList */} 
        <div className={`${!formData?.memoPhotosList[0]&&"hidden"} flex flex-col items-center mb-1 gap-1 w-full md:w-[48%] bg-gray-100 p-1 rounded-lg `}>
          <img src={formData?.memoPhotosList[0]} className={` h-20 `} alt="memoPhotosList" />
          Memo Photo    
        </div> 
      </div>


      {/* submit */}
      <button 
          className='btn bg-red-500 text-white w-full place-self-start my-6' 
          type='submit'
        >Delete</button>


    </form>
  )
}

export default DeleteMemoForm
