const APP_SECRET = '6088d6960a9929d5b68d61c192ad642f';
const VALIDATION_TOKEN = 'MyToken';
// const PAGE_ACCESS_TOKEN = 'EAAE73JnZByQcBAJJRd3lpoC2I5HZCZAx9zZAsZAWG2HY8DgxN6vZAb9ekJ0PSBA0csCfZCPxdnPln1nH4JrCmumv7EPNUU5uh0AwoApsApVcGm9msoV0HzDzwNLx06qbilFzM1STBYU2Y5djnGCANYZCdb5ZBj3qqjbLFIlOrnRA5hvb37AUXZCu69';
 
var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
 
var app = express();
app.use(bodyParser.json());

var server = http.createServer(app);
var request = require("request");

var messageSender = require('./messageSender');

var simsimi = require('./response/simsimi');

var vnexpress = require('./news/vnexpress');
var rssParser = require('./news/parser');
var myUtil = require('./util');
 
app.get('/', (req, res) => {
  res.send("Home page. Server running okay.");
});
 
app.get('/webhook', function(req, res) { // Đây là path để validate tooken bên app facebook gửi qua
  if (req.query['hub.verify_token'] == VALIDATION_TOKEN) {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

var category = vnexpress.home;
 
app.post('/webhook', function(req, res) { // Phần sử lý tin nhắn của người dùng gửi đến
  console.log("webhook received a request");
  if (req.body.object === 'page') {
    req.body.entry.forEach(entry => {
      entry.messaging.forEach(event => {
        if (event.message && event.message.text) {
          // let promise = simsimi.reply(event.message.text);
          // promise.then(response => {
          //   // messageSender.sendMessage(event.sender.id, response);
          // });

          var query = event.message.text.toLowerCase();

          switch (query) {
            case "category":
              let buttons = Object.keys(vnexpress).map(x => {
                return { 
                    type: 'web_url',
                    title: x, 
                    url: vnexpress[x],
                    webview_height_ratio: 'full'
                }
              });
              messageSender.sendButtons(event.sender.id, "Select:", buttons.slice(0, 3));
              break;

            default:
              // messageSender.sendMessage(event.sender.id, event.message.text);
              let promise = rssParser.search(query, vnexpress.home);
              promise.then(_result => {
                if (_result && _result.length != 0) {
                  let elements = myUtil.toList(_result);
                  messageSender.sendList(event.sender.id, elements);
                } else {
                  messageSender.sendMessage(event.sender.id, 'No article found.');
                }
              });
              break;
          }
        }
      });
    });

    res.status(200).end();
  }

  res.status(404).end();
});
 
app.set('port', process.env.PORT || 5000);
app.set('ip', process.env.IP || "0.0.0.0");
 
server.listen(app.get('port'), app.get('ip'), function() {
  console.log("Chat bot server listening at %s:%d ", app.get('ip'), app.get('port'));
});