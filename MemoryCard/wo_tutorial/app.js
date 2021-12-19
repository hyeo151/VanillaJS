//Grab all the required DOM Elements
let userLivesElement = document.querySelector("span");
let mainBoard = document.querySelector(".mainBoard");

//Setting User Lives
userLives = 30;
userLivesElement.innerText = userLives;

//Create array of cards
let generateCards = () => {
  const cards = [
    { imgSrc: "images/beatles.jpeg", name: "beatles" },
    { imgSrc: "images/blink182.jpeg", name: "blink182" },
    { imgSrc: "images/fkatwigs.jpeg", name: "fkarwigs" },
    { imgSrc: "images/fleetwood.jpeg", name: "flletwood" },
    { imgSrc: "images/joy-division.jpeg", name: "joy-division" },
    { imgSrc: "images/ledzep.jpeg", name: "ledzep" },
    { imgSrc: "images/metallica.jpeg", name: "metallica" },
    { imgSrc: "images/pinkfloyd.jpeg", name: "pinkfloyd" },
    { imgSrc: "images/beatles.jpeg", name: "beatles" },
    { imgSrc: "images/blink182.jpeg", name: "blink182" },
    { imgSrc: "images/fkatwigs.jpeg", name: "fkarwigs" },
    { imgSrc: "images/fleetwood.jpeg", name: "flletwood" },
    { imgSrc: "images/joy-division.jpeg", name: "joy-division" },
    { imgSrc: "images/ledzep.jpeg", name: "ledzep" },
    { imgSrc: "images/metallica.jpeg", name: "metallica" },
    { imgSrc: "images/pinkfloyd.jpeg", name: "pinkfloyd" },
  ];
  return cards;
};

//Randomize the cards

let shuffleCards = (cards) => {
  cards.sort((a, b) => 0.5 - Math.random());
  return cards;
};

//Populate Board with Cards
let populateBoard = () => {
  cards = generateCards();
  cards = shuffleCards(cards);

  cards.forEach((item) => {
    const cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card");
    cardDiv.setAttribute("name", item.name);
    const face = document.createElement("img");
    face.setAttribute("class", "face");
    const back = document.createElement("div");
    back.setAttribute("class", "back");
    const backImg = document.createElement("img");
    backImg.src = "images/card.jpeg";
    face.src = item.imgSrc;

    mainBoard.append(cardDiv);
    cardDiv.append(face);
    cardDiv.append(back);
    back.append(backImg);

    cardDiv.addEventListener("click", (e) => {
      const selectedCard = e.target;
      cardDiv.classList.toggle("toggle");
      checkCards(e);
    });
  });
};

const checkCards = (e) => {
  selectedCard = e.target;
  selectedCard.classList.add("flipped");
  flippedCards = document.querySelectorAll(".flipped");
  toggledCards = document.querySelectorAll(".toggle");

  if (flippedCards.length == 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      flippedCards.forEach((item) => {
        item.classList.remove("flipped");
        item.style.pointerEvents = "none";
      });
    } else {
      console.log("no match");
      flippedCards.forEach((item) => {
        item.classList.remove("flipped");
        setTimeout(() => item.classList.remove("toggle"), 1000);
      });
      userLives--;
      userLivesElement.innerText = userLives;
    }
  }
  if (toggledCards.length == 16) {
    setTimeout(() => alert("Win !"), 1000);
    restart();
  }
  if (userLives == 0) {
    setTimeout(() => alert("Game Over"), 1000);
    restart();
  }
};

const restart = () => {
  toggledCards = document.querySelectorAll(".toggle");
  toggledCards.forEach((item) => {
    item.classList.remove("toggle");
    item.style.pointerEvents = "all";
  });
  userLives = 20;
  userLivesElement.innerText = userLives;
  cards = generateCards();
  cards = shuffleCards(cards);
};

populateBoard();
