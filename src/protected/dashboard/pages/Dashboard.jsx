import React, { useEffect, useState } from 'react'
import PageTitle from '../../../common/PageTitle';
import { AiOutlineDashboard } from 'react-icons/ai';
import { RiVirusLine } from 'react-icons/ri';
import { FaVirusCovid, FaViruses } from 'react-icons/fa6';
import { MdOutlineBloodtype, MdOutlinePolymer } from 'react-icons/md';
import { TbVirus } from 'react-icons/tb';
import { PiBaby } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
    }, [])

    const icon = <AiOutlineDashboard size={20} className="text-[#005072]" />;
    return (
        <div className={`w-full transition-opacity duration-1000 ease-in ${ isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className='w-full grid md:flex md:justify-between md:items-center space-y-4 md:space-y-0'>
                <PageTitle icon={icon} />
            </div>
            <div className='w-full py-4 flex justify-between flex-wrap'>
                <div 
                    className='w-full md:w-[48.5%] lg:w-[32%] flex space-x-2 items-center shadow-xl mb-5 p-4 bg-white text-[#005072] cursor-pointer hover:bg-gray-100'
                    onClick={() => navigate('/ahd')}
                >
                    <RiVirusLine size={25} />
                    <div className='text-xl font-extralight'>AHD</div>
                </div>
                <div 
                    className='w-full md:w-[48.5%] lg:w-[32%] flex space-x-2 items-center shadow-xl mb-5 p-4 bg-white text-[#005072] cursor-pointer hover:bg-gray-100'
                    onClick={() => navigate('/sars-cov2')}
                >
                    <FaVirusCovid size={25} />
                    <div className='text-xl font-extralight'>SARS-COV2</div>
                </div>
                <div className='w-full md:w-[48.5%] lg:w-[32%] flex space-x-2 items-center shadow-xl mb-5 p-4 bg-white text-[#005072] cursor-pointer hover:bg-gray-100'>
                    <MdOutlineBloodtype size={25} />
                    <div className='text-xl font-extralight'>SEROLOGY</div>
                </div>
                <div className='w-full md:w-[48.5%] lg:w-[32%] flex space-x-2 items-center shadow-xl mb-5 p-4 bg-white text-[#005072] cursor-pointer hover:bg-gray-100'>
                    <TbVirus size={25} />
                    <div className='text-xl font-extralight'>TB-HIV</div>
                </div>
                <div className='w-full md:w-[48.5%] lg:w-[32%] flex space-x-2 items-center shadow-xl mb-5 p-4 bg-white text-[#005072] cursor-pointer hover:bg-gray-100'>
                    <MdOutlinePolymer size={25} />
                    <div className='text-xl font-extralight'>TB-PCR</div>
                </div>
                <div className='w-full md:w-[48.5%] lg:w-[32%] flex space-x-2 items-center shadow-xl mb-5 p-4 bg-white text-[#005072] cursor-pointer hover:bg-gray-100'>
                    <FaViruses size={25} />
                    <div className='text-xl font-extralight'>VIRAL LOAD</div>
                </div>
                <div className='w-full md:w-[48.5%] lg:w-[32%] flex space-x-2 items-center shadow-xl mb-5 p-4 bg-white text-[#005072] cursor-pointer hover:bg-gray-100'>
                    <PiBaby size={25} />
                    <div className='text-xl font-extralight'>EID</div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard