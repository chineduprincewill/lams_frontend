import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const SuccessModal = ({ message }) => {

    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-75 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className={`w-full md:w-[400px] bg-white border-l-8 ${message === 'Approving...' ? 'border-green-700' : 'border-red-700'} dark:text-gray-700 px-6 py-6`}>
                        <div className={`'p-4 ${message === 'Approving...' ? 'text-green-700' : 'text-red-700'} text-lg font-semibold'`}>
                            {message}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessModal