const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description Root Route
 *  @method GET /
 */

route.get('/', services.homeRoutes);

/**
 *  @description add pets
 *  @method GET /add-pet
 */
route.get('/add-pet', services.add_pet)

 /**
  *  @description for update pet
  *  @method GET /update-pet
  */
route.get('/update-pet', services.update_pet)

// API
route.post('/api/pets', controller.create);
route.get('/api/pets', controller.find);
route.post('/api/pets/:id', controller.update);
route.get('/delete/:id', controller.delete);

module.exports = route