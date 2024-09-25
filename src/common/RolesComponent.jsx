import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { fetchRoles } from '../apis/utilityActions';
import { tokenExpired } from '../apis/functions';

const RolesComponent = ({ setUsercategory, yPad, val }) => {

    const { token, logout } = useContext(AuthContext);

    const [roles, setRoles] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);

    if(tokenExpired(roles)){
        logout();
    }

    useEffect(() => {
        fetchRoles(token, setRoles, setError, setFetching);
    }, [])

    return (
        <select 
                className={`border border-gray-300 px-2 ${yPad ? yPad : 'py-1'} text-gray-700 bg-transparent`}
                onChange={(e) => setUsercategory(e.target.value)}
                value={val && val}
            >
                <option value={val ? val : ''}>{val ? val : (fetching ? 'fetching roles...' : 'select role')}</option>
        {
                (roles !== null && roles.length > 0) && roles.map(role => {
                    return <option key={role?.usercategory} value={role?.usercategory}>{role?.usercategory}</option>
                })
        }
        </select>
    )
}

export default RolesComponent