import React from 'react'
import PageTitle from '../../../common/PageTitle';
import { PiUserCirclePlus } from 'react-icons/pi';

const Profile = () => {
    const icon = <PiUserCirclePlus size={20} className="text-[#005072]" />;

    return (
        <div className='w-full'>
            <div className='w-full grid md:flex md:justify-between md:items-center space-y-4 md:space-y-0'>
                <PageTitle icon={icon} />
            </div>
            <div className='w-full h-96 bg-white my-4 shadow-xl'></div>
        </div>
    )
}

export default Profile