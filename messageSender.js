var request = require("request");

const PAGE_ACCESS_TOKEN = 'EAAE73JnZByQcBAJJRd3lpoC2I5HZCZAx9zZAsZAWG2HY8DgxN6vZAb9ekJ0PSBA0csCfZCPxdnPln1nH4JrCmumv7EPNUU5uh0AwoApsApVcGm9msoV0HzDzwNLx06qbilFzM1STBYU2Y5djnGCANYZCdb5ZBj3qqjbLFIlOrnRA5hvb37AUXZCu69';
 
const sendMessage = (senderId, message) => {
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
        `Successfully sent message to endpoint: `,
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

const sendOptions = (senderId, message, options) => {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: PAGE_ACCESS_TOKEN, },
    method: 'POST',
    json: {
      recipient: { id: senderId },
      message: {
        text: message,
        quick_replies: options
      },
    }
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // Message has been successfully received by Facebook.
      console.log(
        `Successfully sent message to endpoint: `,
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

module.exports = {
	sendMessage,
  sendOptions,
};