import React from 'react'
import { Outlet } from 'react-router-dom'

const User = () => {
  return (
    <div className='container'>
      <p>User</p>
      <Outlet />
    </div>
  )
}

export default User