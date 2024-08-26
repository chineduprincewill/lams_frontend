import React from 'react'
import { AiOutlinePhone } from 'react-icons/ai'
import { Link, useLocation } from 'react-router-dom'

const FloatingNavbar = () => {

    const locatn = useLocation();
    const url = locatn.pathname;

    return (
        <div className='flex items-center space-x-4 p-2 bg-white fixed top-2 right-0 text-[#005072] shadow-xl'>
            <div className='flex items-center space-x-1'>
                <AiOutlinePhone size={17} />
                <span>+234 703 369 0594</span>
            </div>
            <div className='h-8 border-r-2 border-[#a6ce39]'></div>
            {
                url === '/login' ?
                    <Link to='/'>
                        Home
                    </Link>
                    :
                    <Link to='/login'>
                        Sign In
                    </Link>
            }
        </div>
    )
}

export default FloatingNavbar