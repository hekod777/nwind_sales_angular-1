var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');

module.exports = app;

// app.use(session({ secret: 'boom!!'}));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'browser')));

app.use(require('body-parser').json());

app.use('/api', require('./routes'));

// app.use(function (req, res, next) {
//   console.log('session', req.session);
//   next();
// });

app.get('/', function(req,res,next){
	res.sendFile(path.join(__dirname, 'index.html'));
});


