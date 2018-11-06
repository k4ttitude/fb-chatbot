const simsimi = require('simsimi')({
  key: 'b90c5eb9-ceaa-4988-8afa-b4a5b3633077',
  api: 'http://sandbox.api.simsimi.com/request.p'
});

const reply = message => {
	simsimi(message).then(response => {
  		return response;
	});
}

module.exports = { 
	reply,
};