import {key} from './keyApi.js'

export async function fetchMovieData() {
  const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: key.src
    }
  }

  const fetching = await fetch(url, options)

  return await fetching.json()
}