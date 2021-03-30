class endgame extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'endgame' });
    }

    preload() {
        this.load.image('epilogue','assets/endgame.png');
		this.load.atlas('continue','assets/continue.png','assets/continue.json')
    }

    create () {

        this.add.image(0, 0, 'epilogue').setOrigin(0, 0);
		
        this.anims.create({
            key:'proceedflicker',
            frames:[
                {key:'continue',frame:'continue1'},
                {key:'continue',frame:'continue2'},
            ],
            frameRate:1,
            repeat:-1
        });

		this.physics.add.sprite(640, 550, 'continue').play('proceedflicker')
		
        console.log("This is endgame");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        var aDown = this.input.keyboard.addKey('A');

        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, reply game");
        this.scene.stop("endgame");
        this.scene.start("credits");
        }, this );

    }

}
