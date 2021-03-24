
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
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


// The serach feature
function searchResults(e) {
  const spanEl = document.querySelector('span');
 
  let query = e.target.value.toLowerCase();
  
  let movieTitleEls = document.querySelectorAll(".season-title");
  let movieSummaryEls = document.querySelectorAll(".summary-text");

  

  let episodeCardEls = document.querySelectorAll(".episode-card")
  
  query.split(" ").map((character) => {
    let counter = 0;
    for (let i = 0; i < movieTitleEls.length; i++) {
      
      
      if (movieTitleEls[i].lastElementChild.innerText.toLowerCase().indexOf(character) != -1
        || movieSummaryEls[i].firstElementChild.innerText.toLowerCase().indexOf(character) != -1) {
        episodeCardEls[i].style.display = "";
        counter++;
        spanEl.textContent = `${counter}/73 showing`;

      }
      else {
        spanEl.textContent = `${counter}/73 showing`;

        episodeCardEls[i].style.display = "none";

      }
    }
    
  });
  tele
  
}
const searchElem = document.getElementById("search");
searchElem.addEventListener('input',searchResults)
  

window.onload = setup;
