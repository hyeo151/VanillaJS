//Required DOC Element
const playerLiveEle = document.querySelector("span");
const boardEle = document.querySelector(".board");

const cardImage = "images/card.jpeg";
//Game Variable
const initalLive = 120;
let playerLives = initalLive;

//Set Plyaer Live
const setPlayerLive = (move = 0) => {
  playerLives = playerLives - move;
  if (move < 0) {
    playerLives = -move;
  }
  playerLiveEle.innerText = playerLives;
};

//Generate Cards
const getData = () => [
  { imgSrc: "images/beatles.jpeg", name: "beatles" },
  { imgSrc: "images/blink182.jpeg", name: "blink182" },
  { imgSrc: "images/fkatwigs.jpeg", name: "fkatwigs" },
  { imgSrc: "images/fleetwood.jpeg", name: "fleetwood" },
  { imgSrc: "images/joy-division.jpeg", name: "joy-division" },
  { imgSrc: "images/ledzep.jpeg", name: "ledzep" },
  { imgSrc: "images/metallica.jpeg", name: "metallica" },
  { imgSrc: "images/pinkfloyd.jpeg", name: "pinkfloyd" },
  { imgSrc: "images/beatles.jpeg", name: "beatles" },
  { imgSrc: "images/blink182.jpeg", name: "blink182" },
  { imgSrc: "images/fkatwigs.jpeg", name: "fkatwigs" },
  { imgSrc: "images/fleetwood.jpeg", name: "fleetwood" },
  { imgSrc: "images/joy-division.jpeg", name: "joy-division" },
  { imgSrc: "images/ledzep.jpeg", name: "ledzep" },
  { imgSrc: "images/metallica.jpeg", name: "metallica" },
  { imgSrc: "images/pinkfloyd.jpeg", name: "pinkfloyd" },
];

//Shuffle the cards
const shuffleCards = (cards) => cards.sort((a, b) => Math.random() - 0.5);

const checkCards = (e) => {
  card = e.target;
  card.classList.add("flipped");

  flippedCards = document.querySelectorAll(".flipped");
  if (flippedCards.length == 2) {
    if (
      flippedCards[0].getAttribute("name") ==
      flippedCards[1].getAttribute("name")
    ) {
      //matched cards
      flippedCards.forEach((item) => {
        item.classList.remove("flipped");
        item.style.pointerEvents = "none";
      });
    } else {
      //Unmatched cards
      flippedCards.forEach((item) => {
        item.classList.remove("flipped");
        setTimeout(() => item.classList.remove("toggle"), 500);
      });
      setPlayerLive(1);
    }
  }

  //check if game is over
  if (playerLives == 0) {
    boardEle.style.pointerEvents = "none";
    setTimeout(() => alert("You lose"), 1000);
    reset();
  }

  toggledCards = document.querySelectorAll(".toggle");
  if (toggledCards.length == 16) {
    boardEle.style.pointerEvents = "none";
    setTimeout(() => alert("You win"), 1000);
    reset();
  }
};

const reset = () => {
  boardEle.style.pointerEvents = "all";
  setTimeout(() => setPlayerLive(initalLive * -1), 1000);
  toggledCards = document.querySelectorAll(".toggle");
  toggledCards.forEach((item) => {
    item.classList.remove("toggle");
    item.style.pointerEvents = "all";
  });
};

//Generate cards and append to html
const displayBoard = (item) => {
  const cards = getData();
  const shuffledCards = shuffleCards(getData());

  shuffledCards.forEach((item) => {
    //create card and populate the board
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    card.setAttribute("name", item.name);

    const back = document.createElement("img");
    back.setAttribute("class", "back");
    back.src = cardImage;

    const face = document.createElement("img");
    face.setAttribute("class", "face");
    face.src = item.imgSrc;

    card.append(face);
    card.append(back);

    boardEle.append(card);

    //add Event listener to each cards
    card.addEventListener("click", (e) => {
      card.classList.toggle("toggle");
      checkCards(e);
    });
  });
};

setPlayerLive();
displayBoard();
