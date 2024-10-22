'use client'

import React, { useState } from 'react'

import { useAppContext } from '@/app/GlobalContext';

const CreateOffenseForm = () => {

  const { setToastOptions } = useAppContext()

  const [ formData, setFormData ] = useState({
    remedialActions: "",
    description: '',
    Employee: {name:""}, 
  })
  
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()  
      try{
          const form = e.target as HTMLFormElement;  
          console.log('formData:', formData)  
  
          form.reset()
          setFormData({
            remedialActions: "",
            description: '',
            Employee: {name:""}, 
          }) 
      }catch(e:unknown){ 
        console.error('Error creating employee:', e)
        setToastOptions({ open: true, message: (e as Error).message || "Error", type: 'error', timer: 5 });
      }  
  }

  return (
    <form className='form-style' onSubmit={handleSubmit}>
      <h2 className='font-semibold'>Offense Record Creation</h2>

      {/* employee */} 
      <div className='flex flex-col text-sm gap-2 '>Employee
        <select className="select select-bordered w-full " id='Employee' onChange={(e)=>setFormData({...formData, Employee: JSON.parse(e.target.value)})}>
          <option disabled selected>Select Employee</option>
          {[{name:'John Doe'},{name:'Jane Doe'},{name:'John Smith'}].map((employee, index) => (
            <option key={index} value={JSON.stringify(employee)} >{employee.name}</option>
          ))}
        </select>
      </div>

      {/* description */} 
      <div className='flex flex-col text-sm gap-2 mt-2'>Description
        <textarea className="textarea textarea-bordered mt-1 min-h-[20vh]" placeholder="Offense Description" id='description'
          onChange={
            (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
              setFormData({ ...formData, description: e.target.value })
            }}> 
        </textarea>  
      </div>

      {/* remedialActions */} 
      <div className='flex flex-col text-sm gap-2 mt-2'>Remedial Actions
        <textarea className="textarea textarea-bordered mt-1 min-h-[20vh]" placeholder="Remedial Actions" id='remedialActions'
            onChange={
              (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
                setFormData({ ...formData, remedialActions: e.target.value })
              }}> 
          </textarea>  
      </div>

      {/* submit */}
      <button 
          className='btn bg-blue-500 text-white w-full place-self-start my-6' 
          type='submit'
        >Create</button>
    </form>
  )
}

export default CreateOffenseForm
