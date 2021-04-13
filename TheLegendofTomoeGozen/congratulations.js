class congratulations extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'congratulations' });
    }

    preload() {
        this.load.image('finish','assets/congratulations.png');
		this.load.atlas('proceedto','assets/proceedto.png','assets/proceedto.json')
    }

    create () {

        this.add.image(0, 0, 'finish').setOrigin(0, 0);
		
        this.anims.create({
            key:'proceedflicker1',
            frames:[
                {key:'proceedto',frame:'proceedto1'},
                {key:'proceedto',frame:'proceedto2'},
            ],
            frameRate:1,
            repeat:-1
        });

		this.physics.add.sprite(640, 425, 'proceedto').play('proceedflicker1')
		
        console.log("This is congratulations");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, reply game");
        this.scene.stop("congratulations");
        this.scene.start("mainScene");
        }, this );

    }

}
