import React from 'react'

const SectionLoader = () => {
    return (
        <div>
            <div className='w-full h-full bg-white bg-opacity-25 transition-opacity'></div>
            <div className="w-full flex justify-center bg-transparent mt-12">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-solid border-[#005072] border-t-transparent"></div>
            </div>
        </div>
    )
}

export default SectionLoader