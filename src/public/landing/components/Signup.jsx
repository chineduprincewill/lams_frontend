import React, { useEffect, useState } from 'react'
import { FiPhone, FiUser } from 'react-icons/fi';
import { HiArrowNarrowLeft, HiUser } from 'react-icons/hi';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { login } from '../../../apis/authActions';
import LoadingButton from '../../../common/LoadingButton';
import { CiLock } from 'react-icons/ci';

const Signup = ({ setSelected }) => {

    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();

        const data = {
            email, password
        }

        login(data, setSuccess, setError, setSubmitting);
    }


    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
    }, [])

    const handleRegister = (e) => {
        e.preventDefault();

        const data = { email, password };

        register(data, setSuccess, setError, setRegistering);
    }

    if(error !== null){
        toast.error(JSON.stringify(error).replace("{", "").replaceAll("[", "").replaceAll("]", "").replace("}", "").replaceAll("\\", "").replaceAll('"', ''));
        setError(null);
    }

    if (success !== null) {
        localStorage.setItem('isLoggedIn', JSON.stringify(success));
        navigate('/dashboard')
        location.reload();
    }

    return (
        <form onSubmit={handleLogin} className={`w-full min-h-96 bg-white space-y-8 px-6 py-6 md:py-14 transition-opacity duration-1000 ease-in ${ isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <ToastContainer />
            <div className='flex justify-center items-center'>
                <img src='/assets/logo-sm.png' alt='logo'/>
            </div>
            <div className='w-full flex space-x-2 items-center text-[#58cfdb]'>
                <CiLock size={30} />
                <span className='text-2xl'>Login</span>
            </div>
            <div className='w-full flex items-center'>
                <input 
                    type='email' 
                    className='w-full p-3 border border-gray-400'
                    required
                    placeholder='Enter Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    className='p-3 bg-[#a6ce39] text-[#005072]'
                >
                    <HiOutlineEnvelope size={25} />
                </button>
            </div>
            <div>
                <div className='w-full flex items-center'>
                    <input 
                        type='password' 
                        className='w-full p-3 border border-gray-400'
                        required
                        placeholder='Enter Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className='p-3 bg-[#a6ce39] text-[#005072]'
                    >
                        <RiLockPasswordLine size={25} />
                    </button>
                </div>
                <div className='w-full flex justify-end items-center mt-1'>
                    <span className='text-sm text-[#58cfdb] cursor-pointer'>Forgot passsword ?</span>
                </div>
            </div>
        {
            submitting ?
                <LoadingButton buttonText='Logging in...' />
                :
                <button
                    className='w-full p-3 bg-[#005072] text-white'
                >
                    <span className='text-xl'>Login</span>
                </button>
        }
        </form>
    )
}

export default Signup