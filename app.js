var inquirer = require('inquirer');
var colors = require('colors');
var Word = require('./Word');
var randomWords = require('random-words')


var guesses = 15;
var word = '';
var correctGuess = false;

function initGame() {
    guesses = 15
    word = new Word(randomWords()) //use node package to generate random word
    word.createLetters()
}

function playGame () {
    correctGuess = false;
    var wordDisplay = ''
    //show blanks and letters
    word.letters.forEach(function(letterObj){
        wordDisplay += letterObj.showing + ' '
    })
    console.log('\n' + wordDisplay)

    inquirer.prompt([
        {
            name: 'letter',
            message: 'Guess a letter: '
        }
    ]).then(function(answer){
        guesses --
        word.checkLetters(answer.letter)
        if(word.guessedRight){
            var finalWord = ''
            word.letters.forEach(function(letterObj){
                finalWord+= letterObj.showing + ' '
            })
            console.log('\n===================')
            console.log(finalWord.green)
            console.log("You're right!".rainbow)
            console.log('===================')

            playAgain()
        }else if(guesses === 0){
            console.log('\n===================')
            console.log('GAME OVER'.red)
            console.log(word.word.red)
            console.log('===================')

            playAgain()
        }else{
            console.log('\nGuesses left: ' + guesses)
            playGame()
        }
    })
}

function playAgain () {
    inquirer.prompt([
        {
            type: 'confirm',
            message: 'Would you like to play again?',
            name: 'playAgain',
            default: true
        }
    ]).then(function(answer){
        if(answer.playAgain){
            initGame()
            playGame()
        }
    })
}

initGame()
playGame()


