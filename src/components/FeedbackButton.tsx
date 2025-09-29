import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { updateFeedback } from '../api/feedback';

const FeedbackButton = () => {
  const [isHelpful, setIsHelpful] = useState(null);
  const { mutate, isLoading } = useMutation(updateFeedback);

  const handleFeedback = (helpful) => {
    setIsHelpful(helpful);
    mutate({ helpful });
  };

  return (
    <div>
      <button onClick={() => handleFeedback(true)}>Helpful</button>
      <button onClick={() => handleFeedback(false)}>Not Helpful</button>
      {isLoading && <p>Loading...</p>}
      {isHelpful !== null && <p>Thanks for your feedback!</p>}
    </div>
  );
};

export default FeedbackButton;
