class endgame extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'endgame' });
    }

    preload() {
        this.load.image('epilogue','assets/endgame.png');
		this.load.atlas('proceed','assets/proceed.png','assets/proceed.json')
        this.load.audio('endmusic','assets/end.mp3');
    }

    create () {

        this.add.image(0, 0, 'epilogue').setOrigin(0, 0);

        this.bgmSnd = this.sound.add('endmusic');
		this.bgmSnd.play();
		this.bgmSnd.loop = true;
		
        this.anims.create({
            key:'startflicker',
            frames:[
                {key:'continue',frame:'proceed1'},
                {key:'continue',frame:'proceed2'},
            ],
            frameRate:1,
            repeat:-1
        });

		this.physics.add.sprite(544, 720, 'continue').play('startflicker')
		
        console.log("This is endgame");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        var aDown = this.input.keyboard.addKey('A');

        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, reply game");
        this.scene.stop("endgame");
        this.scene.start("mainScene");
        this.bgmSnd.loop = false;
        this.bgmSnd.stop()
        }, this );

    }

}
