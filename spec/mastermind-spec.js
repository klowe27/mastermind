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
      expect(mastermindEasy.colorOptionNumber).toEqual(6);
      expect(mastermindEasy.masterCode.length).toEqual(4);
      expect(mastermindEasy.playerGuess).toEqual([]);
      expect(mastermindEasy.tempPlayerGuess).toEqual([]);
      expect(mastermindEasy.tempMasterCode).toEqual([]);
      expect(mastermindEasy.blackPeg).toEqual(0);
      expect(mastermindEasy.whitePeg).toEqual(0);
      expect(mastermindEasy.currentTurn).toEqual(0);
      expect(mastermindEasy.winStatus).toEqual("");
    });
  });

  describe('setDifficulty', function() {
    it('should update a player\'s properties based on difficulty', function() {
      mastermindEasy.setDifficulty();
      expect(mastermindEasy.colorOptionNumber).toEqual(4);

      mastermindMedium.setDifficulty();
      expect(mastermindMedium.difficulty).toEqual("medium");
      expect(mastermindMedium.rows).toEqual(11);
      expect(mastermindMedium.colorOptionNumber).toEqual(6);

      mastermindHard.setDifficulty();
      expect(mastermindHard.difficulty).toEqual("hard");
      expect(mastermindHard.rows).toEqual(7);
      expect(mastermindHard.colorOptionNumber).toEqual(6);
    });
  });

  describe('guess', function() {
    it('should store a player\'s color guess in the playerGuess array', function() {
      mastermindMedium.guess("red");
      expect(mastermindMedium.playerGuess).toEqual(["red"]);
    });
  });

  describe('clearGuess', function() {
    it('should empty the playerGuess array', function() {
      mastermindMedium.guess("red");
      mastermindMedium.clearGuess("red");
      expect(mastermindMedium.playerGuess).toEqual([]);
    });
  });

  describe('cheat', function() {
    it('should add the masterCode to the playerGuess', function() {
      mastermindMedium.cheat();
      mastermindMedium.cheat();
      mastermindMedium.cheat();
      mastermindMedium.cheat();
      expect(mastermindMedium.playerGuess).toEqual(mastermindMedium.masterCode);
    });
  });

  describe('endTurn', function() {
    it('should clear all turn properties and ++ the currentTurn', function() {
      mastermindMedium.playerGuess = ["red", "green", "yellow", "purple"];
      mastermindMedium.submitGuess();
      expect(mastermindMedium.playerGuess).toEqual([]);
      expect(mastermindMedium.tempPlayerGuess).toEqual([]);
      expect(mastermindMedium.tempMasterCode).toEqual([]);
      expect(mastermindMedium.blackPeg).toEqual(0);
      expect(mastermindMedium.whitePeg).toEqual(0);
      expect(mastermindMedium.currentTurn).toEqual(1);
    });
  });

  describe('winCheck', function() {
    it('should check if a user has won or lost', function() {
      mastermindMedium.blackPeg = 4;
      mastermindMedium.winCheck();
      expect(mastermindMedium.winStatus).toEqual(true);

      mastermindMedium.blackPeg = 0;
      mastermindMedium.currentTurn = 11;
      mastermindMedium.winCheck();
      expect(mastermindMedium.winStatus).toEqual(false);
    });
  });

  describe('exactMatch and colorMatch', function() {
    it('should compare playerGuess and masterCode for exact matches and color matches', function() {
      mastermindMedium.playerGuess = ["green", "green", "red", "purple"];
      mastermindMedium.masterCode = ["green", "purple", "purple", "red"];
      mastermindMedium.exactMatch();
      mastermindMedium.colorMatch();
      expect(mastermindMedium.blackPeg).toEqual(1);
      expect(mastermindMedium.whitePeg).toEqual(2);
    });
  });
});
