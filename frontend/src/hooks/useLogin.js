import { useState } from "react";
import toast from 'react-hot-toast';
import {useAuthContext} from '../context/AuthContext';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const login = async (username, password) => {
        try {
            setLoading(true);
            const res = await fetch(
                `/api/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({username, password})
                }
            );

            const data = await res.json();
            // console.log(data);

            if (data.error)
                throw new Error(data.error);

            localStorage.setItem('chat-user', JSON.stringify(data));
            setAuthUser(data);

            toast.success('You Are Now Logged Into The Website');
        } catch(error) {
            console.log(error);
            toast.error(error.message || error);
        } finally {
            setLoading(false);
        }
    }

    return {loading, login};
}

export default useLogin;