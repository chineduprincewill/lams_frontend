import axios from "./baseUrl";

export const fetchFacilities = async ( token, data, setFacilities, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.post('facilities',
            data,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data?.facilities);
        setFacilities(response.data?.facilities);
    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data);
        }
    }

    setFetching(false);
}

export const fetchLgas = async ( token, data, setLgas, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.post('lgas',
            data,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data?.lgas);
        setLgas(response.data?.lgas);
    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data);
        }
    }

    setFetching(false);
}

export const fetchStates = async ( token, setStates, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.get('states',
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data?.states);
        setStates(response.data?.states);
    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data);
        }
    }

    setFetching(false);
}

export const fetchRoles = async ( token, setRoles, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.get('roles',
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data?.roles);
        setRoles(response.data?.roles);
    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data);
        }
    }

    setFetching(false);
}

export const fetchSupervisors = async ( token, setSupervisors, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.get('supervisors',
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data?.supervisors);
        setSupervisors(response.data?.supervisors);
    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data);
        }
    }

    setFetching(false);
}

export const approvalAction = async ( token, data, setSuccess, setError, setApproving ) => {

    setApproving(true);

    try{
        const response  = await axios.post('approval-action',
            data,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data);
        setSuccess(response.data);
    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data);
        }
    }

    setApproving(false);
}

export const sendTicketMessage = async ( data, setSuccess, setError, setSending ) => {

    setSending(true);

    try{
        const response  = await axios.post('send-message',
            data,
            {
                headers: { 'Accept' : 'application/json' }
            }
        );    

        console.log(response.data);
        setSuccess(response.data);
    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data);
        }
    }

    setSending(false);
}
