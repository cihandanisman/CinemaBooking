//Seats
const container = document.querySelector(".seats-container");
const seats = document.querySelectorAll(".seat:not(.reserved)");
const ticketAmount = document.querySelector("#count");
const total = document.querySelector("#total");

//Film
const movieInfoSection = document.querySelector(".movieInfo");
const form = document.querySelector(".form");
const movieInput = document.querySelector("#input");
const message = document.querySelector(".message");
const postCard = document.querySelector(".postcard");

//ticket price
let ticketPrice = 150;

//fetch
// const url = http://www.omdbapi.com/?i=tt3896198&apikey=2b2c8b99
// const keyApi = 2b2c8b99

const fetchData = async () => {
  const movieTitle = movieInput.value.trim();
  const apiKey = "2b2c8b99";
  const url = `https://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`;

  if (!movieTitle == "") {
    try {
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        updateMovieInfo(data);
      } else {
        throw new Error("Warning!!!");
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    message.textContent = "Please enter a movie!!";
    message.className = "text-bg-danger";
  }
};

//create innerHTML
const updateMovieInfo = (data) => {
  postCard.innerHTML = `
    <article class="postcard light blue">
    <a href="#" class="postcard_img_link">
      <img class="movieImg float-end" src=" ${data.Poster}" style="width: 200px" alt="Movie Image" />
    </a>
    <div class="postcard_text t-dark">
      <h1 class="postcard_title blue"> ${data.Title}</h1>
      <div class="postcard_subtitle small">
        <time datetime=" ${data.Released}">
          <i class="releasetime fas fa-calendar-alt mr-2"></i> ${data.Released}
        </time>
      </div>
      <div class="postcard__bar"></div>
      <div class="postcard__preview-txt"> ${data.Plot} </div>
      <ul class="postcard__tagbox">
        <li class="genre"><i class="fas fa-tag mr-2"></i> ${data.Genre} </li>
        <li class="language"><i class="fas fa-language mr-2"></i> ${data.Language} </li>
        <li class="tag__item play blue"><a href="#"><i class="trailer fas fa-play mr-2"></i> Play Trailer </a></li>
        <li class="duration"><i class="fas fa-clock mr-2"></i> ${data.Runtime} </li>
        <li class="imdb"><i class="fas fa-imdb mr-2"></i> ${data.imdbRating} </li>
      </ul>
    </div>
  </article>
    `;
};

//submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchData();
  form.reset();
});

//seat select event
container.addEventListener("click", (e) => {
  console.log(e.target);
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("reserved")
  ) {
    e.target.classList.toggle("selected");
  }
  calculateSelectedSeats();
});

const calculateSelectedSeats = () => {
  const selectedSeats = document.querySelectorAll(".seat.selected");
  const selectedIndex = Array.from(selectedSeats).map((seat) => {
    return [...seat.parentNode.children].indexOf(seat);
  });

// const calculateSelectedSeats = () => {
//   const selectedSeatsIndexes = [];
//   const seats = document.querySelectorAll(".seat");

//   seats.forEach((seat, index) => {
//     if (seat.classList.contains("selected")) {
//       selectedSeatsIndexes.push(index);
//     }
//   });
  localStorage.setItem("selectedSeats:", JSON.stringify(selectedIndex));

  const selectedSeatsCount = selectedSeats.length;
  ticketAmount.textContent = selectedSeatsCount;

  total.textContent = selectedSeatsCount * ticketPrice;
};
