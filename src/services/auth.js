import auth from "../config/firebaseConfig";
import { createUserWithEmailAndPassword } from 'firebase/auth'

const register = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
}

const login = () => {

}

const logout = () => {

}

export {
    register,
    login,
    logout
}
