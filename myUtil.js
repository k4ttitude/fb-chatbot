const toList = (list) => {
	if (list && list.length != 0) {
		return list.map(item => {
			let desData = getDesData(item.description[0]);
			return {
				title: item.title[0],
				subtitle: desData.description,
				image_url: desData.imgUrl,
				buttons: [{
					title: 'View',
					type: 'web_url',
					url: item.link[0],
					webview_height_ratio: 'full'
				}]
            }
		});
	} else return [];
}

const toButtons = list => {
	if (list && list.length != 0) {
		return list.map(item => {
			return {
				type: 'web_url',
				title: item.title[0],
				url: item.link[0],
				messenger_extensions: false,
				webview_height_ratio: 'full'
            }
		});
	} else {
		return [];
	}
}

const getDesData = des => {
	let imgTagReg = /(<img.*(?:png|jpg))/i;
	let imgUrlReg = /(https?:\/\/.*\.(?:png|jpg))/i;
	let descriptionReg = /(<\/br>.*)/;

	let imgTagMatch = des.match(imgTagReg);
	let imgUrlMatch = (imgTagMatch && imgTagMatch.length != 0) ?
		imgTagMatch[0].match(imgUrlReg) : [''];
	let descriptionMatch = des.match(descriptionReg);
	return {
		imgUrl: (imgUrlMatch && imgUrlMatch.length > 0) ? imgUrlMatch[0] : '',
		description: (descriptionMatch && descriptionMatch.length > 0) ? descriptionMatch[0].slice(5) : ''
	}
}

module.exports = {
	toList,
	toButtons,
	getDesData
}