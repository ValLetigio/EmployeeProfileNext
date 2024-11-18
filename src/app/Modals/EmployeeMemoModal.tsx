import React from 'react'

import { useAppContext } from '../GlobalContext'  

import { Memo } from '../schemas/MemoSchema'

import Image from 'next/image'

const EmployeeMemoModal = () => {

  const { memoForModal, setMemoForModal, handleImageModalClick } = useAppContext()  

  console.log(memoForModal);

  return (
    <dialog id="EmployeeMemoModal" className="modal ">
      <div className=" bg-transparent shadow-none gap-2 p-0 w-max">   
        <div className='min-h-[55vh] max-h-full w-[98vw] md:w-[80vw] rounded-xl py-8 bg-white px-6 flex justify-center items-center flex-col gap-2 relative '>
          {/*  */}
          <form className='absolute top-2 right-2' method="dialog"> 
            <button 
              onClick={()=>setMemoForModal([] as Memo[])} 
              className=" btn btn-error text-white btn-sm rounded-full h-8 w-8">X</button>
          </form>
          
          <h3 className='text-xl font-semibold w-full text-start'>Memos</h3>
          <div className='w-full h-full overflow-auto rounded-xl pb-2'>
            <table className="table w-full table-pin-rows ">
              {/* head */} 
              <thead>
                <tr className='bg-gray-500 text-white'> 
                  <th>Date</th>
                  <th className='min-w-[30vw]'>Memo</th>
                  <th className='min-w-[30vw]'>Offense</th> 
                  <th className='min-w-[150px]'>Photos</th> 
                  <th className='min-w-[150px]'>Memo Photos</th> 
                  <th>Reason</th> 
                  <th>isSubmitted</th>  
                </tr>
              </thead>
              <tbody>
                {memoForModal?.map((memo) => (
                <tr key={memo._id} 
                  className='hover:bg-gray-200'
                >
                  {/* Date */}
                  <td className='w-max line-clamp-1 '> {memo?.date?.substring(0, 16)} </td>
                  {/* Memo */}
                  <td className=' '>
                      <h3 className='font-bold underline'>{memo?.subject}</h3>
                      <p className='whitespace-pre-line'>{memo?.description}</p> 
                  </td>
                  {/* Offense */}
                  <td>
                    <div className="collapse collapse-arrow bg-base-200 w-[70vw] min-[700px]:w-full">
                      <input type="radio" name="my-accordion-2" />
                      <div className="collapse-title text-base font-bold">{memo?.MemoCode?.description}</div>
                      <div className="collapse-content flex flex-wrap gap-1 ">
                        {memo?.MemoCode?.remedialActions?.map((action, index) => (
                          <p className='btn btn-xs text-[.70rem] btn-neutral' key={index}>{action}</p>
                        ))} 
                      </div>
                    </div>
                  </td> 
                  {/* Photos */}
                  <td > <Image className='w-64 h-24 hover:border cursor-pointer' src={memo?.mediaList?.[0]} width={1} height={1} alt="mediaList" 
                    onClick={()=>handleImageModalClick(memo?.mediaList)}></Image> </td>
                  {/* Memo Photos */}
                  <td> <Image className='w-64 h-24 hover:border cursor-pointer' src={memo?.memoPhotosList?.[0]} width={1} height={1} alt="mediaList" 
                    onClick={()=>handleImageModalClick(memo?.memoPhotosList)}></Image> </td>
                  {/* Reason */}
                  <td> <p className='whitespace-pre-line hover:underline decoration-wavy'>{memo?.reason || "None"}</p> </td>
                  {/* isSubmitted */}
                  <td className='font-bold text-center'> {memo?.submitted?"✔":"X"} </td>
                </tr>
                ))}
              </tbody>
              {/* foot */}
              <tfoot >
                <tr className='bg-gray-500 text-white'> 
                  <th>Date</th>
                  <th>Memo</th>
                  <th>Offense</th> 
                  <th>Photos</th> 
                  <th>Memo Photos</th> 
                  <th>Reason</th> 
                  <th>isSubmitted</th>  
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

      </div>
    </dialog>
  )
}

export default EmployeeMemoModal
