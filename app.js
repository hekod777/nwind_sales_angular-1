var express = require('express');
var app = express();
var swig = require('swig');
var path = require('path');
swig.setDefaults({ cache: false});


app.set('view engine', 'html');
app.engine('html', swig.renderFile);

module.exports = app;

app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'browser')));

app.use(require('body-parser').json());

app.get('/', function(req,res,next){
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/api/regions', require('./routes/regions'));
// app.use('/api/salesPeople', require('./routes/salesPeople'));
