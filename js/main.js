const API_KEY = "87606660ec9c3fa9d590708457b96f06"
const BASE_API = "https://api.themoviedb.org/3/movie/"
const IMG_URL = "https://image.tmdb.org/t/p/w500"
const BG_URL = "https://image.tmdb.org/t/p/w1280"

const elTopBannerWrapper = document.querySelector("[data-top-banner-wrapper]")
const elPopularWrapper = document.querySelector("[data-popular-wrapper]")
const elPopularLoadBtn = document.querySelector("[data-popular-load-btn]")
const elTopWrapper = document.querySelector("[data-top-wrapper]")
const elTopLoadBtn = document.querySelector("[data-top-load-btn]")
const elCardTemplate = document.querySelector("[data-card-template]")
const elLoader = document.querySelector("[data-loader]")

// Get data
async function getData(key, pagePopular = 1, pageTop = 1) {
  loader(true)
  const response = await fetch(`${BASE_API}popular?api_key=${key}&page=${pagePopular}`)
  const data = await response.json()

  const responseTop = await fetch(`${BASE_API}top_rated?api_key=${key}&page=${pageTop}`)
  const dataTop = await responseTop.json()
  loader(false)

  renderTopBanner(data.results)
  renderPopularMovies(data.results)
  renderPopularLoad(data.total_pages, pagePopular)
  renderTopMovies(dataTop.results)
  renderTopLoad(data.total_pages, pageTop)
}
getData(API_KEY)

// Get movie video data
async function getMovieVideo(id) {
  const response = await fetch(`${BASE_API}${id}/videos?api_key=${API_KEY}`)
  const data = await response.json()

  return data.results
}

// Get Modal Movie Data
async function getMovieData(id) {
  const resMovie = await fetch(`${BASE_API}${id}?api_key=${API_KEY}`)
  const dataMovie = await resMovie.json()

  return dataMovie
}

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
    elPopularCard.querySelector("[data-modal-open]").dataset.movieId = movie.id
    elPopularCardImg.src = `${IMG_URL}${movie.poster_path}`
    elPopularCardImg.alt = movie.title
    elPopularCardRating.textContent = movie.vote_average
    elPopularCard.querySelector("[data-card-title]").textContent = movie.title

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
}

// Render top
function renderTopMovies(movies) {
  elTopWrapper.innerHTML = ""

  movies.forEach(movie => {
    const elTopCard = elCardTemplate.content.cloneNode(true)
    const elTopCardImg = elTopCard.querySelector("[data-card-img]")
    const elTopCardRating = elTopCard.querySelector("[data-card-rating]")

    document.querySelector("[data-top-title]").textContent = "TOP MOVIES"
    elTopCard.querySelector("[data-modal-open]").dataset.movieId = movie.id
    elTopCardImg.src = `${IMG_URL}${movie.poster_path}`
    elTopCardImg.alt = movie.title
    elTopCardRating.textContent = movie.vote_average
    elTopCard.querySelector("[data-card-title]").textContent = movie.title

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

// // Render top load
function renderTopLoad(totalPages, page) {
  elTopLoadBtn.dataset.movieTotalPage = totalPages
  elTopLoadBtn.dataset.moviePage = page
}

// Click Document
document.addEventListener("click", (evt) => {
  onModalOpenClick(evt)
  onModalCloseClick(evt)
  onModalOutsideClick(evt)
  onPopularLoadClick(evt)
  onTopLoadClick(evt)
})

// Modal open and fill
async function onModalOpenClick(evt) {
  const elTarget = evt.target.closest("[data-modal-open]")

  if (!elTarget) return
  const elSelector = elTarget.dataset.modalOpen
  const elModal = document.querySelector(elSelector)

  // Fill Modal
  const id = elTarget.dataset.movieId
  await getMovieVideo(id).then(data => {
    const randomNum = Math.trunc(Math.random() * data.length)
    const movie = data[randomNum]

    const elModalVideo = document.querySelector("[data-modal-video]")

    elModalVideo.src = `https://www.youtube.com/embed/${movie.key}`
    elModalVideo.setAttribute("title", `${movie.name}`)
  })
  await getMovieData(id).then(movie => {
    const elModalTitle = document.querySelector("[data-modal-title]")
    const elModalDesc = document.querySelector("[data-modal-desc]")

    elModalTitle.textContent = movie.title
    elModalDesc.textContent = movie.overview
  })

  // Close Modal Escape
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      elModal.classList.remove("show")
    }
  })

  elModal.classList.add("show")
}
// Modal close
function onModalCloseClick(evt) {
  const elTarget = evt.target.closest("[data-modal-close]")

  if (!elTarget) return
  elTarget.parentElement.parentElement.parentElement.classList.remove("show")
}

// Modal outside
function onModalOutsideClick(evt) {
  const elTarget = evt.target

  if (!elTarget.matches("[data-modal]")) return
  elTarget.classList.remove("show")
}

// elPopularLoadBtn click
function onPopularLoadClick(evt) {
  const elTarget = evt.target.closest("[data-popular-load-btn]")

  if (!elTarget) return

  const totalPages = elTarget.dataset.movieTotalPage
  let page = +elTarget.dataset.moviePage
  page++

  if (page === totalPages) {
    page = 1
  }

  getData(API_KEY, page)
}

// elPopularLoadBtn click
function onPopularLoadClick(evt) {
  const elTarget = evt.target.closest("[data-popular-load-btn]")

  if (!elTarget) return

  const totalPages = elTarget.dataset.movieTotalPage
  let page = +elTarget.dataset.moviePage
  page++

  if (page === totalPages) {
    page = 1
  }

  getData(API_KEY, page)
}

// elTopLoadBtn click
function onTopLoadClick(evt) {
  const elTarget = evt.target.closest("[data-top-load-btn]")

  if (!elTarget) return

  const totalPages = elTarget.dataset.movieTotalPage
  let page = +elTarget.dataset.moviePage
  page++

  if (page === totalPages) {
    page = 1
  }

  getData(API_KEY, elPopularLoadBtn.dataset.moviePage, page)
}

// Scroll logic
document.addEventListener("scroll", (e) => {
  if (window.pageYOffset > 500) {
    document.querySelector("[data-to-down]").style.opacity = "0"
  } else {
    document.querySelector("[data-to-down]").style.opacity = "1"
  }
})

// Loader
function loader(state) {
  if (state) {
    elLoader.classList.remove("hidden")
  } else {
    elLoader.classList.add("hidden")
  }
}