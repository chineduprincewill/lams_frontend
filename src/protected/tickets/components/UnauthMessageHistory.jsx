import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import MessagesHistory from './MessagesHistory'
import { formatDate } from '../../../apis/functions'

const UnauthMessageHistory = ({ messages, fetching, setHistory, ticketinfo }) => {

    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-30 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className={`w-full md:w-[60%] bg-white border border-gray-400 dark:text-gray-700 px-6 py-1`}>
                        <div className='flex justify-between border-b border-gray-200 py-2 text-red-500'>
                            <span className='font-light uppercase text-gray-600 text-sm'>{ticketinfo?.platform} Platform</span>
                            <div
                                className='cursor-pointer'
                                onClick={() => setHistory(false)}
                            >    
                                <AiOutlineCloseCircle size={20} />
                            </div>
                        </div>
                        <div className='border-b border-gray-200 pb-2'>
                            <h1 className='text-xl font-extralight capitalize my-1'>{ticketinfo?.ticket_no} - {ticketinfo?.subject}</h1>
                            <p className='text-gray-600'>
                                {ticketinfo?.complaint}
                                <div className='flex justify-end text-xs font-extralight text-[#005072]'>
                                    <span>... {ticketinfo?.sender_fullname}</span>
                                </div>
                            </p>
                            <p className='text-xs flex items-center justify-between mt-1'>
                                <span className='text-gray-500'>Created {formatDate(ticketinfo?.created_at)}</span>
                                {ticketinfo?.attachment && <a href={ticketinfo?.attachment} target='_blank' className='text-blue-500'>View attachment</a>}
                            </p>
                        </div>
                        <MessagesHistory messages={messages} fetching={fetching} sender={ticketinfo?.sender_email} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UnauthMessageHistory