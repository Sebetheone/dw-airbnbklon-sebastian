const detailContainer = document.querySelector('#destination-detail');
const urlParams = new URLSearchParams(window.location.search);
const destinationId = urlParams.get('id');

function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

function toggleFavorite(id) {
  let favs = getFavorites();
  favs = favs.includes(id) ? favs.filter(favId => favId !== id) : [...favs, id];
  localStorage.setItem('favorites', JSON.stringify(favs));
  renderDetail();
}

function renderDetail() {
  if (!destinationId) {
    detailContainer.innerHTML = "<p>Ingen destination valgt.</p>";
    return;
  }

  fetch(`data/${destinationId}.json`)
    .then(res => res.json())
    .then(dest => {
      const isFav = getFavorites().includes(dest.id);

      detailContainer.innerHTML = `
        <div class="detail-container">
          <div class="detail-image-wrapper">
            <img src="img/${dest.image}" alt="${dest.destination}">
            <button class="favorit-btn" onclick="toggleFavorite(${dest.id})">
              <span>${isFav ? '❤️' : '🖤'}</span>
              <span>FAVORIT</span>
            </button>
          </div>

          <div class="detail-info">
            <span class="destination-tag">${dest.destination}</span>
            <h1 class="detail-title">${dest.title}</h1>
            <p class="detail-subtitle">${dest.subtitle}</p>
            <p class="detail-text">${dest.text}</p>

            <div class="facilities-wrapper">
              <h3>Faciliteter</h3>
              <ul>
                ${dest.facilities.map(fac => `<li>${fac}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      `;
    })
    .catch(err => console.error("Fejl ved hentning af detaljevisning:", err));
}

renderDetail();