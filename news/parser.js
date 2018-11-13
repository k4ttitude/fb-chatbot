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

const search = (query, category) => {
	request(category, (e, response, body) => {
		if (e) {
			console.log('Error: ', e);
		}
		if (response && response.statusCode == 200) {
			parseString(body, (err, result) => {
				console.log(result.rss);
				let _result = [];
				query = query.toLowerCase();
				for (let article of result.rss.channel) {
					if (article.title.toLowerCase().includes(query) || 
						article.description.toLowerCase().includes(query)) {
						_result.push(article);
					}
				}
				return _result;
			});
		}
	});
	return undefined;
}

load(vnexpress.thoi_su);

// fs.readFile('./tin-moi-nhat.rss', (err, data) => {
// 	parseString(data, (err, result) => {
// 		console.log(result.rss);
// 	});
// });