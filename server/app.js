var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var portDecision = process.env.PORT || 3000;
var privateData = require('./routes/private-data');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.sendFile(path.resolve('./server/public/views/index.html'));
});

app.use(express.static('server/public'));

app.use('/privateData', privateData)

app.listen(portDecision, function(){
  console.log('running on port', portDecision);
});
