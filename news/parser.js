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
				console.log(result.rss.channel[0].item[1].title[0].includes('lùi xe'));
			});
		}
	});
}

const search = (query, category) => {
	request(category, (e, response, body) => {
		if (e) {
			console.log('Error: ', e);
		} else if (response && response.statusCode == 200) {
			parseString(body, (err, result) => {
				// console.log(result.rss);
				let _result = [];
				query = query.toLowerCase();
				for (let article of result.rss.channel[0].item) {
					if (article.title[0].toLowerCase().includes(query) || 
						article.description[0].toLowerCase().includes(query)) {
						_result.push(article);
					}
				}
				return _result;
			});
		}
		return undefined;
	});
}

module.exports = { search }

// fs.readFile('./tin-moi-nhat.rss', (err, data) => {
// 	parseString(data, (err, result) => {
// 		console.log(result.rss);
// 	});
// });