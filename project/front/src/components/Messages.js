import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000')
      .then(response => {
        setMessages(response.data);
        console.log(response.data);
      })
      .catch(error => {
        //console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>Facts sent to friends</h2>
      <ul className = "list-group">
      {messages.map((message, index) => (
         <li className = "list-group-item" key={index}>
           <p>Sent to : {message.reciever}</p>
           <p>Email: {message.emailAddress}</p>
           <p>Fact: {message.fact}</p>
         </li>

       ))}
      </ul>
      </div>
 );
      
}
export default Messages;

