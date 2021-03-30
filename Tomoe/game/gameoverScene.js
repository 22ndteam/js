class gameoverScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'gameoverScene' });
    }

    preload() {
        this.load.image('gameover','assets/Deathscreen.png');
		this.load.atlas('continue','assets/continue.png','assets/continue.json')
    }

    create () {

        this.add.image(0, 0, 'gameover').setOrigin(0, 0);
		
        this.anims.create({
            key:'proceedflicker',
            frames:[
                {key:'continue',frame:'continue1'},
                {key:'continue',frame:'continue2'},
            ],
            frameRate:1,
            repeat:-1
        });

		this.physics.add.sprite(640, 420, 'continue').play('proceedflicker')
		
        console.log("This is gameoverScene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
        console.log("Spacebar pressed, reply game");
        this.scene.stop("gameoverScene");
        this.scene.start("level1");
        }, this );

    }

}
