import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex  justify-between bg-indigo-900 text-white'>
        <div className='logo p-3 mx-3 cursor-pointer'>
            <span>MyTodo</span>
        </div>
        <ul className='flex gap-8 p-3 mx-3 cursor-pointer'>
        <li className='hover:font-bold'>Home</li>
        <li className='hover:font-bold'>Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
