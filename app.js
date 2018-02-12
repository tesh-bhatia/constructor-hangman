var inquirer = require('inquirer');
var colors = require('colors');
var Word = require('./Word');


console.log('Hello world'.cyan)

var guesses = 10;
var words = ['dog', 'cat', 'hamster', 'parakeet'];
var word = '';
var correctGuess = false;

function initGame() {
    guesses = 10
    var randomNum = Math.floor(Math.random() * words.length)
    word = new Word(words[randomNum])
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
