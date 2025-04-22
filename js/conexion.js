async function displayLikedMovies() {
  const likedMovies = JSON.parse(localStorage.getItem("likedMovies")) || [];
  const likedMoviesContainer = document.getElementById("liked-movies");

  if (likedMovies.length === 0) {
    likedMoviesContainer.innerHTML = "<p>Aucun film liké pour le moment.</p>";
    return;
  }

  likedMoviesContainer.innerHTML = "";

  for (const movie of likedMovies) {
    try {
      const movieQuery = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=9a1c9d157712b25b8656fff6593c809c&language=fr-FR`);
      const movieDetails = await movieQuery.json();

      if (!movieDetails.poster_path) {
        console.warn(`Aucune affiche disponible pour le film : ${movieDetails.title}`);
        continue;
      }

      const movieElement = document.createElement("div");
      movieElement.style.margin = "10px";
      movieElement.style.display = "inline-block";
      movieElement.style.textAlign = "center";

      movieElement.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w200${movieDetails.poster_path}" alt="${movieDetails.title}" style="border-radius: 8px;">
        <p>${movieDetails.title}</p>
      `;

      likedMoviesContainer.appendChild(movieElement);
    } catch (error) {
      console.error(`Erreur lors de la récupération des détails du film avec l'ID ${movie.id}:`, error);
    }
  }
}

document.addEventListener("DOMContentLoaded", displayLikedMovies);

async function displayLikedSeries() {
  const likedSeries = JSON.parse(localStorage.getItem("likedSeries")) || [];
  const likedSeriesContainer = document.getElementById("liked-movies");

  if (likedSeries.length === 0) {
    likedSeriesContainer.innerHTML = "<p>Aucune série likée pour le moment.</p>";
    return;
  }

  likedSeriesContainer.innerHTML = "";

  for (const serie of likedSeries) {
    const serieQuery = await fetch(`https://api.themoviedb.org/3/tv/${serie.id}?api_key=9a1c9d157712b25b8656fff6593c809c&language=fr-FR`);
    const serieDetails = await serieQuery.json();

    const serieElement = document.createElement("div");
    serieElement.style.margin = "10px";
    serieElement.style.display = "inline-block";
    serieElement.style.textAlign = "center";

    serieElement.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w200${serieDetails.poster_path}" alt="${serieDetails.name}" style="border-radius: 8px;">
      <p>${serieDetails.name}</p>
    `;

    likedSeriesContainer.appendChild(serieElement);
  }
}

document.addEventListener("DOMContentLoaded", displayLikedSeries);