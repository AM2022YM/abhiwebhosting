const express = require('express');
const path=require('path');
const app=express();
const port= process.env.PORT || 8000;
const bodyparser=require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactdance');
const contactform = new mongoose.Schema({
    name: String,
    place: String,
    age: String,
    gender: String,
    phone: String,
    email: String
  });
const Contact = mongoose.model('Contact', contactform);

app.use('/static',express.static('static'))
app.use(express.urlencoded())
app.set('view engine', 'pug')

app.set('views', path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    res.status(200).render('home.pug')
})

app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug')
})

app.post('/contact',(req,res)=>{
    var myData= new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item has not been saved to the database")
    })
})

app.listen(port,()=>{
    console.log(`The application is started succesfully on port ${port}`);
});