import React, { useEffect, useState } from 'react'
import {toast} from 'react-hot-toast';

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const getConversations = async () => {
    try {
        setLoading(true);
        const res = await fetch(
            `/api/users`
        );

        const data = await res.json();

        if (data.error || !res.ok)
            throw new Error(data.error);

        setConversations(data);
    } catch(error) {
      console.log(error);
      toast.error('An Error Occured');
    } finally {
        setLoading(false);
    }
  }
  useEffect(() => {
    getConversations();
  }, []);

  return {loading, conversations};
}

export default useGetConversations;