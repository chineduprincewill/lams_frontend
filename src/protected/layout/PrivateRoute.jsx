import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('isLoggedIn') || JSON.parse(localStorage.getItem('isLoggedIn')) === null){
            navigate('/');
        }
    }, [children])

    return children;
}

export default PrivateRoute