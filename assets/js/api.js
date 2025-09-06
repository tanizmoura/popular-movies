import { key } from '../environment/keyApi.js'

export async function fetchMovieData(link) {
  const url = link
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: key.src
    }
  }

  const fetching = await fetch(url, options)
  const { results } = await fetching.json()
  
  return await results
}

