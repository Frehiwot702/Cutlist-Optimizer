import AddNew from '@/components/addNew'
import React from 'react'

const Home = () => {
  return (
    <div className='flex flex-col min-h-screen h-full bottom-0'>
        <h1 className='text-xl font-bold m-5'>Welcome to Cutlist Optimizer</h1>

        <div className='flex flex-col my-auto text-sm justify-center items-center h-full text-center text-gray-500'>
          <h3>You don't have any projects yet.</h3> 
          <h3> Start a new project to generate your first cutting layout.</h3>
        </div>

         <AddNew/>
    </div>
  )
}

export default Home