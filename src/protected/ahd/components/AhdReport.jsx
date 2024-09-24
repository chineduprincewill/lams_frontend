import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext';
import { formatDate, formatDateAndTime, tokenExpired } from '../../../apis/functions';
import { fetchAhdReport } from '../../../apis/ahdActions';
import { toast, ToastContainer } from 'react-toastify';
import NotificationLoader from '../../../common/NotificationLoader';
import RecordsTable from '../../../common/RecordsTable';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { PiCheckCircle } from 'react-icons/pi';
import { MdOutlinePending } from 'react-icons/md';
import { HiOutlineViewList } from 'react-icons/hi';

const AhdReport = () => {

    const { token, user, logout } = useContext(AuthContext);

    const [ahd, setAhd] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState('pending');
    const [endpoint, setEndpoint] = useState('ahd-report');

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
                    <div>{(row?.Section).replace('CrAg,', '').replace('TB LAM', '')}</div>
                    <div><span className='text-blue-500'>Method</span> - {row?.Method}</div>
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
            name: "Test for ART",
            selector: (row) => row?.form_report_id,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-1 space-y-1'>
                    <div><span className='font-bold'>CD4</span> : {row?.CD4Result}</div>
                    <div><span className='font-bold'>WHO Staging</span> : {row?.WHOStaging}</div>
                    <div className='text-xs text-gray-500 pb-1 border-t border-gray-100'>{formatDate(row?.TestDate)}</div>
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
                    <div>{row?.CSFCollected === 'Yes' && 'Collected'}</div>
                    <div className='font-bold'>{row?.CSFResult}</div>
                    <div className='text-xs text-gray-500'>{row?.DateCSFCollected && formatDate(row?.DateCSFCollected)}</div>
                </div>
            )
        },
    ];

    if(tokenExpired(ahd)){
        logout();
    }

    const filterByStatus = (stat) => {
        setSelected(stat);
        stat === 'pending' && setEndpoint('ahd-report');
        stat === 'approved' && setEndpoint('apporved-ahd-report');
        stat === 'rejected' && setEndpoint('rejected-ahd-report');
        stat === 'all' && setEndpoint('all-ahd-report');
    }

    if(error !== null){
        toast.error(JSON.stringify(error));
        setError(null);
    }

    useEffect(() => {
        fetchAhdReport(token, endpoint, setAhd, setError, setFetching);
    }, [endpoint])

    return (
        <div className='w-full'>
            <div className='w-full flex justify-between'>   
                <div className='text-xl font-extralight pb-2'><span className='capitalize'>{selected}</span> Reports</div>
                <div className='flex space-x-4 items-center'>
                    <div 
                        className={`flex items-center space-x-0.5 text-orange-500 cursor-pointer py-1 text-sm font-extralight  ${selected === 'pending' && 'border-b border-orange-500'}`}
                        onClick={() => filterByStatus('pending')}
                    >
                        <MdOutlinePending size={13} className='mt-0.5' />
                        <span>Pending</span>
                    </div>
                    <div 
                        className={`flex items-center space-x-0.5 text-green-600 cursor-pointer py-1 text-sm font-extralight ${selected === 'approved' && 'border-b border-green-600'}`}
                        onClick={() => filterByStatus('approved')}
                    >
                        <PiCheckCircle size={13} className='mt-0.5' />
                        <span>Approved</span>
                    </div>
                    <div 
                        className={`flex items-center space-x-0.5 text-red-600 cursor-pointer py-1 text-sm font-extralight ${selected === 'rejected' && 'border-b border-red-600'}`}
                        onClick={() => filterByStatus('rejected')}
                    >
                        <AiOutlineCloseCircle size={13} className='mt-0.5' />
                        <span>Rejected</span>
                    </div>
                {
                    (user && user?.usercategory === 'Admin') &&  
                        <div 
                            className={`flex items-center space-x-0.5 text-blue-600 cursor-pointer py-1 text-sm font-extralight ${selected === 'all' && 'border-b border-blue-600'}`}
                            onClick={() => filterByStatus('all')}
                        >
                            <HiOutlineViewList size={13} className='mt-0.5' />
                            <span>All</span>
                        </div>
                }
                </div>
            </div>
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