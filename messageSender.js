var request = require("request");

const PAGE_ACCESS_TOKEN = 'EAAE73JnZByQcBAPEBSUGiRc8AldNfxVwxWE1Kajihe5dwlqlpUQKYZCGVfWl4RhQE19dZB26p163qPF0MYAir9x6mQ0ZAWkjUE9q6Ehq2Nky1QSS8fEuKsNd5oO4mqArPjp6F1aeZA9YaPQyGZAM3XR5YEvKJV9YSZBWW1ytBFYgu3QlcxWu1Uu';
 
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

module.exports = {
	sendMessage,
};