const toList = (list) => {
	if (list && list.length != 0) {
		return list.map(item => {
			return {
				title: item.title[0],
				url: item.link[0],
				subtitle: item.description[0],
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

module.exports = {
	toList,
	toButtons
}