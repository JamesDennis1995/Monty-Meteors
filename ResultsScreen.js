myGame.ResultsScreen = function(game){
this.ResultsBG;
this.textStyle = { font: "bold 32pt Calibri", fill: "#a27dfa", align: "center" };
this.text1;
this.text2;
this.xhr = new XMLHttpRequest();
this.SaveButton;
this.DontSaveButton;
};
myGame.ResultsScreen.prototype = {
create: function() {
this.time.events.add(Phaser.Timer.SECOND * 5, this.scoreDisplay, this);
drumroll.play()
//Adds all relevant images.
this.ResultsBG = this.add.image(400, 300, 'results');
this.ResultsBG.anchor.setTo(0.5, 0.5);
this.text1 = this.add.text(400, 300, "You scored: ", this.textStyle);
this.text1.anchor.setTo(0.5, 0.5);
this.SaveButton = this.add.image(290, 500, 'SaveButton');
this.SaveButton.anchor.setTo(0.5, 0.5);
this.DontSaveButton = this.add.image(510, 500, 'DontSaveButton');
this.DontSaveButton.anchor.setTo(0.5, 0.5);
},
scoreDisplay: function () {
//Displays the final score.
this.text1.setText("You scored: " + finalScore);
this.text2 = this.add.text(400, 400, "Congratulations!", this.textStyle);
this.text2.anchor.setTo(0.5, 0.5);
this.SaveButton.inputEnabled = true;
this.SaveButton.events.onInputDown.addOnce(this.Save, this);
this.DontSaveButton.inputEnabled = true;
this.DontSaveButton.events.onInputDown.addOnce(this.Back, this);
applause.play()
},
Save: function () {
//Prompts the user to enter their name. If they entered something, opens the XML HTTP request, connects to the relevant PHP script, and sends the name entered and the player's final score. Once it has completed, starts the game's Start Screen state.
var name = prompt("Please enter your name", "");
if (name == null || name == "") {
this.SaveButton.events.onInputDown.addOnce(this.Save, this);
}
else
{
this.xhr.open("POST", "HighScoreUpload.php", true);
this.xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
this.xhr.send('name='+name+'&score='+finalScore);
var self = this;
this.xhr.onload = function() {
if (this.readyState == 4 && this.status == 200) {
console.log(this.responseText);
self.state.start('StartScreen');
}
}
}
},
Back: function () {
this.state.start('StartScreen');
}
};
