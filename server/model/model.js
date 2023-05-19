const mongoose = require('mongoose');
const fetch = require("node-fetch");
//import fetch from 'node-fetch';

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    age : {
        type: String,
        required: true,
        
    },
    breed : {
        type: String,
        required: true,   
    }  
})

const Petdb = mongoose.model('Petdb', schema);


//**  The Below function fetches from a faulty API, I believe. Regardless,
// this is how I would fetch from a public API **//

//using Public API, save all pets from API to mongodb

// async function getAllPets(){
//     const allPets = await fetch('https://api.adoptapet.com/search/pets_at_shelter?key=A34F48&v=1&output=xml&shelter_id=2342');
//     const response = await allPets.json();
//     for(let i = 0; i < response.length; i++) {
        
//         const newPet = new Petdb({
//             name: response[i]['pet_name'],
//             age: response[i]['age'],
//             breed: response[i]['primary_breed']

//         });

//         newPet.save();
//     }
// }
// getAllPets();

module.exports = Petdb;