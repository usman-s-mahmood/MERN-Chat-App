import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const handleInputErrors = ({fullName, username, password, confirmPassword, gender}) => {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error('Please Fill All The Fields!');
        return false;
    }

    if (password !== confirmPassword) {
        toast.error('Password and Confirm Password Do not match!');
        return false;
    }

    return true;
}

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {authUser, setAuthUser} = useAuthContext();

    const signup = async ({fullName, username, password, confirmPassword, gender}) => {
        const success = handleInputErrors({fullName, username, password, confirmPassword, gender});

        if (!success) return ;

        try {
            setLoading(true)
            const res = await fetch(
                `${import.meta.env.VITE_API_HOST}/api/auth/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({fullName, username, password, confirmPassword, gender})
                }
            );

            const data = await res.json();
            console.log(data);
            if (!res.ok) {
                toast.error(data.error);
                return ;
            }
            // localStorage
            localStorage.setItem('chat-user', JSON.stringify(data));
            setAuthUser(data);
            // context
            toast.success(`You Are Now Registered!`);
            return ;
        } catch(error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return [loading, signup];
}

export default useSignup;
