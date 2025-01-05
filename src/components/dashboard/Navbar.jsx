import React from 'react'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
    const { user, logout } = useAuth()
    return (
        <div className='flex items-center text-white justify-center h-12 bg-gray-600 px-5'>
            <p>Welcome {user.name}</p>
            <button className='absolute right-5 px-4 py-1 bg-gray-700 hover:bg-gray-800' onClick={logout}>
                Logout
            </button>
        </div>
    )
}

export default Navbar
