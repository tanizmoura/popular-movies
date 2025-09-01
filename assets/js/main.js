import {fetchMovieData} from './api.js'
(async () => {
    const movieData = await fetchMovieData()
    console.log(movieData)
})()