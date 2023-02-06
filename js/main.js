const API_KEY = "87606660ec9c3fa9d590708457b96f06"
const BASE_API = "https://api.themoviedb.org/3/movie/"
const IMG_URL = "https://image.tmdb.org/t/p/w500"
const BG_URL = "https://image.tmdb.org/t/p/w1280"
""

const elTopBannerWrapper = document.querySelector("[data-top-banner-wrapper]")
const elPopularWrapper = document.querySelector("[data-popular-wrapper]")
const elPopularTemplate = document.querySelector("[data-popular-template]")

// Get data
async function getData(key) {
  const response = await fetch(`${BASE_API}popular?api_key=${key}`)
  const data = await response.json()


  renderTopBanner(data.results)
  renderPopularMovies(data.results)
}
getData(API_KEY)


// Get movie video data
async function getMovieVideo(id) {
  const response = await fetch(`${BASE_API}${id}/videos?api_key=${API_KEY}`)
  const data = await response.json()
  return data.results
}

// render top banner 
function renderTopBanner(movies) {
  const randomNum = Math.trunc(Math.random() * movies.length)
  const movie = movies[randomNum === 12 ? 11 : randomNum]
  elTopBannerWrapper.style.backgroundImage = `url(${BG_URL}${movie.backdrop_path})`
  elTopBannerWrapper.querySelector("[data-top-banner-title]").textContent = movie.title
  elTopBannerWrapper.querySelector("[data-top-banner-desc]").textContent = movie.overview
  console.log(movie);
}

// Render popular
function renderPopularMovies(movies) {
  elPopularWrapper.innerHTML = ""

  movies.forEach(movie => {
    const elPopularCard = elPopularTemplate.content.cloneNode(true)
    const elPopularCardImg = elPopularCard.querySelector("[data-popular-img]")
    const elPopularCardRating = elPopularCard.querySelector("[data-popular-rating]")

    elPopularCard.querySelector("[data-modal-open]").dataset.movieId = movie.id
    elPopularCardImg.src = `${IMG_URL}${movie.poster_path}`
    elPopularCardImg.alt = movie.title
    elPopularCardRating.textContent = movie.vote_average
    elPopularCard.querySelector("[data-popular-title]").textContent = movie.title

    // Rating border color
    if (movie.vote_average < 6) {
      elPopularCardRating.style.borderColor = "#d91200"
    } else if (movie.vote_average < 7) {
      elPopularCardRating.style.borderColor = "#ff8000"
    } else if (movie.vote_average < 8) {
      elPopularCardRating.style.borderColor = "	#ffea00"
    } else if (movie.vote_average <= 9) {
      elPopularCardRating.style.borderColor = "#32cd32"
    }

    elPopularWrapper.appendChild(elPopularCard)
  });
}


// Click Document
document.addEventListener("click", (evt) => {
  onModalOpenClick(evt)
  onModalCloseClick(evt)
  onModalOutsideClick(evt)
})

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
    const movieTrailer = data[randomNum]
    const elModalVideo = document.querySelector("[data-modal-video]")
    elModalVideo.src = `https://www.youtube.com/embed/${movieTrailer.key}`
    elModalVideo.setAttribute("title", `${movieTrailer.name}`)
  })
}

function onModalCloseClick(evt) {
  const elTarget = evt.target.closest("[data-modal-close]")

  if (!elTarget) return
  elTarget.parentElement.parentElement.parentElement.classList.remove("show")
}

function onModalOutsideClick(evt) {
  const elTarget = evt.target

  if (!elTarget.matches("[data-modal]")) return
  elTarget.classList.remove("show")
}

document.addEventListener("scroll", (e) => {
  if (window.pageYOffset > 500) {
    document.querySelector("[data-to-down]").style.opacity = "0"
  } else {
    document.querySelector("[data-to-down]").style.opacity = "1"
  }
})