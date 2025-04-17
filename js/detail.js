const API_KEY = "9a1c9d157712b25b8656fff6593c809c";

async function toto(category = 'popular') {

  let query = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=fr-FR&page=1`)

  let response = await query.json()
  

      const filmContainer = document.getElementById("boxfilm"); 
      filmContainer.innerHTML = ""; 

      response.results.forEach(movie => {
        console.log(movie);
        
        const movieItem = document.createElement("div");
        movieItem.classList.add("movie-item"); 

        const title = document.createElement("h3"); 
        title.textContent = movie.title;
        title.classList.add("movie-title"); 

        const img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        img.style.width = "100%";
        img.classList.add("movie-img"); 

        const description = document.createElement("p");
        description.textContent = movie.overview;
          description.classList.add("movie-description");


        movieItem.appendChild(title); 
        movieItem.appendChild(img); 
        filmContainer.appendChild(movieItem);
          movieItem.appendChild(description); 
      });
}

toto('upcoming')