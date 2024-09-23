import axios from "./baseUrl";

export const fetchPendingCovidReport = async ( token, endpoint, setCovid, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.get(`${endpoint}`,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data);
        setCovid(response.data);
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