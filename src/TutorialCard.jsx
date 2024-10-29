import React from 'react';
import { Card, Image, Rating } from 'semantic-ui-react';

const TutorialCard = ({ tutorial }) => (
  <Card>
    <Image src={tutorial.image} />
    <Card.Content>
      <Card.Header>{tutorial.name}</Card.Header>
      <Card.Description>{tutorial.description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Rating icon='star' defaultRating={tutorial.rating} maxRating={5} />
      <span>{tutorial.username}</span>
    </Card.Content>
  </Card>
);

export default TutorialCard;
