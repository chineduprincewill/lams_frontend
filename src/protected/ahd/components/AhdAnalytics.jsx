import React, { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import { fetchCd4Statistics } from '../../../apis/ahdActions';
import { AuthContext } from '../../../context/AuthContext';
import SectionLoader from '../../../common/SectionLoader';
import BarChart from '../../../common/charts/BarChart';
import { tokenExpired } from '../../../apis/functions';
import PieChart from '../../../common/charts/PieChart';
import LineChart from '../../../common/charts/LineChart';

const AhdAnalytics = () => {

    const { token, logout } = useContext(AuthContext);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);
    const endpoint = 'cd4-statistics';
    let labels = [];
    let data = [];
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [charttype, setCharttype] = useState('bar');
    const [category, setCategory] = useState('');
    const [isSelected, setIsSelected] = useState();

    const yearList = [];

    for (let i = new Date().getFullYear(); i > 2011; i--) {
        yearList.push(<option key={i} value={i}>{i}</option>);
    }

    let chartTitle = `Patients on ART Treatment (${category === '' ? 'Baseline and Routine' : category}) ${selectedYear}`;

    if(tokenExpired(results)){
        logout();
    }

    const categoryFilter = (cat) => {
        setCategory(cat);
        setIsSelected(Date.now());
    }

    const filteredLabels = useMemo(() => {
        results !== null && results.map(rslt => {
            labels.push(rslt?.week_start_date.toString()+' to '+rslt?.week_end_date.toString());
        });
        return labels;
    }, [results])

    const filteredData = useMemo(() => {
        results !== null && results.map(rslt => {
            data.push(rslt?.patients_in_range);
        });
        return data;
    }, [results]);

    useEffect(() => {
        if(isSelected && category !== ''){
            setResults(results => results.filter(rst => rst?.forms_title === `AHD ${category}`))
        }
        else{   
            fetchCd4Statistics(token, endpoint, {selectedYear}, setResults, setError, setFetching);
        }
    }, [selectedYear, category, isSelected])

    console.log(results);

    return (
        <div className='w-full'>
            <div className='text-xl font-extralight pb-2 border-b border-gray-200'>{chartTitle}</div>
            <div className='w-full my-4 md:flex md:items-center space-y-2 md:space-y-0 md:space-x-4'>
                <select 
                    className='w-full md:w-[15%] border border-gray-300 p-1 text-gray-700'
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    <option value=''>{selectedYear ? selectedYear : 'select year'}</option>
                    { category === '' && yearList }
                </select>
                <select 
                    className='w-full md:w-[15%] border border-gray-300 p-1 text-gray-700'
                    onChange={(e) => setCharttype(e.target.value)}
                >
                    <option value=''>select chart</option>
                    <option value='bar'>Bar chart</option>
                    <option value='pie'>Pie chart</option>
                    <option value='line'>Line chart</option>
                </select>
                <select 
                    className='w-full md:w-[15%] border border-gray-300 p-1 text-gray-700'
                    onChange={(e) => categoryFilter(e.target.value)}
                    value={category}
                >
                    <option value=''>{category !== '' ? category : 'filter'}</option>
                {
                    category === '' &&
                        <Fragment>
                            <option value='Baseline'>Baseline</option>
                            <option value='Routine'>Routine</option>
                        </Fragment>
                }
                </select>
                {
                    category !== '' &&
                        <span 
                            className='text-[#005072] cursor-pointer'
                            onClick={() => setCategory('')}
                        >
                            Reset filter
                        </span>
                }
            </div>
            <div className='w-full my-4'>
            {
                fetching ? <SectionLoader /> :
                    (results !== null && results.length > 0) && 
                        <div>
                        {
                            charttype === 'bar' && <BarChart labels={filteredLabels} data={filteredData} /> 
                        }
                        {
                            charttype === 'pie' && 
                                <div className='w-full px-10'>
                                    <PieChart labels={filteredLabels} data={filteredData} />
                                </div>
                        } 
                        {
                            charttype === 'line' && <LineChart labels={filteredLabels} data={filteredData} />
                        } 
                        </div>
            }
            </div>
        </div>
    )
}

export default AhdAnalytics