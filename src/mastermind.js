export class Mastermind {
  constructor(difficulty, rows = 11, seconds = 120, colorOptionNumber = 6){
    this.difficulty = difficulty;
    this.rows = rows;
    this.seconds = seconds;
    this.colorOptionNumber = colorOptionNumber;
    this.masterCode = this.masterCode();
    this.playerGuess = [];
    this.tempPlayerGuess = [];
    this.tempMasterCode = [];
    this.blackPeg = 0;
    this.whitePeg = 0;
    this.currentTurn = 0;
    this.winStatus = "";
  }

  masterCode() {
    const masterCodeArray = [];
    const colorArray = ["red", "green", "blue", "yellow", "purple", "orange"];
    for (let i = 0; i < 4; i++) {
      let randomNumber = this.randomNumber(this.colorOptionNumber);
      masterCodeArray.push(colorArray[randomNumber]);
    }
    return (masterCodeArray);
  }

  setDifficulty() {
    switch (this.difficulty) {
      case "easy":
        this.rows = 11;
        this.colorOptionNumber = 4;
        this.masterCode = [];
        let shortColorArray = ["red", "green", "blue", "yellow"]
        let decreasingColorOptions = 4;
        for (let i = 0; i < this.colorOptionNumber; i++) {
          let randomNum = this.randomNumber(decreasingColorOptions);
          this.masterCode.push(shortColorArray[randomNum]);
          shortColorArray.splice(randomNum,1);
          decreasingColorOptions -= 1;
        }
        break;
      case "medium":
        this.rows = 11
        this.colorOptionNumber = 6;
        break;
      case "hard":
        this.rows = 7;
        this.colorOptionNumber = 6;
        break;
    }
  }

  guess(color) {
    this.playerGuess.push(color);
  }

  submitGuess() {
    this.winCheck();
    this.exactMatch();
    this.colorMatch();
    this.endTurn();
  }

  clearGuess(){
    this.playerGuess = [];
  }

  cheat() {
    this.playerGuess = this.masterCode;
  }

  endTurn() {
    this.playerGuess = [];
    this.tempPlayerGuess = [];
    this.tempMasterCode = [];
    this.blackPeg = 0;
    this.whitePeg = 0;
    this.currentTurn++;
  }

  winCheck() {
    if (this.blackPeg === 4){
      this.winStatus = true;
    } else {
      if (this.currentTurn === this.rows) {
        this.winStatus = false;
      }
    }
  }

  exactMatch() {
    for(let i = 0; i < 4; i++) {
      if(this.playerGuess[i] === this.masterCode[i]) {
        this.blackPeg++;
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
        this.tempMasterCode.splice(i,1,'ColorMatch');
      }
    }
  }

  randomNumber(max) {
    return (Math.floor((Math.random() * max)));
  }
}
