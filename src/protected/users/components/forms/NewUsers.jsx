import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineCloseCircle, AiOutlineUser } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'
import { AuthContext } from '../../../../context/AuthContext'
import { CgNametag } from 'react-icons/cg'
import { CiUser } from 'react-icons/ci'
import { HiOutlineKey, HiOutlineMail } from 'react-icons/hi'
import { FaPhone, FaRegCircleUser } from 'react-icons/fa6'
import { PiGenderIntersex } from 'react-icons/pi'
import SubmittingButton from '../../../../common/SubmittingButton'
import { createUser } from '../../../../apis/userActions'
import StatesComponent from '../../../../common/StatesComponent'
import LgasComponent from '../../../../common/LgasComponent'
import RolesComponent from '../../../../common/RolesComponent'
import FacilitiesComponent from '../../../../common/FacilitiesComponent'

const NewUsers = ({ setShowmodal }) => {

    const { token, refreshRecord } = useContext(AuthContext);

    const [last_name, setLast_name] = useState();
    const [first_name, setFirst_name] = useState();
    const [email, setEmail] = useState();
    const [p_word, setP_word] = useState();
    const [confirm_p_word, setConfirm_p_word] = useState();
    const [phonenumber, setPhonenumber] = useState();
    const [usercategory, setUsercategory] = useState();
    const [state, setState] = useState();
    const [lga, setLga] = useState();
    const [facility, setFacility] = useState();
    const [creating, setCreating] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            last_name, first_name, p_word, email, phonenumber, usercategory, facility, lga, state
        }

        if(p_word !== confirm_p_word){
            alert('Password mismatch!')
        }
        else{
            if(window.confirm('Are you sure that all your entries are correct?')){
                createUser(token, data, setSuccess, setError, setCreating);
                //alert('OK')
            }
        }
    }

    if(error !== null){
        toast.error(error);
        setError(null);
    }

    if(success !== null){
        toast.success(success?.success);
        setSuccess(null)
        refreshRecord(Date.now());
        setShowmodal(false);
    }
    
    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-75 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className={`w-full md:w-[600px] bg-white border border-gray-400 dark:text-gray-700 px-6 py-1 transition-transform ${ isVisible ? 'animate-slideIn' : '-translate-y-full'}`}>
                        <div className='flex justify-between items-center border-b border-gray-200 py-2 text-red-500'>
                            <span className='text-gray-700 uppercase font-bold text-sm'>
                                New User
                            </span>
                            <span
                                className='cursor-pointer'
                                onClick={() => setShowmodal(false)}
                            >    
                                <AiOutlineCloseCircle size={20} />
                            </span>
                        </div>
                        <ToastContainer />
                        <div className='py-4'>
                            <form onSubmit={handleSubmit} className='w-full space-y-4'>
                                <div className='w-full flex items-center'>
                                    <input 
                                        type='text' 
                                        className='w-full p-2 border border-gray-400'
                                        required
                                        placeholder='Enter last name'
                                        onChange={(e) => setLast_name(e.target.value)}
                                    />
                                    <button
                                        className='p-2 bg-[#a6ce39] text-[#005072]'
                                    >
                                        <AiOutlineUser size={25} />
                                    </button>
                                </div>
                                <div className='w-full flex items-center'>
                                    <input 
                                        type='text' 
                                        className='w-full p-2 border border-gray-400'
                                        required
                                        placeholder='Enter first name'
                                        onChange={(e) => setFirst_name(e.target.value)}
                                    />
                                    <button
                                        className='p-2 bg-[#a6ce39] text-[#005072]'
                                    >
                                        <AiOutlineUser size={25} />
                                    </button>
                                </div>
                                <div className='w-full flex items-center'>
                                    <input 
                                        type='email' 
                                        className='w-full p-2 border border-gray-400'
                                        required
                                        placeholder='Enter email'
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <button
                                        className='p-2 bg-[#a6ce39] text-[#005072]'
                                    >
                                        <HiOutlineMail size={25} />
                                    </button>
                                </div>
                                <div className='w-full flex items-center'>
                                    <input 
                                        type='password' 
                                        className='w-full p-2 border border-gray-400'
                                        required
                                        placeholder='Enter password'
                                        onChange={(e) => setP_word(e.target.value)}
                                    />
                                    <button
                                        className='p-2 bg-[#a6ce39] text-[#005072]'
                                    >
                                        <HiOutlineKey size={25} />
                                    </button>
                                </div>
                                <div className='w-full flex items-center'>
                                    <input 
                                        type='password' 
                                        className='w-full p-2 border border-gray-400'
                                        required
                                        placeholder='Confirm password'
                                        onChange={(e) => setConfirm_p_word(e.target.value)}
                                    />
                                    <button
                                        className='p-2 bg-[#a6ce39] text-[#005072]'
                                    >
                                        <HiOutlineKey size={25} />
                                    </button>
                                </div>
                                <div className='w-full flex items-center'>
                                    <input 
                                        type='number' 
                                        className='w-full p-2 border border-gray-400'
                                        placeholder='Enter mobile number'
                                        onChange={(e) => setPhonenumber(e.target.value)}
                                    />
                                    <button
                                        className='p-2 bg-[#a6ce39] text-[#005072]'
                                    >
                                        <FaPhone size={25} />
                                    </button>
                                </div>
                                <div className='grid space-y-4'>
                                    <RolesComponent setUsercategory={setUsercategory} yPad='py-2.5' />
                                    <StatesComponent setState={setState} yPad='py-2.5' />
                                    <LgasComponent state={state} setLga={setLga} yPad='py-2.5' />
                                    <FacilitiesComponent lga={lga} setFacility={setFacility} yPad='py-2.5' />
                                </div>
                                
                            {
                                creating ?
                                    <SubmittingButton buttonText='Creating...' />
                                    :
                                    <button
                                        className='w-full p-2 bg-[#005072] text-white'
                                    >
                                        <span>Create</span>
                                    </button>
                            }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewUsers