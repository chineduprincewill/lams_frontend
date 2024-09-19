import React, { Fragment, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import { tokenExpired } from '../../../../apis/functions';
import { fetchCd4Counts } from '../../../../apis/ahdActions';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { fetchFacilities } from '../../../../apis/utilityActions';
import { PiCaretDoubleRightThin } from 'react-icons/pi';

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
                    res.facility === fac.facility //&&
                    //section !== '' && res.Section === section &&
                    //cd4status !== '' && res.LowCD4Count === cd4status
                );

                if(section !== '' && cd4status !== ''){
                    fcCount = fcCount.filter(fc => ((fc.Section === section) && (fc.LowCD4Count === cd4status)))
                }
                else if(section !== ''){
                    fcCount = fcCount.filter(fc => fc.Section === section)
                }
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
                    <span>CD4 Statistics</span>
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
                </div>
                <div className='w-full flex justify-end'>
                    <span className='px-6 py-1 font-extralight bg-[#005072] text-white'>
                        Total : <span className='font-bold text-2xl'>{totalCount}</span>
                    </span>
                </div>
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
            </div>
        </div>
    )
}

export default CD4Stats