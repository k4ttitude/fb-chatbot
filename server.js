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
var myUtil = require('./myUtil');
 
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

const sendCategory = (senderId) => {
  let categories = myUtil.categoryQuickReplies();
  let start = 0;
  // let tasks = [];
  // while (start < categories.length) {
  //   Promise.all(tasks).then(result => {
  //     let message = (start == 0) ? 'Select category: ' : 'or';
  //     tasks.push(messageSender.
  //       sendQuickReplies(senderId, message, categories.slice(start, start + 11)));
  //     start += 11;
  //   });
  // }
  while (start < categories.length) {
    let message = (start == 0) ? 'Select category: ' : 'or';
    await messageSender.
      sendQuickReplies(senderId, message, categories.slice(start, start + 11));
    start += 11;
  }
}

const handleMessage = (senderId, received_message) => {
  if (received_message.quick_reply) {
    // console.log('quick_reply: ', received_message.quick_reply);
    handlePostback(senderId, received_message.quick_reply);
    return;
  }
  if (received_message.text) {
    var query = received_message.text.toLowerCase();
    console.log("message: ", query);
    switch (query) {
      case "!category":
        // let buttons = Object.keys(vnexpress).map(x => {
        //   return { 
        //       type: 'postback',
        //       title: x, 
        //       payload: '!category.' + x
        //   }
        // });
        // messageSender.sendButtons(senderId, 'Select category:', buttons.slice(0, 3));
        sendCategory(senderId);
        break;

      default:
        let promise = rssParser.search(query, category);
        promise.then(_result => {
          if (_result && _result.length != 0) {
            if (_result.length > 1) {
              let elements = myUtil.toList(_result);
              messageSender.sendList(senderId, elements.slice(0, 4));
            } else {
              let element = myUtil.toSingleItem(_result);
              messageSender.sendGeneric(senderId, element);
            }
          } else {
            messageSender.sendMessage(senderId, 'No article found.');
          }
        }).catch(err => {
          console.log('Promise rejected', err.message);
          messageSender.sendMessage(senderId, 'Server error.');
        });
        break;
    }
  }
}

const handlePostback = (senderId, received_postback) => {
  let payload = received_postback.payload;
  let categoryReg = /^!category\..*$/;
  if (payload && categoryReg.test(payload)) {
    let option = payload.toLowerCase().slice(10);
    category = vnexpress[option];
    console.log("postback option: ", option);
  }
}

app.post('/webhook', function(req, res) {
  console.log("webhook received a request");
  if (req.body.object === 'page') {
    req.body.entry.forEach(entry => {

      let webhook_event = entry.messaging[0];
      let senderId = webhook_event.sender.id;
      
      if (webhook_event.message) {
        handleMessage(senderId, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(senderId, webhook_event.postback);
      }

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