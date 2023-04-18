const apiUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

showMovies(apiUrl);

// Event Listener 1: Load More Movies
document.getElementById('load-more').addEventListener('click', () => {
    const nextPage = Number(document.getElementById('page-number').textContent) + 1;
    const nextPageUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${nextPage}`;
    showMovies(nextPageUrl);
    document.getElementById('page-number').textContent = nextPage;
});

// Event Listener 2: Clear Search Results
document.getElementById('clear-search').addEventListener('click', () => {
    main.innerHTML = '';
    document.getElementById('page-number').textContent = 1;
    showMovies(apiUrl);
    document.getElementById('search').value = '';
});

// Event Listener 3: Search for Movies
form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';
     
    const searchTerm = search.value;

    if (searchTerm) {
        showMovies(SEARCHAPI + searchTerm);
        document.getElementById('page-number').textContent = 1;
        search.value = "";
    }
});

function showMovies(url){
    fetch(url).then(res => res.json())
    .then(function(data){
    console.log(data.results);
    data.results.forEach(element => {
        const el = document.createElement('div');
        const image = document.createElement('img');
        const text = document.createElement('h2');

        text.innerHTML = `${element.title}`;
        image.src = IMGPATH + element.poster_path;
        el.appendChild(image);
        el.appendChild(text);
        main.appendChild(el);
    }); 
});
}
