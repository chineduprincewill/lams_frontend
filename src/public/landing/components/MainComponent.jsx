import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdOutlineOpenInNew } from 'react-icons/md'
import LoadingButton from '../../../common/LoadingButton';
import { fetchTicketByNo } from '../../../apis/ticketActions';
import { ToastContainer, toast } from 'react-toastify';

const MainComponent = ({ setSelected, setTicketinfo }) => {

    const [ticket_no, setTicket_no] = useState();
    const [fetching, setFetching] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const searchTicket = (e) => {
        e.preventDefault();

        const data = { ticket_no };

        fetchTicketByNo(data, setSuccess, setError, setFetching);
    }

    if(error !== null){
        toast.error(JSON.stringify(error));
        setError(null);
    }

    if(success !== null){
        if(success?.ticket){
            setTicketinfo(success?.ticket);
            setSelected('chats');
        }
        else{
            toast.error('Ticket not found!');
            setSuccess(null);
        }
    }

    return (
        <div className='w-full space-y-6 md:space-y-8 md:px-6'>
            <form onSubmit={searchTicket} className='w-full space-y-4'>
                <ToastContainer />
                <span className='text-xl font-extralight'>
                    Follow up on your ongoing complaints
                </span>
                <div className='w-full flex items-center'>
                    <input 
                        type='text' 
                        className='w-full p-3 border border-gray-400'
                        placeholder='Enter your ticket No.'
                        onChange={(e) => setTicket_no(e.target.value)}
                        required
                    />
                {
                    fetching ? 
                        <LoadingButton buttonText='' />
                        :
                        <button
                            className='p-3 bg-[#a6ce39] text-[#005072]'
                        >
                            <AiOutlineSearch size={25} />
                        </button>
                }
                </div>
            </form>
            <div className='w-full space-y-4'>
                <span className='text-xl font-extralight'>
                    Open a new ticket to lodge your complaint on any of our platforms
                </span>
                <button
                    className='w-full flex justify-center space-x-2 items-center p-3 bg-[#005072] text-white'
                    onClick={() => setSelected('ticket')}
                >
                    <MdOutlineOpenInNew size={20} />
                    <span className='text-xl'>New Ticket</span>
                </button>
            </div>
            <div className='w-full space-y-4'>
                <span className='text-xl font-extralight'>
                    Sign up for a better user experience
                </span>
                <button
                    className='w-full flex justify-center space-x-2 items-center p-3 bg-[#a6ce39] text-[#005072] shadow-xl'
                    onClick={() => setSelected('signup')}
                >
                    <span className='text-xl'>Sign Up</span>
                </button>
            </div>
        </div>
    )
}

export default MainComponent