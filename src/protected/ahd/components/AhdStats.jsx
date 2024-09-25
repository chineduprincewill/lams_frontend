import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext';
import { fetchCd4Statistics } from '../../../apis/ahdActions';
import { tokenExpired } from '../../../apis/functions';
import SectionLoader from '../../../common/SectionLoader';
import AllStats from './ahdComponents/AllStats';
import BaselineStats from './ahdComponents/BaselineStats';
import RoutineStats from './ahdComponents/RoutineStats';
import CD4Stats from './ahdComponents/CD4Stats';

const AhdStats = ({ lga }) => {

    const { token, logout } = useContext(AuthContext);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);
    const endpoint = 'cd4-statistics';
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const yearList = [];
    const [routineStat, setRoutineStat] = useState(null);
    const [baselineStat, setBaselineStat] = useState(null);

    for (let i = new Date().getFullYear(); i > 2011; i--) {
        yearList.push(<option key={i} value={i}>{i}</option>);
    }

    if(tokenExpired(results)){
        logout();
    }

    const generateRoutineStat = () => {
        let routineStat = results !== null && results.filter(rst => rst?.forms_title === 'AHD Routine');
        return routineStat;
    }

    const generateBaselineStat = () => {
        let baselineStat = results !== null && results.filter(rst => rst?.forms_title === 'AHD Baseline');
        return baselineStat;
    }

    useEffect(() => {
        fetchCd4Statistics(token, endpoint, {selectedYear, lga}, setResults, setError, setFetching);
    }, [selectedYear])

    return (
        <div className='w-full'>
            <div className='text-xl font-extralight pb-2 border-b border-gray-200'>Stats</div>
            <div className='w-full my-4 md:flex md:items-center space-y-2 md:space-y-0 md:space-x-4'>
                <select 
                    className='w-full md:w-[15%] border border-gray-300 p-1 text-gray-700'
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    <option value=''>{selectedYear ? selectedYear : 'select year'}</option>
                    { yearList }
                </select>
            </div>

            <div className='w-full my-6'>
            {
                fetching ? <SectionLoader /> :
                    <div className='w-full md:flex md:flex-wrap md:justify-between'>
                        <div className='w-full mb-6'>
                            <AllStats data={results} />
                        </div>
                        <div className='w-full md:w-[49%] mb-6'>
                            <BaselineStats data={generateBaselineStat} />
                        </div>
                        <div className='w-full md:w-[49%] mb-6'>
                            <RoutineStats data={generateRoutineStat} />
                        </div>
                    </div>
            }
            </div>
            <div className='w-full my-6'>
                <CD4Stats lga={ lga } />
            </div>
        </div>
    )
}

export default AhdStats