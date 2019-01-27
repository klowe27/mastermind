# Mastermind

#### A code breaking game, 1.28.2019

#### By **Kristin Brewer-Lowe, Daniel Bennett, Alex Garcia and Jared Reando**

## Description

This app recreates the board game Mastermind. In this game, the user tries to guess a code made up of four colors (randomly generated from a pool of six colors). For each guess, the game generates gold and white pegs to indicate how close the user's guess is, allowing the user to refine their guess. The game is over when the user wins by correctly guessing the code or loses by running out of turns before guessing the code.

This app was originally created as a group project at Epicodus. A few months after the group project was complete, I applied new skills I had acquired and completely refactored the code to separate concerns, use Webpack, make it modular, add testing and redesign the UI.

<img src="img/sample1.png" alt="home screen">

<img src="img/sample2.png" alt="game">

## Setup/Installation Instructions

* View directly at: https://klowe27.github.io/mastermind/
* Or, in the command line, clone this repository with $ git clone https://github.com/klowe27/mastermind
* Navigate into the directory and use command $ npm install
* To open the application in Chrome, use command $ npm run start
* To run the test suite, use command $ npm test

## Known Bugs

* No known bugs.

## Specifications

* Basic rules: The game generates a code made up of four colors (generated from six possible colors). The user tries to guess the code and with each guess gets gold and white peg results to indicate how close their guess is: a gold peg indicates one of the colors they guessed was an exact match (the right color in the right position), and a white peg indicates a color match (the color was correct, but it wasn't in the correct position). The user continues to refine their guess based on the peg results and tries to guess the master code before they run out of guesses.
* Difficulty: Users can select between three difficulty levels: easy, medium hard. These levels determine how many guesses a user gets. The hard setting also adds a time component, so users have to guess the code before the time runs out. The easy setting limits the master code to four colors with no repeating colors.
* Valid guesses: Users must submit a guess of four colors to make a valid guess. An alert is shown if a guess isn't valid.
* Info & rules: Hovering over the "?" in the bottom-left corner reveals rules and game info.
* Cheat button: If you press the "e" in "Mastermind", the player's guess will fill with the master code.

## Future Features

* Custom difficulty: The code is structured in a way to make it easy to add custom difficulty in the future to allow users to choose the number of guesses and the amount of time they'd like to solve the code.
* Optimize and make responsive for smaller screens.

## Support and Contact Details

If you discover a bug or would like to make a suggestion, email me at kristin.lowe1@gmail.com.

## Technologies Used

JavaScript, WebPack, Karma, Jasmine, CSS, HTML, Javascript and jQuery.

### License

Copyright (c) 2018 **Kristin Brewer-Lowe, Daniel Bennett, Alex Garcia and Jared Reando**

This software is licensed under the MIT license.
