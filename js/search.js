const elSearchForm = document.querySelector("[data-search-form]");

async function getSearchData(query, page = 1) {
  const request = await fetch(
    `${BASE_API}search/movie${API_KEY}&query=${query}`
  );

  const data = await request.json();

  renderMovies(data.results, elSearchingWrapper);
  elPopularWrapper.parentElement.remove();
  elUpcomingWrapper.parentElement.remove();
  elTopWrapper.parentElement.remove();
}

elSearchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = elSearchForm.search.value;

  getSearchData(query);
  elSearchForm.reset();
});
