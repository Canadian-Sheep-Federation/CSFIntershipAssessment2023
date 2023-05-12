const mongoose = require('mongoose')
const PlayerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name']
    },
    why: {
        type: String, 
        enum: {
            values: ['strong', 'fast', 'skilled'], 
            message: 'not supported',
        },
        required: [true, 'must provide reason why u like him']
    },
    watched: {
        type: Boolean,
        required: [true, 'must provide if you have watched or not']
    }

})
module.exports = mongoose.model('Player', PlayerSchema);
