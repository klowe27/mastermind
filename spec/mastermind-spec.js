import { Mastermind } from './../src/mastermind.js';

describe('Mastermind', function() {
  let mastermindEasy;
  let mastermindMedium;
  let mastermindHard;

  beforeEach(function() {
    mastermindEasy = new Mastermind("easy");
    mastermindMedium = new Mastermind("medium");
    mastermindHard = new Mastermind("hard");
  });

  describe('constructor', function() {
    it('should create a new instance of Mastermind and save all properties', function() {
      expect(mastermindEasy.difficulty).toEqual("easy");
      expect(mastermindEasy.rows).toEqual(11);
      expect(mastermindEasy.seconds).toEqual(120);
      expect(mastermindEasy.colorOptionNumber).toEqual(4);
      expect(mastermindEasy.playerGuess).toEqual([]);
      expect(mastermindEasy.tempPlayerGuess).toEqual([]);
      expect(mastermindEasy.tempMasterConfig).toEqual([]);
      expect(mastermindEasy.blackPeg).toEqual(0);
      expect(mastermindEasy.whitePeg).toEqual(0);
      expect(mastermindEasy.currentTurn).toEqual(0);
      expect(mastermindEasy.winStatus).toEqual("");

      expect(mastermindMedium.difficulty).toEqual("medium");
      expect(mastermindMedium.rows).toEqual(11);
      expect(mastermindMedium.colorOptionNumber).toEqual(6);

      expect(mastermindHard.difficulty).toEqual("hard");
      expect(mastermindHard.rows).toEqual(7);
      expect(mastermindHard.colorOptionNumber).toEqual(6);
    });
  });

});
