import TmdbApi from "./TmdbApi.js"

const filmForm = document.querySelector("#film-form")
const filmSearched = document.querySelector("#film-searched")
const listFilms = document.querySelector("#list-films")
const errorFilm = document.querySelector("#error")
const pageContainer = document.querySelector("#page")

const tmdbApi = new TmdbApi()

const options = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tmdbApi.token}`
    }
};

async function displayDiscoverMovies() {
    try {
        const discoverMovies = await tmdbApi.discoverMovies(options);
        
        discoverMovies.results.forEach(movie => {
            const imageUrl = `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            listFilms.innerHTML += `<li><img src="${imageUrl}" alt="${movie.title}"></li>`
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des films :", error);
        errorFilm.textContent = "Erreur lors de la récupération des films :" + error
    }
}

displayDiscoverMovies();

async function displayMovies(film, page) {
    try {
        const movies = await tmdbApi.searchMovies(film, page, options)
        listFilms.innerHTML = ""
        if(movies.total_results == 0)
        {
            throw new Error("Aucun film trouvé")
        }
        pageContainer.innerHTML = ""
        for (let i = 1; i <= movies.total_pages; i++) {
            pageContainer.innerHTML += `<li><button id="${i}">${i}</button></li>`
        }
        addPaginationListeners()

        movies.results.forEach(movie => {
            const imageUrl = `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            listFilms.innerHTML += `<li><img src="${imageUrl}" alt="${movie.title}"></li>`
        })
    } catch (error) {
    console.error(error);
    errorFilm.textContent = error
    }
}

filmForm.addEventListener('submit', (e) => {
    e.preventDefault()
    errorFilm.textContent = ""
    pageContainer.innerHTML = ""
    displayMovies(filmSearched.value, 1)
})


function addPaginationListeners () {
    document.querySelectorAll("#page button").forEach(button => {
        button.addEventListener("click", () => {
            const page = button.id;
            displayMovies(filmSearched.value, page)
        });
    });
}