import React from 'react';
import { Card, Image, Rating } from 'semantic-ui-react';

const ArticleCard = ({ article }) => (
  <Card>
    <Image src={article.image} />
    <Card.Content>
      <Card.Header>{article.name}</Card.Header>
      <Card.Description>{article.description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Rating icon='star' defaultRating={article.rating} maxRating={5} />
      <span>{article.author}</span>
    </Card.Content>
  </Card>
);

export default ArticleCard;
