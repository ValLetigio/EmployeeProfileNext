import React from 'react'

import SubmitMemoForm from './SubmitMemoForm'

const page = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center '> 
      {/* CreateMemoForm container */}
      <div className={` form-container `} >
        <SubmitMemoForm/>
      </div>


    </div>
  )
}

export default page
