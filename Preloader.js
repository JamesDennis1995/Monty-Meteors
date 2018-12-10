myGame.Preloader = function(game) {
this.preloadBar = null;
this.titleText = null;
this.ready = false;
};


myGame.Preloader.prototype = {
	
	
preload: function () {
//Creates the preload bar and game logo.
this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
this.preloadBar.anchor.setTo(0.5, 0.5);
this.load.setPreloadSprite(this.preloadBar);
this.titleText = this.add.image(this.world.centerX, this.world.centerY-170, 'titleimage');
this.titleText.anchor.setTo(0.5, 0.5);
//Loads all other images, sound and tilemaps.
this.load.image('titlescreen', 'images/TitleBG.png');
this.load.image('gameover', 'images/GameOverBG.png');
this.load.image('results', 'images/ResultsBG.png');
this.load.image('controlsBG', 'images/ControlsBG.png');
this.load.image('controls', 'images/Controls.png');
this.load.image('StartButton', 'images/StartPrompt.png');
this.load.image('BackButton', 'images/BackButton.png');
this.load.image('ControlsButton', 'images/ControlsButton.png');
this.load.image('HighScoresButton', 'images/HighScoresButton.png');
this.load.image('SaveButton', 'images/SaveButton.png');
this.load.image('DontSaveButton', 'images/DontSaveButton.png');
this.load.image('GameBackground', 'images/BG.png');
this.load.image('character', 'images/rocket.png');
this.load.image('asteroid', 'images/rock.png');
this.load.image('blast', 'images/Blast.png');
this.load.image('ammoCollect', 'images/AmmoCollect.png');
this.load.image('healthCollect', 'images/HealthCollect.png');
this.load.image('bullet', 'images/bullet.png');
this.load.image('ammoPowerup', 'images/Ammo.png');
this.load.image('healthPowerup', 'images/Health.png');
this.load.image('finishflag', 'images/FinishFlag.png');
this.load.image('healthbar', 'images/Health - Bar.png');
this.load.image('health5', 'images/Health - 5.png');
this.load.image('health4', 'images/Health - 4.png');
this.load.image('health3', 'images/Health - 3.png');
this.load.image('health2', 'images/Health - 2.png');
this.load.image('health1', 'images/Health - 1.png');
this.load.image('rightedge', 'images/RightEdge.png');
this.load.image('bottomedge', 'images/BottomEdge.png');
this.load.image('topleftcorner', 'images/TopLeftCorner.png');
this.load.image('toprightcorner', 'images/TopRightCorner.png');
this.load.audio('background', 'sound/background.mp3');
this.load.audio('gameover', 'sound/gameover.mp3');
this.load.audio('drumroll', 'sound/drumroll.mp3');
this.load.audio('applause', 'sound/applause.mp3');
this.load.tilemap('level1', 'images/L1..json', null, Phaser.Tilemap.TILED_JSON);
this.load.tilemap('level2', 'images/L2..json', null, Phaser.Tilemap.TILED_JSON);
this.load.tilemap('level3', 'images/L3..json', null, Phaser.Tilemap.TILED_JSON);
this.load.image('tiles', 'images/3717TileMap.png');
console.log('loaded titlescreen image');


},


create: function () {
console.log("in preloader");
this.preloadBar.cropEnabled = false;
},


update: function () {
this.ready = true;
//Begins the Start Screen state.
this.state.start('StartScreen');
}

};
