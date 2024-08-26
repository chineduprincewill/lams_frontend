import axios from "./baseUrl";

export const fetchTicketMessages = async ( data, setMessages, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.post('messages',
            data,
            {
                headers: { 'Accept' : 'application/json' }
            }
        );    

        console.log(response.data);
        setMessages(response.data);
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
