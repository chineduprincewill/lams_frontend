import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext';
import { tokenExpired } from '../../../apis/functions';
import { toast, ToastContainer } from 'react-toastify';
import { MdOutlinePending } from 'react-icons/md';
import { PiCheckCircle } from 'react-icons/pi';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const ViralLoadReport = () => {

    const { token, user, logout } = useContext(AuthContext);

    const [viralLoad, setViralLoad] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState('pending');
    const [endpoint, setEndpoint] = useState('pending-viralLoad-report');

    if(tokenExpired(viralLoad)){
        logout();
    }

    const filterByStatus = (stat) => {
        setSelected(stat);
        stat === 'pending' && setEndpoint('pending-viralLoad-report');
        stat === 'approved' && setEndpoint('approved-viralLoad-report');
        stat === 'rejected' && setEndpoint('rejected-viralLoad-report');
        stat === 'all' && setEndpoint('all-viralLoad-report');
    }

    if(error !== null){
        toast.error(JSON.stringify(error));
        setError(null);
    }

    return (
        <div>
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
        </div>
    )
}

export default ViralLoadReport