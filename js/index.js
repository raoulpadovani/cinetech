const API_KEY = "9a1c9d157712b25b8656fff6593c809c";
const page = "1";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function film(category = 'popular') {
  let query = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=fr-FR&page=${page}`);
  let response = await query.json();

  const filmContainer = document.getElementById("boxfilm");
  filmContainer.innerHTML = "";

  const shuffledResults = shuffleArray(response.results);

  shuffledResults.slice(0, 5).forEach(movie => {
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

    movieItem.addEventListener("click", () => {
      window.location.href = `movie.html?id=${movie.id}`;
    });

    movieItem.appendChild(title);
    movieItem.appendChild(img);
    filmContainer.appendChild(movieItem);
  });
}

async function serie() {
  let query = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=fr-FR&page=${page}`);
  let response = await query.json();

  const serieContainer = document.getElementById("boxserie");
  serieContainer.innerHTML = "";

  const shuffledResults = shuffleArray(response.results);

  shuffledResults.slice(0, 5).forEach(serie => {
    const serieItem = document.createElement("div");
    serieItem.classList.add("movie-item");

    const title = document.createElement("h3");
    const maxTitleLength = 10;
    title.textContent = serie.name.length > maxTitleLength
      ? serie.name.substring(0, maxTitleLength)
      : serie.name;
    title.classList.add("movie-title");

    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500${serie.poster_path}`;
    img.style.width = "100%";
    img.classList.add("movie-img");

    serieItem.addEventListener("click", () => {
      window.location.href = `dserie.html?id=${serie.id}`;
    });

    serieItem.appendChild(title);
    serieItem.appendChild(img);
    serieContainer.appendChild(serieItem);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("search-bar");
  const autocompleteList = document.getElementById("autocomplete-list");

  searchBar.addEventListener("input", async () => {
    const query = searchBar.value.trim().toLowerCase();
    autocompleteList.innerHTML = "";

    if (query.length < 2) {
      return;
    }

    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=fr-FR&query=${query}`);
      const data = await response.json();

      data.results.forEach(item => {
        if (item.media_type === "movie" || item.media_type === "tv") {
          const li = document.createElement("li");
          li.textContent = item.title || item.name;
          li.addEventListener("click", () => {
            if (item.media_type === "movie") {
              window.location.href = `movie.html?id=${item.id}`;
            } else if (item.media_type === "tv") {
              window.location.href = `dserie.html?id=${item.id}`;
            }
          });
          autocompleteList.appendChild(li);
        }
      });
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  });

  document.addEventListener("click", (e) => {
    if (!searchBar.contains(e.target) && !autocompleteList.contains(e.target)) {
      autocompleteList.innerHTML = "";
    }
  });

  const burger = document.getElementById('burger-menu');
  const nav = document.getElementById('nav-links');
  if (burger && nav) {
    burger.addEventListener('click', function() {
      nav.classList.toggle('active');
    });
  }
});

film();
serie();