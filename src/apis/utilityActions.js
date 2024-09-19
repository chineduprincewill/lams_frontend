import axios from "./baseUrl";

export const fetchFacilities = async ( token, setFacilities, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.get('facilities',
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
