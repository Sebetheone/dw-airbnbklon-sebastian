const container = document.querySelector('#destination-list');

function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

function toggleFavorite(id) {
  let favs = getFavorites();
  favs = favs.includes(id) ? favs.filter(favId => favId !== id) : [...favs, id];
  localStorage.setItem('favorites', JSON.stringify(favs));
  renderList();
}

function renderList() {
  fetch('data/destinations.json')
    .then(res => res.json())
    .then(data => {
      const favs = getFavorites();
      
        container.innerHTML = data.destinations.map(item => {
          const isFav = favs.includes(item.id);
          return `
            <article class="card">
              <img class="card-img" src="img/${item.image}" alt="${item.destination}">
              <div class="card-bar">
                <button class="fav-btn" onclick="toggleFavorite(${item.id})">
                  ${isFav ? '❤️' : '🖤'}
                </button>
                <a class="more-link" href="destination.html?id=${item.id}">MORE</a>
              </div>
            </article>
          `;
        }).join('');
    })
    .catch(err => console.error("Fejl ved hentning af listevisning:", err));
}

renderList();