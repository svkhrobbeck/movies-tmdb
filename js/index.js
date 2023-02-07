
// Get data
async function getData(pagesOfPopular = 1, pagesOfTop = 1) {
  loader(true)
  let response = await fetch(`${BASE_API}popular?api_key=${API_KEY}&page=${pagesOfPopular}`)
  let data = await response.json()

  let responseTop = await fetch(`${BASE_API}top_rated?api_key=${API_KEY}&page=${pagesOfTop}`)
  let dataTop = await responseTop.json()
  loader(false)

  renderTopBanner(data.results)
  renderPopularMovies(data.results)
  renderPopularLoad(data.total_pages, pagesOfPopular)
  renderTopMovies(dataTop.results)
  renderTopLoad(data.total_pages, pagesOfTop)
}
getData()


// render top banner 
function renderTopBanner(movies) {
  const randomNum = Math.trunc(Math.random() * movies.length)
  const movie = movies[randomNum === 12 ? 11 : randomNum]
  elTopBannerWrapper.style.backgroundImage = `url(${BG_URL}${movie.backdrop_path})`
  elTopBannerWrapper.querySelector("[data-top-banner-title]").textContent = movie.title
  elTopBannerWrapper.querySelector("[data-top-banner-desc]").textContent = movie.overview
}

// Render popular
function renderPopularMovies(movies) {
  elPopularWrapper.innerHTML = ""

  movies.forEach(movie => {
    const elPopularCard = elCardTemplate.content.cloneNode(true)
    const elPopularCardImg = elPopularCard.querySelector("[data-card-img]")
    const elPopularCardRating = elPopularCard.querySelector("[data-card-rating]")

    document.querySelector("[data-popular-title]").textContent = "POPULAR MOVIES"
    elPopularCardImg.src = `${IMG_URL}${movie.poster_path}`
    elPopularCardImg.alt = movie.title
    elPopularCardRating.textContent = movie.vote_average
    elPopularCard.querySelector("[data-card-title]").textContent = movie.title
    elPopularCard.querySelector("[data-card-link]").href = `movie.html?id=${movie.id}`

    // Rating border color
    if (movie.vote_average < 6) {
      elPopularCardRating.style.borderColor = "#d91200"
    } else if (movie.vote_average < 7) {
      elPopularCardRating.style.borderColor = "#ff8000"
    } else if (movie.vote_average < 8) {
      elPopularCardRating.style.borderColor = "	#ffea00"
    } else if (movie.vote_average <= 10) {
      elPopularCardRating.style.borderColor = "#32cd32"
    }

    elPopularWrapper.appendChild(elPopularCard)
  });
}

// // Render popular load
function renderPopularLoad(totalPages, page) {
  elPopularLoadBtn.dataset.movieTotalPage = totalPages
  elPopularLoadBtn.dataset.moviePage = page
  console.log(page += 1);
}

// Render top
function renderTopMovies(movies) {
  elTopWrapper.innerHTML = ""

  movies.forEach(movie => {
    const elTopCard = elCardTemplate.content.cloneNode(true)
    const elTopCardImg = elTopCard.querySelector("[data-card-img]")
    const elTopCardRating = elTopCard.querySelector("[data-card-rating]")

    document.querySelector("[data-top-title]").textContent = "TOP MOVIES"
    elTopCardImg.src = `${IMG_URL}${movie.poster_path}`
    elTopCardImg.alt = movie.title
    elTopCardRating.textContent = movie.vote_average
    elTopCard.querySelector("[data-card-title]").textContent = movie.title
    elTopCard.querySelector("[data-card-link]").href = `movie.html?id=${movie.id}`

    // Rating border color
    if (movie.vote_average < 6) {
      elTopCardRating.style.borderColor = "#d91200"
    } else if (movie.vote_average < 7) {
      elTopCardRating.style.borderColor = "#ff8000"
    } else if (movie.vote_average < 8) {
      elTopCardRating.style.borderColor = "	#ffea00"
    } else if (movie.vote_average <= 10) {
      elTopCardRating.style.borderColor = "#32cd32"
    }

    elTopWrapper.appendChild(elTopCard)
  });
}

// Render top load
function renderTopLoad(totalPages, page) {
  elTopLoadBtn.dataset.movieTotalPage = totalPages
  elTopLoadBtn.dataset.moviePage = page
}

// Click Document
document.addEventListener("click", (evt) => {
  onPopularLoadClick(evt)
  onTopLoadClick(evt)
})

// // PopularLoadBtn click
function onPopularLoadClick(evt) {
  const elTarget = evt.target.closest("[data-popular-load-btn]")

  if (!elTarget) return

  const totalPages = +elTarget.dataset.movieTotalPage
  let page = +elTarget.dataset.moviePage
  page++

  getData(page, +elTopLoadBtn.dataset.moviePage)
}


// TopLoadBtn click
function onTopLoadClick(evt) {
  const elTarget = evt.target.closest("[data-top-load-btn]")

  if (!elTarget) return

  const totalPages = +elTarget.dataset.movieTotalPage
  let page = +elTarget.dataset.moviePage
  page++

  if (page === totalPages) {
    page = 1
  }

  getData(+elPopularLoadBtn.dataset.moviePage, page)
}