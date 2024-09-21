import React, { Fragment, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import { tokenExpired } from '../../../../apis/functions';
import { fetchCd4Counts } from '../../../../apis/ahdActions';
import { HiMinus, HiOutlineDocumentReport, HiPlus } from 'react-icons/hi';
import { fetchFacilities } from '../../../../apis/utilityActions';
import { PiCaretDoubleRightThin } from 'react-icons/pi';
import CD4Data from '../cd4Components/CD4Data';
import { ImStatsBars } from 'react-icons/im';
import { IoAnalyticsOutline } from 'react-icons/io5';
import CD4Charts from '../cd4Components/CD4Charts';

const CD4Stats = () => {

    const { token, user, logout } = useContext(AuthContext);

    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [states, setStates] = useState(null);
    const [lgas, setLgas] = useState(null);
    const [facilities, setFacilities] = useState(null);
    const [facility, setFacility] = useState('');
    const [section, setSection] = useState('');
    const [cd4status, setCd4status] = useState('');
    const endpoint = 'cd4-count';
    const [cd4data, setCd4data] = useState();
    const [totalCount, setTotalCount] = useState(0);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [active, setActive] = useState('report');

    const [show, setShow] = useState(false);

    const toggleShow = () => {
        setShow(!show);
    }

    if(tokenExpired(results)){
        logout();
    }

    const generateCD4aggregateData = () => {
        let aggregatedata = [];
        let totalCount = 0;

        if(facilities !== null && facilities.length > 0){
            facilities.map(fac => {
                let fcCount = results !== null && results.filter(res => 
                    res.facility === fac.facility
                );

                // filter by date ranger
                if(dateFrom !== '' && dateTo !== ''){
                    const from  = new Date(dateFrom);
                    const to = new Date(dateTo);

                    fcCount = fcCount.filter(fc => {
                        const testDate = new Date(fc.TestDate);
                        return testDate >= from && testDate <= to
                    })
                }

                // filter by both section and cd4 status
                if(section !== '' && cd4status !== ''){
                    fcCount = fcCount.filter(fc => ((fc.Section === section) && (fc.LowCD4Count === cd4status)))
                }
                // filter by section
                else if(section !== ''){
                    fcCount = fcCount.filter(fc => fc.Section === section)
                }
                // filter by cd4 status
                else if(cd4status !== ''){
                    fcCount = fcCount.filter(fc => fc.LowCD4Count === cd4status)
                }

                const obj = {
                    facility: fac.facility,
                    count: fcCount.length
                }

                setTotalCount(totalCount += fcCount.length);
                aggregatedata.push(obj);
            })
        }
        return aggregatedata;
    }

    useEffect(() => {
        fetchCd4Counts(token, endpoint, setResults, setError, setFetching);
    }, [])

    useEffect(() => {
        fetchFacilities(token, setFacilities, setError, setFetching);
    }, [])

    useEffect(() => {
        setCd4data(generateCD4aggregateData());
    }, [Date.now()])

    return (
        <div className='w-full p-2 border border-gray-200'>
            <h1 
                className='w-full flex items-center justify-between border-b border-gray-100 pb-2 text-gray-700 font-extralight text-lg hover:bg-gray-50 cursor-pointer'
                onClick={() => toggleShow()}
             >
                <div className='flex items-center space-x-4'>
                    <span>CD4 Statistics for {user && user?.lga} LGA</span>
                {
                    section !== '' && 
                        <Fragment><PiCaretDoubleRightThin size={20} className='text-gray-400 mt-0.5' /><span>{section}</span></Fragment>
                }
                {
                    cd4status !== '' && <Fragment><PiCaretDoubleRightThin size={20} className='text-gray-400 mt-0.5' /><span>{cd4status === '1' ? 'Low CD4 Count' : 'High CD4 Count'}</span></Fragment>
                }
                </div>
            {
                show ? <HiMinus size={20} />
                :   <HiPlus size={20} />
            }
            </h1>
            <div className={`${show ? 'block' : 'hidden'}`}>
                <div className='w-full my-4 md:flex md:items-center space-y-2 md:space-y-0 md:space-x-4'>
                    <select 
                        className='w-full md:w-[15%] border border-gray-300 p-1 text-gray-700'
                        onChange={(e) => setSection(e.target.value)}
                    >
                        <option value=''>Section</option>
                        <option value='AHD Baseline'>AHD Baseline</option>
                        <option value='AHD Routine'>AHD Routine</option>
                    </select>
                    <select 
                        className='w-full md:w-[15%] border border-gray-300 p-1 text-gray-700'
                        onChange={(e) => setCd4status(e.target.value)}
                    >
                        <option value=''>CD4 status</option>
                        <option value='1'>Low CD4 Count</option>
                        <option value='0'>High CD4 Count</option>
                    </select>
                    <div className='w-full md:w-[20%] flex items-center space-x-2'>
                        <div>From</div>
                        <input 
                            type='date' 
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            className={`peer block w-full px-1 py-0.5 bg-white border border-gray-300 focus:outline-none focus:border-blue-500 ${!dateFrom ? 'text-transparent' : 'text-black'}`} 
                            placeholder='From'
                        />
                    </div>
                    <div className='w-full md:w-[20%] flex items-center space-x-2'>
                        <div>To</div>
                        <input 
                            type='date' 
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                            className={`peer block w-full px-1 py-0.5 bg-white border border-gray-300 focus:outline-none focus:border-blue-500 ${!dateTo ? 'text-transparent' : 'text-black'}`} 
                            placeholder='To'
                        />
                    </div>
                </div>
                <div className='w-full flex justify-between'>
                    <div className='flex items-center space-x-4'>
                        <div 
                            className={`p-2 rounded-full shadow-xl ${active === 'report' ? 'bg-[#005072] hover:bg-[#0b303f] text-white' : 'bg-[#a6ce39] hover:bg-[#91b52e]'}   border border-gray-200`}
                            onClick={() => setActive('report')}
                        >
                            <HiOutlineDocumentReport size={20} title='Reports' />
                        </div>
                        <div 
                            className={`p-2 rounded-full shadow-xl ${active === 'chart' ? 'bg-[#005072] hover:bg-[#0b303f] text-white' : 'bg-[#a6ce39] hover:bg-[#91b52e]'}   border border-gray-200`}
                            onClick={() => setActive('chart')}
                        >
                            <IoAnalyticsOutline size={20} title='Charts' />
                        </div>
                    </div>
                    <span className='px-6 py-1 font-extralight bg-[#005072] text-white'>
                        Total : <span className='font-bold text-2xl'>{totalCount}</span>
                    </span>
                </div>
                {
                    active === 'report' ?
                        <CD4Data cd4data={cd4data} />
                        :
                        <CD4Charts cd4data={cd4data} />
                }
                
            </div>
        </div>
    )
}

export default CD4Stats