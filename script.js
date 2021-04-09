window.onload = setup();
function setup() {
  buildShowsDropDown();

  makePageForShows();
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
async function displayShowsEpisodes(showId) {
  let API_URL = "http://api.tvmaze.com/shows/" + showId + "/episodes";

  const fetchResult = await fetch(API_URL);

  const data = await fetchResult.json();
  // console.log(data);
  makePageForEpisodes(data);
}

// this function pads the season and episode numbers with a 0 when they are only 1 digit
function zeroPadder(inputNumber) {
  return inputNumber < 10 ? "0" + inputNumber : inputNumber;
}

// this function builds the page
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";
  const spanEl = document.getElementsByTagName("span")[0];
  spanEl.textContent = `${episodeList.length}/${episodeList.length} showing`;
  // const rootElem = document.getElementById("root");
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
}

// The search feature
function searchResults(e) {
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

// search event listener
const searchElem = document.getElementById("search");
searchElem.addEventListener("input", searchResults);

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

      spanEl.textContent = `1/${movieTitleEls.length} showing`;
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

// //shows drop down event listener
const showsDropDownElem = document.getElementById("shows-dropdown");
showsDropDownElem.addEventListener("change", (e) => {
  const rootElem = document.getElementById("root");
  let allShows = sortShows();
  allShows.forEach((show) => {
    if (e.target.value === show.name) {
      displayShowsEpisodes(show.id);
      rootElem.innerHTML = " ";
      const dropDownElem = document.getElementById("drop-down");
      dropDownElem.innerHTML = " ";
      const searchElem = document.getElementById("search");
      searchElem.value = "";
      return;
    }
  });
  // displayShowsEpisodes(showId);
  // rootElem.innerHTML = " ";
  // const dropDownElem = document.getElementById("drop-down");
  // dropDownElem.innerHTML = " ";
  // const searchElem = document.getElementById("search");
  // searchElem.value = "";
});

//--------Level 500 shows----------- //

function makePageForShows() {
  let allShows = sortShows();
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";
  allShows.forEach((show) => {
    const { name, id,rating, image, summary, genres, status, runtime } = show;
    const showEl = document.createElement("div");
    showEl.classList.add("show-card");
    showEl.innerHTML = `
    <div>
      <div>
      <a href="#" class="name-link" onclick="displayShowsEpisodes(${id})"><h1>${name}</h1></a>
        
      </div>
      <img src="${image ? image.medium : ""}" alt="${name}">
      
      <div>
        <h2>${summary}</h2>
      </div>
    </div>
    `;

    rootElem.appendChild(showEl);
  });
  // let showsButton = document.getElementById("shows-nav");
  // showsButton.classList.toggle("shows-nav");
}

//go back to shows button
let showsButton = document.getElementById("shows-nav");
// showsButton.classList.toggle("shows-nav");
showsButton.addEventListener("click", makePageForShows);

//--------set up--------//
// On window load
// window.onload = setup();

//----click on name and be taken to the episodes page----//
// const linkEls = document.querySelectorAll(".name-link");
// let allShows = sortShows();
// // event listener for when the name of a show is clicked on
// for (const link of linkEls) {
  
//   link.addEventListener("click", (e) => {
//     allShows.forEach((show) => {
//       if (e.target.textContent === show.name) {
//         console.log(show.name);
//         displayShowsEpisodes(show.id);
//         // return;
//       }
//       //
//     });
//   });
// }
