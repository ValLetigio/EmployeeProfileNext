'use client'

import React, { useState } from 'react';

import { useAppContext } from '@/app/GlobalContext';



const CreateMemoForm = () => {

  const { setToastOptions } = useAppContext()

  const [ formData, setFormData ] = useState({
    date: '',
    Employee: {name:""}, 
    description: '',
  })
  
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()  
      try{
          const form = e.target as HTMLFormElement;  
          console.log('formData:', formData)  
  
          form.reset()
          setFormData({
            date: '', 
            Employee: {name:""},
            description: '',
          }) 
      }catch(e:unknown){ 
        console.error('Error creating employee:', e)
        setToastOptions({ open: true, message: (e as Error).message || "Error", type: 'error', timer: 5 });
      }  
  }
  
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
          ...formData,
          [e.target.id]: e.target.value
      })
  }  
  
  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if(file){
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onloadend = () => {
              setFormData({
                  ...formData,
                  [e.target.id]: reader.result
              })
          }
      }
  } 

  return (
    <form
      className={` form-style `} 
      onSubmit={handleSubmit}
    >
      <h2 className='font-semibold'>Memorandum Creation</h2>

      {/* date */}
      <label className="flex flex-col items-start gap-2 text-sm">
        Date
        <input type="date" className="grow input input-bordered w-full" placeholder="Date" id='date' 
          onChange={handleInputChange}/>
      </label>  

      {/* employee */} 
      <div className='flex flex-col text-sm gap-2 '>Employee
        <select className="select select-bordered w-full " id='Employee' onChange={(e)=>setFormData({...formData, Employee: JSON.parse(e.target.value)})}>
          <option disabled selected>Select Employee</option>
          {[{name:'John Doe'},{name:'Jane Doe'},{name:'John Smith'}].map((employee, index) => (
            <option key={index} value={JSON.stringify(employee)} >{employee.name}</option>
          ))}
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
  
        <input type="text" className="grow placeholder:font-light" placeholder="Subject" id="Subject" required 
            onChange={handleInputChange}/>
        </label>

        {/* description */} 
        <textarea className="textarea textarea-bordered mt-1 min-h-[20vh]" placeholder="Description" id='description'
          onChange={
            (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
              setFormData({ ...formData, description: e.target.value })
            }}> 
        </textarea>  
      </div>     


      {/* medialist */}
      <label htmlFor="mediaList" className='text-sm flex flex-col w-full'>
        <div className='flex items-center mb-1 gap-1 relative'>Photo    
        </div>
        <input type="file" className="file-input file-input-bordered w-full max-w-full " id='mediaList' accept='image/*' required 
          onChange={handleFileChange}/>
      </label>


      {/* medialist */}
      <label htmlFor="mediaList" className='text-sm flex flex-col w-full'>
        <div className='flex items-center mb-1 gap-1 relative'>Memo Photo   
        </div>
        <input type="file" className="file-input file-input-bordered w-full max-w-full " id='memoPhotosList' accept='image/*' required 
          onChange={handleFileChange}/>
      </label>


      {/* submit */}
      <button 
          className='btn bg-blue-500 text-white w-full place-self-start my-6' 
          type='submit'
        >Create</button>


    </form>
  )
}

export default CreateMemoForm
