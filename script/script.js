const mainContainer = document.getElementById('main-container');
const loader = document.getElementById('loader');
loader.style.backgroundColor = 'blue';

fetch("https://api.unsplash.com/photos?page=2", {
	method: 'GET',
	headers: {
		'Authorization': 'Client-ID yqxi9saF9vPwq1NeG2S2FiLRV5hsbghDOe0qbMijLpY'
	}

}).then(function (response) {
	console.log(response.status);
	return response.json();

}).then(function (images) {
	images.forEach(function (image, index) {
		//console.log(index);
		//console.log(image.id);
		mainContainer.innerHTML += `
		<div class="img-container">
			<div class="frame">
				<img src="${image.urls.small}" alt="${createAlt(image)}" class="image-small">
				<a href="https://unsplash.com" class="unsplLink">Unsplash</a>
			</div>
			<div>
				<p class="likes"><span>heart</span> ${image.likes}</p>
				<p class="downloads"><span>arrow</span> ${getStats(image.id)}</p>
			</div>
			<p class="photographer">${image.user.username} <div class="avatar"><img src="${image.user.profile_image.small}" alt="${image.user.username}"></div></p>
			<a href="${image.user.links.portfolio}">Portfolio</a>
			<p class="social">${image.user.social.instagram_username}, ${image.user.social.twitter_username}</p>
		</div>`


	});
	loader.style.backgroundColor = "green";
});

function createAlt(imageObj) {
	if (imageObj.alt_description) {
		return imageObj.alt_description;
	} else {
		return "Unsplash image";
	}
}

function getStats(id) {
	fetch('https://api.unsplash.com/photos/' + id + '/statistics', {
		method: 'GET',
		headers: {
			"Authorization": "Client-ID yqxi9saF9vPwq1NeG2S2FiLRV5hsbghDOe0qbMijLpY"
		}
	}).then(function (response) {
		//console.log(response.status);
		return response.json();

	}).then(function (stats) {
		// console.log(stats);
		// console.log(stats.downloads.total);
		return stats.downloads.total;
	})
}

