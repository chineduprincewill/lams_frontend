import React, { useContext, useEffect, useState } from 'react'
import { HiArrowNarrowLeft, HiPlus } from 'react-icons/hi'
import { formatDate, formatDateAndTime } from '../../../apis/functions'
import { BsChatDots } from 'react-icons/bs'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import MessageForm from './MessageForm'
//import { fetchTicketMessages } from '../../../apis/messageActions'
import { AuthContext } from '../../../context/AuthContext'
import { ToastContainer, toast } from 'react-toastify'
//import MessagesHistory from '../../../protected/tickets/components/MessagesHistory'
import UnauthMessageHistory from '../../../protected/tickets/components/UnauthMessageHistory'

const ChatsComponent = ({ setSelected, ticketinfo }) => {

    const { record } = useContext(AuthContext);
    const [messages, setMessages] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [messageform, setMessageform] = useState(false);
    const [history, setHistory] = useState(false);

    const data = { ticket_id : ticketinfo?.id }

    if(error !== null){
        toast.error(JSON.stringify(error));
        setError(null);
    }

    useEffect(() => {
        fetchTicketMessages(data, setMessages, setError, setFetching)
    }, [record])

    return (
        <div className='w-full md:px-6'>
            <div className='bg-white px-4 py-2'>
                <div className='flex justify-between items-center'>
                    <HiArrowNarrowLeft 
                        size={30} 
                        className='text-[#005072] cursor-pointer' 
                        onClick={() => setSelected('main')}
                    />
                    <span className='text-2xl text-[#005072]'>{ticketinfo?.ticket_no}</span>
                </div>
                <ToastContainer />
                <div className='border-b border-gray-200 py-2 mt-1'>
                    <p className='font-light'>{ticketinfo?.platform} Platform</p>
                    <h1 className='text-2xl font-extralight capitalize'>{ticketinfo?.subject}</h1>
                    <p className='text-gray-600 p-2 bg-gray-100 my-1'>
                        {ticketinfo?.complaint}
                        <div className='flex justify-end text-xs font-extralight text-[#005072]'>
                            <span>... {ticketinfo?.sender_fullname}</span>
                        </div>
                    </p>
                    <p className='text-xs flex items-center justify-between'>
                        <span className='text-gray-500'>Created {formatDate(ticketinfo?.created_at)}</span>
                        {ticketinfo?.attachment && <a href={ticketinfo?.attachment} target='_blank' className='text-blue-500'>View attachment</a>}
                    </p>
                </div>
                <div className='w-full mt-2 mb-4 flex justify-between items-center'>
                    { fetching ? <span className='italic text-blue-400'>Loading messages ...</span> : <BsChatDots size={15} />}
                {
                    messageform ? 
                        <MessageForm 
                            setMessageform={setMessageform} 
                            ticket_id={ticketinfo?.id}
                            ticket_no={ticketinfo?.ticket_no}
                            sender_email={ticketinfo?.sender_email}
                        />
                        :
                        <HiPlus 
                            size={30} 
                            className='shadow-xl text-[#005072] cursor-pointer'
                            onClick={() => setMessageform(true)}
                        />
                }
                </div>
                <div className='w-full my-2 border border-gray-200 rounded-md p-2'>
                { messages === null || messages?.messages.length === 0 ? 
                    <span className='text-gray-400'>There is no response on this ticket yet. Check back later as our support team is working on it. Thanks</span>
                    :
                    ((messages?.messages.length > 0) && 
                        <div>
                            <div className={`w-full flex mb-2 ${messages?.messages[0]?.sender === ticketinfo?.sender_email ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-2 w-[80%] space-y-1 ${messages?.messages[0]?.sender === ticketinfo?.sender_email ? 'bg-gray-100 rounded-l-xl' : 'bg-[#f8fced] rounded-r-xl'}`}>
                                    <div className='text-xs text-blue-600'>
                                        {messages?.messages[0]?.sender}
                                    </div>
                                    <div className='text-gray-600'>
                                        {messages?.messages[0]?.message}
                                    </div>
                                    <div className='text-xs text-gray-400 flex justify-end'>
                                        <span>{formatDateAndTime(messages?.messages[0]?.created_at)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-end text-blue-500 cursor-pointer text-xs'>
                                <span
                                    className='italic'
                                    onClick={() => setHistory(true)}
                                >
                                    more messages...
                                </span>
                            </div>
                        </div>
                    )
                }
                </div>
            </div>
            { history && <UnauthMessageHistory messages={messages} fetching={fetching} setHistory={setHistory} ticketinfo={ticketinfo} />}
        </div>
    )
}

export default ChatsComponent