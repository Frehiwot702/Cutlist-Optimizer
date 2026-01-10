import AddNew from '@/components/addNew'
// import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import React from 'react'

const layout = ({children} : {children?: React.ReactNode}) => {
  return (
    <div className='bg-white w-full min-h-full text-black'>
        <Navbar/>
        {children}
        <AddNew/>
        {/* <Footer/> */}
    </div>
  )
}

export default layout;