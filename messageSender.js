var request = require("request");

const PAGE_ACCESS_TOKEN = '';
 
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

const sendGeneric = (senderId, element) => {
request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: PAGE_ACCESS_TOKEN, },
    method: 'POST',
    json: {
      recipient: { id: senderId },
      message: {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: [ element ]
          }
        }
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

const sendList = (senderId, elements, buttons) => {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: PAGE_ACCESS_TOKEN, },
    method: 'POST',
    json: {
      recipient: { id: senderId },
      message: {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'list',
            top_element_style: 'compact',
            elements: elements,
            buttons: (buttons) ? buttons : []
          }
        }
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

const sendButtons = (senderId, message, buttons) => {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: PAGE_ACCESS_TOKEN, },
    method: 'POST',
    json: {
      recipient: { id: senderId },
      message: {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'button',
            text: message,
            buttons: buttons
          }
        }
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

const sendQuickReplies = (senderId, message, options) => {
  return new Promise((resolve, reject) => {
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
        resolve('sent');
      } else {
        console.error(
          `Failed calling Messenger API endpoint `,
          response.statusCode,
          response.statusMessage,
          body.error
        );
        reject('failed')
      }
    });
  });
}

module.exports = {
	sendMessage,
  sendGeneric,
  sendList,
  sendButtons,
  sendQuickReplies
};