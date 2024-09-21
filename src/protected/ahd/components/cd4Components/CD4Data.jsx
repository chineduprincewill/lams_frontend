import React from 'react'

const CD4Data = ({ cd4data }) => {
    return (
        <div className='w-full p-2'>
        {
            (cd4data && cd4data.length > 0) && cd4data.map(cdata => {
                return <div key={cdata?.facility} className='flex justify-between items-center py-2 border-b border-gray-100'>
                    <div className='md:w-[95%] font-extralight'>{cdata?.facility}</div>
                    <div className='md:w-[5%]'>{cdata?.count}</div>
                </div>
            })
        }
        </div>
    )
}

export default CD4Data