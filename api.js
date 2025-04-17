const API_KEY = "9a1c9d157712b25b8656fff6593c809c";

async function film(category = 'popular') {
  let query = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=fr-FR&page=1`);
  let response = await query.json();

  const filmContainer = document.getElementById("boxfilm"); // Conteneur pour les films
  filmContainer.innerHTML = "";

  response.results.slice(0, 4).forEach(movie => {
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
  let query = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=fr-FR&page=1`);
  let response = await query.json();

  const serieContainer = document.getElementById("boxserie");
  serieContainer.innerHTML = "";

  response.results.slice(0, 4).forEach(movie => {
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

async function anime(animeIds) {
  const animeContainer = document.getElementById("boxanime"); // Conteneur pour les animes
  animeContainer.innerHTML = ""; // Vider le conteneur

  for (const animeId of animeIds) {
    try {
      let query = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
      let response = await query.json();

      const anime = response.data;

      const animeItem = document.createElement("div");
      animeItem.classList.add("anime-item");

      const title = document.createElement("h3");
      title.textContent = anime.title;
      title.classList.add("anime-title");

      const img = document.createElement("img");
      img.src = anime.images.jpg.image_url;
      img.style.width = "100%";
      img.classList.add("anime-img");

      const synopsis = document.createElement("p");
      synopsis.textContent = anime.synopsis;
      synopsis.classList.add("anime-synopsis");

      animeItem.appendChild(title);
      animeItem.appendChild(img);
      animeContainer.appendChild(animeItem);
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'anime avec l'ID ${animeId}:`, error);
    }
  }
}

// Appeler les fonctions
film();
serie();
anime([42310,38883]);
