class storyScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'storyScene' });
    }

    preload() {
        this.load.image('story','assets/Pregamescreen.png');
		this.load.atlas('continue','assets/continue.png','assets/continue.json')
    }

    create () {

        this.add.image(0, 0, 'story').setOrigin(0, 0);
		
        this.anims.create({
            key:'proceedflicker',
            frames:[
                {key:'continue',frame:'continue1'},
                {key:'continue',frame:'continue2'},
            ],
            frameRate:1,
            repeat:-1
        });

        console.log("This is storyScene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
		
		this.physics.add.sprite(640, 460, 'continue').play('proceedflicker')
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto level1");
        this.scene.stop("storyScene");
        this.scene.start("level1");
        }, this );

    }

}
