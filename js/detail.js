const API_KEY = "9a1c9d157712b25b8656fff6593c809c";

async function film(category = 'popular') {
  let query = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=fr-FR&page=2`);
  let response = await query.json();

  const filmContainer = document.getElementById("boxfilm");
  filmContainer.innerHTML = "";

  response.results.forEach(movie => {
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

    const description = document.createElement("p");
    const maxLength = 100;
    const fullText = movie.overview;
    const truncatedText = fullText.length > maxLength
        ? fullText.substring(0, maxLength) + "..."
        : fullText;

    description.textContent = truncatedText;
    description.classList.add("movie-description");

    // Ajouter un événement de clic pour rediriger vers une autre page
    movieItem.addEventListener("click", () => {
      window.location.href = `movie.html?id=${movie.id}`;
    });

    movieItem.appendChild(title);
    movieItem.appendChild(img);
    filmContainer.appendChild(movieItem);
  });
}

film('upcoming');