
export async function fetchMovieData(link) {
  const url = link
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDM1MTlmY2MzZjQzM2RkNDdjYTg0YzkxMzVkZWZjMyIsIm5iZiI6MTc1NjEzOTQyOC4wMTEwMDAyLCJzdWIiOiI2OGFjOGZhNGEzYzk0N2FjNWI4ZDI3M2YiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.lVHTi57x1pfuQkfPQosabIZii38GU2OXhRTrPzgWDNw'
    }
  }

  const fetching = await fetch(url, options)
  const { results } = await fetching.json()
  
  return results
}

