myGame.HighScores = function(game){
this.HighScoresBG;
this.textStyle = { font: "bold 24pt Calibri", fill: "#a27dfa", align: "center" };
this.textStyle1 = { font: "bold 24pt Calibri", fill: "#daa520", align: "center" };
this.textStyle2 = { font: "bold 24pt Calibri", fill: "#c0c0c0", align: "center" };
this.textStyle3 = { font: "bold 24pt Calibri", fill: "#deab79", align: "center" };
this.text1;
this.text2;
this.text3;
this.text4;
this.text5;
this.text6;
this.text7;
this.text8;
this.text9;
this.text10;
this.text11;
this.text12;
this.text13;
this.text14;
this.scoresObject;
this.xhr = new XMLHttpRequest();
this.BackButton;
};
myGame.HighScores.prototype = {
create: function() {
//Adds all relevant images.
this.HighScoresBG = this.add.image(400, 300, 'results');
this.HighScoresBG.anchor.setTo(0.5, 0.5);
//Opens the XML HTTP request and connects to the relevant PHP script.
this.xhr.open("POST", "GetHighScores.php", true);
this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
this.xhr.send();
var self = this;
this.xhr.onload = function() {
//When the XML HTTP request loads and is received
if (this.readyState==4 && this.status==200) {
//Parses the received array of high scores and displays the top fourteen using text.
self.scoresObject = JSON.parse(this.responseText)
self.text1 = self.add.text(200, 100, "1: " + self.scoresObject[0].Name + " (" + self.scoresObject[0].Score + ")", self.textStyle1);
self.text1.anchor.setTo(0.5, 0.5);
self.text2 = self.add.text(200, 150, "2: " + self.scoresObject[1].Name + " (" + self.scoresObject[1].Score + ")", self.textStyle2);
self.text2.anchor.setTo(0.5, 0.5);
self.text3 = self.add.text(200, 200, "3: " + self.scoresObject[2].Name + " (" + self.scoresObject[2].Score + ")", self.textStyle3);
self.text3.anchor.setTo(0.5, 0.5);
self.text4 = self.add.text(200, 250, "4: " + self.scoresObject[3].Name + " (" + self.scoresObject[3].Score + ")", self.textStyle);
self.text4.anchor.setTo(0.5, 0.5);
self.text5 = self.add.text(200, 300, "5: " + self.scoresObject[4].Name + " (" + self.scoresObject[4].Score + ")", self.textStyle);
self.text5.anchor.setTo(0.5, 0.5);
self.text6 = self.add.text(200, 350, "6: " + self.scoresObject[5].Name + " (" + self.scoresObject[5].Score + ")", self.textStyle);
self.text6.anchor.setTo(0.5, 0.5);
self.text7 = self.add.text(200, 400, "7: " + self.scoresObject[6].Name + " (" + self.scoresObject[6].Score + ")", self.textStyle);
self.text7.anchor.setTo(0.5, 0.5);
self.text8 = self.add.text(600, 100, "8: " + self.scoresObject[7].Name + " (" + self.scoresObject[7].Score + ")", self.textStyle);
self.text8.anchor.setTo(0.5, 0.5);
self.text9 = self.add.text(600, 150, "9: " + self.scoresObject[8].Name + " (" + self.scoresObject[8].Score + ")", self.textStyle);
self.text9.anchor.setTo(0.5, 0.5);
self.text10 = self.add.text(600, 200, "10: " + self.scoresObject[9].Name + " (" + self.scoresObject[9].Score + ")", self.textStyle);
self.text10.anchor.setTo(0.5, 0.5);
self.text11 = self.add.text(600, 250, "11: " + self.scoresObject[10].Name + " (" + self.scoresObject[10].Score + ")", self.textStyle);
self.text11.anchor.setTo(0.5, 0.5);
self.text12 = self.add.text(600, 300, "12: " + self.scoresObject[11].Name + " (" + self.scoresObject[11].Score + ")", self.textStyle);
self.text12.anchor.setTo(0.5, 0.5);
self.text13 = self.add.text(600, 350, "13: " + self.scoresObject[12].Name + " (" + self.scoresObject[12].Score + ")", self.textStyle);
self.text13.anchor.setTo(0.5, 0.5);
self.text14 = self.add.text(600, 400, "14: " + self.scoresObject[13].Name + " (" + self.scoresObject[13].Score + ")", self.textStyle);
self.text14.anchor.setTo(0.5, 0.5);
}
}
//Adds the Back button and enables input on it, calling the Back function when it is clicked.
this.BackButton = this.add.image(400, 500, 'BackButton');
this.BackButton.anchor.setTo(0.5, 0.5);
this.BackButton.inputEnabled = true;
this.BackButton.events.onInputDown.addOnce(this.Back, this);
},
Back: function () {
//Restarts the starting screen.
this.state.start('StartScreen');
}
};
