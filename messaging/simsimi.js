'use strict';
const http = require('http');
const querystring = require('querystring');

const request = (api, query) => {
	const qs = querystring.stringify(query);
	return new Promise((resolve, reject) => {
		http.get(`${api}?${qs}`, res => {
			var buffer = ''; res
			.on('error', reject)
			.on('data', chunk => buffer += chunk)
			.on('end', () => {
				try {
					resolve(JSON.parse(buffer));
				} catch(err) {
					reject(err);
				}
			})
		});
	});
};

const format = response => {
	switch(response.result){
		case 100:
		return response.response;
		default:
		const err = new Error(response.msg);
		err.code = response.result;
		throw err;
	}
};
/**
 * simsimi
 * http://developer.simsimi.com/api
 */
 module.exports = options => {
 	const { 
 		key = 'b90c5eb9-ceaa-4988-8afa-b4a5b3633077',
 		lc = 'en', ft = '0.0',
 		api = 'http://sandbox.api.simsimi.com/request.p'
 	} = options;
 	return query => {
 		if (typeof query === 'string') 
 			query = { text: query };
 		return request(api, Object.assign({ 
 			key, lc, ft
 		}, query)).then(format);
 	};
 };