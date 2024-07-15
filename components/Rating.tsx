'use client'

import React, { useState } from 'react';
import { Star } from 'lucide-react'; // Assuming you're using lucide-react for icons

interface RatingProps {
  initialRating?: any ;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  className?: any
}

const Rating: React.FC<RatingProps> = ({ initialRating = 0, onChange, readOnly = false, className }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleRatingChange = (newRating: number) => {
    if (!readOnly) {
      setRating(newRating);
      if (onChange) {
        onChange(newRating);
      }
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5,6,7,8,9,10].map((star) => (
        <Star
          key={star}
          className={`w-7 h-7 cursor-pointer ease-linear  ${
            (hover || rating) >= star 
              ? 'text-yellow-400 fill-yellow-400' 
              : 'text-gray-300'
          } ${readOnly ? 'cursor-default' : ''}`}
          onClick={() => handleRatingChange(star)}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(0)}
        />
      ))}
    </div>
  );
};

export default Rating;