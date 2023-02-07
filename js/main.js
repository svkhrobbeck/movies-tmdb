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