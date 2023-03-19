const castId = new URLSearchParams(window.location.search).get("cast");

// Elements
const elCastImg = document.querySelector("[data-cast-img]");
const elCastName = document.querySelector("[data-cast-name]");
const elCastBio = document.querySelector("[data-cast-bio]");
const elCastRating = document.querySelector("[data-cast-rating]");
const elCastPlaceBirth = document.querySelector("[data-cast-place]");
const elCastBirth = document.querySelector("[data-cast-birth]");
const elCastLink = document.querySelector("[data-cast-link]");

const elCastImagesWrapper = document.querySelector(
  "[data-cast-images-wrapper]"
);

// Data
async function getCastData() {
  loader(true);
  const request = await fetch(`${BASE_API}person/${castId}${API_KEY}`);
  const data = await request.json();

  const requestMovies = await fetch(
    `${BASE_API}person/${castId}/movie_credits${API_KEY}`
  );
  const dataMovies = await requestMovies.json();

  const requestImages = await fetch(
    `${BASE_API}person/${castId}/images${API_KEY}`
  );
  const dataImages = await requestImages.json();
  loader(false);

  renderCast(data);
  renderMovies(dataMovies.cast, elCastMovieWrapper);
  renderImages(dataImages.profiles, data);
}

getCastData();

// Render cast
function renderCast(cast) {
  elCastName.textContent = cast.name
  elCastImg.alt = cast.name;
  cast.profile_path
    ? (elCastImg.src = `${IMG_URL}${cast.profile_path}`)
    : (elCastImg.src = `https://via.placeholder.com/500x750`);
  cast.birthday
    ? (elCastBirth.textContent = `Birthday: ${new Date(
        cast.birthday
      ).toDateString()}`)
    : "";
  elCastBio.textContent = cast.biography;
  elCastRating.textContent = `Rating: ${cast.popularity}`;

  cast.place_of_birth
    ? (elCastPlaceBirth.textContent = cast.place_of_birth)
    : elCastPlaceBirth.parentElement.remove();

  cast.homepage ? (elCastLink.href = cast.homepage) : elCastLink.remove();
}

// Render images
function renderImages(images, cast) {
  elCastImagesWrapper.innerHTML = "";

  document.querySelector("[data-cast-images-title]").textContent = "IMAGES";
  let html = "";

  images.forEach((image) => {
    html += ` 
      <div class="swiper-slide">
        <img class="cast-images__img" src="${IMG_URL}${image.file_path}" alt="${cast.name}" width="200" height="300">
      </div>
    `;
  });

  if (images.length) {
    elCastImagesWrapper.innerHTML = html;
  } else {
    elCastImagesWrapper.innerHTML = `<p class="alert-text">Images Not Found!</p>`;
  }
}

// Swiper slider
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
    },
  },
});
