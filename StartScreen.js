myGame.StartScreen = function(game) {
this.startBG;
this.startButton;
this.controlsButton;
this.highScoresButton;
};
myGame.StartScreen.prototype = {
create: function () {
console.log("in start screen");
//Reinitialises level and final score variables.
level = 1;
finalScore = 0;
//Adds the background and game over music to the game.
background = this.add.audio('background');
gameover = this.add.audio('gameover');
drumroll = this.add.audio('drumroll');
applause = this.add.audio('applause');
//Adds all relevant images, enabling input for the buttons and calling the relevant function when they are clicked on.
this.startBG = this.add.image(400, 300, 'titlescreen');
this.startBG.anchor.setTo(0.5, 0.5);
this.startButton = this.add.image(310, 300, 'StartButton');
this.startButton.anchor.setTo(0.5, 0.5);
this.startButton.inputEnabled = true;
this.startButton.events.onInputDown.addOnce(this.startGame, this);
this.controlsButton = this.add.image(490, 300, 'ControlsButton');
this.controlsButton.anchor.setTo(0.5, 0.5);
this.controlsButton.inputEnabled = true;
this.controlsButton.events.onInputDown.addOnce(this.controls, this);
this.highScoresButton = this.add.image(400, 400, 'HighScoresButton');
this.highScoresButton.anchor.setTo(0.5, 0.5);
this.highScoresButton.inputEnabled = true;
this.highScoresButton.events.onInputDown.addOnce(this.highScores, this);
},
startGame: function () {
this.state.start('MainGameScreen');
},
controls: function () {
this.state.start('Controls');	
},
highScores: function () {
this.state.start('HighScores');
}
};