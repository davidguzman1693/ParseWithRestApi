var express = require('express');
var app = express();

app.use('/', function(req, res, next) {
  var host = req.header('host');
  next();
});

app.use('/', express.static(__dirname + '/dev'));
app.listen(process.env.PORT || 5000);