import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const userData = JSON.parse(localStorage.getItem('isLoggedIn'));
    
    const [token, setToken] = useState(userData ? userData?.token : '');
    const [user, setUser] = useState(userData ? userData?.user : null);
    const [record, setRecord] = useState(null);

    const logout = () => {
        setToken('');
        setUser(null);
        localStorage.removeItem('isLoggedIn');
        window.location.reload();
    }

    useEffect(() => {
        
        if(localStorage.getItem('isLoggedIn')){
            setToken(userData?.token);
            setUser(userData?.user);
        }
    }, [])

    const refreshRecord = (val) => {
        setRecord(val);
    }

    return(
        <AuthContext.Provider value={
            { 
                token, 
                user, 
                logout, 
                record, 
                refreshRecord
            }
        }>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider