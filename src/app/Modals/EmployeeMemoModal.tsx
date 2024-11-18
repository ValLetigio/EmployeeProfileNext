import React from 'react'

import { useAppContext } from '../GlobalContext' 

import { Memo } from '../schemas/MemoSchema'

const EmployeeMemoModal = () => {

    const { memoForModal, setMemoForModal } = useAppContext() 

    interface dummyShema { [key: string]: { name: string; address: string; company: string; }[] }

    const dummy: dummyShema = {
      Val: [
        {
          name: "John Doe",
          address: "1234 Main St",
          company: "ACME Inc."
        },
        {
          name: "Jane Doe",
          address: "1234 Main St",
          company: "ACME Inc."
        }
      ]
    }

  return (
    <dialog id="EmployeeMemoModal" className="modal ">
      <div className="modal-box bg-transparent shadow-none gap-2 flex flex-col w-full h-full justify-center items-center  overflow-auto p-0">  

        <div className='max-h-full w-full rounded-xl bg-white p-4 flex justify-center items-center flex-col gap-2 relative'>
          <form className='absolute top-2 right-2' method="dialog"> 
            <button onClick={()=>setMemoForModal({["" as string]: {}as Memo[]})} 
              className=" btn btn-error text-white btn-sm rounded-full h-8 w-8">X</button>
          </form>
          <h3 className='text-xl font-semibold w-full text-start'>Memos</h3>
          <table className="table w-full table-pin-rows rounded-xl overflow-clip">
            {/* head */} 
            <thead>
              <tr className='bg-gray-500 text-white'> 
                <th>Name</th>
                <th>Address</th>
                <th>Company</th> 
              </tr>
            </thead>
            <tbody>
              {Object.keys(dummy).map((key: string, index: number) => (
                dummy[key].map((memo: { name: string; address: string; company: string; }) => (
                  <tr key={index} className="hover:bg-gray-200" data-tip={'View'}> 
                    <th className='bg-opacity-0 backdrop-blur-md ' >
                      <div className="flex items-center gap-3">
                        <div className="text-start">
                          <div className="font-bold">{memo?.name}</div> 
                        </div>
                      </div>
                    </th>
                    <td>{memo.address}</td>
                    <td>{memo?.company}</td>  
                  </tr>
                ))
              ))} 
            </tbody>
            {/* foot */}
            <tfoot >
              <tr className='bg-gray-500 text-white'> 
                <th>Name</th>
                <th>Address</th>
                <th>Company</th> 
              </tr>
            </tfoot>
          </table>
        </div>

      </div>
    </dialog>
  )
}

export default EmployeeMemoModal
