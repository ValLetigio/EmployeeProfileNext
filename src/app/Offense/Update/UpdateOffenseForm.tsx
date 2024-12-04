'use client'

import React, { useState } from 'react'

import { useAppContext } from '@/app/GlobalContext';

import { DataToUpdate } from '@/app/Schema';

import { Offense } from '@/app/schemas/OffenseSchema.ts'

interface UpdateOffenseFormProps {
  offenseList: Offense[]
  remedialActions: string[]
}

const UpdateOffenseForm: React.FC<UpdateOffenseFormProps> = ({offenseList, remedialActions}) => {

    const { setToastOptions, serverRequests, userData, handleConfirmation, router } = useAppContext()

    const formRef = React.useRef<HTMLFormElement>(null) 

    const [ formData, setFormData ] = useState<Offense>({} as Offense)

    const [ dataToUpdate, setDataToUpdate ] = useState<DataToUpdate>({ } as DataToUpdate)  
    
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()   

      const confirmed = await handleConfirmation("Confirm Action?", `Save changes you've made for ${formData?.description} Offense`, "")
 
      if(confirmed){
        try{
            const form = e.target as HTMLFormElement;    

            console.log(dataToUpdate)
            
            const res = await serverRequests.updateOffense(formData, dataToUpdate, userData)

            setToastOptions({ open: true, message: res.message, type: 'success', timer: 5 });

            form.reset()
            setFormData({} as Offense)  

            router.refresh() 

            formRef.current?.scrollIntoView({ behavior: 'smooth' })
            
        }catch(e:unknown){ 
          console.error('Error Updating Offense:', e)
          setToastOptions({ open: true, message: (e as Error).message || "Error", type: 'error', timer: 15 });
        }  
      }
    } 
  
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value; 
      setFormData((prevData) => {
        const data = {
          ...prevData,
          remedialActions: event.target.checked
            ? [...prevData.remedialActions, value]
            : prevData.remedialActions.filter((action) => action !== value)
        };
        setDataToUpdate((prev)=> ({...prev, remedialActions: data.remedialActions}))
        return data;
      });
    };   

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = event.target;
      setFormData((prevData) => {
        const data = { ...prevData, [id]: value };
        return data;
      });
      setDataToUpdate((prev)=> ({...prev, [id]: value}))
    }

    console.log(dataToUpdate) 

  return (
    <form className='form-style' onSubmit={handleSubmit} ref={formRef}>
      <h2 className='font-semibold'>Update Offense</h2> 

      {/* Ofense to Update */} 
      <div className='flex flex-col text-sm gap-2 '>Offense to Update 
        <select className="select select-bordered w-full " id='select-offense' required
          value={formData?.description || ''}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>{
              const selectedIndex = e.target.options.selectedIndex - 1
            setFormData(e.target.value=="null"?{} as Offense:offenseList[selectedIndex])
          }}  
        >
          <option disabled selected value={""}>Select Offense </option>
          {offenseList&&offenseList.map((employee, index) => (
            <option key={index} value={employee?.description}>{employee?.description}</option>
          ))}
          <option value="null">None</option>
        </select>
      </div>

      {/* description */} 
      <div className='flex flex-col text-sm gap-2 mt-2'>Offense
        <div className='w-full flex flex-col md:flex-row justify-start gap-2'>
          <input className="input input-bordered w-28 text-center " type="number" placeholder="Code" id='number' required 
            value={formData?.number}  
            disabled={!formData.description}
            onChange={
              (e:React.ChangeEvent<HTMLInputElement>)=>{handleInputChange(e)}}> 
          </input>
          <input className="input input-bordered w-full " type="text" placeholder="Offense Title" id='title' required
            value={formData?.title || ""}  
            disabled={!formData.description}
            onChange={
              (e:React.ChangeEvent<HTMLInputElement>)=>{handleInputChange(e)}}> 
          </input> 
        </div>
        <textarea className="textarea textarea-bordered mt-1 min-h-[13vh]" placeholder="Offense Description" id='description' required
          value={formData?.description}  
          disabled={!formData.description}
          onChange={
            (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
              setFormData({ ...formData, description: e.target.value })
              setDataToUpdate((prev)=>({...prev, description: e.target.value}))
            }}> 
        </textarea>  
      </div> 

      {/* Remedial Actions */} 
      <div className='flex flex-col text-sm gap-2 mt-4'>Remedial Actions
        <div className=" flex flex-wrap gap-2 px-3" id="remedialActions">
          {remedialActions.map((action, index) => (
            <input 
                className={` ${formData?.remedialActions?.includes(action) ? ' ' : ' hover:brightness-150'}
                 join-item btn btn-sm font-normal tracking-tight btn-neutral disabled:bg-gray-300 `} 
              onChange={handleCheckboxChange} checked={formData?.remedialActions?.includes(action)}
              disabled={!formData.remedialActions}
              type="checkbox" name="options" value={action} aria-label={action} key={index} id={action}/>
          ))} 
        </div>
      </div> 

      {/* submit */}
      <button 
        className='btn bg-violet-500 text-white w-full place-self-start my-6' 
        type='submit' disabled={formData?.description?false:true}
        id='update-offense-button'
      >Update</button>
    </form>
  )
}

export default UpdateOffenseForm
