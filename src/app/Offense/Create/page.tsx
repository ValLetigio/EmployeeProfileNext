import React from 'react'
 
import CreateOffenseForm from './CreateOffenseForm'

export const metadata = {
  title: '| Create Offense',
  description: 'Create Offense Form',
} 

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
