
import React, { useState } from 'react'
import {BsSend} from 'react-icons/bs'
import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = () => {
  const {
    loading,
    sendMessage
  } = useSendMessage();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage(message);
    setMessage('');
  }

  return (
    <>
    <form action="" className='px-4 my-3' onSubmit={handleSubmit}>
    <div className="w-full relative">
        <input type="text" className="border text-sm rounded-lg block w-full p-2 5 bg-gray-100 border-gray text-dark" placeholder='Send A Message' required value={message} onChange={(e) => setMessage(e.target.value)} />
        <button className="absolute inset-y-0 end-0 flex items-center pe-3 ">{loading? <span className='loading loading-spinner text-white'></span> : <BsSend/>}</button>
    </div>
    </form> 
    </>
  )
}

export default MessageInput;