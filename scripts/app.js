let page = 1;
const btnAnterior = document.getElementById('btnPrevious');
const btnSiguiente = document.getElementById('btnNext');

btnNext.addEventListener('click', () => {
	if(page < 1000){
		page += 1;
		loadFilms();
	}
});

btnPrevious.addEventListener('click', () => {
	if(page > 1){
		page -= 1;
		loadFilms();
	}
});

const loadFilms = async() => {
	try {
		const answer = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${page}`);

		// Si la respuesta es correcta
		if(answer.status === 200){
			const data = await answer.json();
			
			let films = '';
			data.results.forEach(film => {
				films += `
					<div class="film">
						<img class="film-img" src="https://image.tmdb.org/t/p/w500/${film.poster_path}">
						<h3 class="title">${film.title}</h3>
					</div>
				`;
			});

			document.getElementById('container').innerHTML = films;

		}

	} catch(error){
		console.log(error);
	}

}

loadFilms();