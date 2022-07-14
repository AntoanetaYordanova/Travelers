import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/authContext';
import { useEffect } from 'react';
import * as authService from '../../services/auth';

const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useAuthContext();

    useEffect(() => {
        try {
            authService.logout();
            logout();
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }, [])
   
    return null
}

export default Logout;