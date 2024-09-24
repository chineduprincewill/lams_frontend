import axios from "./baseUrl";

export const fetchTBHivReport = async ( token, endpoint, setSerology, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.get(`${endpoint}`,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data);
        setSerology(response.data);
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