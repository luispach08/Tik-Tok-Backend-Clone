'use strict'


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const data = require('./modules/DBconfig');
var Videos = require('./modules/dbmodule');

var app = express();
const port = process.env.PORT || 9000;




//midelwares
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//DB config
const conection_url = 'mongodb+srv://admin:unzkzs0OYBQN4BQt@cluster0.xfzr7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(conection_url).then(() => {
    console.log(Videos);
});

//API endpoints
app.get('/',(req, res) =>
res.status(200).send('hello world'));

app.get(('/v1/posts'), (req, res) => 
res.status(200).send(data));

app.get('/v2/posts', (req, res) => {
    Videos.find({}).exec((err, dat) =>{
        if(err) return res.status(500).send(err);

        return res.status(200).send(dat);
    })
})

app.post('/v2/posts', (req, res) => {
    var project = Videos();
    const dbVideos = req.body;

    project.url = dbVideos.url;
    project.chanel = dbVideos.chanel;
    project.song = dbVideos.song;
    project.likes = dbVideos.likes;
    project.messages = dbVideos.messages;
    project.description = dbVideos.description;
    project.shares = dbVideos.shares;

    project.save(dbVideos, (err, dat) => {
        if (err) return res.status(500).send(err);

        if(!dat) return res.status(404).send('error');

        return res.status(200).send(dat);
    })

});

//Listening
app.listen(port, () => 
console.log(`listening on local host ${port}`))

