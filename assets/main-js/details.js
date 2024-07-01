// ============ global ============
const loading = document.getElementById("js-preloader");
// ============ when start ============
getDetails();
// ============ events ============
// ============ functions ============
async function getDetails() {
  const gameID = new URLSearchParams(location.search).get("id");
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "e0a11ec0a0msh3a6501bd90cbdccp1b226ejsnb8f2742ab260",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameID}`,
      options
    );
    const result = await response.json();
    displayDetails(result);
    loading.classList.add("d-none");
  } catch (error) {
    console.error(error);
  }
}

function displayDetails(game) {
  document.getElementById("detailsContainer").innerHTML = `
  <div class="page-content">
            <div class="row">
              <div class="col-lg-12">
                <div class="feature-banner header-text">
                  <div class="row">
                    <div class="col-lg-4">
                      <img
                        src="${
                      game.thumbnail
                    }"
                        alt=""
                        style="border-radius: 23px"
                      />
                    </div>
                    <div class="col-lg-8">
                      <div class="thumb">
                        <video class="details-video" muted autoplay controls>
                          <source
                            src="${convertToVideo(game)}"
                            type="video/mp4"
                          />
                        </video>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="game-details">
              <div class="row">
                <div class="col-lg-12">
                  <h2>${game.title} Details</h2>
                </div>
                <div class="col-lg-12">
                  <div class="content">
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="left-info">
                          <div class="left">
                            <h4>${game.title}</h4>
                            <span>${game.genre}</span>
                          </div>
                          <ul>
                            <li><i class="fa fa-star"></i> 4.8</li>
                            <li><i class="fa fa-download"></i> 2.3M</li>
                          </ul>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="right-info">
                          <ul>
                            <li><i class="fa fa-star"></i> 4.8</li>
                            <li><i class="fa fa-download"></i> 2.3M</li>
                            <li>
                              <i class="fa fa-server"></i> ${
                              game.minimum_system_requirements.storage.split( " " )[0] }
                            </li>
                            <li><i class="fa fa-gamepad"></i> ${game.genre}</li>
                          </ul>
                        </div>
                      </div>
                      ${showScreenShots(game)}
                      <div class="col-lg-12">
                        <p>${game.description}</p>
                      </div>
                      <div class="col-lg-12">
                        <div class="main-border-button">
                          <a href="${game.game_url}"
                            >Download ${game.title} Now!</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `;
}
function showScreenShots(object) {
  let screens = ``;
  object.screenshots.forEach((element) => {
    screens += `
  <div class="col-lg-4">
    <img src="${element.image}" alt="" style="border-radius: 23px; margin-bottom: 30px;">
  </div>
  `;
  });
  return screens;
}
const convertToVideo = (response) =>
  response.thumbnail.replace("thumbnail.jpg", "videoplayback.webm");
