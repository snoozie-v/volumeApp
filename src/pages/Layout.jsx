import React from 'react'
import { Outlet, Link } from 'react-router-dom'

function Layout() {
  return (
   <> 
    <nav className='bg-[#9fb2c1]'>
      <div className='text-3xl'>Volume App Development</div>
      <div className='bg-black items-center'>
        <ul className='sm:flex sm:space-x-6'>
            <li className='text-[#ff4e12] hover:underline'>
                <Link to="/home">Home</Link>
            </li>
            <li className='text-[#ff4e12] hover:underline'>
                <Link to="/wallet">By Wallet</Link>
            </li>
            <li className='text-[#ff4e12] hover:underline'>
                <Link to='topiczero'>Topic0</Link>
            </li>
            <li className='text-[#ff4e12] hover:underline'>
                <Link to="/sweepertrack">Collection Offer Accepted </Link>
            </li>
            <li className='text-[#ff4e12] hover:underline'>
                <Link to="/sweepertrackb">Offer Accepted</Link>
            </li>
            <li className='text-[#ff4e12] hover:underline'>
                <Link to="/testing">itemBought</Link>
            </li>
            <li className='text-[#ff4e12] hover:underline'>
                <Link to="/dashboard">Dashboard</Link>
            </li>
        </ul>
      </div>
    </nav>
    <Outlet />
    </>
  )
}

export default Layout
