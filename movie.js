const API_KEY = "9a1c9d157712b25b8656fff6593c809c";

// Récupérer l'ID du film depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

async function fetchMovieDetails(movieId) {
  // Récupérer les détails du film
  const movieQuery = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=fr-FR`);
  const movie = await movieQuery.json();

  // Récupérer les crédits (réalisateur et acteurs)
  const creditsQuery = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=fr-FR`);
  const credits = await creditsQuery.json();

  // Trouver le réalisateur
  const director = credits.crew.find(person => person.job === "Director")?.name || "Inconnu";

  // Obtenir les acteurs principaux (limité à 5)
  const actors = credits.cast.slice(0, 5).map(actor => actor.name).join(", ") || "Non disponible";

  // Obtenir les genres
  const genres = movie.genres.map(genre => genre.name).join(", ") || "Non disponible";

  // Obtenir les pays d'origine
  const countries = movie.production_countries.map(country => country.name).join(", ") || "Non disponible";

  // Mettre à jour le conteneur avec les détails
  const detailsContainer = document.getElementById("movie-details");
  detailsContainer.innerHTML = `
    <h1>${movie.title}</h1>
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    <p><strong>Réalisateur :</strong> ${director}</p>
    <p><strong>Genres :</strong> ${genres}</p>
    <p><strong>Pays d'origine :</strong> ${countries}</p>
    <p><strong>Résumé :</strong> ${movie.overview}</p>
    <p><strong>Acteurs principaux :</strong> ${actors}</p>
  `;
}
async function fetchMovieDetails(movieId) {
    // Récupérer les détails du film
    const movieQuery = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=fr-FR`);
    const movie = await movieQuery.json();
  
    // Récupérer les crédits (réalisateur et acteurs)
    const creditsQuery = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=fr-FR`);
    const credits = await creditsQuery.json();
  
    // Trouver le réalisateur
    const director = credits.crew.find(person => person.job === "Director")?.name || "Inconnu";
  
    // Obtenir les acteurs principaux (limité à 5)
    const actors = credits.cast.slice(0, 5).map(actor => actor.name).join(", ") || "Non disponible";
  
    // Obtenir les genres
    const genres = movie.genres.map(genre => genre.name).join(", ") || "Non disponible";
  
    // Obtenir les pays d'origine
    const countries = movie.production_countries.map(country => country.name).join(", ") || "Non disponible";
  
    // Mettre à jour le conteneur avec les détails
    const detailsContainer = document.getElementById("movie-details");
    detailsContainer.innerHTML = `
      <h1>${movie.title}</h1>
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <p><strong>Réalisateur :</strong> ${director}</p>
      <p><strong>Genres :</strong> ${genres}</p>
      <p><strong>Pays d'origine :</strong> ${countries}</p>
      <p><strong>Résumé :</strong> ${movie.overview}</p>
      <p><strong>Acteurs principaux :</strong> ${actors}</p>
      <button id="like-button" data-movie-id="${movie.id}" data-movie-title="${movie.title}">Like</button>
    `;
  
    // Ajouter un gestionnaire d'événements pour le bouton "Like"
    const likeButton = document.getElementById("like-button");
    likeButton.addEventListener("click", () => {
      saveLikedMovie(movie.id, movie.title);
    });
  }

async function fetchMovieRecommendations(movieId) {
  try {
    // Requête pour obtenir les recommandations
    const recommendationsQuery = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}&language=fr-FR`);
    const recommendations = await recommendationsQuery.json();

    // Vérifiez si des recommandations existent
    if (recommendations.results.length === 0) {
      console.log("Aucune recommandation disponible pour ce film.");
      return;
    }

    // Conteneur pour les recommandations
    const recommendationsContainer = document.createElement("div");
    recommendationsContainer.id = "movie-recommendations";
    recommendationsContainer.innerHTML = `<h2>Films suggérés :</h2>`;

    // Ajouter chaque film recommandé
    recommendations.results.slice(0, 3).forEach(movie => {
      const movieElement = document.createElement("div");
      movieElement.style.display = "inline-block";
      movieElement.style.margin = "10px";
      movieElement.style.textAlign = "center";

      movieElement.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}" style="border-radius: 8px; cursor: pointer;">
        <p>${movie.title}</p>
      `;

      // Ajouter un événement de clic pour rediriger vers la page des détails du film
      movieElement.addEventListener("click", () => {
        window.location.href = `movie.html?id=${movie.id}`;
      });

      recommendationsContainer.appendChild(movieElement);
    });
    

    // Ajouter les recommandations sous les détails du film
    const detailsContainer = document.getElementById("movie-details");
    detailsContainer.appendChild(recommendationsContainer);
  } catch (error) {
    console.error("Erreur lors de la récupération des recommandations :", error);
  }
}

function saveLikedMovie(movieId, movieTitle) {
    const likedMovies = JSON.parse(localStorage.getItem("likedMovies")) || [];
    const movieExists = likedMovies.some(movie => movie.id === movieId);
  
    if (!movieExists) {
      likedMovies.push({ id: movieId, title: movieTitle });
      localStorage.setItem("likedMovies", JSON.stringify(likedMovies));
      alert(`Vous avez liké : ${movieTitle}`);
    } else {
      alert(`Vous avez déjà liké : ${movieTitle}`);
    }
  }

// Appeler les fonctions pour afficher les détails et les recommandations
if (movieId) {
  fetchMovieDetails(movieId).then(() => {
    fetchMovieRecommendations(movieId);
  });
}