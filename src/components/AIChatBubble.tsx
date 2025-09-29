import React, { useEffect } from 'react';

const AIChatBubble = ({ message, isUser }) => {
  useEffect(() => {
    // Optionally add animation logic here
  }, []);

  return (
    <div className={isUser ? 'user-chat-bubble' : 'ai-chat-bubble'}>
      <p>{message}</p>
    </div>
  );
};

export default AIChatBubble;
