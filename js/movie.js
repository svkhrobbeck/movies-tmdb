const movieId = new URLSearchParams(window.location.search).get("id")

const elCastsWrapper = document.querySelector("[data-casts-wrapper]")
const elCastsTemplate = document.querySelector("[data-casts-template]")

// getMovie data
async function getMovieData(id) {
  const response = await fetch(`${BASE_API}${id}${API_KEY}`)
  const data = await response.json()

  const responseCasts = await fetch(`${BASE_API}${id}/credits${API_KEY}`)
  const dataCasts = await responseCasts.json()

  renderTopBanner(data)
  renderCasts(dataCasts.cast)
  document.title = `${data.title}`

}
getMovieData(movieId)

// render top banner 
function renderTopBanner(movie) {
  let html = ""
  html += `
  <img class="top-banner__img" src="${BG_URL}${movie.backdrop_path}" alt="${movie.title}" />
  <div class="top-banner__content">
    <div class="top-banner__content-inner">
      <h2 class="top-banner__title" title="${movie.title}" data-top-banner-title>${movie.title}</h2>
      <p class="top-banner__desc" data-top-banner-desc>${movie.overview}</p>
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

// Swiper slider
const swiper = new Swiper('.swiper', {
  direction: "horizontal",
  speed: 400,
  slidesPerView: 2,
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