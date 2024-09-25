import axios from "./baseUrl";

export const fetchAhdReport = async ( token, endpoint, data, setAhd, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.post(`${endpoint}`,
            data,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data);
        setAhd(response.data);
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

export const fetchCd4Statistics = async ( token, endpoint, data, setResults, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.post(`${endpoint}`,
            data,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data?.results);
        setResults(response.data?.results);
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

export const fetchCd4Counts = async ( token, endpoint, data, setResults, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.post(`${endpoint}`,
            data,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data?.results);
        setResults(response.data?.results);
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


