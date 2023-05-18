import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useState, useEffect } from "react";

import { RandomRecipeCard } from "./Components/RandomRecipeCard";
import { CreateAttendee } from './Components/CreateAttendee';
import GridSystem  from './Components/GridSystem';

function App() {
  const [attendees, setAttendees] = useState([])

  async function getAndSetAttendees() {
    const res = await axios.get('http://localhost:3001/attendees')
    console.log(res.data)
    setAttendees(res.data)
  }

  useEffect(() => {
    getAndSetAttendees()
  }, []);

  const Attendee = props => {
    const { name, foodItem, foodType } = props

    return (
      <div className='mb-5'>
        <h5>{name}</h5>
        <h6>Food Item: {foodItem}</h6>
        <h6>Food Type: {foodType}</h6>
      </div>
    )
  }

  return (
    <div style={{ display: 'block', 
                  width: 800, 
                  padding: 30 }}>
      <h3 className="mb-3">Picnic Party</h3>
      <div className="mb-5" style= {{backgroundImage:"url(/picnic.png)", height:'500px'}}>
        {attendees.length == 0 && <h6 style={{textAlign: 'center',flex: 1, justifyContent: 'center', alignItems:"center", lineHeight:"200px", paddingTop: "120px"}}>No attendees yet {'😢'}</h6>}
        <GridSystem colCount={4}>
          { attendees.length > 0 
            && attendees.map(item => 
            <Attendee key={item.id} id={item.id} name={item.name} foodItem={item.food_item} foodType={item.food_type} />)}
        </GridSystem>
      </div>

      <h3 className="mb-3">Join the Picnic Party</h3>
      <CreateAttendee attendees={attendees} setAttendees={setAttendees}></CreateAttendee>
      <div>
        <RandomRecipeCard style={{ padding_top: 100}}></RandomRecipeCard>
      </div>
    </div>
  );
}

export default App;
