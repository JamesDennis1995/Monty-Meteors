myGame.BetweenLevels = function(game){
this.betweenLevelsBG;
this.textStyle = { font: "bold 32pt Calibri", fill: "#ffffff", align: "center" };
this.text;
this.startButton;
};
myGame.BetweenLevels.prototype = {
create: function() {
//Adds 1 to the level variable.
level += 1;
//Restarts the main game.
this.state.start('MainGameScreen');
}
};
