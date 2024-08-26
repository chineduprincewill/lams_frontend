import React, { useEffect, useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { HiArrowNarrowLeft } from 'react-icons/hi'
//import { listPlatforms } from '../../../apis/platformActions';
import SubmittingButton from '../../../common/SubmittingButton';
import { createTicket } from '../../../apis/ticketActions';
import { ToastContainer, toast } from 'react-toastify';
import SuccessModal from '../../../common/SuccessModal';

const TicketForm = ({ setSelected, platform_id, platform_title }) => {

    const [isVisible, setIsVisible] = useState(false);
    const [platforms, setPlatforms] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [platform, setPlatform] = useState(platform_id && platform_id);
    const [email, setEmail] = useState();
    const [fullname, setFullname] = useState();
    const [subject, setSubject] = useState();
    const [complaint, setComplaint] = useState();
    const [file, setFile] = useState();
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(null);
    const [ticketNo, setTicketNo] = useState();
    const [successMsg, setSuccessMsg] = useState(false);

    const selectUploadFile = (e) => {
        setFile(e.target.files[0]);
    }

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
    }, [])

    useEffect(() => {
        //listPlatforms(setPlatforms, setError, setLoading);
    }, [])

    const submitTicket = (e) => {
        e.preventDefault();

        if(window.confirm('Have you confirmed that all your entries are correct?')){
            let formData = new FormData();
            formData.append('platform_id', platform);
            formData.append('sender_fullname', fullname);
            formData.append('sender_email', email);
            formData.append('subject', subject);
            formData.append('complaint', complaint);
            formData.append('attachment', file);

            createTicket(formData, setSuccess, setError, setSubmitting);
        }
    }

    if(success !== null){
        setTicketNo(`Successfull! A message with your ticket no has been forwarded to your email. Below is the ticket number. You should copy it and keep it safe for subsequent tracking of your complaint. ${success?.ticket?.ticket_no}`);
        setSuccessMsg(true);
        setSuccess(null);
        //setTimeout(() => setSelected('main'), 2000);
    }

    if(error !== null){
        toast.error(JSON.stringify(error));
        setError(null);
    }

    return (
        <form onSubmit={submitTicket} className={`w-full space-y-3 md:px-6 transition-transform duration-1000 ease-in ${ isVisible ? 'animate-slideIn' : '-translate-y-full'}`}>
            <div className='flex justify-between items-center'>
                <HiArrowNarrowLeft 
                    size={30} 
                    className='text-[#005072] cursor-pointer' 
                    onClick={() => setSelected('main')}
                />
                <span className='text-2xl text-[#005072]'>Enter Complaint</span>
            </div>
            <ToastContainer />
            <select
                className='w-full p-3 border border-gray-400'
                onChange={(e) => setPlatform(e.target.value)}
                required
            >
                <option value={platform_id && platform_id}>{platform_title ? platform_title : 'Select platform'}</option>
            {
                (platforms !== null && platforms?.platforms.length > 0) && platforms?.platforms.map(pltfm => {
                    return <option key={pltfm?.id} value={pltfm?.id}>{pltfm?.platform}</option>
                })

            }
            </select>
            <div className='w-full md:flex md:justify-between md:items-center space-y-3 md:space-y-0'>
                <input 
                    type='text' 
                    className='w-full md:w-[49%] p-3 border border-gray-400'
                    placeholder='Enter your full name'
                    required
                    onChange={(e) => setFullname(e.target.value)}
                />
                <input 
                    type='email' 
                    className='w-full md:w-[49%] p-3 border border-gray-400'
                    placeholder='Enter your email'
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <input 
                type='text' 
                className='w-full p-3 border border-gray-400'
                placeholder='Enter subject'
                required
                onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
                className='w-full p-3 border border-gray-400'
                rows='3'
                placeholder='Enter complaint'
                required
                onChange={(e) => setComplaint(e.target.value)}
            ></textarea>
            <div className='w-full md:flex md:justify-between md:items-center space-y-3 md:space-y-0'>
                <div className='w-full md:w-[69%] mt-5 md:mt-3'>
                    <label className='inset z-50 border-x border-gray-400 bg-[#a6ce39] text-[#005072] p-3.5 text-sm mt-6'>
                        Attach file
                    </label>
                    <input 
                        type="file" 
                        name="small-file-input" 
                        id="small-file-input" 
                        className="mt-[-36px] block w-full border border-gray-400 shadow-sm text-sm focus:z-10 disabled:opacity-50 disabled:pointer-events-none
                        file:bg-transparent file:border-0
                        file:me-1
                        file:py-3.5 file:px-4 file:text-transparent" 
                        onChange={selectUploadFile}
                    />
                </div>
            {
                <button
                    className='w-full md:w-[29%] p-3 bg-[#005072] text-white'
                >
                    { submitting ? 'Submitting...' : 'Submit ticket' }
                </button>
            }
            </div>
            { successMsg && <SuccessModal setSuccessMsg={setSuccessMsg} setSelected={setSelected} message={ticketNo} />}
        </form>
    )
}

export default TicketForm