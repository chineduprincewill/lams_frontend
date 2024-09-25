import React, { useContext, useEffect, useState } from 'react'
import { TbVirus } from 'react-icons/tb';
import PageTitle from '../../../common/PageTitle';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { PiCheckCircleFill } from 'react-icons/pi';
import { IoAnalyticsOutline } from 'react-icons/io5';
import { ImStatsBars } from 'react-icons/im';
import TbHivReport from '../components/TbHivReport';
import StatesComponent from '../../../common/StatesComponent';
import LgasComponent from '../../../common/LgasComponent';
import { AuthContext } from '../../../context/AuthContext';

const TbHiv = () => {

    const { user } = useContext(AuthContext);

    const [isVisible, setIsVisible] = useState(false);
    const [selected, setSelected] = useState('report');

    const [state, setState] = useState();
    const [lga, setLga] = useState();

    let selectedComponent;

    if(selected === 'report'){
        selectedComponent = <TbHivReport lga={lga} />
    }

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
    }, [])

    const icon = <TbVirus size={20} className="text-[#005072]" />;

    return (
        <div className={`w-full transition-opacity duration-1000 ease-in ${ isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className='w-full grid md:flex md:justify-between md:items-center'>
                <PageTitle icon={icon} />
                <div className='flex space-x-3 items-center'>
                    <div 
                        className='py-2 px-4 flex items-center space-x-1 cursor-pointer bg-[#a6ce39] text-[#005072]'
                        onClick={() => setSelected('report')}
                    >
                        <HiOutlineDocumentReport size={17} />
                        <span>Report</span>
                        {selected === 'report' && <PiCheckCircleFill size={17} className='text-white' />}
                    </div>
                    <div 
                        className='py-2 px-4 flex items-center space-x-1 cursor-pointer bg-[#005072] text-white'
                        onClick={() => setSelected('analytics')}
                    >
                        <IoAnalyticsOutline size={17} />
                        <span>Analytics</span>
                        {selected === 'analytics' && <PiCheckCircleFill size={17} className='text-white' />}
                    </div>
                    <div 
                        className='py-2 px-4 flex items-center space-x-1 cursor-pointer bg-[#58cfdb] text-[#005072]'
                        onClick={() => setSelected('stats')}
                    >
                        <ImStatsBars size={17} />
                        <span>Stats</span>
                        {selected === 'stats' && <PiCheckCircleFill size={17} className='text-white' />}
                    </div>
                </div>
            </div>
            <div className='w-full flex items-center space-x-6 p-4 bg-white'>
        {
            (user && user?.usercategory === 'Admin') &&
                <StatesComponent setState={setState} />
        }
        {
            state && <LgasComponent state={state} setLga={setLga} />
        }
            </div>
            <div className='w-full min-h-96 bg-white my-4 shadow-xl p-4'>
            { selectedComponent }
            </div>
        </div>
    )
}

export default TbHiv