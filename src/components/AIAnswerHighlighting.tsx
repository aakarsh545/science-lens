import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getScienceExplanation } from '../api/science-explanation';

const ScienceExplanation = () => {
  const { data, error, isLoading } = useQuery(
    'science-explanation',
    getScienceExplanation,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <p>
        {data.description}
        <span className="highlight">
          <b>{data.highlightedText}</b>
        </span>
      </p>
    </div>
  );
};

export default ScienceExplanation;
