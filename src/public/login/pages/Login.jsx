import React, { useState } from 'react'
import { AiOutlineKey, AiOutlineMail } from 'react-icons/ai'
import FloatingNavbar from '../../landing/components/FloatingNavbar'
import LoadingButton from '../../../common/LoadingButton';
import { login } from '../../../apis/authActions';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();
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

    if(error !== null){
        toast.error(error?.error);
        setError(null);
    }

    if (success !== null) {
        localStorage.setItem('isLoggedIn', JSON.stringify(success));
        navigate('/dashboard')
        location.reload();
    }

    return (
        <div className='w-full flex h-screen justify-center items-center p-4'>
            <form onSubmit={handleLogin} className='w-full md:w-[550px] p-4 md:p-12 shadow-xl space-y-8'>
                <div className='w-full flex justify-center'>
                    <img src='/assets/logo-sm.png' alt='logo' />
                </div>
                <ToastContainer />
                <div className='w-full flex items-center'>
                    <input 
                        type='email' 
                        className='w-full p-3 border border-gray-400'
                        placeholder='Enter email'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        className='p-3 bg-[#a6ce39] text-[#005072]'
                    >
                        <AiOutlineMail size={25} />
                    </button>
                </div>
                <div className='w-full flex items-center'>
                    <input 
                        type='password' 
                        className='w-full p-3 border border-gray-400'
                        placeholder='Enter password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        className='p-3 bg-[#a6ce39] text-[#005072]'
                    >
                        <AiOutlineKey size={25} />
                    </button>
                </div>
                {
                    submitting ? 
                        <LoadingButton buttonText={'Signing in...'} />
                        :
                        <button
                            className='w-full p-3 bg-[#005072] text-white'
                        >
                            <span className='text-xl'>Sign in</span>
                        </button>
                }
            </form> 
            <FloatingNavbar />
        </div>
    )
}

export default Login