import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FaCloudDownloadAlt } from 'react-icons/fa'
import { formatDateAndTime } from '../../../apis/functions'
import { HiPlus } from 'react-icons/hi'
import { AuthContext } from '../../../context/AuthContext'
import { fetchTicketMessages } from '../../../apis/messageActions'
import { BsChatDots } from 'react-icons/bs'
import MessageForm from '../../../public/landing/components/MessageForm'
import MessagesHistory from './MessagesHistory'

const AuthChatComponent = ({ setShowMessages, ticket }) => {

    const { user, record } = useContext(AuthContext);
    const [messages, setMessages] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);
    const data = { ticket_id : ticket?.id };
    const [messageform, setMessageform] = useState(false);

    useEffect(() => {
        fetchTicketMessages(data, setMessages, setError, setFetching);
    }, [record])

    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-30 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-6 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className={`w-full md:w-[81%] md:ml-52 ml-0 bg-white border border-gray-400 dark:text-gray-700 px-6 py-1`}>
                        <div className='flex justify-between items-center border-b border-gray-200 py-2 text-red-500'>
                            <span className='text-gray-700 uppercase font-bold text-sm'>
                            { ticket?.platform} complaint
                            </span>
                            <span
                                className='cursor-pointer'
                                onClick={() => setShowMessages(false)}
                            >    
                                <AiOutlineCloseCircle size={20} />
                            </span>
                        </div>
                        <div className='w-full my-2'>
                            <div className='w-full pb-2'>
                                <div className='font-extralight'>{ticket?.sender_fullname} - {ticket?.sender_email}</div>
                                <div className='text-2xl font-extralight'>{ticket?.ticket_no} - {ticket?.subject}</div>
                                <div>{ticket?.complaint}</div>
                                <div className='flex justify-between items-center text-xs py-2 border-b border-gray-200'>
                                {
                                    ticket?.attachment ?
                                        <a 
                                            href={ticket?.attachment} 
                                            target='_blank' 
                                            className='flex items-center space-x-2'
                                        >
                                            <FaCloudDownloadAlt size={15} className='text-blue-600' />
                                            <span className='text-blue-600'>Attached file</span>
                                        </a>
                                        :
                                        <span>...</span>
                                }
                                    
                                    <div className='text-gray-500'>
                                        {formatDateAndTime(ticket?.created_at)}
                                    </div>
                                </div>
                                <div className='w-full flex justify-between items-center my-2'>
                                    { fetching ? <span className='italic text-blue-400'>Loading messages ...</span> : <BsChatDots size={15} />}
                                    {
                                        messageform ? 
                                            <MessageForm 
                                                setMessageform={setMessageform} 
                                                ticket_id={ticket?.id}
                                                ticket_no={ticket?.ticket_no}
                                                sender_email={user?.email}
                                            />
                                            :
                                            <HiPlus 
                                                size={30} 
                                                className='shadow-xl text-[#005072] cursor-pointer' 
                                                onClick={() => setMessageform(true)}
                                            />
                                    }
                                </div>
                            </div>
                            <MessagesHistory messages={messages} fetching={fetching} sender={user?.email} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthChatComponent