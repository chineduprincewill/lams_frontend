import axios from "./baseUrl";

export const createTicket = async ( data, setSuccess, setError, setSubmitting ) => {

    setSubmitting(true);

    try{
        const response  = await axios.post('ticket',
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

    setSubmitting(false);
}

export const fetchAllTickets = async ( token, setTickets, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.get('all-tickets',
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data);
        setTickets(response.data);
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

export const fetchStaffTickets = async ( token, setTickets, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.get('staff-tickets',
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data);
        setTickets(response.data);
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

export const fetchClientTickets = async ( token, setTickets, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.get('client-tickets',
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data);
        setTickets(response.data);
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

export const fetchTicketByNo = async ( data, setSuccess, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.post('get-ticket-by-no',
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

    setFetching(false);
}