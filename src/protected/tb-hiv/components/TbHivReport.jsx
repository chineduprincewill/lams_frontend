import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext';
import { formatDate, tokenExpired } from '../../../apis/functions';
import { toast, ToastContainer } from 'react-toastify';
import { MdOutlinePending } from 'react-icons/md';
import { PiCheckCircle } from 'react-icons/pi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { fetchTBHivReport } from '../../../apis/tbhivActions';
import NotificationLoader from '../../../common/NotificationLoader';
import RecordsTable from '../../../common/RecordsTable';

const TbHivReport = () => {

    const { token, user, logout } = useContext(AuthContext);

    const [tbhiv, setTbhiv] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState('pending');
    const [endpoint, setEndpoint] = useState('pending-tbhiv-report');

    const columns = [
        {
            name: "Facility",
            selector: (row) => row?.facility,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-2 space-y-1'>
                    <div>{row?.facility}, {row?.lga}, {row?.state} State</div>
                </div>
            )
        },
        {
            name: "Patient",
            selector: (row) => row?.PEPID,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-1 space-y-1'>
                    <div>{row?.PEPID}</div>
                    <div>{row?.Sex}</div>
                    <div>{row?.Age} years</div>
                </div>
            )
        },
        {
            name: "Entry point",
            selector: (row) => row?.EntryPoint,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-1 space-y-1'>
                    <div>{row?.EntryPoint}</div>
                </div>
            )
        },
        {
            name: "Sample",
            selector: (row) => row?.SampleType,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-2 space-y-1'>
                    <div>{row?.SampleType}</div>
                    <div>Collected: <span className='text-blue-500'>{row?.DateCollected}</span></div>
                    <div>Accepted? {row?.SampleAccepted === "Yes" ? <span className='text-blue-600'>{row?.SampleAccepted}</span> : <span className='text-red-600'>{row?.SampleAccepted}</span>}</div>
                {
                    row?.SampleAccepted === 'No' && 
                        <div>Reason: <span className='text-blue-400'>{row?.Reason}</span></div>
                }
                </div>
            )
        },
        {
            name: "Activities",
            selector: (row) => row?.SampleTested,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-1 space-y-1'>
                    <div>Tested? <span className='text-blue-500'>{row?.DateSampleTested}</span></div>
                    <div>Referred? <span className='text-blue-500'>{row?.DateSampleReferred}</span></div>
                </div>
            )
        },
        {
            name: "Result",
            selector: (row) => row?.TBResult,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-1 space-y-1'>
                    <div>{row?.TBResult}</div>
                    <div><span className='text-blue-500'>{row?.DateResultReceived}</span></div>
                </div>
            )
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                <div className='flex space-x-2 items-center'>
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
            ),
          },
    ];

    if(tokenExpired(tbhiv)){
        logout();
    }

    const filterByStatus = (stat) => {
        setSelected(stat);
        stat === 'pending' && setEndpoint('pending-tbhiv-report');
        stat === 'approved' && setEndpoint('approved-tbhiv-report');
        stat === 'rejected' && setEndpoint('rejected-tbhiv-report');
        stat === 'all' && setEndpoint('all-tbhiv-report');
    }

    if(error !== null){
        toast.error(JSON.stringify(error));
        setError(null);
    }

    useEffect(() => {
        fetchTBHivReport(token, endpoint, setTbhiv, setError, setFetching);
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
                </div>
            </div>
            <ToastContainer />
            <div>
            {
                fetching ? <NotificationLoader /> : 
                    (tbhiv !== null && tbhiv?.tbhiv.length > 0) && <RecordsTable columns={columns} data={tbhiv?.tbhiv} />
            }
            </div>
        </div>
    )
}

export default TbHivReport