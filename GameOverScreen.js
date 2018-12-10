myGame.GameOverScreen = function(game){
this.GameOverBG;
this.BackButton; 
};
myGame.GameOverScreen.prototype = {
create: function() {
gameover.play();
GameOverBG = this.add.sprite(400, 300, 'gameover');
GameOverBG.anchor.setTo(0.5, 0.5);
BackButton = this.add.sprite(400, 300, 'BackButton');
BackButton.anchor.setTo(0.5, 0.5);
BackButton.inputEnabled = true;
BackButton.events.onInputDown.addOnce(this.Back, this);
},
Back: function () {
gameover.stop();
this.state.start('StartScreen');
}
};
