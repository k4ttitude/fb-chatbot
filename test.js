var http = require('http');
var express = require('express');
 
var app = express();

app.get('/', (req, res) => {
  res.send("Home page. Server running okay.");
});

app.set('port', process.env.PORT || 5000);
app.set('ip', process.env.IP || "0.0.0.0");

server.listen(app.get('port'), app.get('ip'), function() {
  console.log("Chat bot server listening at %s:%d ", app.get('ip'), app.get('port'));
});