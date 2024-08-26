import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const SuccessModal = ({ setSuccessMsg, setSelected, message }) => {

    const closeModal = () => {
        setSuccessMsg(false);
        setSelected('main');
    }

    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-75 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className={`w-full md:w-[700px] bg-white border-l-8 border-green-700 dark:text-gray-700 px-6 py-1`}>
                        <div className='flex justify-end items-center border-b border-gray-200 py-2 text-red-500'>
                            <span
                                className='cursor-pointer'
                                onClick={() => closeModal()}
                            >    
                                <AiOutlineCloseCircle size={20} />
                            </span>
                        </div>
                        <div className='p-4 text-green-700 text-lg font-semibold'>
                            {message}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessModal