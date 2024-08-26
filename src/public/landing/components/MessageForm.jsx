import React, { useContext, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { AuthContext } from '../../../context/AuthContext';
import { sendTicketMessage } from '../../../apis/messageActions';
import { toast } from 'react-toastify';

const MessageForm = ({ setMessageform, ticket_id, ticket_no, sender_email }) => {

    const { user, refreshRecord } = useContext(AuthContext);

    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [sending, setSending] = useState(false);
    const [message, setMessage] = useState();
    const [file, setFile] = useState();

    const selectUploadFile = (e) => {
        setFile(e.target.files[0]);
    }

    const sendMessage = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('ticket_id', ticket_id);
        formData.append('ticket_no', ticket_no);
        formData.append('sender', sender_email);
        formData.append('message', message);
        formData.append('attachment', file);

        sendTicketMessage(formData, setSuccess, setError, setSending);
    }

    if(error !== null){
        toast.error(JSON.stringify(error));
        setError(null)
    }

    if(success !== null){
        refreshRecord(Date.now());
        setSuccess(null);
        setMessageform(false);
    }

    return (
        <div>
            <div className={`fixed inset-0 z-50 overflow-y-auto md:flex md:justify-end ${user ? 'md:mr-12' : 'md:mr-20'}`}>
                <div className='fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity'></div>
                <form onSubmit={sendMessage} className={`fixed w-[93%] ml-4 md:w-[40%] z-50 p-3 rounded-md shadow-xl bg-white ${user ? 'top-52' : 'top-72'}`}>
                    <div className='w-full flex justify-end'>
                        <AiOutlineCloseCircle 
                            size={30} 
                            className='text-red-600 cursor-pointer' 
                            onClick={() => setMessageform(false)}
                        />
                    </div>
                    <textarea
                        className='w-full border border-gray-300 p-2 mt-2 text-gray-600'
                        rows='2'
                        placeholder='Enter your message'
                        required
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <div className='w-full grid md:flex md:items-center md:justify-between'>
                        <div className='w-full md:w-[69%] mt-2.5'>
                            <label className='inset z-50 border-x border-gray-400 bg-[#a6ce39] text-[#005072] p-2 text-sm mt-6'>
                                Attach file (if any)
                            </label>
                            <input 
                                type="file" 
                                name="small-file-input" 
                                id="small-file-input" 
                                className="mt-[-30px] block w-full border border-gray-400 shadow-sm text-sm focus:z-10 disabled:opacity-50 disabled:pointer-events-none
                                file:bg-transparent file:border-0
                                file:me-7
                                file:py-2 file:px-4 file:text-transparent" 
                                onChange={selectUploadFile}
                            />
                        </div>
                            <button
                                className='w-full md:w-[29%] p-1.5 mt-2.5 md:mt-1 bg-[#005072] text-white'
                            >
                                { sending ? 'Sending...' : 'Send' }
                            </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MessageForm