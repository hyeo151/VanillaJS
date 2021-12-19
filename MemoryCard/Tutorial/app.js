const mainBoard = document.querySelector(".mainboard");
const playerLivesCount = document.querySelector(".playerLivesCount");
let playerLives = 50;

playerLivesCount.innerText = playerLives;

const getData = () => [
  { src: "images/beatles.jpeg", name: "beatles" },
  { src: "images/blink182.jpeg", name: "blink182" },
  { src: "images/fkatwigs.jpeg", name: "fkatwigs" },
  { src: "images/fleetwood.jpeg", name: "fleetwood" },
  { src: "images/joy-division.jpeg", name: "joy-division" },
  { src: "images/ledzep.jpeg", name: "ledzep" },
  { src: "images/metallica.jpeg", name: "metallica" },
  { src: "images/pinkfloyd.jpeg", name: "pinkfloyd" },
  { src: "images/beatles.jpeg", name: "beatles" },
  { src: "images/blink182.jpeg", name: "blink182" },
  { src: "images/fkatwigs.jpeg", name: "fkatwigs" },
  { src: "images/fleetwood.jpeg", name: "fleetwood" },
  { src: "images/joy-division.jpeg", name: "joy-division" },
  { src: "images/ledzep.jpeg", name: "ledzep" },
  { src: "images/metallica.jpeg", name: "metallica" },
  { src: "images/pinkfloyd.jpeg", name: "pinkfloyd" },
];

//Randomize
const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

//Card Gennerator Function
const cardGenerator = () => {
  const cardData = randomize();
  //Generate the HTML
  cardData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    //Attach the info to the cards
    face.src = item.src;
    card.setAttribute("name", item.name);
    //Attach the cards to the section.
    mainBoard.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};
//Check Cards
const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      console.log("match");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      console.log("wrong");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), 1000);
      });
      playerLives--;
      playerLivesCount.innerText = playerLives;
      if (playerLives === 0) {
        console.log("restart!");
        restart("Try again");
      }
    }
  }

  if (toggleCard.length === 16) {
    restart("We won");
  }
};

//Restart
const restart = (text) => {
  let cardData = randomize();
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  mainBoard.style.pointerEvents = "none";
  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");
    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      faces[index].src = item.src;
      cards[index].setAttribute("name", item.name);
      mainBoard.style.pointerEvents = "all";
    }, 1000);
  });
  playerLives = 6;
  playerLivesCount.innerText = playerLives;
  setTimeout(() => window.alert(text), 1000);
};

cardGenerator();
