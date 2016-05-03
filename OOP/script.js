var SlotImage = function (image, lives, id) {
  this.image = image;
  this.lives = lives;
  this.id = id;
}
var slotImages = [];
var slotImageWrapper = document.getElementById('slotImageWrapper');

var allImages = ["Axe", "ChestBase", "ChestAdvanced", "ChestExpert", "Gauntlet",
  "Helmet", "Orb", "Potion", "Ring", "Shield", "SpellBook", 'TheJoker'];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateHtmlSlotImages (slotImagesList) {
  for (var i = 0; i < slotImagesList.length; i++) {
      var currentDivElement = document.createElement('div');
      currentDivElement.classList.add('slotImage');
      currentDivElement.classList.add(slotImagesList[i].image);
      currentDivElement.id = slotImagesList[i].id;

      slotImageWrapper.appendChild(currentDivElement);
    }
}

function generateAllSlotImages() {

  for (var i = 0; i < 15; i++) {
    var randomNumber = getRandomInt(0, allImages.length - 1);
    var randomImage = allImages[randomNumber];
    var lives = 1;

    if (randomImage === 'TheJoker') {
      lives = getRandomInt(1, 3);
    }

      slotImages.push(new SlotImage(randomImage, lives, i));
    }
}

function updateSlotImagesImage (slotImagesList) {
  for (var i = 0; i < slotImagesList.length; i++) {
    if (slotImagesList[i].lives === 1) {
      var random = getRandomInt(0, allImages.length - 1);
      var newImage = allImages[random];

      slotImagesList[i].image = newImage;

      if (slotImagesList[i].image === 'TheJoker') {
        slotImagesList[i].lives = getRandomInt(1, 3);
      }
    }
  }
}

function updateSlotImagesLives(slotImagesList) {
  for (var i = 0; i < slotImagesList.length; i++) {
    if (slotImagesList[i].lives > 1) {
      slotImagesList[i].lives--;
    }
  }
}

function updateHtmlImages(slotImagesList){
  for (var i = 0; i < slotImagesList.length; i++) {
    var currentHtmlElement = document.getElementById(slotImagesList[i].id);
    currentHtmlElement.className = "slotImage";
    currentHtmlElement.classList.add(slotImagesList[i].image);
  }
}

var rollFunction =  function roll(){
  updateSlotImagesLives(slotImages);
  updateSlotImagesImage(slotImages);
  updateHtmlImages(slotImages);
}

var startGameFunction = function startGame(){
  slotImages = [];
  slotImageWrapper.innerHTML = "";

  generateAllSlotImages();
  generateHtmlSlotImages(slotImages);
}

var hideStartButtonShowRollButton = function hideStartShowRollButton(){
  startGame.style.display = "none";
  rollButton.style.display = "block";
}

var rollButton = document.getElementById('roll');
rollButton.addEventListener('click', rollFunction);
rollButton.style.display = "none";

var startGame = document.getElementById('start');
startGame.addEventListener('click', startGameFunction);
startGame.addEventListener('click', hideStartButtonShowRollButton);
