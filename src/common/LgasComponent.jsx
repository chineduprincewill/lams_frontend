import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { fetchLgas } from '../apis/utilityActions';
import { tokenExpired } from '../apis/functions';

const LgasComponent = ({ state, setLga, yPad, val }) => {

    const { token, logout } = useContext(AuthContext);

    const [lgas, setLgas] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);

    if(tokenExpired(lgas)){
        logout();
    }

    useEffect(() => {
        fetchLgas(token, { state }, setLgas, setError, setFetching);
    }, [state])

    return (
        <select 
                className={`border border-gray-300 px-2 ${yPad ? yPad : 'py-1'} text-gray-700 bg-transparent`}
                onChange={(e) => setLga(e.target.value)}
                value={val && val}
            >
                <option value={val ? val : ''}>{val ? val : (fetching ? 'fetching LGAs...' : 'select LGA')}</option>
        {
                (lgas !== null && lgas.length > 0) && lgas.map((lg, index) => {
                    return <option key={index} value={lg?.lga}>{lg?.lga}</option>
                })
        }
        </select>
    )
}

export default LgasComponent