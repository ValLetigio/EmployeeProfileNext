import React from 'react'

import UpdateEmployeeForm from './UpdateEmployeeForm' 

const page = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center '> 
      {/* CreateEmployeeForm container */}
      <div className={` form-container `} >
        <UpdateEmployeeForm/>
      </div>


    </div>
  )
}

export default page
