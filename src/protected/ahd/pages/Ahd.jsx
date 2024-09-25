import React, { useContext, useEffect, useState } from 'react'
import { RiVirusLine } from 'react-icons/ri';
import PageTitle from '../../../common/PageTitle';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { IoAnalyticsOutline } from 'react-icons/io5';
import { ImStatsBars } from 'react-icons/im';
import { PiCheckCircleFill } from 'react-icons/pi';
import AhdReport from '../components/AhdReport';
import AhdAnalytics from '../components/AhdAnalytics';
import AhdStats from '../components/AhdStats';
import { AuthContext } from '../../../context/AuthContext';
import StatesComponent from '../../../common/StatesComponent';
import { fetchLgas } from '../../../apis/utilityActions';
import LgasComponent from '../../../common/LgasComponent';

const Ahd = () => {

    const { user } = useContext(AuthContext);
    const [state, setState] = useState();
    const [lga, setLga] = useState();
    const [isVisible, setIsVisible] = useState(false);
    const [selected, setSelected] = useState('report');

    let selectedComponent;

    if(selected === 'report'){
        selectedComponent = <AhdReport lga={lga} />
    }
    if(selected === 'analytics'){
        selectedComponent = <AhdAnalytics lga={lga} />
    }
    if(selected === 'stats'){
        selectedComponent = <AhdStats lga={lga} />
    }

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
    }, [])

    const icon = <RiVirusLine size={20} className="text-[#005072]" />;

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

export default Ahd