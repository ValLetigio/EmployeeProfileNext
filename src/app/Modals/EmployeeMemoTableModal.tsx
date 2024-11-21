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
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
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
