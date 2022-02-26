const mg = require('mongoose');

const koderSchema = new mg.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
        trim: true
    },
    age:{
        type: Number,
        required: true,
        min: 0,
        max: 150
    },
    gender:{
        type: String,
        required: true,
        trim: true,
        maxLength: 1,
        enum:['f','m']
    }
});
const Koder = mg.model('koders',koderSchema);

module.exports = Koder;