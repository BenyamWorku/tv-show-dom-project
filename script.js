window.onload = setup();
window.isShowsPageDisplaying;

// let allShows = sortShows();
function setup() {
  let allShows = sortShows();
  let showsButton = document.getElementById("shows-nav");
  showsButton.classList.add("hide");
  buildShowsDropDown();
  makePageForShows(allShows);
}

// this function pads the season and episode numbers with a 0 when they are only 1 digit
function zeroPadder(inputNumber) {
  return inputNumber < 10 ? "0" + inputNumber : inputNumber;
}

function sortShows() {
  const allShows = getAllShows();
  allShows.sort(function (a, b) {
    let nameA = a.name.toLowerCase();
    let nameB = b.name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  return allShows;
}

// build the shows dropdown list
function buildShowsDropDown() {
  let allShows = sortShows();
  allShows.forEach((show) => {
    let showsDropDownElem = document.getElementById("shows-dropdown");
    let showsDropDownOptions = document.createElement("option");
    showsDropDownOptions.textContent = show.name;
    showsDropDownOptions.value = show.name;
    showsDropDownElem.appendChild(showsDropDownOptions);
  });
}

//getting all the shows
async function getShowsEpisodes(showId) {
  let API_URL = "http://api.tvmaze.com/shows/" + showId + "/episodes";

  const fetchResult = await fetch(API_URL);

  const data = await fetchResult.json();
  makePageForEpisodes(data);
}

// this function builds the episodes page
function makePageForEpisodes(episodeList) {
  const searchElem = document.getElementById("search");
  
  let showsButton = document.getElementById("shows-nav");
  showsButton.classList.remove("hide");
  showsButton.classList.add("show");

  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";

  const spanEl = document.getElementsByTagName("span")[0];
  spanEl.textContent = `${episodeList.length}/${episodeList.length} showing`;
  const dropDownElem = document.getElementById("drop-down");

  const allElem = document.createElement("option");
  allElem.value = "Main-page";
  allElem.textContent = "Main-page";

  dropDownElem.appendChild(allElem);

  episodeList.forEach((episode) => {
    const { name, image, season, number, summary } = episode;
    const episodeEl = document.createElement("div");
    episodeEl.classList.add("episode-card");

    episodeEl.innerHTML = `
      <div class="season-title">
          <h1>S${zeroPadder(season)}-E${zeroPadder(number)}</h1>
          <h2>${name}</h2>
      </div>
      
      <img src="${image ? image.medium : ""}" alt="${name}">
      <div class="summary-text">
        <h3>${summary}</h3>
      </div>`;

    const dropDownOptions = document.createElement("option");
    dropDownOptions.textContent = `S${zeroPadder(season)}-E${zeroPadder(
      number
    )}:${name}`;
    dropDownOptions.value = name;
    dropDownElem.appendChild(dropDownOptions);
    rootElem.appendChild(episodeEl);
  });

  isShowsPageDisplaying = false;
  searchEpisodesOrShows(isShowsPageDisplaying);
}

// The search feature
function searchEpisodeResults(e) {
  const spanEl = document.querySelector("span");

  let query = e.target.value.toLowerCase().trim();

  const movieTitleEls = document.querySelectorAll(".season-title");
  const movieSummaryEls = document.querySelectorAll(".summary-text");
  const episodeCardEls = document.querySelectorAll(".episode-card");
  query.split(" ").map((character) => {
    let counter = 0;
    for (let i = 0; i < movieTitleEls.length; i++) {
      if (
        movieTitleEls[i].lastElementChild.innerText
          .toLowerCase()
          .indexOf(character) != -1 ||
        movieSummaryEls[i].firstElementChild.innerText
          .toLowerCase()
          .indexOf(character) != -1
      ) {
        episodeCardEls[i].style.display = "";
        counter++;
      } else {
        episodeCardEls[i].style.display = "none";
      }
      spanEl.textContent = `${counter}/${movieTitleEls.length} showing`;
    }
  });
}
//----------
function searchShowsResults(e) {
  const spanEl = document.querySelector("span");

  let query = e.target.value.toLowerCase().trim();

  const showNameEls = document.querySelectorAll(".show-name");
  const showSummaryEls = document.querySelectorAll(".show-summary");
  const showCardEls = document.querySelectorAll(".show-card");
  query.split(" ").map((character) => {
    let counter = 0;
    for (let i = 0; i < showCardEls.length; i++) {
      if (
        showNameEls[i].innerText.toLowerCase().indexOf(character) != -1 ||
        showSummaryEls[i].innerText.toLowerCase().indexOf(character) != -1
      ) {
        showCardEls[i].style.display = "";
        counter++;
      } else {
        showCardEls[i].style.display = "none";
      }
      spanEl.textContent = `${counter}/${showCardEls.length} showing`;
    }
  });
}

//-----

// episodes dropdown feature
function dropDownResults(e) {
  const movieTitleEls = document.querySelectorAll(".season-title");
  const episodeCardEls = document.querySelectorAll(".episode-card");
  for (let i = 0; i < movieTitleEls.length; i++) {
    if (
      e.target.value == movieTitleEls[i].lastElementChild.innerText ||
      e.target.value == "Main-page"
    ) {
      episodeCardEls[i].style.display = "";
      const spanEl = document.querySelector("span");

      spanEl.textContent = `1/${movieTitleEls.length} episodes showing`;
    } else {
      episodeCardEls[i].style.display = "none";
    }
  }
}
//episodes drop down event listener

const dropDownElem = document.getElementById("drop-down");
dropDownElem.addEventListener("change", (e) => {
  const searchElem = document.getElementById("search");
  searchElem.value = "";
  dropDownResults(e);
});
//-----------------shows dropdown feature---------------------//

const showsDropDownElem = document.getElementById("shows-dropdown");

showsDropDownElem.addEventListener("change", (e) => {
  //show-name:[]
  let allShows = sortShows();
  allShows.forEach((show) => {
    if (e.target.value === show.name) {
      let aSingleShow = [show];
      makePageForShows(aSingleShow);
    }
  });
});
//--------Level 500 shows----------- //

function makePageForShows(showObject) {
  const rootElem = document.getElementById("root");
  let showsButton = document.getElementById("shows-nav");
  const searchElem = document.getElementById("search");
  searchElem.value = "";
  if (showObject.length === 1) {
    showsButton.classList.remove("hide");

    showsButton.classList.add("show");
  }

  rootElem.innerHTML = "";

  showObject.forEach((show) => {
    const { name, id, rating, image, summary, genres, status, runtime } = show;
    const showEl = document.createElement("div");
    showEl.classList.add("show-card");
    showEl.id = `${id}`; // id of the show used as the id attributes value because it is unique
    showEl.innerHTML = `
    <div>
      <div class="name-div>
      <a href="#" class="name-link" onclick="getShowsEpisodes(${id})"><h1 class="show-name">${name}</h1></a>
        
      </div>
      <img src="${image ? image.medium : ""}" alt="${name}">
      
      <div >
        <h2 class="show-summary">${summary}</h2>
      </div>
    </div>
    `;

    rootElem.appendChild(showEl);
  });

  const spanEl = document.querySelector("span");
  spanEl.textContent = `${showObject.length} shows showing`;
  
  isShowsPageDisplaying = true;
  searchEpisodesOrShows(isShowsPageDisplaying);
}

//go back to shows button
let showsButton = document.getElementById("shows-nav");

// Note to self : use caching or local storage instead of invoking set up again and again
let allShows = sortShows();
showsButton.addEventListener("click", setup);

function searchEpisodesOrShows(isShowsPageDisplaying) {
  const searchElem = document.getElementById("search");
  searchElem.value = "";
  if (isShowsPageDisplaying) {
    searchElem.removeEventListener("input", searchEpisodeResults);
    searchElem.addEventListener("input", searchShowsResults);
  } else {
    searchElem.removeEventListener("input", searchShowsResults);
    searchElem.addEventListener("input", searchEpisodeResults);
  }
}
