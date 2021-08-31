class mainScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'mainScene' });
    }

    preload() {
        this.load.image('main','assets/Titlescreen.png');
		this.load.atlas('start','assets/proceed.png','assets/proceed.json')
		this.load.audio('mainmenu','assets/mainmenu.mp3');
    }

    create () {

        this.add.image(0, 0, 'main').setOrigin(0, 0);
		
		this.bgmSnd = this.sound.add('mainmenu');
		this.bgmSnd.play();
		this.bgmSnd.loop = true;
		
        this.anims.create({
            key:'startflicker',
            frames:[
                {key:'start',frame:'proceed1.png'},
                {key:'start',frame:'proceed2.png'},
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
		this.bgmSnd.loop = false;
        this.bgmSnd.stop()
        }, this );

		this.physics.add.sprite(544, 690, 'start').play('startflicker')
		
    }

}
