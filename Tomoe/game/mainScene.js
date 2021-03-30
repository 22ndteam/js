class mainScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'mainScene' });
    }

    preload() {
        this.load.image('main','assets/Titlescreen.png');
		this.load.atlas('start','assets/proceed.png','assets/proceed.json')

    }

    create () {

        this.add.image(0, 0, 'main').setOrigin(0, 0);
		
        this.anims.create({
            key:'startflicker',
            frames:[
                {key:'start',frame:'proceed1'},
                {key:'start',frame:'proceed2'},
            ],
            frameRate:1,
            repeat:-1
        });

        console.log("This is mainScene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto main2Scene");
        this.scene.stop("mainScene");
        this.scene.start("main2Scene");
        }, this );

		this.physics.add.sprite(640, 425, 'start').play('startflicker')
		
    }

}
