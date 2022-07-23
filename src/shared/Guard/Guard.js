import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/authContext';

const Guard = ({doesNeedAuth}) => {
    const { isAuthenticated } = useAuthContext();

    if(doesNeedAuth) {
        if(isAuthenticated) {
            return <Outlet/>; 
        } else {
            return <Navigate to={'login'}/>;
        } 
    } 

    if(!isAuthenticated) {
        return <Outlet/>;
    } else {
        return <Navigate to={'/blog'}/>;
    }
}

export default Guard;
