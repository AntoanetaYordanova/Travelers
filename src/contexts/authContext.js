import { createContext, useState, useContext } from "react";


const initialState = {
    email : '',
    id : '',
    token : ''
}

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(initialState);

    const login = (data) => {
        setUser(data);
    }

    const logout = () => {
        setUser(initialState);
    }

    return (
        <AuthContext.Provider value={{user, login, logout, isAuthenticated : !!user.email}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext);
}