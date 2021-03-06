import $ from 'jquery';

export function startGame(mastermind) {
  $(".difficulty").hide();
  $("h1").removeClass("marginTop");
  $("#cheat").css("color", "white");
  $("#game").slideDown();
  setDifficulty(mastermind);
  buildColorButtons(mastermind);
  buildRows(mastermind);
  buildstagingBoard();
  buildMasterBoard(mastermind);
}

function setDifficulty(mastermind) {
  if (mastermind.difficulty === "hard" || mastermind.difficulty === "custom") {
    gameTimer(mastermind);
  }
}

function buildRows(mastermind) {
  for (let i = mastermind.rows-1; i >= 0; i--) {
    let rows = `<div class='rowNumber'>${i+1}</div>`;
    for (let j = 0; j < 4; j++) {
      rows += `<div id='${i}-${j}'class='emptyCircle'></div>`;
    }
    rows += `<div id='pegResult'>`;
    for (let j = 0; j < 4; j++) {
      rows += `<div id='peg${i}-${j}'class='pegCircle'></div>`;
    }
    rows += `</div></div>`;
    $('#buildRows').append(rows);
  }
}

function buildstagingBoard() {
  let stagingBoard = "";
  for (let i = 1; i <=4; i++) {
    stagingBoard += `<div id="stagingBoard-${i}"class="emptyCircle"></div>`;
  }
  $('#stagingBoard').append(stagingBoard);
}

function buildMasterBoard(mastermind) {
  for (let i = 0; i < mastermind.masterCode.length; i++) {
    $('#masterBoard').append(`<div id="masterBoard-${i}"class="emptyCircle"></div>`);
    $(`#masterBoard-${i}`).css("background-color", `${mastermind.masterCode[i]}`);
  }
}

function buildColorButtons(mastermind) {
  let colorButtons = "";
  for(let i = 0; i < mastermind.colorOptions.length; i++) {
    colorButtons += `<button type='button' class='colors' value='${mastermind.colorOptions[i]}' style="background-color: ${mastermind.colorOptions[i]}"></button>`;
  }
  $('#colorGuess').append(`<form id='buttons'>${colorButtons}</form>`);
}

function gameTimer(mastermind) {
  let seconds = mastermind.seconds;
  let gametimer = setInterval(function() {
    seconds -= .01;
    $("#timer").text(seconds.toFixed(1));
    (seconds < 60) ? $("#timer").css("color", "#FF2B18") : null;
    (mastermind.winStatus === true) ? clearInterval(gametimer) : null;
    if(seconds <= 0) {
      clearInterval(gametimer);
      mastermind.winStatus = false;
      $('#timer').text(0.00);
      winCheckOnBoard(mastermind);
    }
  }, 10);
}

export function guessOnBoard(color, mastermind){
  $(`#stagingBoard-${mastermind.playerGuess.length}`).css('background-color', color);
  (mastermind.playerGuess.length === 4) ? disableGuess() : null;
}

export function clearGuessOnBoard(){
  for (let i =1; i <= 4; i ++){
    $(`#stagingBoard-${i}`).css("background-color", "gray");
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
    $(`#stagingBoard-${i}`).css("background-color", "gray");
  }
}

function updatePegs(mastermind) {
  for (let i = 0; i < mastermind.goldPeg; i++){
    $(`#peg${mastermind.currentTurn}-${i}`).addClass("goldPeg");
  }
  for (let i = mastermind.goldPeg; i < mastermind.whitePeg + mastermind.goldPeg; i ++) {
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
  if (mastermind.winStatus === true || mastermind.winStatus === false) {
    $('#masterBoard').slideDown(2000);
    setTimeout(function(){
      $('h1').slideUp(1000);
      $('#game').slideUp(3000);
    }, 4000);
    if (mastermind.winStatus === true) {
      setTimeout(function(){
        $('#win').fadeIn(2000);
      }, 5000);
    } else if (mastermind.winStatus === false) {
      setTimeout(function(){
        $('#lose').fadeIn(2000);
      }, 5000);
    }
  }
}

export function createStars() {
  const height = $(window).height();
  const width = $(window).width();
  let stars = "";
  for (let i = 0; i < 350; i++) {
    stars += `<span class="star" style="left: ${randomNumber(width)}px; bottom: ${randomNumber(height)}px; background-color: rgb(${randomNumber(255)}, ${randomNumber(255)}, ${randomNumber(255)});"></span>`;
  }
  $('body').append(stars);
  setInterval(function(){
    $('.star:odd').fadeIn(4000).fadeOut(2000);
    $('.star:even').fadeOut(6000).fadeIn(3000);
  }, 1000);
}

function randomNumber(max) {
  return Math.floor(Math.random()*max+1);
}
