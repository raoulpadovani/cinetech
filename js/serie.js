const API_KEY = "9a1c9d157712b25b8656fff6593c809c";
let currentPage = 1;

async function fetchSeries(page = 1) {
    const query = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=fr-FR&page=${page}`);
    const response = await query.json();
    return response.results;
}

async function displaySeries() {
    const serieContainer = document.getElementById("boxserie");
    serieContainer.innerHTML = "";

    const series = await fetchSeries(currentPage);
    series.forEach(serie => {
        const serieItem = document.createElement("div");
        serieItem.classList.add("movie-item");

        const title = document.createElement("h3");
        const maxTitleLength = 15;
        title.textContent = serie.name.length > maxTitleLength
            ? serie.name.substring(0, maxTitleLength) + "..."
            : serie.name;
        title.classList.add("movie-title");

        const img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/w500${serie.poster_path}`;
        img.style.width = "100%";
        img.classList.add("movie-img");

        serieItem.appendChild(title);
        serieItem.appendChild(img);
        serieContainer.appendChild(serieItem);
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
            displaySeries();
        }
    };

    nextButton.onclick = () => {
        currentPage++;
        displaySeries();
    };
}

document.addEventListener("DOMContentLoaded", () => {
    displaySeries();

    // Gestion des clics pour la pagination
    document.getElementById("prev-page").addEventListener("click", () => {
        if (!document.getElementById("prev-page").classList.contains("disabled")) {
            currentPage--;
            displaySeries();
        }
    });

    document.getElementById("next-page").addEventListener("click", () => {
        currentPage++;
        displaySeries();
    });
});