class main2Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'main2Scene' });
    }


    preload() {
        this.load.image('main2','assets/Introductionscreen.png');
		this.load.atlas('tomoe','assets/TomoeTex.png','assets/TomoeTex.json')
		this.load.atlas('continue','assets/continue.png','assets/continue.json')
        this.load.atlas('samurai','assets/EnemyTex.png','assets/EnemyTex.json')

    }

    create () {

        this.add.image(0, 0, 'main2').setOrigin(0, 0);

        // graphics.fillStyle(0xff3300, 1);

        // graphics.fillRect(100, 200, 600, 300);
        // graphics.fillRect(100, 100, 100, 100);
        // this.add.text(120, 110, 'A', { font: '96px Courier', fill: '#000000' });

        console.log("This is main2Scene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto main2Scene");
        this.scene.stop("main2Scene");
        this.scene.start("storyScene");
        }, this );
		
        this.anims.create({
            key:'TomoeRunRight',
            frames:[
                {key:'tomoe',frame:'WalkRight01'},
                {key:'tomoe',frame:'WalkRight02'},
                {key:'tomoe',frame:'WalkRight03'},
                {key:'tomoe',frame:'WalkRight04'},
                {key:'tomoe',frame:'WalkRight05'},

            ],
            frameRate:10,
            repeat:-1
        });
		
        this.anims.create({
            key:'EnemyRunRight',
            frames:[
                {key:'samurai',frame:'EnemyRight01'},
                {key:'samurai',frame:'EnemyRight02'},
                {key:'samurai',frame:'EnemyRight03'},
                {key:'samurai',frame:'EnemyRight04'},
            ],
            frameRate:10,
            repeat:-1
        });
		
        this.anims.create({
            key:'proceedflicker',
            frames:[
                {key:'continue',frame:'continue1'},
                {key:'continue',frame:'continue2'},
            ],
            frameRate:1,
            repeat:-1
        });
		
		this.physics.add.sprite(500, 455, 'tomoe').play('TomoeRunRight')
		this.physics.add.sprite(500, 600, 'samurai').play('EnemyRunRight')
		this.physics.add.sprite(695, 675, 'continue').play('proceedflicker')
		
    }

}
