var express = require('express');
var app = express();
var swig = require('swig');
var path = require('path');
swig.setDefaults({ cache: false});
var session = require('express-session');

app.set('view engine', 'html');
app.engine('html', swig.renderFile);

module.exports = app;
app.use(session({ secret: 'boom!!'}));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'browser')));

app.use(require('body-parser').json());

app.use('/api', function (req, res, next) {
  if (!req.session.counter) req.session.counter = 0;
  // console.log('counter-=-=-=-=-=-=-=-=-=--=-==-=-=--=-=-=', ++req.session.counter);
  next();
});

app.use(function (req, res, next) {
  console.log('session', req.session);
  next();
});

app.get('/', function(req,res,next){
	res.sendFile(path.join(__dirname, 'index.html'));
});


app.use('/api/regions', require('./routes/regions'));
app.use('/api/salesPeople', require('./routes/salesPeople'));
