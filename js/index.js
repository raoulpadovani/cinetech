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
    title.textContent = movie.title;
    title.classList.add("movie-title");

    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    img.style.width = "100%";
    img.classList.add("movie-img");

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

  shuffledResults.slice(0, 5).forEach(movie => {
    const movieItem = document.createElement("div");
    movieItem.classList.add("movie-item");

    const title = document.createElement("h3");
    title.textContent = movie.name;
    title.classList.add("movie-title");

    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    img.style.width = "100%";
    img.classList.add("movie-img");

    movieItem.appendChild(title);
    movieItem.appendChild(img);
    serieContainer.appendChild(movieItem);
  });
}
film();
serie();