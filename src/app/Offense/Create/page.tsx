import React from 'react'
 
import CreateOffenseForm from './CreateOffenseForm'

const page = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center '> 
      {/* CreateMemoForm container */}
      <div className={` form-container `} >
        <CreateOffenseForm/>
      </div>


    </div>
  )
}

export default page
