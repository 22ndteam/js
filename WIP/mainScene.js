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
        var key1 = this.input.keyboard.addKey(49);
        var key2 = this.input.keyboard.addKey(50);
        var key3 = this.input.keyboard.addKey(51);
        var key4 = this.input.keyboard.addKey(52);
        var key5 = this.input.keyboard.addKey(53);
        var key6 = this.input.keyboard.addKey(54);


        key1.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level1");
            }, this );

        key2.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level2");
            }, this );

        key3.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level3");
            }, this ); 
            
        key4.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level4");
            }, this );
                
                
        key5.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level5");
            }, this );        
                
        key6.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level6");
            }, this ); 
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto main2Scene");
        this.scene.stop("mainScene");
        this.scene.start("main2Scene");
        }, this );

		this.physics.add.sprite(640, 425, 'start').play('startflicker')
		
    }

}
