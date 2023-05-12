const Player = require('../models/Player.js');

const createPlayer = async(req, res) => {
    try {
        const player = await Player.create(req.body);
        res.status(201).json({id: player._id});
    } catch (err) {
        res.status(400).json({msg: err.errors});
    }
}

const getSinglePlayer = async(req, res) => {
    try {
        const {id: playerId} = req.params;
        const player = await Player.findOne({_id: playerId});
        if (!player) {
            return res.status(404).json({msg: `No response with id: ${playerId}`})
        } 
        res.status(200).json({player})
    } catch(err) {
        res.status(400).json({msg: err})
    }
}

const getTask = async(req, res) => {
    try{
        const players = await Player.find({})
        res.status(200).json({players})
    } catch(err) {
        res.status(500).json({msg: err})
    }
}
module.exports = {createPlayer, getSinglePlayer, getTask};
