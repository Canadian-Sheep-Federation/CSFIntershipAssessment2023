import React, { useState } from 'react'
import { TextField } from '@material-ui/core';
import Button from '@mui/material/Button';

function MainForm() {
  const [childID, setchildID] = useState('');
  const [childName, setchildName] = useState('');
  const [foodEaten, setfoodEaten] = useState('');
  const [quantityEaten, setQuantityEaten] = useState([""]);
  const [viewAllSubmitted, setViewAllSubmitted] = useState(false);

  // Send user input (foodEaten) as a query to the API
  const handleFindFoodItem = async (e) => {
    
  }


  // Add all form data to database
  const handleSubmit = async (e) => {
    
  }


  const handleViewAllSubmitted = async (e) => {
    
  }

  return (
    <div>
      <div>
        <form className='main-form'>
          <div>Child's id:&nbsp;&nbsp;
            <TextField
              className='textfield'
              type="text"
              placeholder="Child's id"
              onChange={(e) => setchildID(parseInt(e.target.value))}
              variant="outlined"
            /></div>

          <div>Child's name:&nbsp;&nbsp;
            <TextField
              className='textfield'
              type="text"
              placeholder="Child's name"
              onChange={(e) => setchildName(e.target.value)}
              variant="outlined"
            /></div>

          <div>Food eaten:&nbsp;&nbsp;
            <TextField
              className='textfield'
              type="text"
              placeholder="Food eaten"
              onChange={(e) => setfoodEaten(e.target.value)}
              variant="outlined"
            />
            <Button onClick={handleFindFoodItem} variant="contained" size="small" style={{ width: 200, height: 30, borderRadius: 5, margin: 10 }} to="/">
              <p>Find food item</p>
            </Button>
            <div style={{ fontWeight: "bold", color: "red" }}><div style={{ fontWeight: "bolder", color: "blue" }}>Click to select</div>Selected item: {foodEaten}</div>


          </div>

          <div>Quantity eaten:&nbsp;&nbsp;
            <TextField
              className='textfield'
              type="text"
              placeholder="Quantity eaten"
              onChange={(e) => setQuantityEaten(e.target.value)}
              variant="outlined"
            />(an average serving)</div>

          <Button onClick={handleSubmit} variant="contained" size="small" style={{ width: 120, height: 30, borderRadius: 5, margin: 10 }} to="/">
            <p>Submit</p>
          </Button>

        </form>
      </div>

      <Button onClick={handleViewAllSubmitted} variant="contained" size="small" style={{ width: 200, height: 30, borderRadius: 5, margin: 10 }} to="/">
        View all submitted
      </Button>
    </div>
  )
}

export default MainForm