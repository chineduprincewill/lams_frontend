import React, { useState } from 'react'
import RecordsTable from '../../../../common/RecordsTable';
import { formatDate } from '../../../../apis/functions';
import { HiMinus, HiPlus } from 'react-icons/hi';

const BaselineStats = ({ data }) => {

    const [show, setShow] = useState(false);
    
    const columns = [
        {
            name: "Period",
            selector: (row) => row?.week_start_date,
            width: '70%',
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-1 space-y-1'>
                    <div>{formatDate(row?.week_start_date)} - {formatDate(row?.week_end_date)}</div>
                </div>
            )
        },
        {
            name: "Total Patients",
            selector: (row) => row?.patients_in_range,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-1 space-y-1'>
                    <div>{row?.patients_in_range}</div>
                </div>
            )
        },
    ];

    const toggleShow = () => {
        setShow(!show);
    }

    return (
        <div className='w-full p-2 border border-gray-200'>
            <h1 
                className='w-full flex items-center justify-between border-b border-gray-100 pb-2 text-gray-700 font-extralight text-lg hover:bg-gray-50 cursor-pointer'
                onClick={() => toggleShow()}
            >
                <span>Patients on ART Treatment (Baseline)</span>
            {
                show ? <HiMinus size={20} />
                :   <HiPlus size={20} />
            }
            </h1>
            <div className={`${show ? 'block' : 'hidden'}`}>
                <RecordsTable columns={columns} data={data} />
            </div>
        </div>
    )
}

export default BaselineStats