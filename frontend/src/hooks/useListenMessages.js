
import { useEffect } from 'react';
import {useSocketContext} from '../context/SocketContext';
import useConversation from '../zustand/useConversation';
import notification from '../../public/sounds/notification.mp3';

const useListenMessages = () => {
  const {socket} = useSocketContext();
  const {messages, setMessages} = useConversation();

  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
        if (messages.length === undefined)
            setMessages([newMessage]);
        else
            setMessages([...messages, newMessage]);

        const sound = new Audio(notification);
        sound.play();
    });

    return () => socket?.off('newMessage');
  }, [socket, setMessages, messages]);
}

export default useListenMessages;