
const trendingTodayRowContent = document.getElementById("trendingTodayRowContent");
const trendingWeekRowContent = document.getElementById("trendingWeekRowContent");
let trendingNames = [];

//function to calculate rating color
function getcolor(rating) {
  if(rating>70) {return "21, 180, 146";}
  if(rating>50 && rating<=70) {return "235, 231, 28";}
  if(rating<=50) {return "184, 55, 55";}
}

//common data for all api calls
const imgSrcStart = "https://www.themoviedb.org/t/p/w220_and_h330_face" ;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGYzZWRlZTQzZmRiN2ZlNWFiNjM0MDI0NmEwMWFiNSIsInN1YiI6IjY0ZTI1MDUwYjc3ZDRiMTEzZTA3ZWVmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nOIkxGjZ3RNISBEVz-Ip4QuLkWLdbGSNfj7O_NgxGiM'
  }
};

//function for trending today list
async function trendingTodayAPI() {
  
  try {
    const trendingTodayData = await fetch("https://api.themoviedb.org/3/trending/all/day", options);
    const trendingTodayJSONData = await trendingTodayData.json();
    const trendingTodayResults = trendingTodayJSONData.results;
    for(let i=0; i<10; i++) {
      //creating cards for the movies and shows
      let card = document.createElement("div");
      let cardimgdiv = document.createElement("div");
      let cardimg = document.createElement("img");
      cardimg.src = imgSrcStart + trendingTodayResults[i].poster_path;
      let cardtext = document.createElement("div");
      let title = trendingTodayResults[i].title || trendingTodayResults[i].name;
      let releaseDate = trendingTodayResults[i].release_date || trendingTodayResults[i].first_air_date;
      cardtext.innerHTML = `<h4 id='contentTitle'>${title}</h4><p>${releaseDate}</p>`;
      let ratingdiv = document.createElement("div");
      let rating = Math.ceil(trendingTodayResults[i].vote_average*10);
      let ratingColor = getcolor(rating);
      ratingdiv.innerHTML = `${rating}<span style='font-size:5px;'>%</span>`;
      ratingdiv.style.background = `radial-gradient(closest-side, rgb(39, 39, 39) 79%, transparent 80% 100%),conic-gradient(rgba(${ratingColor}, 1) ${rating}%, rgba(${ratingColor}, 0.3) 0)`; 

      //adding classes to the divs
      card.classList.add("card");
      cardimgdiv.classList.add("cardimgdiv");
      cardimg.classList.add("cardimg");
      ratingdiv.classList.add("rating");
      cardtext.classList.add("cardtext");

      //append the data in card
      cardimgdiv.appendChild(cardimg);
      cardimgdiv.appendChild(ratingdiv);
      card.appendChild(cardimgdiv);
      card.appendChild(cardtext);
      trendingTodayRowContent.appendChild(card);

      //storing the trending names
      trendingNames.push(title);
    }
  }
  
  catch(error) {
    console.log("Error with fetching api - trending today list..." + error);
  }
}

//function for trending week list
async function trendingWeekAPI() {

  try {
    const trendingWeekData = await fetch("https://api.themoviedb.org/3/trending/all/week", options);
    const trendingWeekJSONData = await trendingWeekData.json();
    const trendingWeekResults = trendingWeekJSONData.results; console.log(trendingWeekResults);
    for(let i=0; i<10; i++) {
      //creating cards for the movies and shows
      let card = document.createElement("div");
      let cardimgdiv = document.createElement("div");
      let cardimg = document.createElement("img");
      cardimg.src = imgSrcStart + trendingWeekResults[i].poster_path;
      let cardtext = document.createElement("div");
      let title = trendingWeekResults[i].title || trendingWeekResults[i].name;
      let releaseDate = trendingWeekResults[i].release_date || trendingWeekResults[i].first_air_date;
      cardtext.innerHTML = `<h4 id='contentTitle'>${title}</h4><p>${releaseDate}</p>`;
      let ratingdiv = document.createElement("div");
      let rating = Math.ceil(trendingWeekResults[i].vote_average*10);
      let ratingColor = getcolor(rating);
      ratingdiv.innerHTML = `${rating}<span style='font-size:5px;'>%</span>`;
      ratingdiv.style.background = `radial-gradient(closest-side, rgb(39, 39, 39) 79%, transparent 80% 100%),conic-gradient(rgba(${ratingColor}, 1) ${rating}%, rgba(${ratingColor}, 0.3) 0)`; 

      //adding classes to the divs
      card.classList.add("card");
      cardimgdiv.classList.add("cardimgdiv");
      cardimg.classList.add("cardimg");
      ratingdiv.classList.add("rating");
      cardtext.classList.add("cardtext");

      //append the data in card
      cardimgdiv.appendChild(cardimg);
      cardimgdiv.appendChild(ratingdiv);
      card.appendChild(cardimgdiv);
      card.appendChild(cardtext);
      trendingWeekRowContent.appendChild(card);

    }
  }

  catch(error) {
    console.log("Error with fetching api - trending week list..." + error);
  }
}

//calling of API functions
window.onload = trendingTodayAPI;
const trendingTodayToggle = document.getElementById("today-trending");
const trendingWeekToggle = document.getElementById("week-trending");
trendingTodayToggle.addEventListener('click', () => {
  if(!trendingTodayToggle.classList.contains('active')) {
    trendingTodayAPI();
    trendingWeekRowContent.innerHTML = "";
  }
});

trendingWeekToggle.addEventListener('click', () => {
  if(!trendingWeekToggle.classList.contains('active')) {
    trendingWeekAPI();
    trendingTodayRowContent.innerHTML = "";
  }
});

//button toggle effect
const buttons = document.querySelectorAll('.toggle-button');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

//search functionality
const searchBtn = document.getElementById("searchSubmit");
searchBtn.addEventListener('click', () => {
  const searchKeyword = document.getElementById("mainPageSearch").value;
  const encodedKeyword = encodeURIComponent(searchKeyword);
  document.getElementById("mainPageSearch").value = encodedKeyword;
  document.getElementById("searchForm").submit();
});

