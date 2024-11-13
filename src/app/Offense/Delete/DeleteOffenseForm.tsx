'use client'

import React, { useState } from 'react'

import { useAppContext } from '@/app/GlobalContext';

// import { Offense } from '@/app/Schema';
import { Offense } from '@/app/schemas/OffenseSchema.ts'

interface DeleteOffenseFormProps {
  offenseList: Offense[]
  remedialActions: string[]
}

const DeleteOffenseForm: React.FC<DeleteOffenseFormProps> = ({offenseList, remedialActions}) => {

    const { setToastOptions, serverRequests, userData, handleConfirmation, router } = useAppContext()

    const formRef = React.useRef<HTMLFormElement>(null)

    const defaultOffense = { description:"", remedialActions: [] as string[], number: 0 }

    const [ formData, setFormData ] = useState(defaultOffense) 
   
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()  

      const confirmed = await handleConfirmation("Confirm Action?", `${formData?.description} will be deleted FOREVER!`, "error")

      if(confirmed){
        try{
            const form = e.target as HTMLFormElement; 

            const res = await serverRequests.deleteOffense(formData, userData)

            setToastOptions({ open: true, message: res.message, type: 'success', timer: 5 }); 

            form.reset()
            setFormData(defaultOffense)  

            router.refresh()

            formRef.current?.scrollIntoView({ behavior: 'smooth' })
        }catch(e:unknown){ 
          console.error('Error Deleting Offense:', e)
          setToastOptions({ open: true, message: (e as Error).message || "Error", type: 'error', timer: 15 });
        } 
      } 
    }   

  return (
    <form className='form-style' onSubmit={handleSubmit} ref={formRef}>
      <h2 className='font-semibold'>Offense Deletion</h2> 

      {/* Offense to Update */} 
      <div className='flex flex-col text-sm gap-2 '>Offense to Delete 
        <select className="select select-bordered w-full " id='select-offense' required
          value={formData?.description || ''}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>{
              const selectedIndex = e.target.options.selectedIndex - 1
            setFormData(e.target.value=="null"?defaultOffense:offenseList[selectedIndex])
          }}  
        >
          <option disabled selected value={""}>Select Offense </option>
          {offenseList&&offenseList.map((Offense, index) => (
            <option key={index} value={Offense?.description}>{Offense?.description}</option>
          ))}
          <option value="null">None</option>
        </select>
      </div>

      {/* description */} 
      <div className='flex flex-col text-sm gap-2 mt-2'>Offense Description
        <textarea className="textarea textarea-bordered mt-1 min-h-[13vh]" placeholder="Offense Description" id='description'  
          value={formData?.description} disabled={formData?.description==""} > 
        </textarea>  
      </div> 

      {/* Remedial Actions */} 
      <div className='flex flex-col text-sm gap-2 mt-4'>Remedial Actions
        <div className=" flex flex-wrap gap-2 px-3" id="remedialActions">
          {remedialActions.map((action, index) => (
            <input 
                className={` ${formData?.remedialActions.includes(action) ? ' ' : ' hover:brightness-150'}
                 join-item btn btn-sm font-normal tracking-tight btn-neutral `} checked={formData?.remedialActions.includes(action)}
              disabled={formData?.description==""}
              type="checkbox" name="options" value={action} aria-label={action} key={index}/>
          ))} 
        </div>
      </div> 

      {/* submit */}
      <button 
        className='btn bg-red-500 text-white w-full place-self-start my-6' 
        type='submit' disabled={formData?.description?false:true}
        id='delete-offense-btn'
      >Delete</button>
    </form>
  )
}

export default DeleteOffenseForm
