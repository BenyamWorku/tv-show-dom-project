//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function zeroPadder(inputNumber) {

  return inputNumber < 10 ? "0" + inputNumber : inputNumber;

}
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  const dropDownElem = document.getElementById("drop-down");
  
  episodeList.forEach((episode) => {
    const { name, image, season,number,
      summary } = episode;
    const episodeEl = document.createElement('div');
    episodeEl.classList.add("episode-card");
    episodeEl.innerHTML = `
      <div class="season-title">
          <h1>S${zeroPadder(season)}-E${zeroPadder(number)}</h1>
          <h2>${name}</h2>
      </div>
      <img src="${image.medium}" alt="${name}">
      <div class="summary-text">
        <h3>${summary}</h3>
      </div>`
    let elem = document.createElement("option");
    elem.textContent = name;
    elem.value = name;
    dropDownElem.appendChild(elem);
    rootElem.appendChild(episodeEl);

  })
  
}
// const search = document.getElementById('search');
// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const searchInput = search.value;
//   if(.includes('searchInput'))
// })

window.onload = setup;
