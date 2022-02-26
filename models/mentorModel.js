const mg = require('mongoose');

const mentorSchema = new mg.Schema({
    name:{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
        trim: true
    },
    gender:{
        type: String,
        required: true,
        trim: true,
        maxLength: 1,
        enum:['f','m']
    },
    module:{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
        trim: true
    }

})

const Mentor = mg.model('mentors', mentorSchema);

module.exports = Mentor;