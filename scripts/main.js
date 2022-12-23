const searchForm = document.querySelector('.city-form');
const cardItem = document.querySelector('.card');
const cardDescription = document.querySelector('.card-description');
const cardImage = document.querySelector('.card-image');
const icon = document.querySelector('.icon img');

// here we update template on the webpage by getting data from updateCity async function, object from forecast
const updateUI = async (data) => {
	const { citySearch, cityConditions } = data;

	if (cardItem.classList.contains('d-none')) {
		cardItem.classList.remove('d-none');
	}

	cardDescription.innerHTML = `
		<div class="card-description text-center">
			<div>${citySearch.LocalizedName}</div>
			<div>${cityConditions.WeatherText}</div>
			<div>Temp ${cityConditions.Temperature.Metric.Value} &deg;C</div>
		</div>
	`

	let dayImage = cityConditions.IsDayTime ? '/images/day.png' : '/images/night.png';
	cardImage.setAttribute('src', dayImage);

	icon.setAttribute('src', `icons/${cityConditions.WeatherIcon}.svg`);
	
}


// here we update city to 1 object with 2 objects inside, some kind of optimisation so we got objects from forecast.js
const updateCity = async (city) => {
	const citySearch = await getCity(city);
	const cityConditions = await getDetails(citySearch.Key);

	return { citySearch, cityConditions }
}

searchForm.addEventListener('submit', e => {
	e.preventDefault();
	
	const city = searchForm.city.value.trim();

	updateCity(city)
		.then(data => updateUI(data))
		.catch(err => updateUI(err))

	localStorage.setItem('city', city);

	searchForm.reset();
})

if (localStorage.getItem('city')) {
	const city = localStorage.getItem('city')
	updateCity(city)
		.then(data => updateUI(data))
		.catch(err => updateUI(err))
}