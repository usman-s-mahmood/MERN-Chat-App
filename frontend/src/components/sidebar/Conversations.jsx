
import React, { useEffect } from 'react'
import Conversation from './Conversation.jsx'
import useGetConversations from '../../hooks/useGetConversations.js';
import {getRandomEmoji} from '../../utils/emojis.js';

const Conversations = () => {
  const {loading, conversations} = useGetConversations();

  

  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {conversations.map((conversation) => {
        return (
          <Conversation 
            key={conversation._id}
            emoji={getRandomEmoji()}
            conversation={conversation}
            // lastIdx={idx === conversations.length - 1}
          />);
      })}
      {loading? <span className='loading loading-spinner'></span>: null}
    </div>
  );
}

export default Conversations;