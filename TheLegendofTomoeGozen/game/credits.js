class credits extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'credits' });
    }

    preload() {
        this.load.image('thanksto','assets/credits.png');
		this.load.atlas('continue','assets/continue.png','assets/continue.json')
		this.load.audio('creditsmusic','assets/credits.mp3');
    }

    create () {

		this.bgmSnd = this.sound.add('creditsmusic');
		this.bgmSnd.play();
		this.bgmSnd.loop = true;
		
        this.add.image(0, 0, 'thanksto').setOrigin(0, 0);
		
        this.anims.create({
            key:'proceedflicker',
            frames:[
                {key:'continue',frame:'continue1'},
                {key:'continue',frame:'continue2'},
            ],
            frameRate:1,
            repeat:-1
        });

		this.physics.add.sprite(640, 525, 'continue').play('proceedflicker')
		
        console.log("This is credits");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, reply game");
		this.bgmSnd.loop = false;
		this.bgmSnd.stop()
        this.scene.stop("credits");
        this.scene.start("congratulations");
        }, this );

    }

}
