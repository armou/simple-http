var express = require('express');
var request = require('request');
var env = require('./environment/environment.example.js')
var app = express();


console.log(env);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', env.frontendURL);
    next();
});

app.get('/news', function(req, res) {
    console.log('GET news URL');
    var searchTerm = req.query.q;
    console.log(searchTerm);
    var url = 'https://newsapi.org/v2/everything?q=' + searchTerm +  '&pageSize=50&language=fr&apiKey=' + env.googleNewsApiKey;
    request.get(url, function(error, response) {
        if (error) {
            console.log(error)
        } else {
            var result = JSON.parse(response.body);
            res.send(result);
        }
    })
});

app.get('/', function(req, res) {
    console.log('GET root URL');
    res.send('<h2>Welcome to OudinCorp PrivateAPI</h2>');
});

app.listen(env.port, function() {
    console.log('notre app tourne sur le port ' + env.port)
});