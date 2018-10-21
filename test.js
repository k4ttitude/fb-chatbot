var http = require('http');
var express = require('express');
var sendMessage = require('./messageSender');
 
var app = express();

var server = http.createServer(app);

app.get('/', (req, res) => {
  res.send("Home page. Server running okay.");
});

app.post('/webhook', (req, res) => {
	sendMessage('733356657004260', 'hello');
})

app.set('port', process.env.PORT || 5000);
app.set('ip', process.env.IP || "0.0.0.0");

server.listen(app.get('port'), app.get('ip'), function() {
  console.log("Chat bot server listening at %s:%d ", app.get('ip'), app.get('port'));
});