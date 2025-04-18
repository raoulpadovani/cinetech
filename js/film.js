const API_KEY = "9a1c9d157712b25b8656fff6593c809c";
const RECIPES_PER_PAGE = 6;
let currentPage = 1;

async function fetchMovies(category = 'popular', page = 1) {
  const query = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=fr-FR&page=${page}`);
  const response = await query.json();
  return response.results;
}

async function displayRecipes(category = 'popular') {
  const filmContainer = document.getElementById("boxfilm");
  filmContainer.innerHTML = "";

  const movies = await fetchMovies(category, currentPage);
  movies.forEach(movie => {
    const movieItem = document.createElement("div");
    movieItem.classList.add("movie-item");

    
    const title = document.createElement("h3"); 
        const maxTitleLength = 10; 
        title.textContent = movie.title.length > maxTitleLength 
            ? movie.title.substring(0, maxTitleLength) 
            : movie.title;
        title.classList.add("movie-title"); 

    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    img.style.width = "100%";
    img.classList.add("movie-img");

    movieItem.appendChild(title);
    movieItem.appendChild(img);
    filmContainer.appendChild(movieItem);
  });

  updatePagination();
}

function updatePagination() {
  const prevButton = document.getElementById("prev-page");
  const nextButton = document.getElementById("next-page");
  const pageNumber = document.getElementById("page-number");

  pageNumber.textContent = `Page ${currentPage}`;
  prevButton.classList.toggle("disabled", currentPage === 1);

  prevButton.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      displayRecipes();
    }
  };

  nextButton.onclick = () => {
    currentPage++;
    displayRecipes();
  };
}

document.addEventListener("DOMContentLoaded", () => {
  displayRecipes();

  // Gestion des clics pour la pagination
  document.getElementById("prev-page").addEventListener("click", () => {
    if (!document.getElementById("prev-page").classList.contains("disabled")) {
      currentPage--;
      displayRecipes();
    }
  });

  document.getElementById("next-page").addEventListener("click", () => {
    currentPage++;
    displayRecipes();
  });
});