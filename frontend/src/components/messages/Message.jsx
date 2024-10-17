import React from 'react'

const Message = () => {
  return (
    <div className='chat chat-end mb-4'>
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
                <img src="https://avatar.iran.liara.run/public/33" alt="User Profile Picture" />
            </div>
        </div>

        <div className="chat-bubble text-white bg-blue-500">Shut Up!</div>
        <div className="chat-footer text-white flex gap-1 items-center">12:35</div>
    </div>
  )
}

export default Message;