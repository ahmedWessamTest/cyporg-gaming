// ============== global ==============
const navBtn = document.querySelectorAll("#mainNav li button");
const loading = document.getElementById("js-preloader");
// ============== when start ==============
getGames();
// ============== events ==============
navBtn.forEach((element) => {
  element.addEventListener("click", () => {
    swapActive(element);
    getGames(element.value);
    document.getElementById("bannerCategory").innerHTML = element.value;
  });
});
// ============== functions ==============
async function getGames(selectGame = "shooter") {
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "e0a11ec0a0msh3a6501bd90cbdccp1b226ejsnb8f2742ab260",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${selectGame}`,
      options
    );
    const gamesData = await response.json();
    displayHomeBanner(gamesData);
    displayGames(gamesData);
    loading.classList.add("d-none");
  } catch (error) {
    console.error(error);
  }
}
function displayGames(response) {
  let gamesBox = ``;
  response.forEach((game) => {
    gamesBox += `
    <div class="col-lg-3 col-sm-6">
      <div class="item" onmouseenter="playVideo(event)" onmouseleave="pauseVideo(event)" onclick="gameDetails(${
        game.id
      })">
        <div class="position-relative banner-image-container">
          <img src="${game.thumbnail}" alt="game image" />
          <video
            muted
            loop
            preload="none"
            class="position-absolute top-0 start-0 item-video"
          >
            <source src="${convertToVideo(game)}" />
          </video>
        </div>
        <h4>
          ${game.title}
          <br />
          <span>${game.genre}</span>
        </h4>
      </div>
    </div>
    `;
  });
  document.getElementById("gamesContainer").innerHTML = gamesBox;
}
function swapActive(element) {
  document
    .querySelector("#mainNav li button.active")
    .classList.remove("active");
  element.classList.add("active");
}
function displayHomeBanner(response) {
  const mainBanner = document.getElementById("mainBanner");
  const randomResponse = randomNum(0, response.length - 1);
  try {
    const backgroundUrl = convertToBackground(response[randomResponse]);
    mainBanner.style.cssText = `
      background-image: url(${backgroundUrl})
      `;
    bannerLink(response[randomResponse]);
  } catch {
    mainBanner.style.cssText = `
      background-image: url('../images/banner-bg.jpg')
      `;
  }
}

const convertToBackground = (response) =>
  response.thumbnail.replace("thumbnail.jpg", "background.webp");

const convertToVideo = (response) =>
  response.thumbnail.replace("thumbnail.jpg", "videoplayback.webm");

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function bannerLink(response) {
  document
    .getElementById("mainBannerBtn")
    .setAttribute("href", response.game_url);
}
function playVideo(element) {
  const videoElement = element.target.querySelector("video");
  videoElement.classList.remove("d-none");
  videoElement.preload = "auto";
  videoElement.muted = true;
  videoElement.play();
}
function pauseVideo(element) {
  const videoElement = element.target.querySelector("video");
  videoElement.pause();
  videoElement.preload = "none";
  videoElement.classList.add("d-none");
}
const gameDetails = (id) => (location.href = `./details.html?id=${id}`);