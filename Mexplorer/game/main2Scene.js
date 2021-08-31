class main2Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'main2Scene' });
    }


    preload() {
        this.load.image('main2','assets/Introductionscreen.png');
		this.load.atlas('proceed','assets/proceed.png','assets/proceed.json')

    }

    create () {

        this.add.image(0, 0, 'main2').setOrigin(0, 0);
		
        this.anims.create({
            key:'startflicker',
            frames:[
                {key:'start',frame:'proceed1.png'},
                {key:'start',frame:'proceed2.png'},
            ],
            frameRate:1,
            repeat:-1
        });

        console.log("This is main2Scene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto main2Scene");
        this.scene.stop("main2Scene");
        this.scene.start("storyScene");
        }, this );

		this.physics.add.sprite(544, 978, 'startflicker').play('startflicker')
		
    }

}
