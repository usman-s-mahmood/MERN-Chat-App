
import React, { useEffect, useState } from 'react'
import Messages from './Messages';
import MessageInput from './MessageInput';
import {TiMessages} from 'react-icons/ti'
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';


const MessageContainer = () => {
  // const [noChatSelected, setNoChatSelected] = useState(true);
  const {selectedConversation, setSelectedConversation} = useConversation();

  const {authUser} = useAuthContext();

  useEffect(() => {

    // clean up function for component unmounting
    return () => setSelectedConversation(null);
  }, []);

  return (

    <div className='md:min-w[450px] flex flex-col'>
    {
      !selectedConversation? 
      <NoChatSelected username={authUser.username} /> : <><div className="bg-slate-500 px-36 py-2 mb-2"><span className="label-text">To: </span> <span className="text-gray-100 font-bold">{selectedConversation.fullName}</span></div><Messages /><MessageInput /></> 
    }
      {/* Header */}

    </div>
  )
}

export default MessageContainer;

const NoChatSelected = ({username = 'someone'}) => {
  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
          <p>Welcome ✌ {username} </p>
          <p>Select A chat to start messaging</p>
          <TiMessages className='text-3xl wd:text-6xl ' />
        </div>
      </div>
    </>
  );
}