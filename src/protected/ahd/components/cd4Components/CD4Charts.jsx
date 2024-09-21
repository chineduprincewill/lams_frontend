import React, { useEffect, useMemo, useState } from 'react'
import BarChart from '../../../../common/charts/BarChart';
import PieChart from '../../../../common/charts/PieChart';
import LineChart from '../../../../common/charts/LineChart';

const CD4Charts = ({ cd4data }) => {

    let labels = [];
    let data = [];
    const [selectedOption, setSelectedOption] = useState('bar');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value)
    }

    const filteredLabels = useMemo(() => {
        cd4data.map(dt => {
            labels.push(dt?.facility);
        });
        return labels;
    }, [cd4data])

    const filteredData = useMemo(() => {
        cd4data.map(dt => {
            data.push(dt?.count);
        });
        return data;
    }, [cd4data]);

    useEffect(() => {
        filteredLabels;
        filteredData;
    }, [cd4data])

    return (
        <div className='w-full p-2 space-y-4'>
            <div className="flex items-center space-x-6 my-2 border-b border-gray-100">
                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        value="bar"
                        checked={selectedOption === 'bar'}
                        onChange={handleOptionChange}
                        className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span>Bar Chart</span>
                </label>

                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        value="pie"
                        checked={selectedOption === 'pie'}
                        onChange={handleOptionChange}
                        className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span>Pie Chart</span>
                </label>

                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        value="line"
                        checked={selectedOption === 'line'}
                        onChange={handleOptionChange}
                        className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span>Line Chart</span>
                </label>
            </div>
            <div>
            {
                selectedOption === 'bar' && <BarChart labels={filteredLabels} data={filteredData} /> 
            }
            {
                selectedOption === 'pie' && 
                    <div className='w-full px-10'>
                        <PieChart labels={filteredLabels} data={filteredData} />
                    </div>
            } 
            {
                selectedOption === 'line' && <LineChart labels={filteredLabels} data={filteredData} />
            } 
            </div>
        </div>
    )
}

export default CD4Charts