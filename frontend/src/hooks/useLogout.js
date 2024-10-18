import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_HOST}/api/auth/logout`, {
                    method: 'POST'
                }
            );

            const data = await res.json();

            if (data.error)
                throw new Error(data.error);

            localStorage.removeItem('chat-user');
            setAuthUser(null);
        } catch(error) {
            console.log(error);
            console.log(error.message);
            toast.error(error.message || error);
        } finally {
            setLoading(false);
        }
    }
    return {loading, logout};
}

export default useLogout;