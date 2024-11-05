import React from 'react'

import DeleteOffenseForm from './DeleteOffenseForm'

const page = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center '> 
      {/* DeleteEmployeeForm container */}
      <div className={` form-container `} >
        <DeleteOffenseForm/>
      </div>


    </div>
  )
}

export default page
