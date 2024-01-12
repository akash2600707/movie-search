const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("results");

searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();

    if (searchTerm !== "") {
        searchMovies(searchTerm);
    }
});

function searchMovies(query) {
    const apiKey = 'd009e7ba8e59fcd3193b7a5867d6accb'; // Replace with your OMDB API key
    const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`;;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            displayResults(data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

function displayResults(data) {
    resultsContainer.innerHTML = "";

    if (data.results && data.results.length > 0) {
        data.results.forEach((movie) => {
            const movieElement = document.createElement("div");
            movieElement.classList.add("movie");

            movieElement.innerHTML = `
                <h2>${movie.title}</h2>
                <p>Release Date: ${movie.release_date}</p>
                <p>Rating: ${movie.vote_average}</p>
                <p>Overview: ${movie.overview}</p>
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title} Poster">
            `;

            resultsContainer.appendChild(movieElement);
        });
    } else {
        resultsContainer.innerHTML = "<p>No results found.</p>";
    }
}
