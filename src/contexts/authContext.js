import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const initialState = {
    email : '',
    id : '',
    token : '',
    myPageView : 'own'
}

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useLocalStorage('user', initialState);
    
    const login = (data) => {
        setUser(data);
    }

    const logout = () => {
        setUser(initialState);
    }

    const setUserPageView = (data) => {
        setUser(data);
    }

    return (
        <AuthContext.Provider value={{user, login, logout, setUserPageView, isAuthenticated : !!user.email}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext);
}