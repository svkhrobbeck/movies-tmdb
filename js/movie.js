const movieId = new URLSearchParams(window.location.search).get("id")

const elCastsWrapper = document.querySelector("[data-casts-wrapper]")
const elTrailersWrapper = document.querySelector("[data-trailers-wrapper]")

const elCastsTemplate = document.querySelector("[data-casts-template]")
const elTrailersTemplate = document.querySelector("[data-trailers-template]")

// getMovie data
async function getMovieData(id) {
  loader(true)
  const responseMovie = await fetch(`${BASE_API}${id}${API_KEY}`)
  const dataMovie = await responseMovie.json()

  const responseCasts = await fetch(`${BASE_API}${id}/credits${API_KEY}`)
  const dataCasts = await responseCasts.json()

  const responseTrailers = await fetch(`${BASE_API}${id}/videos${API_KEY}`)
  const dataTrailers = await responseTrailers.json()
  loader(false)

  renderTopBanner(dataMovie)
  renderCasts(dataCasts.cast)
  renderTrailers(dataTrailers.results)
  document.title = `${dataMovie.title}`

}
getMovieData(movieId)

// render top banner 
function renderTopBanner(movie) {
  let html = ""
  html += `
  <img class="top-banner__img" src="${(movie.backdrop_path === null) ? "images/image-not-found.png" : BG_URL + movie.backdrop_path}" alt="${movie.title}" />
  <div class="top-banner__content">
    <div class="top-banner__content-inner">
      <h2 class="top-banner__title" title="${movie.title}" data-top-banner-title>${movie.title}</h2>
      <p class="top-banner__desc top-banner__desc--movie" data-top-banner-desc>${movie.overview}</p>
    </div>
  </div>`
  elTopBannerBgWrapper.innerHTML = html
}

// Render casts
function renderCasts(casts) {
  elCastsWrapper.innerHTML = ""

  document.querySelector("[data-casts-title]").textContent = "CASTS"
  casts.forEach(cast => {
    const elCastsCard = elCastsTemplate.content.cloneNode(true)
    const elCastsCardImg = elCastsCard.querySelector("[data-casts-img]")

    elCastsCardImg.src = `${(cast.profile_path === null) ? "/images/no-image.jpg" : IMG_URL + cast.profile_path}`
    elCastsCardImg.alt = cast.name
    elCastsCard.querySelector("[data-casts-name]").textContent = cast.name
    elCastsCard.querySelector("[data-casts-character]").textContent = cast.character

    elCastsWrapper.appendChild(elCastsCard)
  });
}

// Render trailers
function renderTrailers(trailers) {
  elTrailersWrapper.innerHTML = ""
  document.querySelector("[data-trailers-title]").textContent = "TRAILERS"

  if (trailers.length === 0) {
    elTrailersWrapper.parentElement.innerHTML += `<p class="alert-text">TRAILERS NOT FOUND</p>`
  } else {
    trailers.forEach(trailer => {
      const elTrailersCard = elTrailersTemplate.content.cloneNode(true)
      const elTrailersCardVideo = elTrailersCard.querySelector("[data-trailers-trailer]")

      elTrailersCardVideo.src = `https://www.youtube.com/embed/${trailer.key}`
      elTrailersCardVideo.title = trailer.name

      elTrailersWrapper.appendChild(elTrailersCard)
    });
  }
}

// Swiper slider
const swiper = new Swiper('.swiper', {
  direction: "horizontal",
  speed: 400,
  slidesPerView: 1,
  spaceBetween: 5,
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 5000,
  },
  breakpoints: {
    500: {
      slidesPerView: 2,
    },
    600: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
    990: {
      slidesPerView: 5,
    },
    1200: {
      slidesPerView: 6,
    }
  }
})