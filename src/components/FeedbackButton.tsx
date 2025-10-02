import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { updateFeedback } from '../api/feedback';

const FeedbackButton = () => {
  const [isHelpful, setIsHelpful] = useState<boolean | null>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: updateFeedback,
  });

  const handleFeedback = (helpful: boolean) => {
    setIsHelpful(helpful);
    mutate({ helpful });
  };

  return (
    <div>
      <button onClick={() => handleFeedback(true)}>Helpful</button>
      <button onClick={() => handleFeedback(false)}>Not Helpful</button>
      {isPending && <p>Loading...</p>}
      {isHelpful !== null && <p>Thanks for your feedback!</p>}
    </div>
  );
};

export default FeedbackButton;
