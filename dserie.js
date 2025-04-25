const API_KEY = "9a1c9d157712b25b8656fff6593c809c";


const urlParams = new URLSearchParams(window.location.search);
const serieId = urlParams.get("id");

async function fetchSerieDetails(serieId) {
    
    const serieQuery = await fetch(`https://api.themoviedb.org/3/tv/${serieId}?api_key=${API_KEY}&language=fr-FR`);
    const serie = await serieQuery.json();
  
    
    const creditsQuery = await fetch(`https://api.themoviedb.org/3/tv/${serieId}/credits?api_key=${API_KEY}&language=fr-FR`);
    const credits = await creditsQuery.json();
  
    const director = credits.crew.find(person => person.job === "Director")?.name || "Inconnu";
  
   
    const actors = credits.cast.slice(0, 5).map(actor => actor.name).join(", ") || "Non disponible";
  
    const genres = serie.genres.map(genre => genre.name).join(", ") || "Non disponible";
  
   
    const countries = serie.origin_country.join(", ") || "Non disponible";
  
    
    const detailsContainer = document.getElementById("serie-details");
    detailsContainer.innerHTML = `
      <h1>${serie.name}</h1>
      <img src="https://image.tmdb.org/t/p/w500${serie.poster_path}" alt="${serie.name}">
      <p><strong>Réalisateur :</strong> ${director}</p>
      <p><strong>Genres :</strong> ${genres}</p>
      <p><strong>Pays d'origine :</strong> ${countries}</p>
      <p><strong>Résumé :</strong> ${serie.overview}</p>
      <p><strong>Acteurs principaux :</strong> ${actors}</p>
      <button id="like-button" data-serie-id="${serie.id}" data-serie-name="${serie.name}">Like</button>
      <div id="serie-reviews">
        <h2>Commentaires :</h2>
        <p>Chargement des commentaires...</p>
      </div>
    `;
  
    
    const likeButton = document.getElementById("like-button");
    likeButton.addEventListener("click", () => {
      saveLikedSerie(serie.id, serie.name);
    });
  
    
    fetchSerieReviews(serieId);
  }async function fetchSerieDetails(serieId) {
    
    const serieQuery = await fetch(`https://api.themoviedb.org/3/tv/${serieId}?api_key=${API_KEY}&language=fr-FR`);
    const serie = await serieQuery.json();
  
    
    const creditsQuery = await fetch(`https://api.themoviedb.org/3/tv/${serieId}/credits?api_key=${API_KEY}&language=fr-FR`);
    const credits = await creditsQuery.json();
  
   
    const director = credits.crew.find(person => person.job === "Director")?.name || "Inconnu";
  
    const actors = credits.cast.slice(0, 5).map(actor => actor.name).join(", ") || "Non disponible";
  
    
    const genres = serie.genres.map(genre => genre.name).join(", ") || "Non disponible";
  
    
    const countries = serie.origin_country.join(", ") || "Non disponible";
  
    
    const detailsContainer = document.getElementById("serie-details");
    detailsContainer.innerHTML = `
      <h1>${serie.name}</h1>
      <img src="https://image.tmdb.org/t/p/w500${serie.poster_path}" alt="${serie.name}">
      <p><strong>Réalisateur :</strong> ${director}</p>
      <p><strong>Genres :</strong> ${genres}</p>
      <p><strong>Pays d'origine :</strong> ${countries}</p>
      <p><strong>Résumé :</strong> ${serie.overview}</p>
      <p><strong>Acteurs principaux :</strong> ${actors}</p>
      <button id="like-button" data-serie-id="${serie.id}" data-serie-name="${serie.name}">Like</button>
      <div id="serie-reviews">
        <h2>Commentaires :</h2>
        <p>Chargement des commentaires...</p>
      </div>
    `;
  
    
    const likeButton = document.getElementById("like-button");
    likeButton.addEventListener("click", () => {
      saveLikedSerie(serie.id, serie.name);
    });
  
    fetchSerieReviews(serieId);
  }

  async function fetchSerieReviews(serieId) {
    try {
      
      const reviewsQuery = await fetch(`https://api.themoviedb.org/3/tv/${serieId}/reviews?api_key=${API_KEY}&language=fr-FR`);
      const reviews = await reviewsQuery.json();
  
      console.log("Commentaires récupérés :", reviews); 
  
      const reviewsContainer = document.getElementById("serie-reviews");
  
      
      if (reviews.results.length === 0) {
        reviewsContainer.innerHTML += "<p>Aucun commentaire disponible pour cette série.</p>";
        return;
      }
  
      
      reviews.results.slice(0, 5).forEach(review => {
        const reviewElement = document.createElement("div");
        reviewElement.style.margin = "10px";
        reviewElement.style.padding = "10px";
        reviewElement.style.border = "1px solid #ccc";
        reviewElement.style.borderRadius = "8px";
  
        reviewElement.innerHTML = `
          <p><strong>Auteur :</strong> ${review.author}</p>
          <p>${review.content}</p>
        `;
  
        reviewsContainer.appendChild(reviewElement);
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des commentaires :", error);
    }
  }

async function fetchSerieRecommendations(serieId) {
  try {
    
    const recommendationsQuery = await fetch(`https://api.themoviedb.org/3/tv/${serieId}/recommendations?api_key=${API_KEY}&language=fr-FR`);
    const recommendations = await recommendationsQuery.json();

    
    if (recommendations.results.length === 0) {
      console.log("Aucune recommandation disponible pour cette série.");
      return;
    }

    
    const recommendationsContainer = document.createElement("div");
    recommendationsContainer.id = "serie-recommendations";
    recommendationsContainer.innerHTML = `<h2>Séries suggérées :</h2>`;
    

    
    recommendations.results.slice(0, 3).forEach(serie => {
      const serieElement = document.createElement("div");
      serieElement.style.display = "inline-block";
      serieElement.style.margin = "10px";
      serieElement.style.textAlign = "center";

      serieElement.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w200${serie.poster_path}" alt="${serie.name}" style="border-radius: 8px; cursor: pointer;">
        <p>${serie.name}</p>
      `;

      
      serieElement.addEventListener("click", () => {
        window.location.href = `dserie.html?id=${serie.id}`;
      });

      recommendationsContainer.appendChild(serieElement);
    });

    
    const detailsContainer = document.getElementById("serie-details");
    detailsContainer.appendChild(recommendationsContainer);
  } catch (error) {
    console.error("Erreur lors de la récupération des recommandations :", error);
  }
}

if (serieId) {
  fetchSerieDetails(serieId).then(() => {
    fetchSerieRecommendations(serieId);
  });
}

async function fetchSeries(category = 'popular', page = 1) {
    const query = await fetch(`https://api.themoviedb.org/3/tv/${category}?api_key=9a1c9d157712b25b8656fff6593c809c&language=fr-FR&page=${page}`);
    const response = await query.json();
    return response.results;
  }
  
  async function displaySeries(category = 'popular') {
    const seriesContainer = document.getElementById("boxserie");
    seriesContainer.innerHTML = "";
  
    const series = await fetchSeries(category, currentPage);
    series.forEach(serie => {
      const serieElement = document.createElement("div");
      serieElement.style.margin = "10px";
      serieElement.style.display = "inline-block";
      serieElement.style.textAlign = "center";
  
      serieElement.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w200${serie.poster_path}" alt="${serie.name}" style="border-radius: 8px;">
        <p>${serie.name}</p>
        <button class="like-button" data-serie-id="${serie.id}" data-serie-name="${serie.name}">Like</button>
      `;
  
      seriesContainer.appendChild(serieElement);
    });
  
    
    document.querySelectorAll(".like-button").forEach(button => {
      button.addEventListener("click", (event) => {
        event.stopPropagation(); 
        const serieId = button.getAttribute("data-serie-id");
        const serieName = button.getAttribute("data-serie-name");
        saveLikedSerie(serieId, serieName);
      });
    });
  }
  
 
  function saveLikedSerie(serieId, serieName) {
    const likedSeries = JSON.parse(localStorage.getItem("likedSeries")) || [];
    const serieExists = likedSeries.some(serie => serie.id === serieId);
  
    if (!serieExists) {
      likedSeries.push({ id: serieId, name: serieName });
      localStorage.setItem("likedSeries", JSON.stringify(likedSeries));
      alert(`Vous avez liké : ${serieName}`);
    } else {
      alert(`Vous avez déjà liké : ${serieName}`);
    }
  }
  
  
  let currentPage = 1;
  document.addEventListener("DOMContentLoaded", () => {
    displaySeries();
  });