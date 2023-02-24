import React from 'react'
import { Outlet, Link } from 'react-router-dom'

function Layout() {
  return (
   <> 
    <nav className='bg-red-300'>
      <div className='text-3xl'>Hello</div>
      <div>
        <ul>
            <li className='text-blue-500 hover:underline'>
                <Link to="/home">Home</Link>
            </li>
            <li>
                <Link to="/other">Other</Link>
            </li>
        </ul>
      </div>
    </nav>
    <Outlet />
    </>
  )
}

export default Layout
