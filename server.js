const express = require("express");
const hbs= require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}:${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) throw err;
        console.log('The data was appended');
    });
    console.log(log);
    next();
});

//app.use((req,res, next) => {
//    res.render('maintenance.hbs');
//});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
//    res.send('<h1>Hello Express!</h1>');
//    res.send({name: 'Ankita',likes: ['choco', 'ice cream',]
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to our Home page.'
    });
});

app.get('/about', (req, res) => {
   //res.send('About Page'); 
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects',
    });
});

// /bad - send back json with error msg prop
app.get('/bad', (req, res) => {
    res.send({
        errorMessage : "Error occured"
    })
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});

