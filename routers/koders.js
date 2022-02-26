const express = require('express');
const mg = require('mongoose');
const cd = require('../credencials');
const Koder = require('../models/koderModel');
const DB_USER = cd.DB_USER;
const password = cd.password;
const DB_HOST = 'kodemia16.rtqqj.mongodb.net';
const DB_NAME = 'kodemia';
const URL = `mongodb+srv://${DB_USER}:${password}@${DB_HOST}/${DB_NAME}`;
const router = express.Router();

const connect = async () => {
    let connection = await mg.connect(URL);
    console.log('Database connected...');
}

router
    .get('/', async (req, res)=> {
        try {
            const count = req.query.count;

        const gender = req.query.gender;
        const age = req.query.age;
        let kodersData = await Koder.find();

        if (gender) {
            kodersData = kodersData.filter(koders => koders.gender === gender)
        }
        if (age) {
            kodersData = kodersData.filter(koders => koders.age === parseInt(age))
        }
        if (count) {
            kodersData = kodersData.slice(0, parseInt(count))
        }

        res.json({ 
            success: true,
            data: {
                koders: kodersData
            }
        })
        } catch (error) {
            res.status(400);
            res.json({ 
                success: false,
                message: error.message
            })
        }
        
    })
    .get('/:id', async (req, res)=>{
        try {
            const idKoders = req.params.id;
            const kodersData = await Koder.findById(idKoders);

            res.json({
                success: true,
                data: {
                    koders: kodersData
                }
            })

        } catch (error) {
            res.status(400);
            res.json({
                success: false,
                message: error.message
            })
        }
    })
    .post('/', async (req, res)=>{
        try {
            const newKoder = req.body;
            const koderCreated = await Koder.create(newKoder);

            res.json({
                success: true,
                message: 'Koders created', 
                data:{
                    koder: koderCreated
                }
            })
        } catch (error) {
            res.status(400);
            res.json({
                success: false,
                message: error.message
            })
        }
    })
    .patch('/:id', async (req, res)=>{
        try {
            const idKoders = req.params.id;
            const body = req.body;
            const koder = await Koder.findByIdAndUpdate(idKoders, body,{new: true});
            if (!koder) throw new Error('Koder not found');
            res.json({
                success: true,
                message: 'koder update', 
                data:{
                    koder: koder
                }
            })
        } catch (error) {
            res.status(400);
            res.json({
                success: false,
                message: error.message
            })
        }
        

    })
    .delete('/:id', async (req, res)=>{
        try {
            const idKoders = req.params.id;
            const koder = await Koder.findByIdAndDelete(idKoders,{delete: true})
            if(!koder) throw new Error('koder not found')
            res.json({
                success: true,
                message: 'Koder is delete',
                data:{
                    koder: koder
                }
            })
            
        } catch (error) {
            res.status(400);
            res.json({
                success: false,
                message: error.message
            })
        }

    })

module.exports = {
    router,
    connect
}