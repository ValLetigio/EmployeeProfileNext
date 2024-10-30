'use client'

import React, { useEffect, useState } from 'react' 

import { useAppContext } from '@/app/GlobalContext' 

const CreateEmployeeForm = () => {

    const { setToastOptions, serverRequests, userData } = useAppContext() 

    const [ formData, setFormData ] = useState({
        name: '',
        address: '',
        phoneNumber: '',
        photoOfPerson: '',
        resumePhotosList: [''],
        biodataPhotosList: [''],
        email: '',
        dateJoined: '',
        company: '',
        isRegular: false,
        isProductionEmployee: false,
        dailyWage: 0
    })

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()  
        try{
            const form = e.target as HTMLFormElement;  

            console.log('formData:', formData)  

            let finalFormData = {
                ...formData,
                _id: "", 
                _version: 0, 
            }

            const res = await serverRequests.createEmployee(finalFormData, userData)

            if(res.message){
                setToastOptions({ open: true, message: res.message, type: 'success', timer: 10 });
                form.reset() 
                setFormData({
                    name: '',
                    address: '',
                    phoneNumber: '',
                    photoOfPerson: '',
                    resumePhotosList: [''],
                    biodataPhotosList: [''],
                    email: '',
                    dateJoined: '',
                    company: '',
                    isRegular: false,
                    isProductionEmployee: false,
                    dailyWage: 0
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
            [e.target.id]: e.target.id != 'dailyWage' ? e.target.value : parseFloat(e.target.value)
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
                    [e.target.id]: e.target.id == "photoOfPerson" ? reader.result : [reader.result]
                })
            }
        }
    }

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            console.log('formData:', formData)
        }
        , 20000)
        return ()=>clearTimeout(timeout)
        
    },[formData])

  return (
    <form className={` form-style `}
        onSubmit={(e)=>handleSubmit(e)}
    >
        <h2 className='font-semibold'>Employee Registry</h2>

        {/* name */}
        <div className='flex flex-col text-sm gap-2 '>Name
            <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-gray-500">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg> 
                <input type="text" className="grow" placeholder="Name" id="name" required 
                    onChange={handleInputChange}/>
            </label>
        </div>


        {/* address */} 
        <div className='flex flex-col text-sm gap-2 '>Address
            <textarea className="textarea textarea-bordered" placeholder="Address" id='address'
                onChange={
                    (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
                        setFormData({ ...formData, address: e.target.value })
                    }}> 
            </textarea>
        </div>


        {/* Phone Number */}
        <div className='flex flex-col text-sm gap-2 '>Phone Number
            <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-gray-500">
                    <path 
                        fillRule="evenodd" 
                        d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" 
                        clipRule="evenodd" 
                    />
                </svg> 
                <input type="text" className="grow" placeholder="Phone Number" id='phoneNumber' 
                    onChange={handleInputChange}/>
            </label>
        </div>


        {/* photoOfPerson, resume, bioData */}  
        <div className='flex flex-wrap gap-3 md:gap-2 justify-between w-full '>
            {/* photoOfPerson */}
            <label htmlFor="photoOfPerson" className='text-sm flex flex-col w-full'>
                <div className='flex justify-between items-center mb-1 gap-1 relative'>Photo Of Person    
                    <img src={formData?.photoOfPerson} className='h-20 ' alt="" />
                </div>
                <input type="file" className="file-input file-input-bordered sw-full max-w-full file-input-xs h-10" id='photoOfPerson' accept='image/*' required 
                    onChange={handleFileChange}/>
            </label>
            {/* resumePhotosList */}
            <label htmlFor="resumePhotosList" className='text-sm flex flex-col w-full md:w-[48%]'>
                <div className='flex justify-between items-center mb-1 gap-1 relative'>Resume    
                    <img src={formData?.resumePhotosList[0]} className='h-20 ' alt="" />
                </div>
                <input type="file" className="file-input file-input-bordered w-full max-w-full file-input-xs h-10" id='resumePhotosList' accept='image/*' 
                    onChange={handleFileChange}/>
            </label>
            {/* biodataPhotosList */}
            <label htmlFor="biodataPhotosList" className='text-sm flex flex-col w-full md:w-[48%]'>
                <div className='flex justify-between items-center mb-1 gap-1 relative'>Bio Data   
                    <img src={formData?.biodataPhotosList[0]} className='h-20 ' alt="" />
                </div>
                <input type="file" className="file-input file-input-bordered w-full max-w-full file-input-xs h-10" id='biodataPhotosList' accept='image/*' 
                    onChange={handleFileChange}/>
            </label>
        </div> 


        {/* E-mail */}
        <div className='flex flex-col text-sm gap-2 '>E-mail
            <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-gray-500">
                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg> 
                <input type="email" className="grow" placeholder="E-mail" id='email' required
                    onChange={handleInputChange}/>
            </label>
        </div>


        {/* date */}
        <label className="flex flex-col items-start gap-2 text-sm">
            Date Joined
            <input type="date" className="grow input input-bordered w-full" placeholder="Date Joined" id='dateJoined' required
                onChange={handleInputChange}/>
        </label>  


        {/* company */}
        <div className='flex flex-col text-sm gap-2 '>Company
            <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-gray-500">
                    <path 
                        fillRule="evenodd" 
                        d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z" clipRule="evenodd" />
                </svg> 
                <input type="text" className="grow" placeholder="Company" required id='company' 
                    onChange={handleInputChange}/>
            </label>
        </div>


        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            {/* isRegular */}
            <label className="label cursor-pointer flex justify-start gap-2 w-max">
                <p className="label-text text-base">Is Regular?</p>
                <input type="checkbox" defaultChecked className="checkbox" required id='isRegular'   
                    onChange={(e)=>setFormData({...formData, isRegular:e.target.checked})}/>
            </label> 
            {/* isProductionEmployee */}
            <label className="label cursor-pointer flex justify-start gap-2 w-max">
                <p className="label-text text-base">Is Production Employee?</p>
                <input type="checkbox" defaultChecked className="checkbox" required id='isProductionEmployee'   
                    onChange={(e)=>setFormData({...formData, isProductionEmployee:e.target.checked})}/>
            </label> 
        </div>

        {/* Daily wage */}
        <div className='flex flex-col text-sm gap-2 '>Daily Wage
            <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-gray-500">
                    <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                    <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z" clipRule="evenodd" />
                    <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
                </svg>

                <input type="number" className="grow" placeholder="Daily Wage" required id='dailyWage' step={0.00001}
                    onChange={handleInputChange}/>
            </label>
        </div> 

        {/* submit */}
        <button 
            className='btn bg-blue-500 text-white w-full place-self-start my-6' 
            type='submit'
        >Create</button>

      
    </form>
  )
}

export default CreateEmployeeForm
