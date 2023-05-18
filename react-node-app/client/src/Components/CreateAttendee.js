import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import axios from 'axios';

export function CreateAttendee({ attendees, setAttendees }) {
  const [name, setName] = useState('')
  const [foodItem, setFoodItem] = useState('')
  const [foodType, setFoodType] = useState('')

  const attendeeObject = {
    name: name,
    food_item: foodItem,
    food_type: foodType
  };

  async function createRequest(e) {
    e.preventDefault();

    const res = await axios.post('http://localhost:3001/attendees/create-attendee', attendeeObject)
    console.log(res)
    setName('')
    setFoodType('')
    setFoodItem('')

    const getRes = await axios.get('http://localhost:3001/attendees')
    console.log(getRes)
    setAttendees(getRes.data)
  }


  function onChangeFoodType(e) {
    setFoodType(e.target.value)
  }

  function onChangeFoodItem(e) {
    setFoodItem(e.target.value)
  }

  function onChangeName(e) {
    setName(e.target.value)
  }

  return (
    <Form className="mb-6" onSubmit={createRequest}>
    <Form.Group className="mb-3">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" placeholder="Your name" value={name} onChange={onChangeName}/>
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>What you're bringing</Form.Label>
      <span role="img" aria-label="tasty" style={{margin: 4}}>😋</span>
      <Form.Select aria-label="Food Type" value={foodType} onChange={onChangeFoodType}>
        <option>Select...</option>
        <option value="Main Dish">A Main Dish</option>
        <option value="Side Dish">A Side Dish</option>
        <option value="Dessert">Dessert</option>
        <option value="Snacks">Snacks</option>
        <option value="Drinks">Drinks</option>
      </Form.Select>
    </Form.Group>

    <Form.Group className="mb-4">
      <Form.Control type="text" placeholder="Fruit Salad" value={foodItem} onChange={onChangeFoodItem}/>
    </Form.Group>

    <Button variant="primary" type="submit">
      <span role="img" aria-label="tasty" style={{margin: 4}}>✨</span>
      Add to picnic 
      <span role="img" aria-label="tasty" style={{margin: 4}}>✨</span>
    </Button>
  </Form>
  )
}