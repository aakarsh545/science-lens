import React, { useState } from 'react';

const CategoryFilter = () => {
  const [category, setCategory] = useState('all');
  const categories = ['all', 'physics', 'biology', 'chemistry', 'space'];

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <select value={category} onChange={handleCategoryChange}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
