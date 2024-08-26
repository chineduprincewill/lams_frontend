import React, { useContext, useEffect } from 'react'
import { AiOutlineLogout } from 'react-icons/ai';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header = ({ toggleSidebar }) => {

    const { user, logout } = useContext(AuthContext);
    const locatn = useLocation();
    //const pageTitle = locatn.pathname.replace('/', '').replace('-', ' ');

    useEffect(() => {
        localStorage.getItem('isLoggedIn') && JSON.parse(localStorage.getItem('isLoggedIn'));
    }, [])

    return (
        <header className='sticky w-full top-0 z-40 bg-[#005072]'>
            <div className='flex flex-grow items-center justify-between p-2 md:px-3 2xl:px-11'>
                <div className='flex items-center space-x-3'>   
                    <RxHamburgerMenu size={25} className='text-gray-100 cursor-pointer' onClick={toggleSidebar} />
                    <div className='text-xl font-bold hidden md:block md:pl-[180px] capitalize'>{}</div>
                </div>
                <div className='flex  items-center space-x-4 md:space-x-8'>
                    <div className='flex items-center space-x-2'>
                        <div className='grid text-end text-gray-100'>
                            <span>
                                {user !== null ? <span className='capitalize'>welcome {user && user?.last_name+ ', '+ user?.first_name}!</span> : (
                                    localStorage.getItem('isLoggedIn') && 'Welcome '+JSON.parse(localStorage.getItem('isLoggedIn'))?.username+'!'
                                )}
                            </span>
                        </div>
                    </div>
                    <button 
                        className='flex justify-between items-center pt-2 p-2 rounded-full shadow-xl bg-white text-red-500 hover:text-white hover:bg-red-500'
                        onClick={() => logout()}
                    >
                        <AiOutlineLogout size={18} />
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header