// line 159 monetize.js


var matches = 0;
var clicks = 0;
var currentLevel = 1;
var currentLevelTarget = 10;
var clicksToLevelUp = 0;
var moneyEarned = 0;

var all = ["Axe", "ChestBase", "ChestAdvanced", "ChestExpert", "Gauntlet",
  "Helmet", "Orb", "Potion", "Ring", "Shield", "SpellBook", "JokerBase",
  "JokerAdvanced", "JokerExpert"
];
//var all = ["ChestBase", 'ChestAdvanced'];
//var all = ['ChestBase'];
//var all = ['JokerBase', 'JokerAdvanced', 'JokerExpert'];
//var all = ['ChestBase', 'JokerBase'];
var getRandomNumber = getRandomInt(0, all.length - 1);

var upperLineChildren = document.getElementById('Upper').children;
var middleLineChildren = document.getElementById("Middle").children;
var lowerLineChildren = document.getElementById('Lower').children;
var matchesElement = document.getElementById("matches");
var clickElement = document.getElementById("clicks");
var nextLevel = document.getElementById('nextLevel');
var currentLevelElement = document.getElementById('currentLevel');
var moneyEarnedElement = document.getElementById('moneyEarned');
var progressElement = document.getElementById('progressBar');
var buttonRollElement = document.getElementById('roll');

var div1ElementUpper = upperLineChildren[0];
var div2ElementUpper = upperLineChildren[1];
var div3ElementUpper = upperLineChildren[2];
var div4ElementUpper = upperLineChildren[3];
var div5ElementUpper = upperLineChildren[4];

var div1ElementMiddle = middleLineChildren[0];
var div2ElementMiddle = middleLineChildren[1];
var div3ElementMiddle = middleLineChildren[2];
var div4ElementMiddle = middleLineChildren[3];
var div5ElementMiddle = middleLineChildren[4];

var div1ElementLower = lowerLineChildren[0];
var div2ElementLower = lowerLineChildren[1];
var div3ElementLower = lowerLineChildren[2];
var div4ElementLower = lowerLineChildren[3];
var div5ElementLower = lowerLineChildren[4];

//upperHigh match
var upperMatchElements = [div1ElementUpper, div2ElementUpper,
  div3ElementUpper, div4ElementUpper, div5ElementUpper
];

//middle match
var middleMatchElements = [div1ElementMiddle, div2ElementMiddle,
  div3ElementMiddle, div4ElementMiddle, div5ElementMiddle
];

//lowerHigh match
var lowerMatchElements = [div1ElementLower, div2ElementLower,
  div3ElementLower, div4ElementLower, div5ElementLower
];

//rectangular
var rectangularMatchElements = [div1ElementUpper, div2ElementUpper,
  div3ElementUpper, div4ElementUpper, div5ElementUpper, div5ElementMiddle,
  div5ElementLower, div4ElementLower, div3ElementLower, div2ElementLower,
  div1ElementLower, div1ElementMiddle
];

document.onkeypress = function(e) {
  e = e || window.event;
  if (e.keyCode === 13) {
    buttonRollElement.click();
  }
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setRandomImage(randomInt, elements) {
  var counter = 0;

  while (counter < 5) {
    randomInt = getRandomInt(0, all.length - 1);

    if (elements[counter].className === 'JokerExpert') {
      elements[counter].className = 'JokerAdvanced';
    } else if (elements[counter].className === 'JokerAdvanced') {
      elements[counter].className = 'JokerBase';
    } else {
      elements[counter].className = all[randomInt];
    }
    counter += 1;
  }
}

function roll() {
  clickCount();
  calculateLevel();
  setRandomImage(getRandomNumber, upperLineChildren);
  setRandomImage(getRandomNumber, middleLineChildren);
  setRandomImage(getRandomNumber, lowerLineChildren);
}

function areAllClassElementsMatching(elements) {

  var NonJokerArray = [];

  for (var i = 0; i < elements.length; i += 1) {

    var isNotJokerBase = elements[i].className !== 'JokerBase';
    var isNotJokerAdvanced = elements[i].className !== 'JokerAdvanced';
    var isNotJokerExpert = elements[i].className !== 'JokerExpert';

    if (isNotJokerBase && isNotJokerAdvanced && isNotJokerExpert) {
      NonJokerArray.push(elements[i]);
    }
  }

  if (NonJokerArray.lenght = 0) {
    return false;
  }

  for (var y = 0; y < NonJokerArray.length; y += 1) {

    if (NonJokerArray[0].className !== NonJokerArray[y].className) {
      return false;
    }
  }
  return true;
}

function displayMatchingResult(elements, classNameMatch, messageToDisplay) {
  updater();
  highlightCells(elements, classNameMatch);
  displayMessage('En taro User You have Encounter a ' + messageToDisplay);
  removeHighlight(elements, classNameMatch);
}

function match() {

  if (areAllClassElementsMatching(upperMatchElements)) {
    displayMatchingResult(upperMatchElements, 'upperMatch', 'Upper Match');
  }

  if (areAllClassElementsMatching(middleMatchElements)) {
    displayMatchingResult(middleMatchElements, 'middleMatch', 'Middle Match');
  }

  if (areAllClassElementsMatching(lowerMatchElements)) {
    displayMatchingResult(lowerMatchElements, 'lowerMatch', 'Lower Match');
  }

  if (areAllClassElementsMatching(rectangularMatchElements)) {
    displayMatchingResult(rectangularMatchElements, 'rectangularMatch',
      'Rectangular Match');
  }

syncCredits(moneyEarned);
  
  moneyEarnedElement.innerHTML = moneyEarned;
}

function calculateLevel() {
  if (clicks === currentLevelTarget) {
    clicks = 0;
    currentLevelTarget += 10;
    currentLevel += 1;
  }

  currentLevelElement.innerHTML = currentLevel;
  var toLevelUp = ((clicks / currentLevel) * 10).toFixed(2);
  clicksToLevelUp = currentLevelTarget - clicks;
  nextLevel.innerHTML = toLevelUp + ' %';
  progressElement.value = toLevelUp;
}

function clickCount() {
  clicks += 1;
  clickElement.innerHTML = clicks;
}

function updater() {
  matches += 1;
  moneyEarned += 500;
  matchesElement.innerHTML = matches;
}

function highlightCells(cellsToHightlight, classNameToAplly) {
  for (var i = 0; i < cellsToHightlight.length; i += 1) {
    cellsToHightlight[i].classList.add(classNameToAplly);
  }
}

function removeHighlight(cellsToRemoveHightlight, classNameToRemove) {
  for (var i = 0; i < cellsToRemoveHightlight.length; i += 1) {
    cellsToRemoveHightlight[i].classList.remove(classNameToRemove);
  }
}

function displayMessage(message) {
  alert(message);
}
