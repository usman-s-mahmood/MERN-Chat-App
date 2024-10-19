
import React, { useEffect, useRef } from 'react'
import Message from './Message';
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';

const Messages = () => {
  const {loading, messages} = useGetMessages();

  useListenMessages();

  // console.log(JSON.stringify(messages));
  
  // console.log(`Testing Condition: !loading: ${!loading} messages.length === 0 ${messages.length === 0} value of messages.length: ${messages.length}`)
  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
  }, [messages]);

  return (
    <div className='px-4 flex-1 overflow-auto'>
          {/* Message */}
          {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
          {!loading && messages.length === undefined && (<p className='text-center text-blue-400'>Start A converstaion by sending a messsage</p>)}
          {!loading && messages.length !== undefined && messages.map((message) => {
            return (
              <div key={message._id} ref={lastMessageRef}>
                <Message  message={message} />
              </div>
            );
          })}
    </div>
  )
}

export default Messages;