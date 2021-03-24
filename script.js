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
  console.log(spanEl.textContent);
  let query = e.target.value.toLowerCase();
  console.log(query);

  let movieTitleEls = document.querySelectorAll(".season-title");
  let movieSummaryEls = document.querySelectorAll(".summary-text");

  console.log(movieTitleEls);

  let episodeCardEls = document.querySelectorAll(".episode-card")
  console.log(episodeCardEls);
  query.split(" ").map((character) => {
    let counter = 0;
    for (let i = 0; i < movieTitleEls.length; i++) {
      


      console.log(character);
      console.log(movieTitleEls[i].lastElementChild.innerText);
      
      if (movieTitleEls[i].lastElementChild.innerText.toLowerCase().indexOf(character) != -1
        || movieSummaryEls[i].firstElementChild.innerText.toLowerCase().indexOf(character) != -1) {
        episodeCardEls[i].style.display = "";
        counter++;
        spanEl.textContent = `${counter}/73 showing`;

      }
      else {
        episodeCardEls[i].style.display = "none";

      }
    }
    
  });
  
  
}
const searchElem = document.getElementById("search");
searchElem.addEventListener('input',searchResults)
  

window.onload = setup;
