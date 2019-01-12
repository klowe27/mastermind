export function startGame(mastermind) {
  $(".difficultyButtons").hide();
  $("h1").removeClass("marginTop");
  $('#buildRows').empty();
  $('#stagingBoard').empty();
  $('#colorGuess').empty();
  $("#timer").hide().text('1:00');
  $("#cheat").css("color", "white");
  $("#game").slideDown(1500);
  setDifficulty(mastermind)
  buildColorButtons(mastermind);
  buildRows(mastermind);
  gameTimer(mastermind);
  stagingBoard();
}

function setDifficulty(mastermind) {
  gameTimer(mastermind);
  if (this.difficulty === "easy" || this.difficulty === "medium"){
    $("#timer").hide();
  }
}

function buildRows(mastermind) {
  for (let i = mastermind.rows; i >= 0; i--) {
    let string = `<div class='row'><div class='col-md-1'><div class='rowNumber'>${(i+1)}</div></div>`;
    for (let j = 0; j < 4; j++) {
      string += `<div id='${i}-${j}'class='emptyCircle'></div>`;
    }
    string += `<div id='pegResult' class='row'><div class='col-md-1'>`
    for (let j = 0; j < 4; j++) {
      string += `<div id='peg${i}-${j}'class='pegCircle'></div>`;
    }
    string+= `</div></div></div>`;
    $('#buildRows').append(string);
  }
}

function stagingBoard() {
  for (let i = 0; i <=4; i++) {
    $('#stagingBoard').append(`<div id="stagingBoard-${i}"class="emptyCircle"></div>`)
  }
}

function buildColorButtons(mastermind) {
  let string = "";
  const colorArray = ["red", "green", "blue", "yellow", "purple", "orange"];
  for(let i = 0; i < mastermind.colorOptionNumber; i++) {
    string += `<button type='button' class='colors' id='${colorArray[i]}' value='${colorArray[i]}'></button>`;
  }
  $('#colorGuess').append(`<form id='buttons'>${string}</form>`);
}

function gameTimer(mastermind) {
  $("#timer").css("color", "#A9A9A9");
  let seconds = mastermind.seconds;
  let gametimer = setInterval(function() {
    seconds -= .01;
    $("#timer").text(seconds.toFixed(1));

    if(seconds < 60) {
      $("#timer").css("color", "red");
    }

    if(mastermind.winStatus === true) {
      clearInterval(gametimer);
    }

    if(seconds <= 0) {
      clearInterval(gametimer);
      if (this.difficulty === "hard") {
        $("#lose-modal").show();
      }
    }
  }, 10);
}

export function guessOnBoard(color, guessLength){
  $(`#stagingBoard-${guessLength}`).css('background-color', color);
  if (guessLength >= 3) {
    $("button.colors").prop("disabled",true);
  }
}

export function clearGuessOnBoard(){
  $("button.colors").prop("disabled",false);
  for (let i =0; i < 4; i ++){
    $(`#stagingBoard-${i}`).css("background-color", "gray");
  }
  $("#cheat").css("color", "white");
}

export function submitGuessOnBoard(mastermind){
  if (mastermind.playerGuess.length < 4){
    $("#alert").show();
  } else {
    mastermind.pegResult();
  $("button.colors").prop("disabled",false);
  for (let i= 0; i <mastermind.playerGuess.length; i++){
    $(`#${mastermind.currentTurn}-${i}`).css("background-color", mastermind.playerGuess[i]);
  }
  for (let i =0; i < 4; i ++){
    $(`#stagingBoard-${i}`).css("background-color", "gray");
  }
  for (let i = 0; i < mastermind.tempBlackPeg; i++){
    $(`#peg${mastermind.currentTurn}-${i}`).addClass("blackPeg");
  }
  for (let i = mastermind.tempBlackPeg; i < mastermind.tempWhitePeg + mastermind.tempBlackPeg; i ++) {
    $(`#peg${mastermind.currentTurn}-${i}`).addClass("whitePeg");
  }
 }
}

export function cheatOnBoard(mastermind) {
  $(`#stagingBoard-${mastermind.playerGuess.length}`).css("background-color", mastermind.masterConfig[(mastermind.playerGuess.length)]);
  if (mastermind.playerGuess.length >= 4) {
    $("button.colors").prop("disabled",true);
  }
  $("#cheat").css("color", "#CBA72D");
}
