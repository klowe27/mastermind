import { submitGuessOnBoard, cheatOnBoard, clearGuessOnBoard, guessOnBoard, startGame, winCheckOnBoard } from './user-interface-logic.js';

export class Mastermind {
  constructor(difficulty){
    this.difficulty = difficulty;
    this.rows = 0;
    this.seconds = 0;
    this.colorOptions = ["#FF2B18", "#50C878", "#0080FF", "#FFFF66", "#9B30FF", "#FFB732"];
    this.masterCode = this.masterCode();
    this.playerGuess = [];
    this.tempPlayerGuess = [];
    this.tempMasterCode = [];
    this.goldPeg = 0;
    this.whitePeg = 0;
    this.currentTurn = 0;
    this.winStatus = "";
  }

  masterCode() {
    let code = [];
    for (let i = 0; i < 4; i++) {
      let randomNumber = this.randomNumber(this.colorOptions.length);
      code.push(this.colorOptions[randomNumber]);
    }
    return code;
  }

  setDifficulty() {
    switch (this.difficulty) {
    case "easy":
      this.rows = 11;
      this.colorOptions.length = 4;
      this.masterCode = this.colorOptions.slice();
      console.log(this.masterCode);
      for (let i = 0; i < 4; i++) {
        let randomNum = this.randomNumber(4);
        let randomNum2 = this.randomNumber(4);
        let x = this.masterCode[randomNum];
        this.masterCode[randomNum] = this.masterCode[randomNum2];
        this.masterCode[randomNum2] = x;
      }

      break;
    case "medium":
      this.rows = 11;
      break;
    case "hard":
      this.rows = 7;
      this.seconds = 120;
      break;
    }
    startGame(this);
  }

  guess(color) {
    if (this.playerGuess.length < 4){
      this.playerGuess.push(color);
      guessOnBoard(color, this);
    }
  }

  submitGuess() {
    this.exactMatch();
    this.colorMatch();
    submitGuessOnBoard(this);
    this.winCheck();
    this.endTurn();
  }

  clearGuess(){
    this.playerGuess = [];
    clearGuessOnBoard(this);
  }

  cheat() {
    this.playerGuess = this.masterCode;
    cheatOnBoard(this);
  }

  endTurn() {
    this.playerGuess = [];
    this.tempPlayerGuess = [];
    this.tempMasterCode = [];
    this.goldPeg = 0;
    this.whitePeg = 0;
    this.currentTurn++;
  }

  winCheck() {
    if (this.goldPeg === 4){
      this.winStatus = true;
    } else if (this.currentTurn === (this.rows-1)) {
      this.winStatus = false;
    }
    winCheckOnBoard(this);
  }

  exactMatch() {
    for(let i = 0; i < 4; i++) {
      if(this.playerGuess[i] === this.masterCode[i]) {
        this.goldPeg++;
        this.tempPlayerGuess.push("GuessMatch");
        this.tempMasterCode.push("MasterMatch");
      } else {
        this.tempPlayerGuess.push(this.playerGuess[i]);
        this.tempMasterCode.push(this.masterCode[i]);
      }
    }
  }

  colorMatch() {
    for (let i = 0; i < 4; i++) {
      if(this.tempMasterCode.includes(this.tempPlayerGuess[i])) {
        this.whitePeg++;
        let index = this.tempMasterCode.indexOf(this.tempPlayerGuess[i]);
        this.tempMasterCode.splice(index,1,'ColorMatch');
      }
    }
  }

  randomNumber(max) {
    return (Math.floor((Math.random() * max)));
  }
}
