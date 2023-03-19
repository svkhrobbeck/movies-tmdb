// Get data
async function getData(
  pagesOfUpcoming = 1,
  pagesOfPopular = 1,
  pagesOfTop = 1
) {
  loader(true);
  buttonsLoad(true);
  // Upcoming data
  let responseUpcoming = await fetch(
    `${BASE_API}upcoming${API_KEY}&page=${pagesOfUpcoming}`
  );
  let dataUpcoming = await responseUpcoming.json();
  // Popular data
  let responsePopular = await fetch(
    `${BASE_API}popular${API_KEY}&page=${pagesOfPopular}`
  );
  let dataPopular = await responsePopular.json();
  // Top data
  let responseTop = await fetch(
    `${BASE_API}top_rated${API_KEY}&page=${pagesOfTop}`
  );
  let dataTop = await responseTop.json();
  loader(false);
  buttonsLoad(false);

  renderTopBanner(dataUpcoming.results);
  renderMovies(dataUpcoming.results, elUpcomingWrapper);
  renderMovies(dataPopular.results, elPopularWrapper);
  renderMovies(dataTop.results, elTopWrapper);

  renderMovieLoad(dataUpcoming.total_pages, pagesOfUpcoming, elUpcomingLoadBtn);
  renderMovieLoad(dataPopular.total_pages, pagesOfPopular, elPopularLoadBtn);
  renderMovieLoad(dataTop.total_pages, pagesOfTop, elTopLoadBtn);
}
getData();

// render top banner
function renderTopBanner(movies) {
  let html = "";

  const newMovies = movies.filter((movie) => movie.backdrop_path !== null);
  movies.forEach((movie) => {
    html += `<div class="swiper-slide" data-swiper-autoplay="4500">
    <img class="top-banner__img" src="${
      movie.backdrop_path === null
        ? "images/image-not-found.png"
        : BG_URL + movie.backdrop_path
    }" alt="${movie.title}" />
    <div class="top-banner__content">
      <div class="top-banner__content-inner">
        <h2 class="top-banner__title" title="${
          movie.title
        }" data-top-banner-title>${movie.title}</h2>
        <p class="top-banner__desc" data-top-banner-desc>${movie.overview}</p>
        <a class="top-banner__link" href="movie.html?id=${
          movie.id
        }" data-top-banner-link>Read more...</a>
      </div>
    </div>
    </div>
          `;
  });

  elTopBannerBgWrapper.innerHTML = html;
}

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
    elCardRating.textContent = movie.vote_average;
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

// Render movie load
function renderMovieLoad(totalPages, page, btn) {
  btn.dataset.movieTotalPage = totalPages;
  btn.dataset.moviePage = page;
}

// Click Document
document.addEventListener("click", (evt) => {
  onMovieLoadClick(evt, elUpcomingLoadBtn);
  onMovieLoadClick(evt, elPopularLoadBtn);
  onMovieLoadClick(evt, elTopLoadBtn);
});

// // UpcomingLoadBtn click
function onMovieLoadClick(evt, btn) {
  const elTarget = evt.target;

  if (elTarget !== btn) return;

  const totalPages = +elTarget.dataset.movieTotalPage;
  let page = +elTarget.dataset.moviePage;
  page++;

  if (btn === elUpcomingLoadBtn) {
    getData(
      page,
      +elPopularLoadBtn.dataset.moviePage,
      +elTopLoadBtn.dataset.moviePage
    );
  } else if (btn === elPopularLoadBtn) {
    getData(
      +elUpcomingLoadBtn.dataset.moviePage,
      page,
      +elTopLoadBtn.dataset.moviePage
    );
  } else if (btn === elTopLoadBtn) {
    getData(
      +elUpcomingLoadBtn.dataset.moviePage,
      +elPopularLoadBtn.dataset.moviePage,
      page
    );
  }
}

// Swiper slider (index)
const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  speed: 400,
  slidesPerView: 1,
  spaceBetween: 0,
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
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
});

// function button load
function buttonsLoad(state) {
  if (state) {
    elUpcomingLoadBtn.classList.add("d-none");
    elPopularLoadBtn.classList.add("d-none");
    elTopLoadBtn.classList.add("d-none");
  } else {
    elUpcomingLoadBtn.classList.remove("d-none");
    elPopularLoadBtn.classList.remove("d-none");
    elTopLoadBtn.classList.remove("d-none");
  }
}
