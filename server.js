const APP_SECRET = '6088d6960a9929d5b68d61c192ad642f';
const VALIDATION_TOKEN = 'MyToken';
const PAGE_ACCESS_TOKEN = 'EAAE73JnZByQcBAPEBSUGiRc8AldNfxVwxWE1Kajihe5dwlqlpUQKYZCGVfWl4RhQE19dZB26p163qPF0MYAir9x6mQ0ZAWkjUE9q6Ehq2Nky1QSS8fEuKsNd5oO4mqArPjp6F1aeZA9YaPQyGZAM3XR5YEvKJV9YSZBWW1ytBFYgu3QlcxWu1Uu';
 
var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
 
var app = express();
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
app.use(bodyParser.json());

var server = http.createServer(app);
var request = require("request");

// var sendMessage = require('../messageSender');
 
app.get('/', (req, res) => {
  res.send("Home page. Server running okay.");
});
 
app.get('/webhook', function(req, res) { // Đây là path để validate tooken bên app facebook gửi qua
  if (req.query['hub.verify_token'] == VALIDATION_TOKEN) {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});
 
app.post('/webhook', function(req, res) { // Phần sử lý tin nhắn của người dùng gửi đến
  console.log("webhook received a request");
  if (req.body.object === 'page') {
    req.body.entry.forEach(entry => {
      entry.messaging.forEach(event => {
        if (event.message && event.message.text) {
          console.log("sent a message: " + event.message.text);
          sendMessage(event.sender.id, "Hello I'm a bot replying to your message: '" 
            + event.message.text + "'");
        }
      });
    });

    res.status(200).end();
  }

  res.status(404).end();
});
 
// Đây là function dùng api của facebook để gửi tin nhắn
function sendMessage(senderId, message) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: PAGE_ACCESS_TOKEN, },
    method: 'POST',
    json: {
      recipient: { id: senderId },
      message: { text: message },
    }
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // Message has been successfully received by Facebook.
      console.log(
        `Successfully sent message to ${endPoint} endpoint: `,
        JSON.stringify(body)
      );
    } else {
      console.error(
        `Failed calling Messenger API endpoint `,
        response.statusCode,
        response.statusMessage,
        body.error
      );
    }
  });
}
 
app.set('port', process.env.PORT || 5000);
app.set('ip', process.env.IP || "0.0.0.0");
 
server.listen(app.get('port'), app.get('ip'), function() {
  console.log("Chat bot server listening at %s:%d ", app.get('ip'), app.get('port'));
});