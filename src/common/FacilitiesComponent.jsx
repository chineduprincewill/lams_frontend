import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { fetchFacilities } from '../apis/utilityActions';
import { tokenExpired } from '../apis/functions';

const FacilitiesComponent = ({ lga, setFacility, yPad, val }) => {

    const { token, logout } = useContext(AuthContext);

    const [facilities, setFacilities] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);

    if(tokenExpired(facilities)){
        logout();
    }

    useEffect(() => {
        fetchFacilities(token, { lga }, setFacilities, setError, setFetching);
    }, [lga])

    return (
        <select 
                className={`border border-gray-300 px-2 ${yPad ? yPad : 'py-1'} text-gray-700 bg-transparent`}
                onChange={(e) => setFacility(e.target.value)}
                value={val && val}
            >
                <option value={val && val}>{val ? val : (fetching ? 'fetching facilities...' : 'select facility')}</option>
        {
                (facilities !== null && facilities.length > 0) && facilities.map((fac, index) => {
                    return <option key={index} value={fac?.facility}>{fac?.facility}</option>
                })
        }
        </select>
    )
}

export default FacilitiesComponent