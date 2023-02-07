const API_KEY = "?api_key=87606660ec9c3fa9d590708457b96f06"
const BASE_API = "https://api.themoviedb.org/3/movie/"
const IMG_URL = "https://image.tmdb.org/t/p/w500"
const BG_URL = "https://image.tmdb.org/t/p/w1280"

const ElSiteHeader = document.querySelector("[data-site-header]")
const elTopBannerBgWrapper = document.querySelector("[data-top-banner-bg]")
const elUpcomingWrapper = document.querySelector("[data-upcoming-wrapper]")
const elPopularWrapper = document.querySelector("[data-popular-wrapper]")
const elTopWrapper = document.querySelector("[data-top-wrapper]")

const elPopularLoadBtn = document.querySelector("[data-popular-load-btn]")
const elTopLoadBtn = document.querySelector("[data-top-load-btn]")
const elLoader = document.querySelector("[data-loader]")

const elCardTemplate = document.querySelector("[data-card-template]")

// Scroll logic
document.addEventListener("scroll", (e) => {
  if (window.pageYOffset > 500) {
    document.querySelector("[data-to-down]").style.opacity = "0"
  } else {
    document.querySelector("[data-to-down]").style.opacity = "1"
  }
  ElSiteHeader.classList.toggle("fixed", window.scrollY > 0)
})

// Loader
function loader(state) {
  if (state) {
    elLoader.classList.remove("hidden")
    elPopularLoadBtn.classList.add("d-none")
    elTopLoadBtn.classList.add("d-none")
  } else {
    elLoader.classList.add("hidden")
    elPopularLoadBtn.classList.remove("d-none")
    elTopLoadBtn.classList.remove("d-none")
  }
}

