const API_KEY = "?api_key=87606660ec9c3fa9d590708457b96f06";
const BASE_API = "https://api.themoviedb.org/3/";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const BG_URL = "https://image.tmdb.org/t/p/w1280";

const ElSiteHeader = document.querySelector("[data-site-header]");
const elTopBannerBgWrapper = document.querySelector("[data-top-banner-bg]");
const elUpcomingWrapper = document.querySelector("[data-upcoming-wrapper]");
const elPopularWrapper = document.querySelector("[data-popular-wrapper]");
const elTopWrapper = document.querySelector("[data-top-wrapper]");
const elCastMovieWrapper = document.querySelector("[data-cast-movie-wrapper]");
const elSearchingWrapper = document.querySelector("[data-searchs-wrapper]");

const elUpcomingLoadBtn = document.querySelector("[data-upcoming-load-btn]");
const elPopularLoadBtn = document.querySelector("[data-popular-load-btn]");
const elTopLoadBtn = document.querySelector("[data-top-load-btn]");
const elSearchLoadBtn = document.querySelector("[data-search-load-btn]");
const elLoader = document.querySelector("[data-loader]");

const elCardTemplate = document.querySelector("[data-card-template]");
const elToTopBtn = document.querySelector("[data-to-top-btn]");

// Render Movies
function renderMovies(movies, parent) {
  parent.innerHTML = "";

  if (parent === elUpcomingWrapper) {
    document.querySelector("[data-upcoming-title]").textContent =
      "UPCOMING MOVIES";
  } else if (parent === elPopularWrapper) {
    document.querySelector("[data-popular-title]").textContent =
      "POPULAR MOVIES";
  } else if (parent === elTopWrapper) {
    document.querySelector("[data-top-title]").textContent = "TOP MOVIES";
  } else if (parent === elCastMovieWrapper) {
    document.querySelector("[data-cast-movie-title]").textContent = "MOVIES";
  } else if (parent === elSearchingWrapper) {
    document.querySelector("[data-searchs-title]").textContent =
      "SEARCH RESULTS";
  } else {
    ("");
  }

  movies.forEach((movie) => {
    const elCard = elCardTemplate.content.cloneNode(true);
    const elCardImg = elCard.querySelector("[data-card-img]");
    const elCardRating = elCard.querySelector("[data-card-rating]");

    elCardImg.src = `${
      movie.poster_path === null
        ? "https://via.placeholder.com/213x350"
        : IMG_URL + movie.poster_path
    }`;
    elCardImg.alt = movie.title;
    elCardRating.textContent = movie.vote_average.toFixed(1);
    elCard.querySelector("[data-card-title]").textContent = movie.title;
    elCard.querySelector("[data-card-link]").href = `movie.html?id=${movie.id}`;

    // Rating border color
    if (movie.vote_average < 6) {
      elCardRating.style.borderColor = "#d91200";
    } else if (movie.vote_average < 7) {
      elCardRating.style.borderColor = "#ff8000";
    } else if (movie.vote_average < 8) {
      elCardRating.style.borderColor = "	#ffea00";
    } else if (movie.vote_average <= 10) {
      elCardRating.style.borderColor = "#32cd32";
    }

    parent.appendChild(elCard);
  });
}

// scroll
function windowScroll() {
  if (window.pageYOffset > 500) {
    document.querySelector("[data-to-down]").style.opacity = "0";
    elToTopBtn.classList.remove("hidden");
  } else {
    document.querySelector("[data-to-down]").style.opacity = "1";
    elToTopBtn.classList.add("hidden");
  }
  ElSiteHeader.classList.toggle("fixed", window.scrollY > 0);
}

// scroll to top
function onToTopClick(evt) {
  const el = evt.target.closest("[data-to-top-btn]");

  if (!el) return;

  document.documentElement.scrollTop = 0;
  console.log("clicked");
}

document.addEventListener("click", onToTopClick);

// Loader
function loader(state) {
  if (state) {
    elLoader.classList.remove("hidden");
  } else {
    elLoader.classList.add("hidden");
  }
}
