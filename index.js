const express = require('express');
const mg = require('mongoose');
const app = express();
const cd = require('./credencials');
const DB_USER = cd.DB_USER;
const password = cd.password;
const DB_HOST = 'kodemia16.rtqqj.mongodb.net';
const DB_NAME = 'kodemia';
const URL =  `mongodb+srv://${DB_USER}:${password}@${DB_HOST}/${DB_NAME}`;

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

const getKoders = async ()=>{
    let connection = await mg.connect(URL);
    
    let koders = await Koder.find();
    return koders;
    
}
const createKoder = async (name,lastName,age,gender)=>{
    let connection = await mg.connect(URL);

    const newKoder = ({
        name: name,
        lastName : lastName,
        age: parseInt(age),
        gender: gender
    });
    
     let koderCreate = await Koder.create(newKoder)
     return koderCreate;


}


app.use(express.json());

app
    .get('/koders', async (req,res) => {
        const count = req.query.count;

        const gender = req.query.gender;
        const age = req.query.age;
        let kodersData = await getKoders();

        if (gender) {
            kodersData = kodersData.filter(koders => koders.gender === gender)
        }
        if (age) {
            kodersData = kodersData.filter(koders => koders.age === parseInt(age))
        }
        if (count) {
            kodersData = kodersData.slice(0, parseInt(count))
        }

        res.json({koders: kodersData})
    })
    .post('/koders', async (req, res) => {
        const body = req.body;
        const name = body.name;
        const lastName = body.lastName;
        const age = body.age;
        const gender = body.gender;

        let create= await createKoder(name,lastName,age,gender);

        res.json({create: create})
    })

app.listen(8080,()=>{
    console.log('Server running on port 8080');
})