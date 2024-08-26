import React, { Fragment } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import Navlinks from './Navlinks'
import { LuMicroscope } from 'react-icons/lu'

const Sidebar = ({ toggleSidebar, navOpen }) => {
    return (
        <Fragment>
            <div 
                className={navOpen ? 'fixed inset-0 z-50 mt-0 bg-black bg-opacity-50 transition-opacity md:hidden' : ''}
                onClick={toggleSidebar}
            ></div>
            <div className={`absolute left-0 top-0 z-50 ${navOpen ? 'block w-[200px] bg-gray-100' : 'hidden'} md:block md:w-[200px] h-screen overflow-y-hidden duration-300 ease-linear`}>
                <div className='hidden md:flex md:items-center md:w-full bg-[#005072] px-6 md:px-8 md:py-6 md:h-[50px] space-x-2 text-white'>  
                    <LuMicroscope size={17} /> 
                    <span className='uppercase font-bold text-lg'>ladmis</span>
                </div>
                <div className='flex justify-end mt-2 md:hidden px-6'>
                    <AiOutlineClose size={25} className='text-[#005072] cursor-pointer' onClick={toggleSidebar} />
                </div>
                {/**<div className='w-full flex justify-center px-6 mt-1 mb-8'>
                    <div>
                        <img src={Logo} alt='logo' width='100px' />
                    </div>
                </div>*/}

                <div className='w-full flex justify-start p-6'>
                    <Navlinks />
                </div>
            </div>
        </Fragment>
    )
}

export default Sidebar