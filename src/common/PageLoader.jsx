import React from 'react'

const PageLoader = () => {
    return (
        <div>
            <div className='fixed inset-0 z-50 bg-white bg-opacity-75 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div>
                        <div className='w-full flex justify-center bg-transparent px-6 py-1'>
                            <img src='/assets/logo.jpg' alt='loading...' width="150px" className='animate-bounce' />
                        </div>
                        <div className='w-full flex justify-center'><i className='text-lg'>Loading...</i></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageLoader