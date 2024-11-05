'use client'

import React, { useState, useEffect } from 'react';

import { useAppContext } from '@/app/GlobalContext';

import { Employee, Offense } from '@/app/Schema';



const CreateMemoForm = () => {

  const { setToastOptions, serverRequests, userData } = useAppContext()

  const [ formData, setFormData ] = useState({
    date: '',
    Employee: {} as Employee, 
    description: '',
    subject: '',
    mediaList: [] as string[],
    memoPhotosList: [] as string[],
    MemoCode: {} as Offense,
    reason: '',
    submitted: false 
  })

  const [ employeeOptions, setEmployeeOptions ] = useState<Employee[]>([])

  const [ memoCodes, setMemoCodes ] = useState<Offense[]>([]) 
  
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()  
      try{
          const form = e.target as HTMLFormElement;  
          console.log('formData:', formData)  

          const res = await serverRequests.createMemo(formData, userData)

          if(res&&res.data){
            setToastOptions({ open: true, message: res?.message || "Memo created successfully", type: 'success', timer: 5 });
  
            form.reset()
            setFormData({
              date: '',
              Employee: {} as Employee, 
              description: '',
              subject: '',
              mediaList: [] as string[],
              memoPhotosList: [] as string[],
              MemoCode: {} as Offense,
              reason: '',
              submitted: false 
            })
          }
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
                  [e.target.id]: [reader.result]
              })
          }
      }
  } 

  const fetchEmployees = async () => {
    try{ 
      const employees = await serverRequests.fetchEmployeeList() 
      setEmployeeOptions(employees?.data)
    }catch(e:unknown){
      console.error('Error fetching employees:', e)
      setToastOptions({ open: true, message: (e as Error).message || "Error", type: 'error', timer: 5 });
    }
  } 

  const fetchOffenses = async () => {
    try{ 
      const memoCodes = await serverRequests.fetchOffenseList() 
      setMemoCodes(memoCodes?.data)
      console.log('memoCodes:', memoCodes)
    }catch(e:unknown){
      console.error('Error fetching memoCodes:', e)
      setToastOptions({ open: true, message: (e as Error).message || "Error", type: 'error', timer: 5 });
    }
  }

  useEffect(()=>{
    fetchEmployees() 
    fetchOffenses()
  },[])

  useEffect(()=>{
    console.log('formData:', formData)
  },[formData])


  return (
    <form
      className={` form-style `} 
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
        <select className="select select-bordered w-full " id='Employee' required
          onChange={(e:any)=>{ 
            setFormData({...formData, Employee: employeeOptions[e.target.value]})
          }} 
        >
          <option disabled selected value={""}>Select Employee</option>
          {employeeOptions&&employeeOptions.map((employee, index) => (
            <option key={index} value={index}>{employee?.name}</option>
          ))}
          <option value="null">None</option>
        </select>
      </div>

      {/* Offense */} 
      <div className='flex flex-col text-sm gap-2 '>Memo Code
        <select className="select select-bordered w-full " id='MemoCode' required
          onChange={(e:any)=>{ 
            setFormData({...formData, MemoCode: memoCodes[e.target.value]})
          }} 
        >
          <option disabled selected value={""}>Select Offense</option>
          {memoCodes&&memoCodes.map((code, index) => (
            <option key={index} value={index}>{code?.description}</option>
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
        <textarea className="textarea textarea-bordered mt-1 min-h-[20vh]" placeholder="Reason" id='reason' required
          onChange={
            (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
              setFormData({ ...formData, reason: e.target.value })
            }}> 
        </textarea>  
      </div> 


      {/* medialist */}
      <label htmlFor="mediaList" className='text-sm flex flex-col w-full'>
        <div className='flex items-end justify-between mb-1 gap-1 '>Photo    
          <img src={formData?.mediaList[0]} className={`${!formData?.mediaList[0]&&"hidden"} h-20`} alt="mediaList" />
        </div>
        <input type="file" className="file-input file-input-bordered w-full max-w-full " id='mediaList' accept='image/*'   
          onChange={handleFileChange}/>
      </label>


      {/* medialist */}
      <label htmlFor="mediaList" className='text-sm flex flex-col w-full'>
      <div className='flex items-end justify-between mb-1 gap-1 '>Memo Photo    
          <img src={formData?.memoPhotosList[0]} className={`${!formData?.memoPhotosList[0]&&"hidden"} h-20`} alt="mediaList" />
        </div>
        <input type="file" className="file-input file-input-bordered w-full max-w-full " id='memoPhotosList' accept='image/*'   
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
