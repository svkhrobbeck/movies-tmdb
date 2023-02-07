// // Click Document
// document.addEventListener("click", (evt) => {
//   onModalOpenClick(evt)
//   onModalCloseClick(evt)
//   onModalOutsideClick(evt)
//   onPopularLoadClick(evt)
//   onTopLoadClick(evt)
// })

// // Modal open and fill
// async function onModalOpenClick(evt) {
//   const elTarget = evt.target.closest("[data-modal-open]")

//   if (!elTarget) return
//   const elSelector = elTarget.dataset.modalOpen
//   const elModal = document.querySelector(elSelector)

//   // Fill Modal
//   const id = elTarget.dataset.movieId
//   await getMovieVideo(id).then(data => {
//     const randomNum = Math.trunc(Math.random() * data.length)
//     const movie = data[randomNum]

//     const elModalVideo = document.querySelector("[data-modal-video]")

//     elModalVideo.src = `https://www.youtube.com/embed/${movie.key}`
//     elModalVideo.setAttribute("title", `${movie.name}`)
//   })
//   await getMovieData(id).then(movie => {
//     const elModalTitle = document.querySelector("[data-modal-title]")
//     const elModalDesc = document.querySelector("[data-modal-desc]")

//     elModalTitle.textContent = movie.title
//     elModalDesc.textContent = movie.overview
//   })

//   // Close Modal Escape
//   document.addEventListener("keydown", (evt) => {
//     if (evt.key === "Escape") {
//       elModal.classList.remove("show")
//     }
//   })

//   elModal.classList.add("show")
// }

// // Modal close
// function onModalCloseClick(evt) {
//   const elTarget = evt.target.closest("[data-modal-close]")

//   if (!elTarget) return
//   elTarget.parentElement.parentElement.parentElement.classList.remove("show")
// }

// // Modal outside
// function onModalOutsideClick(evt) {
//   const elTarget = evt.target

//   if (!elTarget.matches("[data-modal]")) return
//   elTarget.classList.remove("show")
// }



// 
//


// Get movie video data
// async function getMovieVideo(id) {
//   const response = await fetch(`${BASE_API}${id}/videos?api_key=${API_KEY}`)
//   const data = await response.json()

//   return data.results
// }

// Get Modal Movie Data
// async function getMovieData(id) {
//   const resMovie = await fetch(`${BASE_API}${id}?api_key=${API_KEY}`)
//   const dataMovie = await resMovie.json()

//   return dataMovie
// }