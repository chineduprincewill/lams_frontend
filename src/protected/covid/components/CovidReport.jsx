import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { MdOutlinePending } from 'react-icons/md'
import { PiCheckCircle } from 'react-icons/pi'
import { AuthContext } from '../../../context/AuthContext'
import { formatDate, tokenExpired } from '../../../apis/functions'
import { toast, ToastContainer } from 'react-toastify'
import { fetchPendingCovidReport } from '../../../apis/covidActions'
import NotificationLoader from '../../../common/NotificationLoader'
import RecordsTable from '../../../common/RecordsTable'

const CovidReport = () => {

    const { token, user, logout } = useContext(AuthContext);

    const [covid, setCovid] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState('pending');
    const [endpoint, setEndpoint] = useState('pending-covid-report');

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
            name: "Section",
            selector: (row) => row?.Section,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-1 space-y-1'>
                    <div>{row?.Section}</div>
                </div>
            )
        },
        {
            name: "RDT Screened",
            selector: (row) => row?.ScreenedUsingRDT,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-1 space-y-1'>
                    <div>{row?.ScreenedUsingRDT}</div>
                </div>
            )
        },
        {
            name: "RDT Cov +ve",
            selector: (row) => row?.POSforCoVtestUsingRDT,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-1 space-y-1'>
                    <div>{row?.POSforCoVtestUsingRDT}</div>
                </div>
            )
        },
        {
            name: "PCR +ve",
            selector: (row) => row?.PositiveforPCR,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-1 space-y-1'>
                    <div>{row?.PositiveforPCR}</div>
                </div>
            )
        },
        {
            name: "PCR Referred",
            selector: (row) => row?.ReferredforPCRtest,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-1 space-y-1'>
                    <div>{row?.ReferredforPCRtest}</div>
                </div>
            )
        },
        {
            name: "On SORMAS",
            selector: (row) => row?.UpdatedonSORMAS,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-1 space-y-1'>
                    <div>{row?.UpdatedonSORMAS}</div>
                </div>
            )
        },
        {
            name: "Date",
            selector: (row) => row?.ReportDate,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-1 space-y-1'>
                    <div>{formatDate(row?.ReportDate)}</div>
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

    if(tokenExpired(covid)){
        logout();
    }

    const filterByStatus = (stat) => {
        setSelected(stat);
        stat === 'pending' && setEndpoint('pending-covid-report');
        stat === 'approved' && setEndpoint('approved-covid-report');
        stat === 'rejected' && setEndpoint('rejected-covid-report');
        stat === 'all' && setEndpoint('all-covid-report');
    }

    if(error !== null){
        toast.error(JSON.stringify(error));
        setError(null);
    }

    useEffect(() => {
        fetchPendingCovidReport(token, endpoint, setCovid, setError, setFetching);
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
                    (covid !== null && covid?.covid.length > 0) && <RecordsTable columns={columns} data={covid?.covid} />
            }
            </div>
        </div>
    )
}

export default CovidReport