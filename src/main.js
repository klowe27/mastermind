import { startGame, guessOnBoard, clearGuessOnBoard, submitGuessOnBoard, cheatOnBoard, winCheckOnBoard } from './user-interface-logic.js'
import { Mastermind } from './mastermind.js'

$(document).ready(function(){
  let mastermind;
  $(".difficulty").on("click", "button", function(){
    const difficulty = this.id;
    mastermind = new Mastermind(difficulty);
    startGame(mastermind);
  });

  $("#colorGuess").on("click", "button", function(){
    mastermind.guess(this.value);
    guessOnBoard(this.value, mastermind.playerGuess.length);
  });

  $("#clearGuess").click(function(){
    clearGuessOnBoard();
    mastermind.clearGuess();
  });

  $("#submitGuess").click(function(){
    submitGuessOnBoard(mastermind);
    mastermind.submitGuess();
    winCheckOnBoard();
  });

  $("#cheat").click(function(event){
    event.preventDefault();
    cheatOnBoard(mastermind);
    mastermind.cheat();

  });

  $("#info-icon").hover(function(){
    $("#rules").slideUp();
  });

});
