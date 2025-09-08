import {fetchMovieData} from './api.js'
const main = document.getElementById('main')
const checkBoxFav = document.getElementById('checkbox-fav')
const searchButton = document.getElementById('search-button')
const movieSearch = document.getElementById('movie-search')

let favMovies = []

if (localStorage.getItem('fav-movies')) {
    favMovies = JSON.parse(localStorage.getItem('fav-movies'))
}

function clear() {
    main.innerHTML = ''
}

async function searchList(txt) {
    const movieSearch = await fetchMovieData(`https://api.themoviedb.org/3/search/movie?query=${txt}&include_adult=false&language=pt-BR&page=1`)
    console.log(movieSearch)
    return movieSearch
}

async function searchByName() {
    searchButton.addEventListener('click', async() => {
        if (movieSearch.value != '') {
            clear()
            MovieRender(await searchList(movieSearch.value))
            movieSearch.value = ''

        } else {
            alert('Campo vazio!')
        }
    })
}

function showFavorited(movieList) {
    checkBoxFav.addEventListener('change', () => {
        if (checkBoxFav.checked) {
            clear()
            MovieRender(favMovies)
            console.log('checked')
        } else {
            clear()
            MovieRender(movieList)
            console.log('unchecked')
        }

    })
}

function isFavorited(movieId) {
    let existe = 0
    favMovies.forEach((movie) => {
        if (movieId === movie.id) {
            existe++
        }
    });

    if (existe > 0) {
        return true
    } else {
        return false
    }
}

function deleteFavorite(movieId) {
    favMovies.forEach((movie) => {
        if (movieId === movie.id) {
            favMovies.splice(favMovies.indexOf(movie), 1)
        }
    })
}

function MovieRender(movieList) {
    const ul = document.createElement('ul')
    movieList.forEach((movie) => {
        const li = document.createElement('li')

        const divMovieCard = document.createElement('div')
        divMovieCard.classList.add('moviecard')

        const divContainer = document.createElement('div')
        divContainer.classList.add('container')

        const figureMovie = document.createElement('figure')
        figureMovie.classList.add('movie-img')

        const img = document.createElement('img')
        img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        img.alt = movie.title

        figureMovie.appendChild(img)

        const divTitle = document.createElement('div')
        divTitle.classList.add('movie-title')

        const h3 = document.createElement('h3')
        h3.innerText = movie.title

        const divIconArea = document.createElement('div')
        divIconArea.classList.add('icon-area')

        const divStarsIcon = document.createElement('div')
        divStarsIcon.classList.add('stars')

        const figureStars = document.createElement('figure')
        const imgStars = document.createElement('img')
        imgStars.src = 'assets/img/star-icon.svg'
        imgStars.alt = 'stars'
        const spanStars = document.createElement('span')
        spanStars.innerText = movie.vote_average

        figureStars.appendChild(imgStars)
        divStarsIcon.appendChild(figureStars)
        divStarsIcon.appendChild(spanStars)

        const divFavIcon = document.createElement('div')
        divFavIcon.classList.add('favoritar')

        const figureFav = document.createElement('figure')
        figureFav.id = `fav${movie.id}`
        const imgFav = document.createElement('img')
        imgFav.src = 'assets/img/heart-icon.svg'

        favMovies.forEach((movieFav) => {
            if (movieFav.id == movie.id) {
                imgFav.src = 'assets/img/fullheart-icon.svg'
            }
        });



        imgFav.alt = 'favoritar'
        const spanFav = document.createElement('span')
        spanFav.innerText = 'Favoritar'

        figureFav.addEventListener('click', () => {

            if (!isFavorited(movie.id)) {
                imgFav.src = 'assets/img/fullheart-icon.svg'
                favMovies.push(movie)
                localStorage.setItem('fav-movies', JSON.stringify(favMovies))
            } else {
                imgFav.src = 'assets/img/heart-icon.svg'
                deleteFavorite(movie.id)
                localStorage.setItem('fav-movies', JSON.stringify(favMovies))
            }

            console.log(favMovies)

        })

        figureFav.appendChild(imgFav)
        divFavIcon.appendChild(figureFav)
        divFavIcon.appendChild(spanFav)

        const divDescription = document.createElement('div')
        divDescription.classList.add('movie-description')

        const p = document.createElement('p')
        if(movie.overview == "") {
            p.innerText = 'Descrição não está disponível'
        } else {
            p.innerText = movie.overview
        }
        

        divDescription.appendChild(p)

        divContainer.appendChild(figureMovie)
        divTitle.appendChild(h3)
        divIconArea.appendChild(divStarsIcon)
        divIconArea.appendChild(divFavIcon)
        divTitle.appendChild(divIconArea)
        divContainer.appendChild(divTitle)
        divContainer.appendChild(divDescription)
        divMovieCard.appendChild(divContainer)

        li.appendChild(divMovieCard)
        ul.appendChild(li)
    });

    main.appendChild(ul)
}

(async () => {
    const movieData = await fetchMovieData('https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1')
    await searchByName()
    MovieRender(movieData)
    showFavorited(movieData)
})()