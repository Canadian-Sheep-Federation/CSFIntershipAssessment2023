

// 
import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    fact: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    axios.post('http://localhost:8000', formData,
    { headers : {
      "Content-Type" : "multipart/form-data",
    }},
    );
    // submit form data to API
  };
  const test1 = (event) => {
    // console.log("test1");
    // var data = fetch('https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=2');
    // console.log(data);
    event.preventDefault();
    fetch('https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=1')
      .then(response => response.json())
      .then(data => setFormData({ ...formData, fact: data['text'] }))
      .catch(error => console.log(error));
  }
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          className="form-control"
          id="fact"
          name="fact"
          rows="5"
          value={formData.fact}
          onChange={handleChange}
        />
      </div>
      <div className = "d-flex">
        <button type="submit" className="btn btn-primary mr-2">
          Send Cat Fact!
        </button>
        <button type = "submit" className = "btn btn-secondary" onClick={test1}>
          Get New Fact!
        </button>
      </div>
      
    </form>
  );
};

export default Form;



