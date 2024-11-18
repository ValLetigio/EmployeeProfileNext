'use client'

import React, { useState } from 'react'

import { useAppContext } from '@/app/GlobalContext';

import { Offense } from '@/app/schemas/OffenseSchema';

const CreateOffenseForm = () => {

  const { setToastOptions, serverRequests, userData, handleConfirmation, router } = useAppContext()

  const formRef = React.useRef<HTMLFormElement>(null)

  const [ formData, setFormData ] = useState<Offense>({ } as Offense)

  const remedialActions = [
    "Verbal Warning",
    "Written-Warning",
    "Counseling or Training",
    "Performance Improvement Plan (PIP)",
    "Suspension",
    "Probation",
    "Mediation or Conflict Resolution",
    "Final Written Warning",
    "Termination of Employment"
  ];
  
  
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()   

    const confirmed = await handleConfirmation("Confirm Action?", `Create ${formData?.description} Offense`, "")

    if(confirmed){
      try{
        const form = e.target as HTMLFormElement;   

        if(formData.remedialActions.length === 0){
          throw new Error('Remedial Actions must be selected')
        }else{ 
          const res = await serverRequests.createOffense(formData, userData)
          console.log(res)

          setToastOptions({ open: true, message: res.message, type: 'success', timer: 5 });

          form.reset()
          setFormData({} as Offense) 

          router.refresh()

          formRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
      }catch(e:unknown){ 
        console.error('Error creating Offense:', e)
        setToastOptions({ open: true, message: (e as Error).message || "Error", type: 'error', timer: 15 });
      }  
    }
  } 

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value; 
    setFormData((prevData) => {
      let remedialActions = prevData.remedialActions || []
      return {
        ...prevData,
        remedialActions: event.target.checked
        ? [...remedialActions, value]
        : remedialActions.filter((action) => action !== value)
      };
    });
  }; 
  
  
  return (
    <form className='form-style' onSubmit={handleSubmit} ref={formRef}>
      <h2 className='font-semibold'>Offense Creation</h2> 

      {/* description */} 
      <div className='flex flex-col text-sm gap-2 mt-2'>Offense
        <textarea className="textarea textarea-bordered mt-1 min-h-[13vh]" placeholder="Offense Description" id='description' required
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
            <input className="join-item btn btn-sm btn-neutral font-normal tracking-tight checked:hover:brightness-100 hover:brightness-150" 
              onChange={handleCheckboxChange}
              type="checkbox" name="options" value={action} aria-label={action} key={index} id={action}/>
          ))} 
        </div>
      </div> 

      {/* submit */}
      <button 
        className='btn bg-blue-500 text-white w-full place-self-start my-6' 
        type='submit'
        id='create-offense-button'
      >Create</button>
    </form>
  )
}

export default CreateOffenseForm
