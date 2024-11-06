'use client'

import React, { useState, useEffect } from 'react'

import { useAppContext } from '@/app/GlobalContext';

import { DataToUpdate, Offense } from '@/app/Schema';

const UpdateOffenseForm = () => {

    const { setToastOptions, serverRequests, userData } = useAppContext()

    const defaultOffense = 
        {description:"", remedialActions:[]as string[], number:0}

    const [ formData, setFormData ] = useState(defaultOffense)

    const [ dataToUpdate, setDataToUpdate ] = useState<DataToUpdate>({ remedialActions: [] })

    const [ offenseOptions, setOffenseOptions ] = useState<Offense[]>([])
  
    const remedialActions = [
      "Verbal Warning",
      "Written Warning",
      "Counseling or Training",
      "Performance Improvement Plan (PIP)",
      "Suspension",
      "Probation",
      "Mediation or Conflict Resolution",
      "Final Written Warning",
      "Termination of Employment"
    ]; 

    const fetchOffenses = async () => {
        try{
            const res = await serverRequests.fetchOffenseList() 
            setOffenseOptions(res.data)
        }
        catch(e:unknown){
            console.error('Error fetching offenses:', e)
        }
    }
    
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()  

      const confirmed = window.confirm(`Are you sure you want to Update ${formData?.description}?`); 

      if(confirmed){
        try{
            const form = e.target as HTMLFormElement;    

            if((dataToUpdate.remedialActions as string[]).length === 0){
              throw new Error('Remedial Actions must be selected')
            }else{ 
              const res = await serverRequests.updateOffense(formData, dataToUpdate, userData)

              setToastOptions({ open: true, message: res.message, type: 'success', timer: 5 });

              form.reset()
              setFormData(defaultOffense) 

              fetchOffenses()
            }
        }catch(e:unknown){ 
          console.error('Error creating employee:', e)
          setToastOptions({ open: true, message: (e as Error).message || "Error", type: 'error', timer: 5 });
        }  
      }
    } 
  
    const handleCheckboxChange = (event: any) => {
      const value = event.target.value; 
      setFormData((prevData) => {
        const data = {
          ...prevData,
          remedialActions: event.target.checked
            ? [...prevData.remedialActions, value]
            : prevData.remedialActions.filter((action) => action !== value)
        };
        setDataToUpdate({remedialActions: data.remedialActions})
        return data;
      });
    }; 

    useEffect(() => {
        fetchOffenses()
    }, []) 


  return (
    <form className='form-style' onSubmit={handleSubmit}>
      <h2 className='font-semibold'>Update Offense</h2> 

      {/* Ofense to Update */} 
      <div className='flex flex-col text-sm gap-2 '>Offense to Update 
        <select className="select select-bordered w-full " id='Employee' required
          onChange={(e:any)=>{ 
            e.target.value=="null"?setFormData(defaultOffense):setFormData(offenseOptions[e.target.value])
          }}  
        >
          <option disabled selected value={""}>Select Offense </option>
          {offenseOptions&&offenseOptions.map((employee, index) => (
            <option key={index} value={index}>{employee?.description}</option>
          ))}
          <option value="null">None</option>
        </select>
      </div>

      {/* description */} 
      <div className='flex flex-col text-sm gap-2 mt-2'>Offense Description
        <textarea className="textarea textarea-bordered mt-1 min-h-[13vh]" placeholder="Offense Description" id='description' required
          value={formData?.description} disabled={formData?.description==""}
          onChange={
            (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
              setFormData({ ...formData, description: e.target.value })
            }}> 
        </textarea>  
      </div> 

      {/* Remedial Actions */} 
      <div className='flex flex-col text-sm gap-2 mt-4'>Remedial Actions
        <div className=" flex flex-wrap gap-2 px-3" id="remedialActions">
          {remedialActions.map((action, index) => (
            <input 
                className={` ${formData?.remedialActions.includes(action) ? ' ' : ' hover:brightness-150'}
                 join-item btn btn-sm font-normal tracking-tight btn-neutral `}
              onChange={handleCheckboxChange} checked={formData?.remedialActions.includes(action)}
              disabled={formData?.description==""}
              type="checkbox" name="options" value={action} aria-label={action} key={index}/>
          ))} 
        </div>
      </div> 

      {/* submit */}
      <button 
        className='btn bg-violet-500 text-white w-full place-self-start my-6' 
        type='submit' disabled={formData?.description?false:true}
      >Update</button>
    </form>
  )
}

export default UpdateOffenseForm
