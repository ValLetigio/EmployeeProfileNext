import React from 'react'

import { useAppContext } from '../GlobalContext'  

import { Memo } from '../schemas/MemoSchema'

import Image from 'next/image'

const EmployeeMemoTableModal = () => {

  const { memoForTableModal, setMemoForTableModal, handleImageModalClick, handleMemoPrintModalClick } = useAppContext()    

  return (
    <dialog id="EmployeeMemoModal" className="modal ">
      <div className=" bg-transparent shadow-none gap-2 p-0 w-max">   
        <div className=' max-h-[80vh] w-[98vw] md:w-[80vw] rounded-xl py-8 bg-white px-6 flex justify-center items-center flex-col gap-2 relative '>
          {/*  */}
          <form className='absolute top-2 right-2' method="dialog"> 
            <button 
              onClick={()=>setMemoForTableModal([] as Memo[])} 
              className=" btn btn-error text-white btn-sm rounded-full h-8 w-8">X</button>
          </form>
          
          <h3 className='text-xl font-semibold w-full text-start '>Memos <span className='text-base'>( {memoForTableModal?.[0]?.Employee?.name} )</span> </h3> 
          <div className='w-full h-full overflow-auto rounded-xl  '>
            <table className="table w-full table-pin-rows ">
              {/* head */} 
              <thead>
                <tr className='bg-gray-500 text-white'> 
                  <th></th>
                  <th className='min-w-[150px]'>Date</th>
                  <th className='min-w-[200px]'>Memo</th>
                  <th className='min-w-[20vw]'>Offense</th> 
                  <th className='min-w-[150px]'>Photos</th> 
                  <th className='min-w-[150px]'>Memo Photos</th> 
                  <th className='min-w-[200px]'>Reason</th> 
                  <th>isSubmitted</th>  
                </tr>
              </thead>
              <tbody>
                {memoForTableModal?.map((memo) => (
                <tr key={memo._id} 
                  className='hover:bg-gray-200'
                >
                  {/* print */}
                  <td className='w-max text-center '>
                    <button className='hover:text-blue-500 tooltip-right tooltip' data-tip="Print"
                      onClick={()=>handleMemoPrintModalClick(memo)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg> 
                    </button>
                  </td>

                  {/* Date */}
                  <td className='w-max '> {memo?.date?.substring(0, 16)} </td>
                  {/* Memo */}
                  <td className=' ' onClick={()=>handleMemoPrintModalClick(memo)}>
                      <h3 className='font-bold underline'>{memo?.subject}</h3>
                      <p className='whitespace-pre-line hover:underline decoration-wavy line-clamp-4'>{memo?.description}</p> 
                  </td>
                  {/* Offense */}
                  <td>
                    <div className="collapse collapse-arrow bg-base-200 w-[70vw] min-[700px]:w-full">
                      <input type="radio" name="my-accordion-2" />
                      <div className="collapse-title text-base font-bold">{memo?.MemoCode?.description}</div>
                      <div className="collapse-content flex flex-wrap gap-1 ">
                        {memo?.MemoCode?.remedialActions?.map((action, index) => (
                          <p className='btn btn-xs text-[.70rem] btn-neutral truncate' key={index}>{action}</p>
                        ))} 
                      </div>
                    </div>
                  </td> 
                  {/* Photos */}
                  <td > <Image className='w-[150px] h-[150px] hover:border cursor-pointer' src={memo?.mediaList?.[0]} width={1} height={1} alt="mediaList" 
                    onClick={()=>memo?.mediaList?.[0]&&handleImageModalClick(memo?.mediaList)}></Image> </td>
                  {/* Memo Photos */}
                  <td> <Image className='w-[150px] h-[150px] hover:border cursor-pointer' src={memo?.memoPhotosList?.[0]} width={1} height={1} alt="memoPhotosList" 
                    onClick={()=>memo?.memoPhotosList?.[0]&&handleImageModalClick(memo?.memoPhotosList)}></Image> </td>
                  {/* Reason */}
                  <td> <p onClick={()=>handleMemoPrintModalClick(memo)}
                  className='whitespace-pre-line hover:underline decoration-wavy line-clamp-4' >{memo?.reason || "None"}</p> </td>
                  {/* isSubmitted */}
                  <td className='font-bold text-center'> {memo?.submitted?"✔":"X"} </td>
                </tr>
                ))}
              </tbody>
              {/* foot */}
              <tfoot >
                <tr className='bg-gray-500 text-white'> 
                  <th></th>
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

export default EmployeeMemoTableModal
