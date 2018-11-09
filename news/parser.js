const vnexpress = require('./vnexpress');

const request = require('request');

var fs = require('fs');

var parser = require('xml2js');
var parseString = parser.parseString;

const load = (cat) => {
	request(cat, (e, response, body) => {
		if (e) {
			console.log('Error: ', e);
		}
		if (response && response.statusCode == 200) {
			parseString(body, (err, result) => {
				console.log(result.rss);
			});
		}
	});
}

load(vnexpress.thoi_su);

// fs.readFile('./tin-moi-nhat.rss', (err, data) => {
// 	parseString(data, (err, result) => {
// 		console.log(result.rss);
// 	});
// });