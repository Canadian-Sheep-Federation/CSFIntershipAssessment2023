import { Card, Button} from 'react-bootstrap';
import { getRandomRecipe } from '../Services/RecipeService';
import React, { useState } from 'react';


export function RandomRecipeCard() {
  const [recipe, setRecipe] = useState({});
  const [buttonText, setButtonText] = useState('Ask the picnic wizard');

  function generateRandomRecipe() {
    getRandomRecipe()
    .then(res => {
      console.log(res)
      setRecipe(res);
      setButtonText('Ask again')
    });
  }

  return (
    <Card className="mt-4">
      <Card.Header className="mb-2">Picnic Wizard</Card.Header>
      <Card.Title className="px-4 mb-0 mt-2">Don't know what to bring?</Card.Title>
      {Object.keys(recipe).length > 0 &&
      <Card.Text className="px-4 mb-0 mt-2 text-muted">The picnic wizard suggests:</Card.Text>}
      <Card.Body className="px-4 mb-2">{recipe?.title}</Card.Body>
      <Button style={{ width:300 }} className="mx-4 mb-4" onClick={generateRandomRecipe}>
        {buttonText}
        <span role="img" aria-label="tasty" style={{margin: 5}}>🔮</span>
      </Button>
    </Card>
  );
}
