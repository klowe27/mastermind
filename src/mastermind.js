export class Mastermind {
  constructor(difficulty, rows = 11, seconds = 120, colorOptionNumber = 6){
    this.difficulty = difficulty;
    this.rows = rows;
    this.seconds = seconds;
    this.colorOptionNumber = colorOptionNumber;
    this.masterConfiguration = this.masterConfiguration();
    this.playerGuess = [];
    this.tempPlayerGuess = [];
    this.tempMasterConfig = [];
    this.blackPeg = 0;
    this.whitePeg = 0;
    this.currentTurn = 0;
    this.winStatus = "";
  }

  masterConfiguration() {
    const masterConfigArray = [];
    const colorArray = ["red", "green", "blue", "yellow", "purple", "orange"];
    switch (this.difficulty) {
      case "easy":
        this.rows = 11;
        this.colorOptionNumber = 4;
        const shortColorArray = ["red", "green", "blue", "yellow"]
        let decreasingColorOptions = 4;
        for (let i = 0; i < this.colorOptionNumber; i++) {
          let randomNum = this.randomNumber(decreasingColorOptions);
          masterConfigArray.push(shortColorArray[randomNum]);
          colorArray.splice(randomNum,1);
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
    for (let i = 0; i < 4; i++) {
      let randomNumber = this.randomNumber(this.colorOptionNumber);
      masterConfigArray.push(colorArray[randomNumber]);
    }
    return (masterConfigArray);
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
    this.playerGuess.push(this.masterConfig[(this.playerGuess.length)]);
  }

  endTurn() {
    this.playerGuess = [];
    this.tempPlayerGuess = [];
    this.tempMasterConfig = [];
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
      if(this.playerGuess[i] === this.masterConfig[i]) {
        this.blackPeg += 1;
        this.tempPlayerGuess.push("GuessMatch");
        this.tempMasterConfig.push("MasterMatch");
      } else {
        this.tempPlayerGuess.push(this.playerGuess[i]);
        this.tempMasterConfig.push(this.masterConfig[i]);
      }
    }
  }

  colorMatch() {
    for (let i = 0; i < this.tempPlayerGuess.length; i++) {
      if(this.tempMasterConfig.includes(this.tempPlayerGuess[i])) {
        this.whitePeg += 1;
        this.tempMasterConfig.splice(i,1,'colormatch');
      }
    }
  }

  randomNumber(max) {
    return (Math.floor((Math.random() * max)));
  }

}
