import React from 'react'

import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import HeaderPage from './(client)/header/page'

const page = async() => {
  // const session = await auth()
  // if(session?.user) redirect("/home")
  return (
    <div className='bg-white min-h-screen' >
      <HeaderPage/>
      
    </div>
  )
}

export default page
