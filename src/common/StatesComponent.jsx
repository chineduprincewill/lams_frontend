import React, { useContext, useEffect, useState } from 'react'
import { tokenExpired } from '../apis/functions';
import { fetchStates } from '../apis/utilityActions';
import { AuthContext } from '../context/AuthContext';

const StatesComponent = ({ setState, yPad, val }) => {

    const { token, user, logout } = useContext(AuthContext);
    const [states, setStates] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);

    if(tokenExpired(states)){
        logout();
    }

    useEffect(() => {
        fetchStates(token, setStates, setError, setFetching);
    }, [])

    return (
        <select 
                className={`border border-gray-300 px-2 ${yPad ? yPad : 'py-1'} text-gray-700 bg-transparent`}
                onChange={(e) => setState(e.target.value)}
                value={val && val}
            >
                <option value={val ? val : ''}>{val ? val : (fetching ? 'fetching states...' : 'select state')}</option>
        {
                (states !== null && states.length > 0) && states.map((state, index) => {
                    return <option key={index} value={state?.state}>{state?.state}</option>
                })
        }
        </select>
    )
}

export default StatesComponent