class gameoverScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'gameoverScene' });
    }

    preload() {
        this.load.image('gameover','assets/Deathscreen.png');
		this.load.atlas('restart','assets/restart.png','assets/restart.json')
		this.load.audio('gameovermusic','assets/gameover.mp3');
    }

    create () {
		
		this.bgmSnd = this.sound.add('gameovermusic');
		this.bgmSnd.play();
		this.bgmSnd.loop = true;

        this.add.image(0, 0, 'gameover').setOrigin(0, 0);
		
        this.anims.create({
            key:'retryflicker',
            frames:[
                {key:'restart',frame:'restart1.png'},
                {key:'restart',frame:'restart2.png'},
            ],
            frameRate:1,
            repeat:-1
        });

		this.physics.add.sprite(544, 632, 'restart').play('retryflicker')
		
        console.log("This is gameoverScene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
        console.log("Spacebar pressed, reply game");
		this.bgmSnd.loop = false;
		this.bgmSnd.stop()
        this.scene.stop("gameoverScene");
        this.scene.start("level1");
        }, this );

    }

}
