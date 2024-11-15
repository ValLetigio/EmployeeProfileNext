'use client'

import React, { useState, useRef } from 'react';

import { useAppContext } from '@/app/GlobalContext';

// import { Offense } from '@/app/Schema'
import { Offense } from '@/app/schemas/OffenseSchema.ts'
import { Employee } from '../../schemas/EmployeeSchema.ts'

import { Memo } from '@/app/schemas/MemoSchema.ts';


import Image from 'next/image'; 

interface CreateMemoFormProps {
  employeeList: Employee[],
  offenseList: Offense[]
}

const CreateMemoForm: React.FC<CreateMemoFormProps> = ({employeeList, offenseList}) => {

  const { setToastOptions, serverRequests, userData, handleConfirmation, router } = useAppContext()

  const formRef = useRef<HTMLFormElement>(null) 

  const [ formData, setFormData ] = useState<Memo>({} as Memo)  
  
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()   

      const confirmed = await handleConfirmation("Confirm Action?", `Create ${formData?.description} for ${formData?.Employee?.name}`, "")

      if(confirmed){
        try{
            const form = e.target as HTMLFormElement;   

            const res = await serverRequests.createMemo(formData, userData)

            if(res&&res.data){
              setToastOptions({ open: true, message: res?.message || "Memo created successfully", type: 'success', timer: 5 });
    
              form.reset()
              setFormData({} as Memo)

              router.refresh()

              formRef.current?.scrollIntoView({ behavior: 'smooth' })
            }
        }catch(e:unknown){ 
          console.error('Error creating Memo:', e)
          setToastOptions({ open: true, message: (e as Error).message || "Error", type: 'error', timer: 5 });
        }  
      }
  }
  
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
          ...formData,
          [e.target.id]: e.target.value
      })
  }  
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files?.length > 0) {
      const fileReaders = [];
      const fileDataUrls: string[] = [];
      
      for (let i = 0; i < files?.length; i++) {
        const reader = new FileReader();
        fileReaders.push(reader);
        
        reader.readAsDataURL(files[i]);
        
        reader.onloadend = () => {
          fileDataUrls.push(reader.result as string);

          // Check if all files have been processed
          if (fileDataUrls?.length === files?.length) {
            const finalResult = e.target.id === "photoOfPerson" ? fileDataUrls[0] : fileDataUrls;

            setFormData({
              ...formData,
              [e.target.id]: finalResult
            }); 
          }
        };
      }
    }
  }; 
 
  return (
    <form
      className={` form-style `} 
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <h2 className='font-semibold'>Memorandum Creation</h2>

      {/* date */}
      <label className="flex flex-col items-start gap-2 text-sm">
        Date
        <input type="date" className="grow input input-bordered w-full" placeholder="Date" id='date' required
          onChange={handleInputChange}/>
      </label>   

      {/* employee */} 
      <div className='flex flex-col text-sm gap-2 '>Employee 
        <select className="select select-bordered w-full " id='select-employee' required
          value={formData?.Employee?._id || ''}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>{
              const selectedIndex = e.target.options.selectedIndex - 1
            setFormData({...formData, Employee: employeeList[selectedIndex]})
          }} 
        >
          <option disabled selected value={""}>Select Employee</option>
          {employeeList&&employeeList.map((employee, index) => (
            <option key={index} value={employee?._id?.toString()}>{employee?.name}</option>
          ))}
          <option value="null">None</option>
        </select>
      </div>

      {/* Offense */} 
      <div className='flex flex-col text-sm gap-2 '>Memo Code
        <select className="select select-bordered w-full " id='MemoCode' required
          value={formData?.MemoCode?.description || ''}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>{
              const selectedIndex = e.target.options.selectedIndex - 1
            setFormData({...formData, MemoCode: offenseList[selectedIndex]})
          }} 
        >
          <option disabled selected value={""}>Select Offense</option>
          {offenseList&&offenseList.map((code, index) => (
            <option key={index} value={code?.description}>{code?.description}</option>
          ))}
          <option value="null">None</option>
        </select>
      </div>

      {/* memo */}
      <div className='flex flex-col gap-2 text-sm'>Memo
        {/* subject */}
        <label className="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-gray-500">
          <path fillRule="evenodd" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z" clipRule="evenodd" />
          <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />
        </svg>
  
        <input type="text" className="grow placeholder:font-light" placeholder="Subject" id="subject" required 
            onChange={handleInputChange}/>
        </label>

        {/* description */} 
        <textarea className="textarea textarea-bordered mt-1 min-h-[20vh]" placeholder="Description" id='description' required
          onChange={
            (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
              setFormData({ ...formData, description: e.target.value })
            }}> 
        </textarea>  
      </div>
      
      {/* Reason */}
      <div className='flex flex-col gap-2 text-sm'>Reason  
        {/* Reason */} 
        <textarea className="textarea textarea-bordered mt-1 min-h-[20vh]" placeholder="Reason" id='reason'  
          onChange={
            (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
              setFormData({ ...formData, reason: e.target.value })
            }}> 
        </textarea>  
      </div> 


      {/* medialist */}
      <label htmlFor="mediaList" className='text-sm flex flex-col w-full'>
        <div className='flex items-end justify-between mb-1 gap-1 '>Photo    
          <Image src={formData?.mediaList?.[0]} className={`${!formData?.mediaList?.[0]&&"hidden"} h-[60px]`} height={60} width={60} alt="mediaList" />   
        </div>
        <input type="file" className="file-input file-input-bordered w-full max-w-full " id='mediaList' accept='image/*'   
          onChange={handleFileChange} multiple/>
      </label>


      {/* medialist */}
      <label htmlFor="mediaList" className='text-sm flex flex-col w-full'>
      <div className='flex items-end justify-between mb-1 gap-1 '>Memo Photo    
          <Image src={formData?.memoPhotosList?.[0]} className={`${!formData?.memoPhotosList?.[0]&&"hidden"} h-[60px]`} height={60} width={60} alt="memoPhotosList" /> 
        </div>
        <input type="file" className="file-input file-input-bordered w-full max-w-full " id='memoPhotosList' accept='image/*'   
          onChange={handleFileChange} multiple/>
      </label>


      {/* submit */}
      <button 
          className='btn bg-blue-500 text-white w-full place-self-start my-6' 
          type='submit'
          id='create-memo-btn'
        >Create</button>


    </form>
  )
}

export default CreateMemoForm
