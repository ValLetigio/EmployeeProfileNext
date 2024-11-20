'use client'

import React from 'react' 

import { useAppContext } from '../GlobalContext' 

import { Employee } from '../schemas/EmployeeSchema'

import { Memo } from '../schemas/MemoSchema'

import Image from 'next/image'  

const EmployeeDetails = () => {

    const { 
        selectedEmployee, setSelectedEmployee,  
        handleImageModalClick, handleMemoTableModalClick,
        serverRequests, userData

    } = useAppContext(); 

    const dummy = React.useRef<HTMLDivElement>(null);

    const [ selectedEmployeeMemos, setSelectedEmployeeMemos ] = React.useState([] as Memo[]);

    const detailStyle = (item:boolean) => (`${!item&&"hidden"} tracking-widest flex grow flex-col-reverse text-center p-2 xl:p-3 border rounded-xl hover:bg-gray-700 hover:text-white`); 

    const skeletonStyle = `${selectedEmployee._id ? "hidden" : "block"} skeleton shrink-0 `;

    const contentStyle = `${selectedEmployee._id ? "block" : "hidden"}`;

    const getMemosForEmployee = async () => {
        try{
            const res = await serverRequests.getMemoList(userData, selectedEmployee?._id || "");
            if(res?.data){
                setSelectedEmployeeMemos(res.data); 
            }
        }catch (e) {
            console.error(e);
        } 
    }

    React.useEffect(() => {
        if(selectedEmployee._id) {
            getMemosForEmployee();
            dummy.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [selectedEmployee]);


  return (
    <div className='relative h-full w-full flex flex-col justify-start items-center rounded-xl shadow-md shadow-gray-500 border p-4' ref={dummy}> 
        <button onClick={()=>setSelectedEmployee({} as Employee)} className={`${!selectedEmployee?._id&&"hidden"} absolute top-1 right-2 opacity-40`}>X</button>

        <div className={skeletonStyle + " rounded-full h-32 md:h-40 w-32 md:w-40 "}></div>

        <div className={'w-full flex justify-center py-3 xl:py-8 ' + contentStyle}>
            <div className=' indicator' >

                <span data-tip={`${selectedEmployeeMemos?.length} Memos`} 
                    className={`${!selectedEmployeeMemos?.length&&"hidden"}  
                        cursor-pointer tooltip-top tooltip indicator-item badge badge-error text-white absolute hover:bg-red-200`}
                    onClick={()=>handleMemoTableModalClick(selectedEmployeeMemos)}>
                    {selectedEmployeeMemos?.length}
                </span>

                <div 
                    className=' w-24 xl:w-36 h-24 xl:h-36 ring-gray-700 ring-offset-base-100 ring-2 ring-offset-0 rounded-full overflow-clip'
                    onClick={()=>handleImageModalClick([selectedEmployee?.photoOfPerson])}
                >
                    <Image className='w-full h-full' src={selectedEmployee?.photoOfPerson || ""} alt={selectedEmployee?.name || ""} height={1} width={1} />
                </div>
            </div>
        </div>
        <div className=''>
            {selectedEmployee?.name && <h2 className='text-2xl font-semibold'>{selectedEmployee?.name}</h2>}
        </div>
        <div>
            <h3>{selectedEmployee?.address}</h3>
        </div>

        <div className='w-full border-b my-4'/>


        <div className='flex flex-wrap gap-3 items-stretch w-full h-max text-xs overflow-auto max-h-[50%] pb-2'>
            <div className={skeletonStyle + " p-4 w-full bg-opacity-55 text-xl text-center"}>Select an Employee</div>
            <div className={skeletonStyle + " h-12 w-40 grow"}></div>
            <div className={skeletonStyle + " h-12 w-28 grow"}></div>
            <div className={skeletonStyle + " h-12 w-32 grow"}></div>
            <div className={skeletonStyle + " h-12 w-40 grow"}></div>
            
            <div className={detailStyle(Boolean(selectedEmployee?.company))} >Company
                <strong className='text-base'>{selectedEmployee?.company}</strong></div>
            <div className={detailStyle(Boolean(selectedEmployee?.dateJoined))} >Joined
                <strong className='text-base'>{selectedEmployee?.dateJoined?.substring(5, 17)}</strong></div>
            <div className={detailStyle(Boolean(selectedEmployee?.dailyWage))} >Daily Wage
                <strong className='text-base'>₱ {selectedEmployee?.dailyWage?.toLocaleString()}</strong></div>
            <div className={detailStyle(Boolean(selectedEmployee?.email))} >Email
                <strong className='text-base'>{selectedEmployee?.email}</strong></div> 
            <div className={detailStyle(Boolean(selectedEmployee?.phoneNumber))} >Phone
                <strong className='text-base'>{selectedEmployee?.phoneNumber}</strong></div>
            <div className={detailStyle(Boolean(selectedEmployee?.isProductionEmployee))} >isProduction
                <strong className='text-base'>✔</strong></div>
            <div className={detailStyle(Boolean(selectedEmployee?.isRegular))} >isRegular
                <strong className='text-base'>✔</strong></div>
        </div>

        <div className='absolute flex justify-stretch bottom-2 gap-4 w-full text-center py-1 px-4'> 
            <div onClick={()=>handleImageModalClick(selectedEmployee?.resumePhotosList)}
                className={`${!selectedEmployee?.resumePhotosList?.[0]&&"hidden"} 
                p-2 xl:p-4 flex items-center justify-evenly bg-gray-100 hover:bg-gray-700 hover:text-white w-full rounded-xl`}>Resume
                <Image className={`w-8 h-8`} src={selectedEmployee?.resumePhotosList?.[0]||""} alt={selectedEmployee?.name} width={1} height={1}></Image>
            </div>
            <div onClick={()=>handleImageModalClick(selectedEmployee?.biodataPhotosList)}
                className={`${!selectedEmployee?.biodataPhotosList?.[0]&&"hidden"} 
                p-2 xl:p-4 flex items-center justify-evenly bg-gray-100 hover:bg-gray-700 hover:text-white w-full rounded-xl`}>Bio-data
                <Image className={`w-8 h-8`} src={selectedEmployee?.biodataPhotosList?.[0]||""} alt={selectedEmployee?.name} width={1} height={1}></Image>
            </div> 
        </div>
        <div className='py-6 pt-14 '> </div>
    </div>
  )
}

export default EmployeeDetails
