import React from 'react';
import TutorialCard from './TutorialCard'; 
import './Card.css';

const tutorials = [
  {
    name: 'Emotions',
    description: 'Different ways to express Emotions',
    rating: 2,
    username: 'You found me',
    image: 'https://www.shutterstock.com/image-vector/doodle-emoticon-face-icon-set-600nw-2479174063.jpg'
  },
  {
    name: 'Express',
    description: 'how to Express',
    rating: 3,
    username: 'Te Amo',
    image: 'https://pbs.twimg.com/profile_images/497929479063224320/LuzRK4sp_400x400.jpeg'
  },
  {
    name: 'Main Lead',
    description: 'You are the main character of your life',
    rating: 4,
    username: 'Ficff97',
    image: 'https://cdn.sanity.io/images/68lp9qid/production/4c5f6193403e5189492b4d6c48c10d8556284716-1200x700.png'
  },
];

const TutorialList = () => {
  return (
    <div className="tutorial-list-container">
      <div className="tutorial-list">
        {tutorials.map((tutorial, index) => (
          <TutorialCard key={index} tutorial={tutorial} />
        ))}
      </div>
      <div className="button-container">
        <button className="ui button">
          See all Tutorial
        </button>
      </div>
    </div>
  );
}

export default TutorialList;
