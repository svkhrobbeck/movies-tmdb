const elSearchForm = document.querySelector("[data-search-form]");

async function getSearchData(query, page = 1) {
  const request = await fetch(
    `${BASE_API}search/movie${API_KEY}&query=${query}&page=${page}`
  );

  const data = await request.json();
  elSearchLoadBtn.dataset.query = query;
  renderMovies(data.results, elSearchingWrapper);

  elPopularWrapper.parentElement.remove();
  elUpcomingWrapper.parentElement.remove();
  elTopWrapper.parentElement.remove();

  renderMovieLoad(data.total_pages, page, elSearchLoadBtn);
}

elSearchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = elSearchForm.search.value;

  getSearchData(query);
  elSearchLoadBtn.classList.remove("d-none");
  elSearchForm.reset();
});
