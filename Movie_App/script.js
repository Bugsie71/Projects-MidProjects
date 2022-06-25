const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const searchAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

getMovies(APIURL);

const movieContainer = document.querySelector(".moviesContainer");
const searchForm = document.querySelector(".searchForm");

async function getMovies(url) {
    const resp = await fetch(url);
    const data = await resp.json();

    data.results.sort((a, b) => {
        return b.vote_count - a.vote_count;
    });

    createPost(data.results);
}

function createPost(moviesData) {
    const allMovies = document.querySelectorAll(".movie");

    if (allMovies) {
        allMovies.forEach((movie) => movie.remove());
    }

    moviesData.forEach((data) => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        if (data.poster_path === null) {
            return;
        }

        movieEl.innerHTML = `
		<div class="top">
				<img class="poster" src="${IMGPATH + data.poster_path}" alt="${data.title}">
				<p class="overview">${data.overview}</p>
			</div>
			<div class="bottom">
				<h3 class="title">${data.title}</h3>
				<p class="voteAverage ${getRatingColor(data.vote_average)}">${
            data.vote_average
        }</p>
			</div>
		`;

        movieContainer.append(movieEl);
    });
}

function getRatingColor(rating) {
	if (rating >= 8) {
		return 'green'
	} else if (rating >= 5) {
		return 'yellow'
	} else {
		return 'red'
	}
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.querySelector(".search");

	if (input.value) {
		getMovies(searchAPI + input.value);
		input.value = "";
	}
});