import React, { useEffect, useState } from 'react'
//import { listPlatforms } from '../../../apis/platformActions';
import SectionLoader from '../../../common/SectionLoader';
import { FaLink } from 'react-icons/fa6';
import { MdOutlineFileOpen, MdOutlineOpenInNew } from 'react-icons/md';

const PublicPlatforms = ({ setPlatform_id, setPlatform_title, setSelected, setFocus }) => {

    const [platforms, setPlatforms] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);

    const openTicket = (id, title) => {
        setPlatform_id(id);
        setPlatform_title(title);
        setSelected('ticket');
        setFocus();
    }

    useEffect(() => {
        //listPlatforms(setPlatforms, setError, setFetching);
    }, [])

    return (
        <div className='w-full pt-2 border-t-2 border-white pb-12'>
            <div className='text-[#005072] text-5xl capitalize font-extralight my-6'>
                our platforms
            </div>
            <div className='w-full md:flex flex-wrap items-center my-8'>
            {
                fetching ? <SectionLoader /> :
                    (platforms !== null && platforms.platforms.length > 0) ? platforms.platforms.map(plt => {
                        return <div key={plt?.id} className='w-full md:w-[48%] lg:w-[31%] mb-8 p-4 shadow-xl bg-white space-y-6 md:mr-4 lg:mr-6'>
                            <div className='w-full'>
                                <img src={plt?.photopath} alt='platform photo' />
                                <div className='my-4 font-semibold capitalize text-[#005072]'>{plt?.platform}</div>
                            </div>
                            <div className='w-full flex justify-end space-x-4 items-center'>
                                <button 
                                    className='w-[70px] flex justify-center p-2 bg-[#005072] text-white rounded-full shadow-xl' title='New ticket'
                                    onClick={() => openTicket(plt?.id, plt?.platform)}
                                >
                                    <MdOutlineOpenInNew size={20} />
                                </button>
                                <a href={plt?.url} target='_blank' className='w-[70px] p-2 flex justify-center rounded-full shadow-xl bg-[#a6ce39]'>
                                    <FaLink size={20} className='text-[#005072]' />
                                </a>
                            </div>
                        </div>
                    }) : <div className='text-lg'>No records found!</div>
            }
            </div>
        </div>
    )
}

export default PublicPlatforms