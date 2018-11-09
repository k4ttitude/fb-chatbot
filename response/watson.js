var watson = require('watson-developer-cloud');

var assistant = new watson.AssistantV1({
	iam_apikey: 'CJ8o2K-ydPi6MNktQ4UoKa1_v32wyAWVpCeC3MyQeKgw',
	version: '2018-09-20'
});

assistant.message({
	workspace_id: '',
	input: { 'text': 'Hello' }
}, (err, response) => {
	if (err)
		console.log('error: ', err);
	else
		console.log(JSON.stringify(response, null, 2));
});