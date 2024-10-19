import React from 'react'
import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';

const Message = ({message}) => {
  const {authUser} = useAuthContext();
  const {selectedConversation} = useConversation();
  const fromMe = message.senderID === authUser._id;
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe? 'bg-blue-500': '';

  return (
    <div className={`chat ${fromMe? 'chat-end': 'chat-start'} mb-4`}>
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
                <img src={profilePic} alt="User Profile Picture" />
            </div>
        </div>

        <div className={`chat-bubble text-white ${bubbleBgColor}`}>{message.message}</div>
        <div className="chat-footer text-white flex gap-1 items-center">{new Date(message.createdAt).getFullYear() + '-' + (new Date(message.createdAt).getMonth() + 1) + '-' + new Date(message.createdAt).getDate() + ' | ' + new Date(message.createdAt).getHours() + ':'+new Date(message.createdAt).getMinutes()}</div>
    </div>
  )
}

export default Message;