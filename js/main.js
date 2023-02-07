const API_KEY = "87606660ec9c3fa9d590708457b96f06"
const BASE_API = "https://api.themoviedb.org/3/movie/"
const IMG_URL = "https://image.tmdb.org/t/p/w500"
const BG_URL = "https://image.tmdb.org/t/p/w1280"

const elTopBannerWrapper = document.querySelector("[data-top-banner-wrapper]")
const elPopularWrapper = document.querySelector("[data-popular-wrapper]")
const elTopWrapper = document.querySelector("[data-top-wrapper]")
const elCardTemplate = document.querySelector("[data-card-template]")
const elLoader = document.querySelector("[data-loader]")

// Get data
async function getData(key) {
  loader(true)
  const response = await fetch(`${BASE_API}popular?api_key=${key}&language=en-US&page=1`)
  const data = await response.json()

  const responseTop = await fetch(`${BASE_API}top_rated?api_key=${key}&language=en-US&page=1`)
  const dataTop = await responseTop.json()
  loader(false)

  renderTopBanner(data.results)
  renderPopularMovies(data.results)
  renderTopMovies(dataTop.results)
}
getData(API_KEY)

// Get movie video data
async function getMovieVideo(id) {
  loader(true)
  const response = await fetch(`${BASE_API}${id}/videos?api_key=${API_KEY}`)
  const data = await response.json()
  loader(false)

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


// Click Document
document.addEventListener("click", (evt) => {
  onModalOpenClick(evt)
  onModalCloseClick(evt)
  onModalOutsideClick(evt)
})

// Modal open and fill
function onModalOpenClick(evt) {
  const elTarget = evt.target.closest("[data-modal-open]")

  if (!elTarget) return
  const elSelector = elTarget.dataset.modalOpen
  const elModal = document.querySelector(elSelector)

  // Close Modal Escape
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      elModal.classList.remove("show")
    }
  })

  elModal.classList.add("show")


  // Fill Modal
  const id = elTarget.dataset.movieId
  getMovieVideo(id).then(data => {
    const randomNum = Math.trunc(Math.random() * data.length)
    const movie = data[randomNum]

    const elModalVideo = document.querySelector("[data-modal-video]")

    elModalVideo.src = `https://www.youtube.com/embed/${movie.key}`
    elModalVideo.setAttribute("title", `${movie.name}`)
  })
  getMovieData(id).then(movie => {
    const elModalTitle = document.querySelector("[data-modal-title]")
    const elModalDesc = document.querySelector("[data-modal-desc]")

    elModalTitle.textContent = movie.title
    elModalDesc.textContent = movie.overview
  })
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