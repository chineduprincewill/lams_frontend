import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'
import { AuthContext } from '../../../../context/AuthContext';
import { CgNametag } from 'react-icons/cg'
import { CiUser } from 'react-icons/ci'
import { HiOutlineMail } from 'react-icons/hi'
import { FaPhone, FaRegCircleUser } from 'react-icons/fa6'
import { PiGenderIntersex } from 'react-icons/pi'
import SubmittingButton from '../../../../common/SubmittingButton';
import { updateUser } from '../../../../apis/userActions';

const EditUser = ({ usr, setEditmodal }) => {

    const { token, refreshRecord } = useContext(AuthContext);

    const [fullname, setFullname] = useState(usr?.fullname);
    const [username, setUsername] = useState(usr?.username);
    const [email, setEmail] = useState(usr?.email);
    const [mobile, setMobile] = useState(usr?.mobile);
    const [role, setRole] = useState(usr?.role);
    const [gender, setGender] = useState(usr?.gender);
    const [updating, setUpdating] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
    }, [])

    const handleUpdate = (e) => {
        e.preventDefault();

        const data = {
            id: usr?.id, fullname, username, email, mobile, role, gender
        }
        updateUser(token, data, setSuccess, setError, setUpdating);
    }

    if(error !== null){
        toast.error(JSON.stringify(error));
        setError(null);
    }

    if(success !== null){
        toast.success(success?.success);
        setSuccess(null)
        refreshRecord(Date.now());
        //setEditmodal(false);
    }

    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-75 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className={`w-full md:w-[450px] bg-white border border-gray-400 dark:text-gray-700 px-6 py-1 transition-transform ${ isVisible ? 'animate-slideIn' : '-translate-y-full'}`}>
                        <div className='flex justify-between items-center border-b border-gray-200 py-2 text-red-500'>
                            <span className='text-gray-700 uppercase font-bold text-sm'>
                                Edit User
                            </span>
                            <span
                                className='cursor-pointer'
                                onClick={() => setEditmodal(false)}
                            >    
                                <AiOutlineCloseCircle size={20} />
                            </span>
                        </div>
                        <ToastContainer />
                        <div className='py-4'>
                            <form onSubmit={handleUpdate} className='w-full space-y-4'>
                                <div className='w-full flex items-center'>
                                    <input 
                                        type='text' 
                                        className='w-full p-2 border border-gray-400'
                                        required
                                        placeholder='Enter Full name'
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                    />
                                    <button
                                        className='p-2 bg-[#a6ce39] text-[#005072]'
                                    >
                                        <CgNametag size={25} />
                                    </button>
                                </div>
                                <div className='w-full flex items-center'>
                                    <input 
                                        type='text' 
                                        className='w-full p-2 border border-gray-400'
                                        required
                                        placeholder='Enter username'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <button
                                        className='p-2 bg-[#a6ce39] text-[#005072]'
                                    >
                                        <CiUser size={25} />
                                    </button>
                                </div>
                                <div className='w-full flex items-center'>
                                    <input 
                                        type='email' 
                                        className='w-full p-2 border border-gray-400'
                                        required
                                        placeholder='Enter email'
                                        value={email}
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
                                        type='number' 
                                        className='w-full p-2 border border-gray-400'
                                        placeholder='Enter mobile number'
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                    />
                                    <button
                                        className='p-2 bg-[#a6ce39] text-[#005072]'
                                    >
                                        <FaPhone size={25} />
                                    </button>
                                </div>
                                <div className='w-full flex items-center'>
                                    <select 
                                        className='w-full p-2 border border-gray-400'
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <option value={gender}>{gender}</option>
                                        <option>select gender</option>
                                        <option value='Male'>Male</option>
                                        <option value='Female'>Female</option>
                                    </select>
                                    <button
                                        className='p-2 bg-[#a6ce39] text-[#005072]'
                                    >
                                        <PiGenderIntersex size={25} />
                                    </button>
                                </div>
                                <div className='w-full flex items-center'>
                                    <select 
                                        className='w-full p-2 border border-gray-400'
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value={role}>{role}</option>
                                        <option>select role</option>
                                        <option value='admin'>admin</option>
                                        <option value='staff'>staff</option>
                                    </select>
                                    <button
                                        className='p-2 bg-[#a6ce39] text-[#005072]'
                                    >
                                        <FaRegCircleUser size={25} />
                                    </button>
                                </div>
                            {
                                updating ?
                                    <SubmittingButton buttonText='Updating...' />
                                    :
                                    <button
                                        className='w-full p-2 bg-[#005072] text-white'
                                    >
                                        <span>Update</span>
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

export default EditUser