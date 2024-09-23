import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineDashboard } from 'react-icons/ai';
import { PiBaby } from 'react-icons/pi';
import { AuthContext } from '../../context/AuthContext';
import { RiVirusLine } from 'react-icons/ri';
import { FaVirusCovid, FaViruses } from 'react-icons/fa6';
import { MdOutlineBloodtype, MdOutlinePolymer } from 'react-icons/md';
import { TbVirus } from 'react-icons/tb';
import { FaUsers } from 'react-icons/fa';

const Navlinks = () => {

    const { user, logout } = useContext(AuthContext);

    const locatn = useLocation();

    const navlinks = [
        {
            id: 1,
            title: "AHD",
            url: "/ahd",
            icon: <RiVirusLine size={17} />
        },
        {
            id: 2,
            title: "SARS-COV2",
            url: "/sars-cov2",
            icon: <FaVirusCovid size={17} />
        },
        {
            id: 3,
            title: "SEROLOGY",
            url: "/serology",
            icon: <MdOutlineBloodtype size={17} />
        },
        {
            id: 4,
            title: "TB-HIV",
            url: "/tb-hiv",
            icon: <TbVirus size={17} />
        },
        {
            id: 5,
            title: "TB-PCR",
            url: "#",
            icon: <MdOutlinePolymer size={17} />
        },
        {
            id: 6,
            title: "VIRAL LOAD",
            url: "/viral-load",
            icon: <FaViruses size={17} />
        },
        {
            id: 7,
            title: "EID",
            url: "/eid",
            icon: <PiBaby size={17} />
        },
    ]
    
    if(user && user?.role === "admin"){
        
    }

    return (
        <ul className='w-full'>
            <li className={`${locatn.pathname === '/dashboard' ? 'font-semibold text-[#005072] border-b-2 border-[#54c5d0]' : 'font-light'} px-3 py-2 hover:ml-2 hover:duration-300 hover:ease-linear`}>
                <Link to='/dashboard' className='flex justify-start items-center space-x-3 my-1'>
                    <AiOutlineDashboard size={17} />
                    <span>Dashboard</span>
                </Link>
            </li>
            {
                (navlinks !== null) && navlinks.map(nav => {
                    return (
                        <li key={nav.id} className={`${locatn.pathname === nav.url || locatn.pathname.includes(nav.url.replace("/",'')) || (locatn.pathname === '/trip-schedulling' && nav.url === '/manage-assets') ? 'font-semibold text-[#005072] border-b-2 border-[#54c5d0]' : 'font-light'} px-3 py-2 hover:ml-2 hover:duration-300 hover:ease-linear`}>
                            <Link to={nav.url} key={nav.id} className='flex justify-start items-center space-x-3 my-1'>
                                {nav.icon}
                                <span>{nav.title}</span>
                            </Link>
                        </li>
                    )
                })
            }
            <li className='w-full pt-6'></li>
            {
                (user) && 
                    <li className={`${locatn.pathname === '/profile' ? 'font-semibold text-[#005072] border-b-2 border-[#54c5d0]' : 'font-light'} px-3 py-2 hover:ml-2 hover:duration-300 hover:ease-linear`}>
                        <Link to='/users' className='flex justify-start items-center space-x-3 my-1'>
                            <FaUsers size={17} />
                            <span>User</span>
                        </Link>
                    </li>
            }
        </ul>
    )
}

export default Navlinks
