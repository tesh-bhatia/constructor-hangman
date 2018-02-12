var Letter = require('./Letter')

function Word (word) {
    this.word = word;
    this.letters = [];
    this.guessedRight = false;

    this.createLetters = function () {
        var that = this
        var lets = this.word.split("")
        lets.forEach(letter => {
            var newLetter = new Letter(letter)
            that.letters.push(newLetter)
        });
    }

    this.checkLetters = function (guessedLetter) {
        var that = this
        var counter = 0
        
        this.letters.forEach(letterObj => {
            letterObj.check(guessedLetter)
            //add 1 to counter if letter has been guessed
            if(letterObj.guessed === true){
                counter ++
            }
        })

        //all letters have been guessed correctly
        if(counter === that.letters.length){
            that.guessedRight = true
        }
        
    }

}

module.exports = Word



// console.log(JSON.stringify(dog.letters, null, 2))
