const mainContainer = document.getElementById('main-container');
const loader = document.getElementById('loader');
const images = document.getElementsByClassName('image-small');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('closeButton');
const modalContent = document.getElementById('modal-content');
const gridBtn = document.getElementById('gridView');
const listBtn = document.getElementById('listView');
const containers = document.getElementsByClassName('img-container');

listBtn.addEventListener('click', function () {
	mainContainer.style.flexFlow = 'column nowrap';
	mainContainer.style.alignItems = 'center';
	gridBtn.disabled = false;
	listBtn.disabled = true;
	for (let i = 0; i < containers.length; i++){
		containers[i].style.width = '80%';
		images[i].style.height = '400px';
	}
})

gridBtn.addEventListener('click', function () {
	mainContainer.style.flexFlow = 'row wrap';
	gridBtn.disabled = true;
	listBtn.disabled = false;
	for (let i = 0; i < containers.length; i++){
		containers[i].style.width = 'calc(33% - 20px)';
		images[i].style.height = '300px';
	}
})

loadImages();

function loadImages() {
	fetch("https://api.unsplash.com/photos/random?count=12", {
	method: 'GET',
	headers: {
		'Authorization': 'Client-ID yqxi9saF9vPwq1NeG2S2FiLRV5hsbghDOe0qbMijLpY'
	}

}).then(function (response) {
	return response.json();

}).then(function (images) {
	images.forEach(function (image) {

		mainContainer.innerHTML += `
		<div class="img-container">
			<img src="${image.urls.small}" alt="${createAlt(image)}" class="image-small" id="${image.id}">
		</div>`

	});
	addEL();
}).then(function () {

	loader.style.display = 'none';
	mainContainer.style.display = 'flex';
});
}

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

	fetch("https://api.unsplash.com/photos/" + id + "?client_id=yqxi9saF9vPwq1NeG2S2FiLRV5hsbghDOe0qbMijLpY")
		.then(function (response) {
			return response.json();
		})
		.then(function (image) {
			modalContent.innerHTML = `
			<img src="${image.urls.full}" alt="">
			<a href="${image.links.download}" class="unsplLink">Click to download</a>
			<div class="img-info">
				<div class="likes"><i class="fa-solid fa-heart"></i> ${image.likes}</div>
				<div class="downloads"><i class="fa-solid fa-download"></i> ${image.downloads}</div>
				<div class="photographer">
					<p>Photographer: ${image.user.username} </p>
					<img src="${image.user.profile_image.small}" alt="${image.user.username}">
				</div>
				<a href="${image.user.links.portfolio}">Portfolio</a>
				<a href="https://www.instagram.com/${createLink(image.user.social.instagram_username)}><i class="fa-brands fa-instagram"></i></a>
				<a href="https://www.twitter.com/${createLink(image.user.social.twitter_username)}><i class="fa-brands fa-twitter"></i></a>
			</div>`

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

function createLink(property) {
	lnk = property;
	if (lnk) {
		return lnk + '"';
	} else {
		return lnk + '"' + 'class="disabled"';
	}
}

window.addEventListener('scroll', function () {
	if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
		loadImages();
	}
});