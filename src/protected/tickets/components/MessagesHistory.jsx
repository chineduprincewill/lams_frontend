import React, { useContext } from 'react'
import { formatDateAndTime } from '../../../apis/functions'
import { AuthContext } from '../../../context/AuthContext'

const MessagesHistory = ({ messages, fetching, sender }) => {

    const { user } = useContext(AuthContext);

    return (
        <div className={` ${user ? 'h-[60vh]' : 'h-[72vh]'} overflow-x-hidden overflow-scroll`}>
        { messages === null || messages?.messages.length === 0 ? 
            (!fetching && <span className='text-gray-400'>This complaint has not been attended to by anyone yet. You can respond by clicking on the add icon above at the right side of the screen. Thanks</span>)
            :
            ((messages?.messages.length > 0) && messages?.messages.map(msg => {
                return <div key={msg?.id} className={`w-full flex mb-3 ${msg?.sender === sender ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-2 w-[80%] md:w-[60%] border border-gray-200 ${msg?.sender === sender ? 'bg-gray-100 rounded-l-xl' : 'bg-[#f8fced] rounded-r-xl'}`}>
                        <div className='text-xs text-blue-600'>
                            {user && user?.email === msg?.sender ? 'You' : msg?.sender }
                        </div>
                        <div className='text-gray-600'>
                            {msg?.message}
                        </div>
                        <div className='text-xs text-gray-400 flex justify-end'>
                            <span>{formatDateAndTime(msg?.created_at)}</span>
                        </div>
                    </div>
                </div>})
            )
        }
        </div>
    )
}

export default MessagesHistory