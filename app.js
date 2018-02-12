var inquirer = require('inquirer');
var colors = require('colors');
var Word = require('./Word');


console.log('Hello world'.cyan)

var guesses = 10;
var words = ['dog', 'cat', 'hamster', 'parakeet'];
var word = '';
var correctGuess = false;

function initGame() {
    var randomNum = Math.floor(Math.random() * words.length)
    word = new Word(words[randomNum])
    word.createLetters()
    console.log(word)
}

function playGame () {
    correctGuess = false;
    
    //show blanks and letters
    word.letters.forEach(function(letterObj){
        console.log(letterObj.showing)
    })

    inquirer.prompt([
        {
            name: 'letter',
            message: 'Guess a letter'
        }
    ]).then(function(answer){
        guesses --
        word.checkLetters(answer.letter)
        if(word.guessedRight){
            console.log("You're right!".rainbow)
        }else if(guesses === 0){
            console.log('GAME OVER'.red)
        }else{
            playGame()
        }
    })
}

initGame()
playGame()
