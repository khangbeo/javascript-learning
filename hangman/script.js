const wrongLetter = document.getElementById("wrong-letters");
const word = document.getElementById("word");
const finalMessage = document.getElementById("final-message");
const playAgainBtn = document.getElementById("play-again");
const notificationContainer = document.getElementById("notification-container");
const popup = document.getElementById("popup-container");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["grandad", "application", "programming", "poop", "peepee"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// show hidden word
function displayWord() {
  word.innerHTML = `
        ${selectedWord
          .split("")
          .map(
            (letter) => `
        <span class='letter'>${
          correctLetters.includes(letter) ? letter : ""
        }</span>`
          )
          .join("")}
    `;
  const innerWord = word.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations!";
    popup.style.display = "flex";
  }
}

// Update wrong letters
function updateWrongLetters() {
  wrongLetter.innerHTML = `
        ${wrongLetters.length > 0 ? `<p>Wrong</p>` : ""}
        ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = `Unfortunately you lost.`;
    popup.style.display = "flex";
  }
}

// Show notification
function showNotification() {
  notificationContainer.classList.add("show");

  setTimeout(() => {
    notificationContainer.classList.remove("show");
  }, 2000);
}

function reset() {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();

  updateWrongLetters();
  popup.style.display = "none";
}

// keydown letter press
window.addEventListener("keydown", (e) => {
  if (e.key >= "a" && e.key <= "z") {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLetters();
      } else {
        showNotification();
      }
    }
  }
});

playAgainBtn.addEventListener("click", reset);

displayWord();
