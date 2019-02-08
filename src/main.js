import { createStars } from './user-interface-logic.js';
import { Mastermind } from './mastermind.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
var firebase = require(‘firebase’);
var db = firebase.initializeApp({
     databaseURL: `https://mastermind-38e01.firebaseio.com`
}).database()

$(document).ready(function(){
  createStars();
  $('#info').fadeOut(1000).fadeIn(1000).fadeOut(1000).fadeIn(1000);
  let mastermind;

  $('.difficulty').on('click', 'button', function(){
    const difficulty = this.id;
    mastermind = new Mastermind(difficulty);
    mastermind.setDifficulty();
  });

  $('#colorGuess').on('click', 'button', function(){
    mastermind.guess(this.value);
  });

  $('#clearGuess').click(function(){
    mastermind.clearGuess();
  });

  $('#submitGuess').click(function(){
    if (mastermind.playerGuess.length < 4){
      $('#alert').slideDown(3000).slideUp(1000);
    } else {
      mastermind.submitGuess();
    }
  });

  $('#cheat').click(function(){
    mastermind.cheat();
  });

  $('.playAgain').click(function(){
    location.reload();
  });

  $('#info').hover(function(){
    $('#rules').toggle(300);
  });

});
