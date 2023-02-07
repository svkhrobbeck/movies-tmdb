const movieId = new URLSearchParams(window.location.search).get("id")

console.log(movieId);

// getMovie data
async function getMovieData(id) {
  const response = await fetch(`${BASE_API}${id}?api_key=${API_KEY}`)
  const data = await response.json()

  const responseArtists = await fetch(`${BASE_API}${id}/credits?api_key=${API_KEY}`)
  const dataArtists = await responseArtists.json()

  console.log(dataArtists);
  renderTopBanner(data)
  document.title = `${data.title}`
}
getMovieData(movieId)

// render top banner 
function renderTopBanner(movie) {
  elTopBannerWrapper.style.backgroundImage = `url(${BG_URL}${movie.backdrop_path})`
  elTopBannerWrapper.querySelector("[data-top-banner-title]").textContent = movie.title
  elTopBannerWrapper.querySelector("[data-top-banner-desc]").textContent = movie.overview
}