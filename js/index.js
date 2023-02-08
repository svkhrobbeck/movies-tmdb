
// Get data
async function getData(pagesOfUpcoming = 1, pagesOfPopular = 1, pagesOfTop = 1) {
  loader(true)
  buttonsLoad(true)
  // Upcoming data
  let responseUpcoming = await fetch(`${BASE_API}upcoming${API_KEY}&page=${pagesOfUpcoming}`)
  let dataUpcoming = await responseUpcoming.json()
  // Popular data
  let responsePopular = await fetch(`${BASE_API}popular${API_KEY}&page=${pagesOfPopular}`)
  let dataPopular = await responsePopular.json()
  // Top data
  let responseTop = await fetch(`${BASE_API}top_rated${API_KEY}&page=${pagesOfTop}`)
  let dataTop = await responseTop.json()
  loader(false)
  buttonsLoad(false)

  renderTopBanner(dataUpcoming.results)
  renderUpcomingMovies(dataUpcoming.results)
  renderPopularMovies(dataPopular.results)
  renderTopMovies(dataTop.results)

  renderUpcomingLoad(dataUpcoming.total_pages, pagesOfUpcoming)
  renderPopularLoad(dataPopular.total_pages, pagesOfPopular)
  renderTopLoad(dataPopular.total_pages, pagesOfTop)
}
getData()

// render top banner 
function renderTopBanner(movies) {
  let html = ""

  const newMovies = movies.filter(movie => movie.backdrop_path !== null)
  movies.forEach(movie => {
    html += `<div class="swiper-slide" data-swiper-autoplay="4500">
    <img class="top-banner__img" src="${(movie.backdrop_path === null) ? "images/image-not-found.png" : IMG_URL + movie.backdrop_path}" alt="${movie.title}" />
    <div class="top-banner__content">
      <div class="top-banner__content-inner">
        <h2 class="top-banner__title" title="${movie.title}" data-top-banner-title>${movie.title}</h2>
        <p class="top-banner__desc" data-top-banner-desc>${movie.overview}</p>
        <a class="top-banner__link" href="movie.html?id=${movie.id}" data-top-banner-link>Read more...</a>
      </div>
    </div>
    </div>
          `
  })

  elTopBannerBgWrapper.innerHTML = html
}

// Render Upcoming
function renderUpcomingMovies(movies) {
  elUpcomingWrapper.innerHTML = ""

  movies.forEach(movie => {
    const elUpcomingCard = elCardTemplate.content.cloneNode(true)
    const elUpcomingCardImg = elUpcomingCard.querySelector("[data-card-img]")
    const elUpcomingCardRating = elUpcomingCard.querySelector("[data-card-rating]")

    document.querySelector("[data-upcoming-title]").textContent = "UPCOMING MOVIES"
    elUpcomingCardImg.src = `${(movie.poster_path === null) ? "https://via.placeholder.com/213x350" : IMG_URL + movie.poster_path}`
    elUpcomingCardImg.alt = movie.title
    elUpcomingCardRating.textContent = movie.vote_average
    elUpcomingCard.querySelector("[data-card-title]").textContent = movie.title
    elUpcomingCard.querySelector("[data-card-link]").href = `movie.html?id=${movie.id}`

    // Rating border color
    if (movie.vote_average < 6) {
      elUpcomingCardRating.style.borderColor = "#d91200"
    } else if (movie.vote_average < 7) {
      elUpcomingCardRating.style.borderColor = "#ff8000"
    } else if (movie.vote_average < 8) {
      elUpcomingCardRating.style.borderColor = "	#ffea00"
    } else if (movie.vote_average <= 10) {
      elUpcomingCardRating.style.borderColor = "#32cd32"
    }

    elUpcomingWrapper.appendChild(elUpcomingCard)
  });
}

// Render popular
function renderPopularMovies(movies) {
  elPopularWrapper.innerHTML = ""

  movies.forEach(movie => {
    const elPopularCard = elCardTemplate.content.cloneNode(true)
    const elPopularCardImg = elPopularCard.querySelector("[data-card-img]")
    const elPopularCardRating = elPopularCard.querySelector("[data-card-rating]")

    document.querySelector("[data-popular-title]").textContent = "POPULAR MOVIES"
    elPopularCardImg.src = `${(movie.poster_path === null) ? "https://via.placeholder.com/213x350" : IMG_URL + movie.poster_path}`
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

// Render top
function renderTopMovies(movies) {
  elTopWrapper.innerHTML = ""

  movies.forEach(movie => {
    const elTopCard = elCardTemplate.content.cloneNode(true)
    const elTopCardImg = elTopCard.querySelector("[data-card-img]")
    const elTopCardRating = elTopCard.querySelector("[data-card-rating]")

    document.querySelector("[data-top-title]").textContent = "TOP MOVIES"
    elTopCardImg.src = `${(movie.poster_path === null) ? "https://via.placeholder.com/213x350" : IMG_URL + movie.poster_path}`
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

// Render upcoming load
function renderUpcomingLoad(totalPages, page) {
  elUpcomingLoadBtn.dataset.movieTotalPage = totalPages
  elUpcomingLoadBtn.dataset.moviePage = page
}

// Render popular load
function renderPopularLoad(totalPages, page) {
  elPopularLoadBtn.dataset.movieTotalPage = totalPages
  elPopularLoadBtn.dataset.moviePage = page
}

// Render top load
function renderTopLoad(totalPages, page) {
  elTopLoadBtn.dataset.movieTotalPage = totalPages
  elTopLoadBtn.dataset.moviePage = page
}

// Click Document
document.addEventListener("click", (evt) => {
  onUpcomingLoadClick(evt)
  onPopularLoadClick(evt)
  onTopLoadClick(evt)
})

// // UpcomingLoadBtn click
function onUpcomingLoadClick(evt) {
  const elTarget = evt.target.closest("[data-upcoming-load-btn]")

  if (!elTarget) return

  const totalPages = +elTarget.dataset.movieTotalPage
  let page = +elTarget.dataset.moviePage
  page++

  getData(page, +elPopularLoadBtn.dataset.moviePage, +elTopLoadBtn.dataset.moviePage)
}

// // PopularLoadBtn click
function onPopularLoadClick(evt) {
  const elTarget = evt.target.closest("[data-popular-load-btn]")

  if (!elTarget) return

  const totalPages = +elTarget.dataset.movieTotalPage
  let page = +elTarget.dataset.moviePage
  page++

  getData(+elUpcomingLoadBtn.dataset.moviePage, page, +elTopLoadBtn.dataset.moviePage)
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

  getData(+elUpcomingLoadBtn.dataset.moviePage, +elPopularLoadBtn.dataset.moviePage, page)
}

// Swiper slider (index)
const swiper = new Swiper('.swiper', {
  direction: "horizontal",
  speed: 400,
  slidesPerView: 1,
  spaceBetween: 0,
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
  // breakpoints: {
  //   600: {
  //     slidesPerView: 3,
  //   },
  //   768: {
  //     slidesPerView: 4,
  //   },
  //   990: {
  //     slidesPerView: 5,
  //   },
  //   1200: {
  //     slidesPerView: 6,
  //   }
  // }
})

// function button load
function buttonsLoad(state) {
  if (state) {
    elUpcomingLoadBtn.classList.add("d-none")
    elPopularLoadBtn.classList.add("d-none")
    elTopLoadBtn.classList.add("d-none")
  } else {
    elUpcomingLoadBtn.classList.remove("d-none")
    elPopularLoadBtn.classList.remove("d-none")
    elTopLoadBtn.classList.remove("d-none")
  }
}