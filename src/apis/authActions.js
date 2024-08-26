import axios from "./baseUrl";

export const login = async ( data, setSuccess, setError, setSubmitting ) => {

    setSubmitting(true);

    try{
        const response  = await axios.post('login',
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

export const register = async ( data, setSuccess, setError, setRegistering ) => {

    setRegistering(true);

    try{
        const response  = await axios.post('signup',
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

    setRegistering(false);
}