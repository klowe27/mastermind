import $ from 'jquery';

export function startGame(mastermind) {
  $(".difficultyButtons").hide();
  $("h1").removeClass("marginTop");
  // $('#buildRows').empty();
  // $('#stagingBoard').empty();
  // $('#colorGuess').empty();
  $("#cheat").css("color", "white");
  $("#game").slideDown(1500);
  setDifficulty(mastermind)
  buildColorButtons(mastermind);
  buildRows(mastermind);
  buildstagingBoard();
}

function setDifficulty(mastermind) {
  gameTimer(mastermind);
  if (this.difficulty === "easy" || this.difficulty === "medium") {
    $("#timer").hide();
  } else {
    gameTimer(mastermind);
  }
}

function buildRows(mastermind) {
  for (let i = mastermind.rows; i >= 0; i--) {
    let htlmToInsert = `<div class='row'><div class='col-md-1'><div class='rowNumber'>${(i+1)}</div></div>`;
    for (let j = 0; j < 4; j++) {
      htlmToInsert += `<div id='${i}-${j}'class='emptyCircle'></div>`;
    }
    htlmToInsert += `<div id='pegResult' class='row'><div class='col-md-1'>`
    for (let j = 0; j < 4; j++) {
      htlmToInsert += `<div id='peg${i}-${j}'class='pegCircle'></div>`;
    }
    htlmToInsert+= `</div></div></div>`;
    $('#buildRows').append(htlmToInsert);
  }
}

function buildstagingBoard() {
  for (let i = 0; i <=4; i++) {
    $('#stagingBoard').append(`<div id="stagingBoard-${i}"class="emptyCircle"></div>`);
  }
}

function buildColorButtons(mastermind) {
  let htmlToInsert = "";
  const colorArray = ["red", "green", "blue", "yellow", "purple", "orange"];
  for(let i = 0; i < mastermind.colorOptionNumber; i++) {
    htmlToInsert += `<button type='button' class='colors' id='${colorArray[i]}' value='${colorArray[i]}'></button>`;
  }
  $('#colorGuess').append(`<form id='buttons'>${htmlToInsert}</form>`);
}

function gameTimer(mastermind) {
  $('#timer').css("color", "#A9A9A9");
  let seconds = mastermind.seconds;
  let gametimer = setInterval(function() {
    seconds -= .01;
    $("#timer").text(seconds.toFixed());
    (seconds < 60) ? $("#timer").css("color", "red") : null;
    (mastermind.winStatus === true) ? clearInterval(gametimer) : null;
    if(seconds <= 0) {
      clearInterval(gametimer);
      if (this.difficulty === "hard") {
        $('#lose').show();
        mastermind.winStatus = false;
        $('#timer').text(0.00);
      }
    }
  }, 10);
}

export function guessOnBoard(color, guessLength){
  $(`#stagingBoard-${guessLength}`).css('background-color', color);
  (guessLength >= 3) ? disableGuess() : null;
}

export function clearGuessOnBoard(){
  $("button.colors").prop("disabled",false);
  for (let i =0; i < 4; i ++){
    $(`#stagingBoard-${i}`).css("background-color", "gray");
  }
  $("#cheat").css("color", "white");
}

export function submitGuessOnBoard(mastermind){
  disableGuess(mastermind);
  for (let i= 0; i <mastermind.playerGuess.length; i++){
    $(`#${mastermind.currentTurn}-${i}`).css("background-color", mastermind.playerGuess[i]);
  }
  clearStagingBoard();
  updatePegs(mastermind);
}

export function cheatOnBoard(mastermind) {
  $(`#stagingBoard-${mastermind.playerGuess.length}`).css("background-color", mastermind.masterConfig[(mastermind.playerGuess.length)]);
  disableGuess();
  $("#cheat").css("color", "#CBA72D");
}

function clearStagingBoard() {
  for (let i =0; i < 4; i ++){
    $(`#stagingBoard-${i}`).css("background-color", "gray");
  }
}

function updatePegs(mastermind) {
  for (let i = 0; i < mastermind.tempBlackPeg; i++){
    $(`#peg${mastermind.currentTurn}-${i}`).addClass("blackPeg");
  }
  for (let i = mastermind.tempBlackPeg; i < mastermind.tempWhitePeg + mastermind.tempBlackPeg; i ++) {
    $(`#peg${mastermind.currentTurn}-${i}`).addClass("whitePeg");
  }
}

function disableGuess() {
  $("button.colors").prop("disabled",true);
}

function winCheckOnBoard(mastermind) {
  if (mastermind.winStatus === true) {
    $('#win').show();
  } else if (mastermind.winStatus == false) {
    $('#lose').show();
  }
}

export function createStars() {
  const height = $(window).height();
  const width = $(window).width();
  for (let i = 0; i < 350; i++) {
    $('body').append(`<span class="star" style="left: ${randomNumber(width)}px; bottom: ${randomNumber(height)}px; background-color: rgb(${randomNumber(255)}, ${randomNumber(255)}, ${randomNumber(255)});"></span>`);
  }
  for (let i = 0; i < 1000; i++) {
    $('.star:odd').fadeIn(4000).fadeOut(2000);
    $('.star:even').fadeOut(6000).fadeIn(3000);
  }
}

function randomNumber(max) {
  return Math.floor(Math.random()*max+1)
}
