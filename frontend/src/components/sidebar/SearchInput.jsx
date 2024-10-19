
import React, { useState } from 'react'
import {IoSearchSharp} from 'react-icons/io5';
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';

const SearchInput = () => {
  const [search, setSearch] = useState('');

  const {setSelectedConversation} = useConversation();
  const {conversations} = useGetConversations();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const conversation = conversations.find((e) => e.fullName.toLowerCase().includes(search.toLowerCase()));

    if (conversation)
      setSelectedConversation(conversation);

    else
      toast.error(`${search} Not Found!`);
  }


  return (
    <>
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input type="text" className="input input-bordered rounded-full" required minLength={3} value={search} onChange={(e) => setSearch(e.target.value)} placeholder='search...' />

        <button className="btn btn-circle bg-sky-500 text-white" type='submit'><IoSearchSharp className='w-6 h-6 outline-none' /></button>
    </form>
    </>
  );
}

export default SearchInput;