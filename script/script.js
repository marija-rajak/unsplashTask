const mainContainer = document.getElementById('main-container');
const loader = document.getElementById('loader');
const images = document.getElementsByClassName('image-small');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('closeButton');
const modalContent = document.getElementById('modal-content');

fetch("https://api.unsplash.com/photos/random?count=12", {
	method: 'GET',
	headers: {
		'Authorization': 'Client-ID yqxi9saF9vPwq1NeG2S2FiLRV5hsbghDOe0qbMijLpY'
	}

}).then(function (response) {
	return response.json();

}).then(function (images) {
	images.forEach(function (image) {

		/* mainContainer.innerHTML += `
		<div class="img-container">
			<div class="frame">
				<img src="${image.urls.small}" alt="${createAlt(image)}" class="image-small" id="${image.id}>
				<a href="https://unsplash.com" class="unsplLink">Unsplash</a>
			</div>
			<div>
				<p class="likes"><span>heart</span> ${image.likes}</p>
				<p class="downloads"><span>arrow</span> ${image.downloads}</p>
			</div>
			<div class="photographer">
				<p>Photographer: ${image.user.username}</p>
				<img src="${image.user.profile_image.small}" alt="${image.user.username}">
			</div>
			<div>
				<a href="${image.user.links.portfolio}">Portfolio</a>
				<p class="social">${image.user.social.instagram_username}, ${image.user.social.twitter_username}</p>
			</div>
		</div>` */

		mainContainer.innerHTML += `
		<div class="img-container">

			<img src="${image.urls.small}" alt="${createAlt(image)}" class="image-small" id="${image.id}">
			<a href="https://unsplash.com" class="unsplLink">Unsplash</a>

		</div>`

	});
	addEL();
}).then(function () {

	loader.style.display = 'none';
	mainContainer.style.display = 'flex';
});

function createAlt(imageObj) {
	if (imageObj.alt_description) {
		return imageObj.alt_description;
	} else {
		return "Unsplash image";
	}
}

function addEL() {
	for (let i = 0; i < images.length; i++) {
		images[i].style.cursor = 'pointer';
		images[i].addEventListener('click', openModal);
	}
}

function openModal() {
	let id = this.id;

	fetch("https://api.unsplash.com/photos?id=" + id + "&client_id=yqxi9saF9vPwq1NeG2S2FiLRV5hsbghDOe0qbMijLpY")
		.then(function (response) {
			return response.json();
		})
		.then(function (image) {
			modalContent.innerHTML = `

			<img src="${image.urls.full}" alt="">
			<div class="img-info">
				<div>
					<p class="likes"><span>heart</span> ${image.likes}</p>
					<p class="downloads"><span>arrow</span> ${image.downloads}</p>
				</div>
				<div class="photographer">
					<p>Photographer: ${image.user.username}</p>
					<img src="${image.user.profile_image.small}" alt="${image.user.username}">
				</div>
				<div>
					<a href="${image.user.links.portfolio}">Portfolio</a>
					<p class="social">${image.user.social.instagram_username}, ${image.user.social.twitter_username}</p>
				</div>
			</div>
			`
		});
	modal.style.display = 'block';
}

closeBtn.onclick = function () {
	modal.style.display = 'none';
}

window.onclick = function (event) {
	if (event.target === modal) {
		modal.style.display = 'none';
	}
}
