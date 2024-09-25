import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { tokenExpired } from '../apis/functions';
import { fetchSupervisors } from '../apis/utilityActions';

const SupervisorsComponent = ({ setSupervisor, yPad, val }) => {

    const { token, logout } = useContext(AuthContext);
    const [supervisors, setSupervisors] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [selected, setSelected] = useState();

    const makeSelection = (selObj) => {
        const obj = JSON.parse(selObj);
        setSelected(obj?.last_name+' '+obj?.first_name);
        setSupervisor(obj?.id);
        console.log(obj)
    }

    if(tokenExpired(supervisors)){
        logout();
    }

    useEffect(() => {
        fetchSupervisors(token, setSupervisors, setError, setFetching);
    }, [])

    return (
        <select 
                className={`border border-gray-300 px-2 ${yPad ? yPad : 'py-1'} text-gray-700 bg-transparent`}
                onChange={(e) => makeSelection(e.target.value)}
            >
                <option value={val ? val : ''}>
                    {val ? val : ( selected ? selected : (fetching ? 'fetching supervisors...' : 'select supervisor'))}
                </option>
        {
                (supervisors !== null && supervisors.length > 0) && supervisors.map(spvs => {
                    return <option key={spvs?.id} value={JSON.stringify(spvs)}>{spvs?.last_name} {spvs?.first_name}</option>
                })
        }
        </select>
    )
}

export default SupervisorsComponent