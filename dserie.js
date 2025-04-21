const API_KEY = "9a1c9d157712b25b8656fff6593c809c";

// Récupérer l'ID de la série depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const serieId = urlParams.get("id");

async function fetchSerieDetails(serieId) {
    // Récupérer les détails de la série
    const serieQuery = await fetch(`https://api.themoviedb.org/3/tv/${serieId}?api_key=${API_KEY}&language=fr-FR`);
    const serie = await serieQuery.json();

    // Récupérer les crédits (réalisateur et acteurs)
    const creditsQuery = await fetch(`https://api.themoviedb.org/3/tv/${serieId}/credits?api_key=${API_KEY}&language=fr-FR`);
    const credits = await creditsQuery.json();

    // Trouver le réalisateur
    const director = credits.crew.find(person => person.job === "Director")?.name || "Inconnu";

    // Obtenir les acteurs principaux (limité à 5)
    const actors = credits.cast.slice(0, 5).map(actor => actor.name).join(", ") || "Non disponible";

    // Obtenir les genres
    const genres = serie.genres.map(genre => genre.name).join(", ") || "Non disponible";

    // Obtenir les pays d'origine
    const countries = serie.origin_country.join(", ") || "Non disponible";

    // Mettre à jour le conteneur avec les détails
    const detailsContainer = document.getElementById("serie-details");
    detailsContainer.innerHTML = `
        <h1>${serie.name}</h1>
        <img src="https://image.tmdb.org/t/p/w500${serie.poster_path}" height ="50%" alt="${serie.name}">
        <p><strong>Réalisateur :</strong> ${director}</p>
        <p><strong>Genres :</strong> ${genres}</p>
        <p><strong>Pays d'origine :</strong> ${countries}</p>
        <p><strong>Résumé :</strong> ${serie.overview}</p>
        <p><strong>Acteurs principaux :</strong> ${actors}</p>
    `;
}

if (serieId) {
    fetchSerieDetails(serieId);
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
            // Requête à l'API TMDB pour rechercher des films et séries
            const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=fr-FR&query=${query}`);
            const data = await response.json();

            // Afficher les résultats
            data.results.forEach(item => {
                if (item.media_type === "movie" || item.media_type === "tv") {
                    const li = document.createElement("li");
                    li.textContent = item.title || item.name; // `title` pour les films, `name` pour les séries
                    li.addEventListener("click", () => {
                        // Rediriger vers la page appropriée
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

    // Fermer la liste si on clique en dehors
    document.addEventListener("click", (e) => {
        if (!searchBar.contains(e.target) && !autocompleteList.contains(e.target)) {
            autocompleteList.innerHTML = "";
        }
    });
});
