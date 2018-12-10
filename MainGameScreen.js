myGame.MainGameScreen = function(game) {
//Declares variables.
this.map;
this.layer;
this.rightedge;
this.bottomedge;
this.toprightcorner;
this.bottomrightcorner;
this.character;
this.finishFlag;
this.healthbar;
this.health5;
this.health4;
this.health3;
this.health2;
this.health1;
this.chain = 0;
this.maxChain = 0;
this.asteroids;
this.bullets;
this.asteroid;
this.bullet;
this.healthPowerups;
this.ammoPowerups;
this.healthPowerup;
this.ammoPowerup;
this.blast;
this.ammoCollect;
this.healthCollect;
this.scoreTextStyle = { font: "bold 32pt Calibri", fill: "#e1e1e1", align: "left" };
this.ammoTextStyle = { font: "bold 32pt Calibri", fill: "#e1e1e1", align: "left" };
this.chainTextStyle = { font: "bold 32pt Calibri", fill: "#e1e1e1", align: "right" };
this.timeTextStyle = { font: "bold 32pt Calibri", fill: "#e1e1e1", align: "center" };
this.scoreText;
this.ammoText;
this.chainText;
this.timeText;
this.health = 5;
this.ammo = 50;
this.score = 0;
this.powerupNumber1;
this.powerupNumber2;
this.neverHit = true;
this.isFiring = false;
this.isJumping = false;
this.timeMinutes;
this.timeSeconds1;
this.timeSeconds2;
};

myGame.MainGameScreen.prototype = {
create: function() {
//Plays the background music.
if (level == 1)
{
background.loopFull();
}
//Starts the game's physics system.
this.physics.startSystem(Phaser.Physics.ARCADE);
//Sets the world's bounds to the size of the tile map.
        this.world.setBounds(0,0,7500,1000);
                //Adds all relevant images.
                this.rightedge = this.add.sprite(800, 300, 'rightedge');
                this.rightedge.anchor.setTo(0.5, 0.5);
                this.rightedge.fixedToCamera = true;
                this.toprightcorner = this.add.sprite(800, 0, 'topleftcorner'); 
                this.toprightcorner.anchor.setTo(0.5, 0.5);
                this.toprightcorner.fixedToCamera = true;
                this.bottomrightcorner = this.add.sprite(800, 600, 'toprightcorner'); 
                this.bottomrightcorner.anchor.setTo(0.5, 0.5);
                this.bottomrightcorner.fixedToCamera = true;
                this.bottomedge = this.add.sprite(400, 800, 'bottomedge');
                this.bottomedge.anchor.setTo(0.5, 0.5);
                this.bottomedge.fixedToCamera = true;
                this.physics.enable(this.bottomedge, Phaser.Physics.ARCADE);
                this.gameBackground = this.add.image (this.world.centerX, this.world.centerY, 'GameBackground');
                this.gameBackground.anchor.setTo(0.5, 0.5);
                //Adds groups for asteroids, both types of powerups, and bullets. Enables physics for all of them.
                this.asteroids = this.add.group();
                this.asteroids.enableBody = true;
                this.bullets = this.add.group();
                this.bullets.enableBody = true;
                this.healthPowerups = this.add.group();
                this.healthPowerups.enableBody = true;
                this.ammoPowerups = this.add.group();
                this.ammoPowerups.enableBody = true;
		this.character = this.add.sprite(80,30,'character');
		this.physics.enable(this.character, Phaser.Physics.ARCADE);
        this.character.anchor.setTo(0.5, 0.5);
                //Sets gravity for the player only.
		this.character.body.gravity.y = 500;
                //Sets the camera to follow the player.
		this.camera.follow(this.character);
        //Uses the level variable to determine the right tile map to load.
        if (level == 1) {
        this.map = this.add.tilemap('level1');
        }
        if (level == 2) {
        this.map = this.add.tilemap('level2');
        }
        if (level == 3) {
        this.map = this.add.tilemap('level3');
        }
        this.map.addTilesetImage('CO3717', 'tiles');
        this.layer = this.map.createLayer('Tile Layer 1');
//Sets the tiles the player cannot pass through.
this.map.setCollision([1, 2, 4, 6, 7, 8]);
//Adds the finish flag. When the player touches it, they complete the level.
this.finishFlag = this.add.sprite(7400, 607.5, 'finishflag');
this.finishFlag.anchor.setTo(0.5, 0.5);
this.physics.enable(this.finishFlag, Phaser.Physics.ARCADE);
this.finishFlag.body.immovable = true;
//Adds the health meter, current health, score text, ammo text, and chain text.
this.healthbar = this.add.sprite(695.5, 50.5, 'healthbar');
this.healthbar.anchor.setTo(0.5, 0.5);
this.health5 = this.add.sprite(695.5, 50.5, 'health5');
this.health5.anchor.setTo(0.5, 0.5);
this.scoreText = this.add.text(100.5, 30, this.score.toString(), this.scoreTextStyle);
this.scoreText.anchor.setTo(0.5, 0.5);
this.ammoText = this.add.text(50, 570, this.ammo.toString(), this.ammoTextStyle);
this.ammoText.anchor.setTo(0.5, 0.5);
this.chainText = this.add.text(730, 570, this.chain.toString() + "/" + this.maxChain.toString(), this.chainTextStyle);
this.chainText.anchor.setTo(0.5, 0.5);
this.timeMinutes = 3;
this.timeSeconds1 = 3;
this.timeSeconds2 = 0
this.timeText = this.add.text(400, 30, this.timeMinutes.toString() + ":" + this.timeSeconds1.toString() + this.timeSeconds2.toString(), this.timeTextStyle);
this.timeText.anchor.setTo(0.5, 0.5);
this.healthbar.fixedToCamera = true;
this.health5.fixedToCamera = true;
this.scoreText.fixedToCamera = true;
this.ammoText.fixedToCamera = true;
this.chainText.fixedToCamera = true;
this.timeText.fixedToCamera = true;
//Sets timers for repeated functions.
this.time.events.loop(Phaser.Timer.SECOND * 1, this.timeUpdate, this);
this.time.events.loop(Phaser.Timer.SECOND * 3, this.asteroidSpawn, this);
this.time.events.loop(Phaser.Timer.SECOND * 5, this.powerupAppear, this);
},
update: function() {
//Makes it impossible for the player or any powerups to pass through tiles.
this.physics.arcade.collide(this.character, this.layer);
this.physics.arcade.collide(this.healthPowerup, this.layer);
this.physics.arcade.collide(this.ammoPowerup, this.layer);
//Sets functions to be called when collisions occur.
this.physics.arcade.collide(this.asteroids, this.bullets, this.bulletHitAsteroid, null, this);
this.physics.arcade.collide(this.character, this.asteroids, this.characterHitAsteroid, null, this);
this.physics.arcade.collide(this.character, this.healthPowerups, this.healthPowerupCollect, null, this);
this.physics.arcade.collide(this.character, this.ammoPowerups, this.ammoPowerupCollect, null, this);
this.physics.arcade.collide(this.character, this.finishFlag, this.finish, null, this);
this.physics.arcade.collide(this.character, this.bottomedge, this.fallOut, null, this);
                //Sets movement and firing controls.
		if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
			this.character.body.velocity.x = -350;
		}
		else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		this.character.body.velocity.x = 350;	
		}
		else {
		this.character.body.velocity.x *= 0.8;	
		}
		if (this.input.keyboard.isDown(Phaser.Keyboard.UP)){
		if (this.character.body.onFloor() && this.isJumping == false){
                this.isJumping = true;
		this.character.body.velocity.y = -500;	
		}
		}
                else {
                this.isJumping = false;
                }
                if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
                        if (this.isFiring == false && this.ammo > 0) {
                        this.isFiring = true;
                        this.ammo -= 1;
                        this.ammoText.setText(this.ammo.toString());
                        this.bullet = this.bullets.create(this.character.x, this.character.y, 'bullet');
                        this.physics.enable(this.bullet, Phaser.Physics.ARCADE);
                        this.bullet.anchor.setTo(0.5, 0.5);
                        this.bullet.body.velocity.x = 500;
                }
                }
                else
                {
                this.isFiring = false;
                }
},
asteroidSpawn: function() {
//Creates an asteroid at a random location on the right edge of the screen (but not on top of any tiles) and sets its X velocity to -300.
this.asteroid = this.asteroids.create(this.rightedge.x, this.rnd.integerInRange(this.toprightcorner.y, this.bottomrightcorner.y - 250), 'asteroid');
this.physics.enable(this.asteroid, Phaser.Physics.ARCADE);
this.asteroid.anchor.setTo(0.5, 0.5);
this.asteroid.body.velocity.x = -300;
},
bulletHitAsteroid: function(asteroid, bullet) {
this.blast = this.add.sprite(this.asteroid.x, this.asteroid.y, 'blast');
this.blast.anchor.setTo(0.5, 0.5);
this.time.events.add(Phaser.Timer.SECOND, this.blastDisappear, this);
//Generates a number between 1 and 10. If 10 is generated, the asteroid drops a powerup.
this.powerupNumber1 = this.rnd.integerInRange(1, 10);
if (this.powerupNumber1 == 10) {
//Generates either 1 or 2, to determine which type of powerup is dropped. Either way, physics is enabled for the powerup and gravity is set to 500 for it.
this.powerupNumber2 = this.rnd.integerInRange(1, 2);
if (this.powerupNumber2 == 1) {
this.healthPowerup = this.healthPowerups.create(this.asteroid.x, this.asteroid.y, 'healthPowerup');
this.physics.enable(this.healthPowerup, Phaser.Physics.ARCADE);
this.healthPowerup.anchor.setTo(0.5, 0.5);
this.healthPowerup.body.gravity.y = 500;
}
else
{
this.ammoPowerup = this.ammoPowerups.create(this.asteroid.x, this.asteroid.y, 'ammoPowerup');
this.physics.enable(this.ammoPowerup, Phaser.Physics.ARCADE);
this.ammoPowerup.anchor.setTo(0.5, 0.5);
this.ammoPowerup.body.gravity.y = 500;
}
}
//The player's score is increased by 1000 and their chain is increased by 1. If this brings it greater than their maximum chain, their maximum chain is also increased by 1.
this.score += 1000;
this.scoreText.setText(this.score.toString());
this.chain += 1;
if (this.chain > this.maxChain) {
this.maxChain = this.chain;
}
this.chainText.setText(this.chain.toString() + "/" + this.maxChain.toString());
//Destroys both the bullet and asteroid.
this.bullet.kill();
this.asteroid.kill();
},
characterHitAsteroid: function(character, asteroid) {
//Destroys the asteroid and sets the Never Hit variable to false.
this.asteroid.kill()
this.neverHit = false;
//If the player only has 1 health left, reinitialises all variables and begins the Game Over state.
if (this.health == 1) {
this.health1.kill()
this.neverHit = true;
this.health = 5;
this.chain = 0;
this.maxChain = 0;
this.chainText.setText(this.chain.toString() + "/" + this.maxChain.toString());
this.score = 0;
this.scoreText.setText(this.score.toString());
this.ammo = 50;
this.ammoText.setText(this.ammo.toString());
background.stop();
this.state.start('GameOverScreen');
}
else {
//If not, resets the player's chain, decreases their health by 1, destroys the current health image and replaces it with the correct one as determined by a series of If tests.
this.chain = 0;
this.chainText.setText(this.chain.toString() + "/" + this.maxChain.toString());
this.health -= 1;
if (this.health == 4) {
this.health5.kill()
this.health4 = this.add.sprite(695.5, 50.5, 'health4');
this.health4.fixedToCamera = true;
this.health4.anchor.setTo(0.5, 0.5);
}
else if (this.health == 3) {
this.health4.kill()
this.health3 = this.add.sprite(695.5, 50.5, 'health3');
this.health3.fixedToCamera = true;
this.health3.anchor.setTo(0.5, 0.5);
}
else if (this.health == 2) {
this.health3.kill()
this.health2 = this.add.sprite(695.5, 50.5, 'health2');
this.health2.fixedToCamera = true;
this.health2.anchor.setTo(0.5, 0.5);
}
else {
this.health2.kill()
this.health1 = this.add.sprite(695.5, 50.5, 'health1');
this.health1.fixedToCamera = true;
this.health1.anchor.setTo(0.5, 0.5);
}
}
},
healthPowerupCollect: function(character, healthPowerup) {
this.healthCollect = this.add.sprite(this.healthPowerup.x, this.healthPowerup.y, 'healthCollect');
this.healthCollect.anchor.setTo(0.5, 0.5);
this.time.events.add(Phaser.Timer.SECOND * 1, this.healthCollectDisappear, this);
//Increases the player's score by 500 and their health by 2 if it is 3 or less, 1 if it is 4, and does nothing else if it is 5. Destroys the current health image and displays the correct one as determined by a series of If tests. Destroys the health powerup.
this.score += 500;
this.scoreText.setText(this.score.toString());
if (this.health == 5) {

}
else if (this.health == 4 || this.health == 3) {
if (this.health == 4) {
this.health4.kill()
}
if (this.health == 3) {
this.health3.kill()
}
this.health = 5;
this.health5 = this.add.sprite(695.5, 50.5, 'health5');
this.health5.fixedToCamera = true;
this.health5.anchor.setTo(0.5, 0.5);
}
else
{
this.health += 2;
if (this.health == 4) {
this.health2.kill()
this.health4 = this.add.sprite(695.5, 50.5, 'health4');
this.health4.fixedToCamera = true;
this.health4.anchor.setTo(0.5, 0.5);
}
if (this.health == 3) {
this.health1.kill()
this.health3 = this.add.sprite(695.5, 50.5, 'health3');
this.health3.fixedToCamera = true;
this.health3.anchor.setTo(0.5, 0.5);
}
}
this.healthPowerup.kill();
},
ammoPowerupCollect: function () {
this.ammoCollect = this.add.sprite(this.ammoPowerup.x, this.ammoPowerup.y, 'ammoCollect');
this.ammoCollect.anchor.setTo(0.5, 0.5);
this.time.events.add(Phaser.Timer.SECOND * 1, this.ammoCollectDisappear, this);
//Increases the player's score by 750 and their ammo by 20 if it is less than 79. Otherwise, their ammo is set to the maximum 99. Destroys the ammo powerup.
this.score += 750;
this.scoreText.setText(this.score.toString());
if (this.ammo > 78) {
this.ammo = 99;
}
else
{
this.ammo += 20;
}
this.ammoText.setText(this.ammo.toString());
this.ammoPowerup.kill()
},
powerupAppear: function () {
//Generates a number between 1 and 10. If 10 is generated, a powerup appears somewhere on the game screen.
this.powerupNumber1 = this.rnd.integerInRange(1, 10);
if (this.powerupNumber1 == 10) {
//Generates either 1 or 2, to determine which type of powerup appears. Either way, physics is enabled for the powerup and gravity is set to 500 for it.
this.powerupNumber2 = this.rnd.integerInRange(1, 2);
if (this.powerupNumber2 == 1) {
this.healthPowerup = this.healthPowerups.create(this.rnd.integerInRange(this.toprightcorner.x, this.toprightcorner.x - 550), this.rnd.integerInRange(this.toprightcorner.y, this.toprightcorner.y + 600), 'healthPowerup');
this.physics.enable(this.healthPowerup, Phaser.Physics.ARCADE);
this.healthPowerup.anchor.setTo(0.5, 0.5);
this.healthPowerup.body.gravity.y = 500;
}
else
{
this.ammoPowerup = this.ammoPowerups.create(this.rnd.integerInRange(this.toprightcorner.x, this.toprightcorner.x - 550), this.rnd.integerInRange(this.toprightcorner.y, this.toprightcorner.y + 600), 'ammoPowerup');
this.physics.enable(this.ammoPowerup, Phaser.Physics.ARCADE);
this.ammoPowerup.anchor.setTo(0.5, 0.5);
this.ammoPowerup.body.gravity.y = 500;
}
}
},
blastDisappear: function() {
this.blast.kill();
},
ammoCollectDisappear: function() {
this.ammoCollect.kill();
},
healthCollectDisappear: function() {
this.healthCollect.kill();
},
fallOut: function () {
//Reinitialises all variables and begins the Game Over state.
if (this.health == 5) {
this.health5.kill()
}
if (this.health == 4) {
this.health4.kill()
}
if (this.health == 3) {
this.health3.kill()
}
if (this.health == 2) {
this.health2.kill()
}
if (this.health == 1) {
this.health1.kill()
}
this.neverHit = true;
this.health = 5;
this.chain = 0;
this.maxChain = 0;
this.chainText.setText(this.chain.toString() + "/" + this.maxChain.toString());
this.score = 0;
this.scoreText.setText(this.score.toString());
this.ammo = 50;
this.ammoText.setText(this.ammo.toString());
background.stop();
this.state.start('GameOverScreen');
},
timeUpdate: function () {
if (this.timeMinutes == 0 && this.timeSeconds1 == 0 && this.timeSeconds2 == 0)
{
if (this.health == 5) {
this.health5.kill()
}
if (this.health == 4) {
this.health4.kill()
}
if (this.health == 3) {
this.health3.kill()
}
if (this.health == 2) {
this.health2.kill()
}
if (this.health == 1) {
this.health1.kill()
}
this.neverHit = true;
this.health = 5;
this.chain = 0;
this.maxChain = 0;
this.chainText.setText(this.chain.toString() + "/" + this.maxChain.toString());
this.score = 0;
this.scoreText.setText(this.score.toString());
this.ammo = 50;
this.ammoText.setText(this.ammo.toString());
background.stop();
this.state.start('GameOverScreen');
}
else
{
if (this.timeSeconds2 == 0)
{
if (this.timeSeconds1 == 0)
{
this.timeMinutes -= 1;
this.timeSeconds1 = 5;
this.timeSeconds2 = 9;
}
else
{
this.timeSeconds1 -= 1;
this.timeSeconds2 = 9;
}
}
else
{
this.timeSeconds2 -= 1;
}
}
this.timeText.setText(this.timeMinutes.toString() + ":" + this.timeSeconds1.toString() + this.timeSeconds2.toString());
},
finish: function () {
//Calculates the final score for the level. Reinitialises all variables. If the player is on level 3, reinitialises the ammo variable, stops the background music, and starts the Results Screen state. Otherwise, starts the Between Levels state.
finalScore += (this.score + (this.ammo * 100) + (this.chain * 100) + ((this.timeMinutes * 1000) + (this.timeSeconds1 * 100) + (this.timeSeconds2 * 10)));
if (this.chain == this.maxChain)
{
finalScore += 3000;
}
if (this.neverHit == true) {
finalScore += 5000;
}
this.neverHit = true;
this.health = 5;
this.chain = 0;
this.maxChain = 0;
this.chainText.setText(this.chain.toString() + "/" + this.maxChain.toString());
this.score = 0;
this.scoreText.setText(this.score.toString());
if (this.ammo < 50) {
this.ammo = 50;
this.ammoText.setText(this.ammo.toString());
}
if (this.health == 5) {
this.health5.kill()
}
if (this.health == 4) {
this.health4.kill()
}
if (this.health == 3) {
this.health3.kill()
}
if (this.health == 2) {
this.health2.kill()
}
if (this.health == 1) {
this.health1.kill()
}
if (level == 3) {
this.ammo = 50;
this.ammoText.setText(this.ammo.toString());
background.stop();
this.state.start('ResultsScreen');
}
else {
this.state.start('BetweenLevels');
}
}
};
//Boolean property called fixToCamera. Say you have a piece of text called 'myText'. To make it fixed to the camera, you'd use "myText.fixToCamera = true".