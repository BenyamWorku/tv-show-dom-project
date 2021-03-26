
const URL = "http://api.tvmaze.com/shows/82/episodes";

async function getEpisodes(URL) {

  const fetchResult = await fetch(URL);

  const data = await fetchResult.json();

  makePageForEpisodes(data);
}
// this function pads the season and episode numbers with a 0 when they are only 1 digit
function zeroPadder(inputNumber) {
  return inputNumber < 10 ? "0" + inputNumber : inputNumber;
}
// this function builds the page
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  const dropDownElem = document.getElementById("drop-down");

  episodeList.forEach((episode) => {
    const { name, image, season, number,
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

    const dropDownOptions = document.createElement("option");
    dropDownOptions.textContent = `S${zeroPadder(season)}-E${zeroPadder(number)}:${name}`;
    dropDownOptions.value = name;


    dropDownElem.appendChild(dropDownOptions);
    rootElem.appendChild(episodeEl);

  })

}


// The serach feature
function searchResults(e) {
  const spanEl = document.querySelector('span');

  let query = e.target.value.toLowerCase().trim();

  const movieTitleEls = document.querySelectorAll(".season-title");
  const movieSummaryEls = document.querySelectorAll(".summary-text");
  const episodeCardEls = document.querySelectorAll(".episode-card");

  query.split(" ").map((character) => {
    let counter = 0;
    for (let i = 0; i < movieTitleEls.length; i++) {


      if (movieTitleEls[i].lastElementChild.innerText.toLowerCase().indexOf(character) != -1
        || movieSummaryEls[i].firstElementChild.innerText.toLowerCase().indexOf(character) != -1) {
        episodeCardEls[i].style.display = "";
        counter++;

      }
      else {
        episodeCardEls[i].style.display = "none";

      }
      spanEl.textContent = `${counter}/73 showing`;
    }

  });


}

// search event listener
const searchElem = document.getElementById("search");
searchElem.addEventListener('input', searchResults);

// dropdown feature 
function dropDownResult(e) {
  const movieTitleEls = document.querySelectorAll(".season-title");
  const episodeCardEls = document.querySelectorAll(".episode-card");
  for (let i = 0; i < movieTitleEls.length; i++) {
    if (e.target.value != movieTitleEls[i].lastElementChild.innerText) {

      episodeCardEls[i].style.display = "none";


    }
    if (e.target.value == movieTitleEls[i].lastElementChild.innerText) {
      episodeCardEls[i].style.display = "";


    }

  }
}
//drop down event listener

const dropDownElem = document.getElementById("drop-down");
dropDownElem.addEventListener("change", dropDownResult);


window.onload = getEpisodes(URL);