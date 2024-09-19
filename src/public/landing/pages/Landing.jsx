import React, { useRef, useState } from 'react'
import Signup from '../components/Signup'

const Landing = () => {

    const [selected, setSelected] = useState('signup');

    let selectedComponent;

    if(selected === 'signup'){
        selectedComponent = <Signup setSelected={setSelected} />
    }
     

    return (
        <div className='w-full flex justify-center items-center'>
            <div className='w-11/12 space-y-12'> 
                <div className='w-full md:flex md:justify-between md:items-center space-y-8 md:space-y-0 my-16'>
                    <div className='w-full md:w-3/5 text-white font-medium md:font-light text-4xl md:text-[90px]'>
                        <span className='leading-tight capitalize'>
                            laboratory activity management system
                        </span>
                        <div className='text-[#a6ce39] font-bold text-lg md:text-xl my-4 md:px-2'>
                        LAMS Version 1.3.3
                        </div>
                    </div>
                    <div className='w-full md:w-2/5'>{selectedComponent}</div>
                </div>
                <div className='md:h-0'></div>
            </div>
        </div>
    )
}

export default Landing