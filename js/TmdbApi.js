class TmdbApi {
    #token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzA5YTkzMjE3Y2ViMjExMzY0MTllZGFlNGI2OWY2YiIsIm5iZiI6MTcyOTg1Njk4OC43NjE0NzcsInN1YiI6IjY3MWI4NTM0MjdiZDU3ZDkxZjYyOTM4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P3Nk0cCpkrpwJK3pd97G1K_pI5dAQvHwf3bHShJpdJM"
    
    get token() {
        return this.#token
    }

    async discoverMovies(options) {
        const movies = await fetch('https://api.themoviedb.org/3/discover/movie', options)
        const response = await movies.json()
        return response
    }

    async searchMovies(film, page, options) {
        const movies = await fetch(`https://api.themoviedb.org/3/search/movie?query=${film}&page=${page}`, options)
        const response = await movies.json()
        return response
    }  
}

export default TmdbApi