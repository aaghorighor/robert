import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const StarRating = ({ start_rating = 0, starSize = '2x', handleRate }) => {
    const [rating, setRating] = useState(start_rating);
  
    const handleClick = (index) => {     
        if (index === 0) {
            setRating(index)
            return
        } 
        setRating(index + 1)
        handleRate(index + 1)
    };

    const stars = Array.from({ length: 5 }, (_, index) => {          
        return (
            <FontAwesomeIcon
                key={index}
                icon={faStar}
                onClick={() => handleClick(index)}
                color={index < rating ? '#FFD700' : '#ccc'}
                size={starSize} 
                style={{ cursor: 'pointer' }}
            />
        );
    });

    return <div>{stars}</div>;
};

export default StarRating;
