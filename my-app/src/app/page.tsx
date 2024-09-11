import React from 'react'
import Home from './home/page'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import HeaderPage from './(client)/header/page'

const page = async() => {
  const session = await auth()
  if(session?.user) redirect("/home")
  return (
    <div >
      <HeaderPage/>
      <Home/>
    </div>
  )
}

export default page
