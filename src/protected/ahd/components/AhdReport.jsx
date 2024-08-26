import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext';
import { formatDate, formatDateAndTime, tokenExpired } from '../../../apis/functions';
import { fetchAhdReport } from '../../../apis/ahdActions';
import { toast, ToastContainer } from 'react-toastify';
import NotificationLoader from '../../../common/NotificationLoader';
import RecordsTable from '../../../common/RecordsTable';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { PiCheckCircle } from 'react-icons/pi';

const AhdReport = () => {

    const { token, logout } = useContext(AuthContext);

    const [ahd, setAhd] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);

    const columns = [
        {
            name: "Facility",
            selector: (row) => row?.facility,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-2 space-y-1'>
                    <div>{row?.facility}, {row?.lga}, {row?.state} State</div>
                    <div className='flex space-x-2 items-center border-t border-gray-200'>
                        <PiCheckCircle 
                            size={17} 
                            className='cursor-pointer mt-1 text-green-600'
                            title='Approve' 
                        />
                        <AiOutlineCloseCircle 
                            size={16} 
                            className='cursor-pointer mt-1 text-red-600' 
                            title='Reject'
                        />
                    </div>
                </div>
            )
        },
        {
            name: "Section",
            selector: (row) => row?.Section,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-1 space-y-1'>
                    <div>{row?.Section}</div>
                    <div><span className='text-blue-500'>Method</span> - {row?.Method}</div>
                </div>
            )
        },
        {
            name: "Report",
            selector: (row) => row?.ReportStatus,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-1 space-y-1'>
                    <div>{row?.ReportStatus}</div>
                    <div className='text-xs text-gray-500'>{row?.ReportDate && formatDate(row?.ReportDate)}</div>
                </div>
            )
        },
        {
            name: "Patient",
            selector: (row) => row?.PATIENTID,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-1 space-y-1'>
                    <div>{row?.PATIENTID}</div>
                    <div>{row?.Age} year(s)</div>
                    <div>{row?.Sex}</div>
                </div>
            )
        },
        {
            name: "CD4 Test",
            selector: (row) => row?.form_report_id,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-1 space-y-1'>
                    <div className='font-bold'>{row?.CD4Result}</div>
                    <div className='text-xs text-gray-500'>{formatDateAndTime(row?.TestDate)}</div>
                </div>
            )
        },
        {
            name: "Sample",
            selector: (row) => row?.SampleCollected,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-1 space-y-1'>
                    <div className='text-blue-500'>{row?.SampleCollected}</div>
                    <div className='font-bold'>{row?.Result}</div>
                    <div className='text-xs text-gray-500'>{row?.DateSampleCollected && formatDate(row?.DateSampleCollected)}</div>
                </div>
            )
        },
        {
            name: "Serum",
            selector: (row) => row?.SerumResult,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-1 space-y-1'>
                    <div className='font-bold'>{row?.SerumResult}</div>
                    <div className='text-xs text-gray-500'>{row?.DateSerumCollected && formatDate(row?.DateSerumCollected)}</div>
                </div>
            )
        },
        {
            name: "CSF",
            selector: (row) => row?.CSFCollected,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-1 space-y-1'>
                    <div className='font-bold'>{row?.CSFResult}</div>
                    <div className='text-xs text-gray-500'>{row?.DateCSFCollected && formatDate(row?.DateCSFCollected)}</div>
                </div>
            )
        },
    ];

    if(tokenExpired(ahd)){
        logout();
    }

    if(error !== null){
        toast.error(JSON.stringify(error));
        setError(null);
    }

    useEffect(() => {
        fetchAhdReport(token, setAhd, setError, setFetching);
    }, [])

    return (
        <div className='w-full'>
            <div className='text-xl font-extralight pb-2 border-b border-gray-200'>Report</div>
            <ToastContainer />
            <div>
            {
                fetching ? <NotificationLoader /> : 
                    (ahd !== null && ahd?.ahd.length > 0) && <RecordsTable columns={columns} data={ahd?.ahd} />
            }
            </div>
        </div>
    )
}

export default AhdReport