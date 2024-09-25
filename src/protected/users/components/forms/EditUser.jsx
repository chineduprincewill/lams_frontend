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
import RolesComponent from '../../../../common/RolesComponent';
import StatesComponent from '../../../../common/StatesComponent';
import LgasComponent from '../../../../common/LgasComponent';
import FacilitiesComponent from '../../../../common/FacilitiesComponent';
import SupervisorsComponent from '../../../../common/SupervisorsComponent';

const EditUser = ({ usr, setEditmodal }) => {

    const { token, refreshRecord } = useContext(AuthContext);

    const [last_name, setLast_name] = useState(usr?.last_name);
    const [first_name, setFirst_name] = useState(usr?.first_name);
    const [email, setEmail] = useState(usr?.email);
    const [phonenumber, setPhonenumber] = useState(usr?.phonenumber);
    const [usercategory, setUsercategory] = useState(usr?.usercategory);
    const [state, setState] = useState(usr?.state);
    const [lga, setLga] = useState(usr?.lga);
    const [facility, setFacility] = useState(usr?.facility);
    const [supervisor, setSupervisor] = useState(usr?.supervisor);
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
            id: usr?.id, last_name, first_name, email, phonenumber, usercategory, state, lga, facility, supervisor
        }

        //alert(JSON.stringify(data))
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
        setEditmodal(false);
    }

    console.log(supervisor);

    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-75 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className={`w-full md:w-[600px] bg-white border border-gray-400 dark:text-gray-700 px-6 py-1 transition-transform ${ isVisible ? 'animate-slideIn' : '-translate-y-full'}`}>
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
                                        placeholder='Enter last name'
                                        value={last_name}
                                        onChange={(e) => setLast_name(e.target.value)}
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
                                        placeholder='Enter first name'
                                        value={first_name}
                                        onChange={(e) => setFirst_name(e.target.value)}
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
                                        value={phonenumber}
                                        onChange={(e) => setPhonenumber(e.target.value)}
                                    />
                                    <button
                                        className='p-2 bg-[#a6ce39] text-[#005072]'
                                    >
                                        <FaPhone size={25} />
                                    </button>
                                </div>
                                <div className='grid space-y-4'>
                                    <RolesComponent setUsercategory={setUsercategory} yPad='py-2.5' val={usercategory} />
                                    <StatesComponent setState={setState} yPad='py-2.5' val={state} />
                                    <LgasComponent state={state} setLga={setLga} yPad='py-2.5' val={lga} />
                                    <FacilitiesComponent lga={lga} setFacility={setFacility} yPad='py-2.5' val={facility} />
                                    <SupervisorsComponent setSupervisor={setSupervisor} yPad='py-2.5' val={supervisor} />
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