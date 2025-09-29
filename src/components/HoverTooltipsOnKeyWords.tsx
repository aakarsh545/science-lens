import React, { useState } from 'react';

const HoverTooltipOnKeyWords = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [definition, setDefinition] = useState('');

  const handleMouseOver = (event) => {
    setIsHovering(true);
    setDefinition(event.target.getAttribute('data-definition'));
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div>
      <span
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        data-definition="This is a scientific term"
      >
        Scientific Term
      </span>
      {isHovering && <p>{definition}</p>}
    </div>
  );
};

export default HoverTooltipOnKeyWords;
