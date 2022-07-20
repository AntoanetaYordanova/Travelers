import Loading from "../Loading/Loading";
import { useState } from "react";

const MyProfile = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    return (
        <h1>My Profile Page</h1>
    )
}

export default MyProfile;