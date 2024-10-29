import React from 'react';
import ArticleCard from './ArticleCard';
import "./Card.css"

const articles = [
  {
    name: 'Reveal Me',
    description: 'This fourth companion novella to Tahereh Mafi New York Times bestselling Shatter Me series is narrated by fan favorite character Kenji',
    rating: 5,
    author: 'Tahereh Mafi',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNswq-KQuUCihbHWoHqT8CXrsxB7SwygW-_g&s'
  },

  {
    name: 'Haunting Adeline',
    description: 'This book combines a goofy hacker vigilante stalker, and an insufferable heroine, and claims itself to be a dark romance. Its a joke.',
    rating: 4,
    author: 'H. D. Carlton',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnrYSRGoyjRE5OEULqE2Q5BXT2VAJUJ6-Kjg&s'
  },

  {
    name: 'Powerless',
    description: 'She has the hobbies of both a grandmother and a child: knitting, laser tag, hammocking, word searches, and coloring. Powerless is her first...',
    rating: 4,
    author: 'Lauren Roberts',
    image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1672676191i/75513900.jpg'
  },

];

const ArticleList = () => {
  return (
    <div className="article-list-container">
      <div className="article-list">
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
      <div className="button-container">
        <button className="ui button">
          See all Articles
        </button>
      </div>
    </div>
  );
}

export default ArticleList;
