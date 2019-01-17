import $ from 'jquery';

export function startGame(mastermind) {
  $(".difficulty").hide();
  $("h1").removeClass("marginTop");
  $("#cheat").css("color", "white");
  $("#game").slideDown(1500);
  setDifficulty(mastermind);
  buildColorButtons(mastermind);
  buildRows(mastermind);
  buildstagingBoard();
}

function setDifficulty(mastermind) {
  if (mastermind.difficulty === "hard" || mastermind.difficulty === "custom") {
    gameTimer(mastermind);
  }
}

function buildRows(mastermind) {
  for (let i = mastermind.rows-1; i >= 0; i--) {
    let htlmToInsert = `<div class='rowNumber'>${i+1}</div>`;
    for (let j = 0; j < 4; j++) {
      htlmToInsert += `<div id='${i}-${j}'class='emptyCircle'></div>`;
    }
    htlmToInsert += `<div id='pegResult'>`;
    for (let j = 0; j < 4; j++) {
      htlmToInsert += `<div id='peg${i}-${j}'class='pegCircle'></div>`;
    }
    htlmToInsert+= `</div></div>`;
    $('#buildRows').append(htlmToInsert);
  }
}

function buildstagingBoard() {
  for (let i = 1; i <=4; i++) {
    $('#stagingBoard').append(`<div id="stagingBoard-${i}"class="emptyCircle"></div>`);
  }
}

function buildColorButtons(mastermind) {
  let htmlToInsert = "";
  const colorArray = ["#FF8362", "#3CB371", "blue", "yellow", "purple", "orange"];
  for(let i = 0; i < mastermind.colorOptionNumber; i++) {
    htmlToInsert += `<button type='button' class='colors' id='color${i}' value='${colorArray[i]}'></button>`;
  }
  $('#colorGuess').append(`<form id='buttons'>${htmlToInsert}</form>`);
}

function gameTimer(mastermind) {
  $('#timer').css("color", "#A9A9A9");
  let seconds = mastermind.seconds;
  let gametimer = setInterval(function() {
    seconds -= .01;
    $("#timer").text(seconds.toFixed(1));
    (seconds < 60) ? $("#timer").css("color", "red") : null;
    (mastermind.winStatus === true) ? clearInterval(gametimer) : null;
    if(seconds <= 0) {
      clearInterval(gametimer);
      $('#lose').show();
      mastermind.winStatus = false;
      $('#timer').text(0.00);
    }
  }, 10);
}

export function guessOnBoard(color, mastermind){
  $(`#stagingBoard-${mastermind.playerGuess.length}`).css('background-color', color);
  (mastermind.playerGuess.length === 4) ? disableGuess() : null;
}

export function clearGuessOnBoard(){
  for (let i =1; i <= 4; i ++){
    $(`#stagingBoard-${i}`).css("background-color", "#B8B8B8");
  }
  $("#cheat").css("color", "white");
  enableGuess();
}

export function submitGuessOnBoard(mastermind){
  for (let i= 0; i < 4; i++){
    $(`#${mastermind.currentTurn}-${i}`).css("background-color", mastermind.playerGuess[i]);
  }
  clearStagingBoard();
  updatePegs(mastermind);
  winCheckOnBoard(mastermind);
  enableGuess();
}

export function cheatOnBoard(mastermind) {
  $("#cheat").css("color", "#CBA72D");
  for (let i = 1; i <= 4; i++ ) {
    $(`#stagingBoard-${i}`).css("background-color", mastermind.masterCode[i-1]);
  }
}

function clearStagingBoard() {
  for (let i = 1; i <= 4; i ++){
    $(`#stagingBoard-${i}`).css("background-color", "#B8B8B8");
  }
}

function updatePegs(mastermind) {
  for (let i = 0; i < mastermind.blackPeg; i++){
    $(`#peg${mastermind.currentTurn}-${i}`).addClass("blackPeg");
  }
  for (let i = mastermind.blackPeg; i < mastermind.whitePeg + mastermind.blackPeg; i ++) {
    $(`#peg${mastermind.currentTurn}-${i}`).addClass("whitePeg");
  }
}

function enableGuess() {
  $("button.colors").prop("disabled",false);
}

function disableGuess() {
  $("button.colors").prop("disabled",true);
}

export function winCheckOnBoard(mastermind) {
  if (mastermind.winStatus === true) {
    $('h1').hide();
    $('#game').hide();
    $('#win').show();
  } else if (mastermind.winStatus === false) {
    $('h1').hide();
    $('#game').hide();
    $('#lose').show();
  }
}

export function createStars() {
  const height = $(window).height();
  const width = $(window).width();
  for (let i = 0; i < 350; i++) {
    $('body').append(`<span class="star" style="left: ${randomNumber(width)}px; bottom: ${randomNumber(height)}px; background-color: rgb(${randomNumber(255)}, ${randomNumber(255)}, ${randomNumber(255)});"></span>`);
  }
  setInterval(function(){
    $('.star:odd').fadeIn(4000).fadeOut(2000);
    $('.star:even').fadeOut(6000).fadeIn(3000);
  }, 1000);
}

function randomNumber(max) {
  return Math.floor(Math.random()*max+1);
}
