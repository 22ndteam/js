class level1 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level1' });
        this.coinCount = 5;
        this.isDead = false;
    }

	preload ()
    {
        this.load.atlas('luca','assets/LucaTex.png','assets/LucaTex.json')
        this.load.atlas('slime','assets/EnemyTex.png','assets/EnemyTex.json')
        this.load.atlas('coin','assets/CoinTex.png','assets/CoinTex.json')
        this.load.spritesheet('coindisplay','assets/coindisplay.png',{frameWidth:44, frameHeight: 44})
        var map = this.load.tilemapTiledJSON('Level_1', 'assets/Level_1.json');
        this.load.spritesheet('tiles', 'assets/tileset_dungeon.png', {frameWidth: 32, frameHeight: 32});
		this.load.audio('level1music','assets/level1.mp3');
        this.load.audio('hitsound','assets/hit.mp3');
        this.load.audio('collectsound','assets/collect.mp3');
    }


 create ()
    {

		this.bgmSnd = this.sound.add('level1music');
        this.hitSnd = this.sound.add('hitsound');
        this.collectSnd = this.sound.add('collectsound');
		this.bgmSnd.play();
		this.bgmSnd.loop = true;
		
        var map = this.make.tilemap({key: 'Level_1'});
        var Tiles = map.addTilesetImage('tileset_dungeon','tiles')

        //ground layer
        this.groundLayer = map.createDynamicLayer('BaseLayer', Tiles, 0, 0);
        this.groundLayer = map.createDynamicLayer('RandomLayer', Tiles, 0, 0);
        this.groundLayer2 = map.createDynamicLayer('HoleLayer', Tiles, 0, 0);
        this.groundLayer2.setCollisionByProperty({shield:true});
        this.groundLayer1 = map.createStaticLayer('BarricadeLayer', Tiles, 0, 0);
		this.groundLayer1.setCollisionByProperty({shield:true});

        this.coindisplay1 = this.add.image(1038,50, 'coindisplay').setScrollFactor(0);
        this.coindisplay1.setVisible(false);
		this.coindisplay2 = this.add.image(988,50, 'coindisplay').setScrollFactor(0);
        this.coindisplay2.setVisible(false);
		this.coindisplay3 = this.add.image(938,50,'coindisplay').setScrollFactor(0);
        this.coindisplay3.setVisible(false);
        this.coindisplay4 = this.add.image(888,50, 'coindisplay').setScrollFactor(0);
        this.coindisplay4.setVisible(false);
		this.coindisplay5 = this.add.image(838,50,'coindisplay').setScrollFactor(0);
        this.coindisplay5.setVisible(false);

        //world boundaries
        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;

        //object layers
        var startPoint = map.findObject("objectLayer", obj => obj.name === "startPoint");
		var enemy01 = map.findObject("objectLayer", obj => obj.name === "enemy01");
		var enemy02 = map.findObject("objectLayer", obj => obj.name === "enemy02");
		var enemy03 = map.findObject("objectLayer", obj => obj.name === "enemy03");
		var enemy04 = map.findObject("objectLayer", obj => obj.name === "enemy04");
        var enemy05 = map.findObject("objectLayer", obj => obj.name === "enemy05");
        var coin01 = map.findObject("objectLayer", obj => obj.name === "coin01");
        var coin02 = map.findObject("objectLayer", obj => obj.name === "coin02")
        var coin03 = map.findObject("objectLayer", obj => obj.name === "coin03")
        var coin04 = map.findObject("objectLayer", obj => obj.name === "coin04")
        var coin05 = map.findObject("objectLayer", obj => obj.name === "coin05")

        //character sprites
        this.player = this.physics.add.sprite(startPoint.x, startPoint.y, 'luca')
        this.player.setScale(1);
        this.player.setCollideWorldBounds(true);
	
		this.groundLayer.setCollisionByProperty({ collides: true });
		this.physics.add.collider(this.groundLayer1, this.player);
		this.physics.add.collider(this.groundLayer2, this.player);

        window.player = this.player;

        this.anims.create({
            key:'IdleRight',
            frames:[
                {key:'luca',frame:'Idle01.png'},    
                {key:'luca',frame:'Idle02.png'},
            ],
            frameRate:5,
            repeat:-1
        });

        this.anims.create({
            key:'LucaRunRight',
            frames:[
                {key:'luca',frame:'WalkRight01.png'},
                {key:'luca',frame:'WalkRight02.png'},
                {key:'luca',frame:'WalkRight03.png'},

            ],
            frameRate:5,
            repeat:-1
        });

        this.anims.create({
            key:'LucaRunUp',
            frames:[
                {key:'luca',frame:'WalkUp01.png'},
                {key:'luca',frame:'WalkUp02.png'},
                {key:'luca',frame:'WalkUp03.png'},

            ],
            frameRate:5,
            repeat:-1
        });

        this.anims.create({
            key:'LucaRunDown',
            frames:[
                {key:'luca',frame:'WalkDown01.png'},
                {key:'luca',frame:'WalkDown02.png'},
                {key:'luca',frame:'WalkDown03.png'},

            ],
            frameRate:5,
            repeat:-1
        });

        this.anims.create({
            key:'EnemyRunRight',
            frames:[
                {key:'slime',frame:'EnemyWalk01.png'},
                {key:'slime',frame:'EnemyWalk02.png'},
            ],
            frameRate:5,
            repeat:-1
        });
		
        this.anims.create({
            key:'CoinRotate',
            frames:[
                {key:'coin',frame:'coin1.png'},
                {key:'coin',frame:'coin2.png'},
                {key:'coin',frame:'coin3.png'},
                {key:'coin',frame:'coin4.png'},
                {key:'coin',frame:'coin5.png'},
                {key:'coin',frame:'coin6.png'},
                {key:'coin',frame:'coin7.png'},
            ],
            frameRate:10,
            repeat:-1
        });

		this.enemies1 = this.physics.add.group();
        this.coin = this.physics.add.group();
		
		this.coin.create(coin01.x, coin01.y, 'coin').setScale(1);
        this.coin.create(coin02.x, coin02.y, 'coin').setScale(1);
        this.coin.create(coin03.x, coin03.y, 'coin').setScale(1);
        this.coin.create(coin04.x, coin04.y, 'coin').setScale(1);
        this.coin.create(coin05.x, coin05.y, 'coin').setScale(1);
		
		this.enemies1.create(enemy01.x, enemy01.y, 'slime').setScale(1).setCollideWorldBounds(true);
		this.enemies1.create(enemy02.x, enemy02.y, 'slime').setScale(1).setCollideWorldBounds(true);
		this.enemies1.create(enemy03.x, enemy03.y, 'slime').setScale(1).setCollideWorldBounds(true);
		this.enemies1.create(enemy04.x, enemy04.y, 'slime').setScale(1).setCollideWorldBounds(true);
        this.enemies1.create(enemy05.x, enemy05.y, 'slime').setScale(1).setCollideWorldBounds(true);

		this.physics.add.collider(this.groundLayer1, this.enemies1);
		this.physics.add.collider(this.groundLayer2, this.enemies1);

        this.physics.add.collider(this.groundLayer1, this.enemies2);
		this.physics.add.collider(this.groundLayer2, this.enemies2);

        this.physics.add.collider(this.groundLayer1, this.enemies3);
		this.physics.add.collider(this.groundLayer2, this.enemies3);
		
		this.enemies1.children.iterate(slime => {
        slime.play('EnemyRunRight');
        })

        this.coin.children.iterate(coin => {
            coin.play('CoinRotate');
            })

		//this.enemies.startFollow(this.player);
		
		//left right movement
	    this.time.addEvent({ delay: 2000, callback: this.moveLeft, callbackScope: this, loop: true });
        this.time.addEvent({ delay: 4000, callback: this.moveRight, callbackScope: this, loop: true });
	    this.time.addEvent({ delay: 2000, callback: this.moveUp, callbackScope: this, loop: true });
        this.time.addEvent({ delay: 4000, callback: this.moveDown, callbackScope: this, loop: true });
		
		this.physics.add.overlap(this.player, this.enemies1, this.Death, null, this);
        this.physics.add.overlap(this.player, this.coin, this.CoinCollected, null, this);
		
        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
}
		


 update (time, delta) {
 
if ( this.cursors.left.isDown) {
    this.player.body.setVelocityX(-200);
    this.player.anims.play('LucaRunRight', true);
    this.player.flipX = true;

} else if ( this.cursors.right.isDown)
{
    this.player.body.setVelocityX(200);
    this.player.anims.play('LucaRunRight', true);
    this.player.flipX = false;

} else if ( this.cursors.up.isDown )
{
    this.player.body.setVelocityY(-200);  
    this.player.anims.play('LucaRunUp', true);

} else if ( this.cursors.down.isDown )
{
    this.player.body.setVelocityY(200);  
    this.player.anims.play('LucaRunDown', true);  

} 	 
  else {
    this.player.anims.play('IdleRight', true);
    this.player.body.setVelocity(0,0); 

}

//if (this.enemies2.VelocityX > 0) {
//    slime.play('EnemyRunRight');
//} else if (this.enemies2.VelocityX = 0) {
//    slime.play('EnemyIdleRight');
//} else if (this.enemies2.VelocityX < 0) {
//    slime.play('EnemyRunRight');
//    this.enemies2.flipX = true;
//}
	 
   //this.physics.moveToObject( this.enemies, this.player, 30, 5000);

}
	
    CoinCollected (player, coin)
{	
    coin.disableBody(true, true);
        this.coinCount -= 1;
		this.collectSnd.play();

	    if ( this.coinCount === 4) {
            this.collectSnd.play();
            this.coindisplay1.setVisible(true);
        }

        else if ( this.coinCount === 3) {
            this.collectSnd.play();
            this.coindisplay2.setVisible(true);
        }

        else if ( this.coinCount === 2) {
            this.collectSnd.play();
            this.coindisplay3.setVisible(true);
        }
        else if ( this.coinCount === 1) {
            this.collectSnd.play();
            this.coindisplay4.setVisible(true);

        } else if ( this.coinCount === 0) {
            this.collectSnd.play();
            this.coindisplay5.setVisible(true);
            this.isCollected = true;
        }
        
        if ( this.isCollected ) {
            console.log("Player Wins")
            // delay 1 sec
            this.time.delayedCall(1000,function() {
                // Reset counter before a restart
                this.isDead = false;
                this.isCollected = false;
                this.coinCount = 5;
                this.bgmSnd.loop = false;
                this.bgmSnd.stop()
                this.scene.stop('level1Scene');
                this.scene.start('endgame');
            },[], this);
            }

}   


    Death (player, enemies1)
{	if (this.cursors.space.isDown === false) {
    enemies1.disableBody(true, true);
    this.cameras.main.shake(200);}
		this.hitSnd.play();
        this.isDead = true;
	
    if ( this.isDead ) {
    console.log("Player Dies")
    // delay 1 sec
    this.time.delayedCall(1000,function() {
        // Reset counter before a restart
        this.isDead = false;
        this.coinCount = 5;
		this.bgmSnd.loop = false;
		this.bgmSnd.stop()
        this.scene.stop('level1Scene');
        this.scene.start('gameoverScene');
    },[], this);
    }	
}

    moveUp(up) {
        this.tweens.add({
            targets: this.enemies1.getChildren().map(function (c) { return c.body.velocity }),
            y: Phaser.Math.Between(-300, -300) ,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: false
        });
    }

    moveDown(down) {
        this.tweens.add({
            targets: this.enemies1.getChildren().map(function (c) { return c.body.velocity }),
            y: Phaser.Math.Between(300, 300) ,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: false
        });
    }


}