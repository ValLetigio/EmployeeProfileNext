import React from 'react'; 

import CreateEmployeeForm from './CreateEmployeeForm';

const page = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center '> 
      {/* CreateEmployeeForm container */}
      <div className={` form-container `} >
        <CreateEmployeeForm/>
      </div>


    </div>
  )
}

export default page
