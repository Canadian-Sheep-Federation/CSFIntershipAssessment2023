var Petdb = require('../model/model');

// create and save new pet
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new pet
    const pet = new Petdb({
        name : req.body.name,
        age : req.body.age,
        breed: req.body.breed,
    })

    // save pet in the database
    pet
        .save(pet)
        .then(data => {
            //res.send(data)
            res.redirect('/add-pet');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all pets/ retrive and return a single pet
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Petdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Pet not found with id "+ id})
                }else{
                    res.send(data)

                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving pet with id " + id})
            })

    }else{
        Petdb.find()
            .then(pet => {
                res.send(pet)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving pet information" })
            })
    }

    
}

// Update a new idetified pet by pet id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Petdb.findByIdAndUpdate(id, req.body)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update pet with ${id}. Maybe pet not found!`})
            }else{
                //res.send(data)
                res.redirect('/');
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update pet information"})
        })

      
}

// Delete a pet with specified pet id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Petdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.redirect('/');
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete pet with id=" + id
            });
        });
}