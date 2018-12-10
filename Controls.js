myGame.Controls = function(game) {
	this.controlsBG;
	this.controls;
	this.backButton;
};
myGame.Controls.prototype = {
	create: function() {
	this.controlsBG = this.add.image(400, 300, 'controlsBG');
	this.controlsBG.anchor.setTo(0.5, 0.5);	
	this.controls = this.add.image(400, 300, 'controls');
	this.controls.anchor.setTo(0.5, 0.5);
	this.BackButton = this.add.image(400, 500, 'BackButton');
    this.BackButton.anchor.setTo(0.5, 0.5);
    this.BackButton.inputEnabled = true;
    this.BackButton.events.onInputDown.addOnce(this.Back, this);	
	},
Back: function () {
this.state.start('StartScreen');
}
};// JavaScript Document