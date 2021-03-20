//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  
  
  episodeList.forEach((episode) => {
    const { name, image, season,number,
      summary } = episode;
    const episodeEl = document.createElement('div');
    episodeEl.classList.add("episode-card");
    episodeEl.innerHTML = `
      <div class="season-title">
          <h1>S${season}E${number}</h1>
          <h2>${name}</h2>
      </div>
      <img src="${image.medium}" alt="${name}">
      <div class="summary-text">
        <h3>${summary}
        </h3>
      </div>`

    rootElem.appendChild(episodeEl);

  })
  
}

window.onload = setup;
