import React from 'react'; 

import CreateEmployeeForm from './CreateEmployeeForm';

const page = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center '> 
      {/* CreateEmployeeForm container */}
      <div className={` h-[75vh] overflow-y-auto shadow-md shadow-gray-400 rounded-2xl border w-[90%] md:w-[75%] lg:w-[55%] xl:w-[45%] 2xl:w-[40%] mb-10 `} >
        <CreateEmployeeForm/>
      </div>


    </div>
  )
}

export default page
