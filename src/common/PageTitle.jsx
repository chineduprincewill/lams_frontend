import React from 'react'
import { formatPagetitle } from '../apis/functions'

const PageTitle = ({ icon }) => {
    return (
        <div className='w-full flex justify-between items-center py-4'>
            <div className='flex items-center space-x-2'>
                {icon}
                <span className='text-xl text-[#005072] font-semibold uppercase'>
                    {formatPagetitle()}
                </span>
            </div>
        </div>
    )
}

export default PageTitle