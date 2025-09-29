import React from 'react';
import { useQuery } from 'react-query';
import { getRecentQuestions, getAchievements, getFavoriteTopics } from '../api/ai-dashboard';

const AIDashboard = () => {
  const { data, error, isLoading } = useQuery(
    'ai-dashboard',
    async () => {
      const recentQuestions = await getRecentQuestions();
      const achievements = await getAchievements();
      const favoriteTopics = await getFavoriteTopics();
      return { recentQuestions, achievements, favoriteTopics };
    },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Recent Questions</h1>
      <ul>
        {data.recentQuestions.map((question) => (
          <li key={question.id}>{question.text}</li>
        ))}
      </ul>

      <h1>Achievements</h1>
      <ul>
        {data.achievements.map((achievement) => (
          <li key={achievement.id}>{achievement.name}</li>
        ))}
      </ul>

      <h1>Favorite Topics</h1>
      <ul>
        {data.favoriteTopics.map((topic) => (
          <li key={topic.id}>{topic.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AIDashboard;
