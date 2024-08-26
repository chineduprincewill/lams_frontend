import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../../../common/PageTitle';
import { PiEnvelopeSimpleFill } from 'react-icons/pi';
import { AuthContext } from '../../../context/AuthContext';
import { fetchAllTickets, fetchClientTickets, fetchStaffTickets } from '../../../apis/ticketActions';
import { FaCloudDownloadAlt } from 'react-icons/fa';
import { formatDate, tokenExpired } from '../../../apis/functions';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsChatDots } from 'react-icons/bs';
import NotificationLoader from '../../../common/NotificationLoader';
import RecordsTable from '../../../common/RecordsTable';
import AuthChatComponent from '../components/AuthChatComponent';
import { toast } from 'react-toastify';

const Tickets = () => {

    const { token, user, logout } = useContext(AuthContext);

    const [tickets, setTickets] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [showMessages, setShowMessages] = useState(false);
    const [ticket, setTicket] = useState();

    const columns = [
        {
            name: "",
            selector: (row) => row?.ticket_no,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-2 space-y-1'>
                    <div className='text-[16px] text-gray-600 font-light'><span className='font-semibold'>{row?.ticket_no}</span> - {row?.subject}</div>
                    <div className='text-sm text-gray-500'>{row?.complaint}</div>
                {
                    row?.attachment &&
                        <a href={row?.attachment} target='_blank' className='flex items-center space-x-1'>
                            <FaCloudDownloadAlt size={15} className='text-blue-600' />
                            <span className='text-blue-600'>Download attachment</span>
                        </a>
                } 
                    <div className='font-semibold capitalize'>{row?.status}</div>
                </div>
            )
        },
        {
            name: "",
            selector: (row) => row?.platform,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-2 space-y-1'>
                    <div className='text-[16px] text-gray-600 font-light'>{row?.platform}</div>
                    <div className='text-gray-500'>Sender - {user && user?.email === row?.sender_email ? 'You' : row?.sender_fullname }</div>
                    <div className='text-xs text-gray-500'>{row?.sender_email}</div>
                    <div className='text-xs text-gray-500'>{formatDate(row?.created_at)}</div>
                </div>
            )
        },
        {
          name: "",
          button: true,
          cell: (row) => (
            <div className='flex space-x-2 items-center mt-1 py-2'>
                <BsChatDots 
                    size={15} 
                    className='cursor-pointer mt-1 text-blue-600' 
                    title='View discussions'
                    onClick={() => showTicketChats(row)}
                />
            {
                (user && user?.role === 'staff' && row?.status !== 'closed' && row?.status !== 'open') &&
                    <AiOutlineCloseCircle 
                        size={15} 
                        className='cursor-pointer mt-1 text-red-600' 
                        title='close ticket'
                    />
            }
            </div>
          ),
        },
    ];

    const icon = <PiEnvelopeSimpleFill size={20} className="text-[#005072]" />;

    if(tokenExpired(tickets)){
        logout();
    }

    const showTicketChats = (t_obj) => {
        setTicket(t_obj);
        setShowMessages(true)
    }

    if(error !== null){
        toast.error(JSON.stringify(error));
        setError(null);
    }

    useEffect(() => {
        user && user?.role === 'admin' && fetchAllTickets(token, setTickets, setError, setFetching);
        user && user?.role === 'staff' && fetchStaffTickets(token, setTickets, setError, setFetching);
        user && user?.role === 'user' && fetchClientTickets(token, setTickets, setError, setFetching);
    }, [])

    return (
        <div className='w-full'>
            <div className='w-full grid md:flex md:justify-between md:items-center space-y-4 md:space-y-0'>
                <PageTitle icon={icon} />
            {
                (user && user?.role === 'client') &&
                    <button 
                        className='w-[100px] flex justify-center py-2 bg-[#a6ce39] hover:bg-[#96bb2f] text-[#005072] shadow-xl'
                    >
                        <HiPlus size={20} />
                    </button>
            }
            </div>
            <div className='w-full h-96 bg-white my-4 shadow-xl'>
            {
                fetching ? <NotificationLoader /> : 
                    (tickets !== null && tickets?.tickets.length > 0) && <RecordsTable columns={columns} data={tickets?.tickets} />
            }
            </div>
        {
            showMessages && <AuthChatComponent setShowMessages={setShowMessages} ticket={ticket} />
        }
        </div>
    )
}

export default Tickets