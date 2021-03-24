// collect stars, no enemies
class level1 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level1' });
        this.liveCount = 3;
        this.isDead = false;
    }

	preload ()
    {
        this.load.atlas('tomoe','assets/TomoeTex.png','assets/TomoeTex.json')
        this.load.atlas('samurai','assets/EnemyTex.png','assets/EnemyTex.json')
		this.load.spritesheet('heart','assets/heart.png',{frameWidth:32, frameHeight: 32});
		this.load.spritesheet('health','assets/health.png',{frameWidth:32, frameHeight: 192});
        var map = this.load.tilemapTiledJSON('Level1', 'assets/Level1.json');
        this.load.spritesheet('tiles', 'assets/Map1.png', {frameWidth: 64, frameHeight: 64});
    }


 create ()
    {

        var map = this.make.tilemap({key: 'Level1'});
        var Tiles = map.addTilesetImage('Map1','tiles')

        //ground layer
        this.groundLayer = map.createDynamicLayer('dirtLayer', Tiles, 0, 0);
        this.groundLayer = map.createDynamicLayer('grassLayer', Tiles, 0, 0);
        this.groundLayer = map.createDynamicLayer('patchLayer', Tiles, 0, 0);
        this.groundLayer = map.createDynamicLayer('flowerLayer', Tiles, 0, 0);
        this.groundLayer1 = map.createStaticLayer('shieldLayer', Tiles, 0, 0);
		this.groundLayer1.setCollisionByProperty({shield:true});
        this.groundLayer2 = map.createDynamicLayer('treeLayer1', Tiles, 0, 0);
        this.groundLayer3 = map.createDynamicLayer('treeLayer2', Tiles, 0, 0);
        this.groundLayer4 = map.createDynamicLayer('treeLayer3', Tiles, 0, 0);
        this.groundLayer5 = map.createDynamicLayer('treeLayer4', Tiles, 0, 0);
        this.groundLayer6 = map.createDynamicLayer('treeLayer5', Tiles, 0, 0);
        this.groundLayer7 = map.createDynamicLayer('treeLayer6', Tiles, 0, 0);
        this.groundLayer8 = map.createDynamicLayer('treeLayer7', Tiles, 0, 0);
		this.groundLayer3.setCollisionByProperty({tree:true});
		this.groundLayer4.setCollisionByProperty({tree:true});
		this.groundLayer5.setCollisionByProperty({tree:true});
		this.groundLayer6.setCollisionByProperty({tree:true});
		this.groundLayer7.setCollisionByProperty({tree:true});
		this.groundLayer8.setCollisionByProperty({tree:true});
		
		//hearts
		this.health = this.add.image(150,50, 'health').setScrollFactor(0);
		this.heart1 = this.add.image(275,50, 'heart').setScrollFactor(0);
		this.heart2 = this.add.image(325,50,'heart').setScrollFactor(0);
		this.heart3 = this.add.image(375,50,'heart').setScrollFactor(0);
		
        //world boundaries
        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;

        //object layers
        var right = map.findObject("objectLayer", obj => obj.name === "Right");
        var left = map.findObject("objectLayer", obj => obj.name === "Left");
        var startPoint = map.findObject("objectLayer", obj => obj.name === "startPoint");
		var enemy01 = map.findObject("objectLayer", obj => obj.name === "enemy01");
		var enemy02 = map.findObject("objectLayer", obj => obj.name === "enemy02");
		var enemy03 = map.findObject("objectLayer", obj => obj.name === "enemy03");
		var enemy04 = map.findObject("objectLayer", obj => obj.name === "enemy04");
		var enemy05 = map.findObject("objectLayer", obj => obj.name === "enemy05");
		var enemy06 = map.findObject("objectLayer", obj => obj.name === "enemy06");
		var enemy07 = map.findObject("objectLayer", obj => obj.name === "enemy07");


        //character sprites
        this.player = this.physics.add.sprite(startPoint.x, startPoint.y, 'tomoe')
        this.player.setScale(1);
        this.player.setCollideWorldBounds(true);
	
		this.groundLayer.setCollisionByProperty({ collides: true });
		this.physics.add.collider(this.groundLayer1, this.player);
		this.physics.add.collider(this.groundLayer3, this.player);
		this.physics.add.collider(this.groundLayer4, this.player);
		this.physics.add.collider(this.groundLayer5, this.player);
		this.physics.add.collider(this.groundLayer6, this.player);
		this.physics.add.collider(this.groundLayer7, this.player);
		this.physics.add.collider(this.groundLayer8, this.player);

        window.player = this.player;

        this.anims.create({
            key:'IdleRight',
            frames:[
                {key:'tomoe',frame:'IdleRight01'},    
                {key:'tomoe',frame:'IdleRight02'},
            ],
            frameRate:5,
            repeat:-1
        });

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
            key:'EnemyIdleRight',
            frames:[
                {key:'samurai',frame:'EnemyIdle01'},    
                {key:'samurai',frame:'EnemyIdle02'},
            ],
            frameRate:5,
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
            key:'TomoeAttack',
            frames:[
                {key:'tomoe',frame:'Attack01'},
                {key:'tomoe',frame:'Attack02'},

            ],
            frameRate:20,
            repeat:-1
        });
		
		this.enemies1 = this.physics.add.group();
        this.enemies2 = this.physics.add.group();
        this.enemies3 = this.physics.add.group();
		
		this.enemies1.create(enemy01.x, enemy01.y, 'samurai').setScale(1);
		this.enemies1.create(enemy02.x, enemy02.y, 'samurai').setScale(1);
		this.enemies1.create(enemy03.x, enemy03.y, 'samurai').setScale(1);
		this.enemies2.create(enemy04.x, enemy04.y, 'samurai').setScale(1).setCollideWorldBounds(true);
		this.enemies2.create(enemy05.x, enemy05.y, 'samurai').setScale(1).setCollideWorldBounds(true);
		this.enemies3.create(enemy06.x, enemy06.y, 'samurai').setScale(1).setCollideWorldBounds(true);
		this.enemies3.create(enemy07.x, enemy07.y, 'samurai').setScale(1).setCollideWorldBounds(true);
		
		this.physics.add.collider(this.groundLayer1, this.enemies1);
		this.physics.add.collider(this.groundLayer3, this.enemies1);
		this.physics.add.collider(this.groundLayer4, this.enemies1);
		this.physics.add.collider(this.groundLayer5, this.enemies1);
		this.physics.add.collider(this.groundLayer6, this.enemies1);
		this.physics.add.collider(this.groundLayer7, this.enemies1);
		this.physics.add.collider(this.groundLayer8, this.enemies1);

        this.physics.add.collider(this.groundLayer1, this.enemies2);
		this.physics.add.collider(this.groundLayer3, this.enemies2);
		this.physics.add.collider(this.groundLayer4, this.enemies2);
		this.physics.add.collider(this.groundLayer5, this.enemies2);
		this.physics.add.collider(this.groundLayer6, this.enemies2);
		this.physics.add.collider(this.groundLayer7, this.enemies2);
		this.physics.add.collider(this.groundLayer8, this.enemies2);

        this.physics.add.collider(this.groundLayer1, this.enemies3);
		this.physics.add.collider(this.groundLayer3, this.enemies3);
		this.physics.add.collider(this.groundLayer4, this.enemies3);
		this.physics.add.collider(this.groundLayer5, this.enemies3);
		this.physics.add.collider(this.groundLayer6, this.enemies3);
		this.physics.add.collider(this.groundLayer7, this.enemies3);
		this.physics.add.collider(this.groundLayer8, this.enemies3);
		
		this.enemies1.children.iterate(samurai => {
        samurai.play('EnemyRunRight');
		samurai.flipX = true;
        this.physics.moveToObject( samurai, this.player, 30, 5000);
      })

		//this.enemies.startFollow(this.player);
		
		//left right movement
	    this.time.addEvent({ delay: 2000, callback: this.moveLeft, callbackScope: this, loop: true });
        this.time.addEvent({ delay: 4000, callback: this.moveRight, callbackScope: this, loop: true });
	    this.time.addEvent({ delay: 2000, callback: this.moveUp, callbackScope: this, loop: true });
        this.time.addEvent({ delay: 4000, callback: this.moveDown, callbackScope: this, loop: true });
		
		this.physics.add.overlap(this.player, this.enemies1, this.minusHealth1, null, this);
		this.physics.add.overlap(this.player, this.enemies2, this.minusHealth2, null, this);
		this.physics.add.overlap(this.player, this.enemies3, this.minusHealth3, null, this);
		
        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
}
		


 update (time, delta) {
 
if ( this.cursors.left.isDown) {
    this.player.body.setVelocityX(-200);
    this.player.anims.play('TomoeRunRight', true);
    this.player.flipX = true;

} else if ( this.cursors.right.isDown)
{
    this.player.body.setVelocityX(200);
    this.player.anims.play('TomoeRunRight', true);
    this.player.flipX = false;

} else if ( this.cursors.up.isDown )
{
    this.player.body.setVelocityY(-200);  
    this.player.anims.play('TomoeRunRight', true);

} else if ( this.cursors.down.isDown )
{
    this.player.body.setVelocityY(200);  
    this.player.anims.play('TomoeRunRight', true);  

} else if ( this.cursors.space.isDown) {
	
	this.player.body.setVelocityX(0);
	this.player.body.setVelocityY(0);
	this.player.anims.play('TomoeAttack',true);
}	 
  else {
    this.player.anims.play('IdleRight', true);
    this.player.body.setVelocity(0,0); 

}

if (this.enemies2.VelocityX > 0) {
    samurai.play('EnemyRunRight');
} else if (this.enemies2.VelocityX = 0) {
    samurai.play('EnemyIdleRight');
} else if (this.enemies2.VelocityX < 0) {
    samurai.play('EnemyRunRight');
    this.enemies2.flipX = true;
}
	 
    if (this.player.x >=4050) {
        console.log('end zone')
	this.scene.stop('level1');
	this.scene.start('level2');
    }
	 
   //this.physics.moveToObject( this.enemies, this.player, 30, 5000);

}
	
 minusHealth1 (player, enemies1)
{	if (this.cursors.space.isDown) {
	enemies1.disableBody(true, true);
}	else if (this.cursors.space.isDown === false) {
    enemies1.disableBody(true, true);
	this.liveCount -= 1;
    this.cameras.main.shake(200);}
	    if ( this.liveCount === 2) {
        //this.explodeSnd.play();
        this.heart3.setVisible(false);
    } else if ( this.liveCount === 1) {
        //this.explodeSnd.play();
        this.heart2.setVisible(false);
    } else if ( this.liveCount === 0) {
        //this.explodeSnd.play();
        this.cameras.main.shake(1000);
        this.heart1.setVisible(false);
        this.isDead = true;
    }
	
    if ( this.isDead ) {
    console.log("Player Dies")
    // delay 1 sec
    this.time.delayedCall(1000,function() {
        // Reset counter before a restart
        this.isDead = false;
        this.liveCount = 3;
        this.scene.start('gameoverScene');
    },[], this);
    }	
}

minusHealth2 (player, enemies2)
{	if (this.cursors.space.isDown) {
	enemies2.disableBody(true, true);
}	else if (this.cursors.space.isDown === false) {
    enemies2.disableBody(true, true);
	this.liveCount -= 1;
    this.cameras.main.shake(200);}
	    if ( this.liveCount === 2) {
        //this.explodeSnd.play();
        this.heart3.setVisible(false);
    } else if ( this.liveCount === 1) {
        //this.explodeSnd.play();
        this.heart2.setVisible(false);
    } else if ( this.liveCount === 0) {
        //this.explodeSnd.play();
        this.cameras.main.shake(1000);
        this.heart1.setVisible(false);
        this.isDead = true;
    }
	
    if ( this.isDead ) {
    console.log("Player Dies")
    // delay 1 sec
    this.time.delayedCall(1000,function() {
        // Reset counter before a restart
        this.isDead = false;
        this.liveCount = 3;
        this.scene.start('gameoverScene');
    },[], this);
    }	
}

minusHealth3 (player, enemies3)
{	if (this.cursors.space.isDown) {
	enemies3.disableBody(true, true);
}	else if (this.cursors.space.isDown === false) {
    enemies3.disableBody(true, true);
	this.liveCount -= 1;
    this.cameras.main.shake(200);}
	    if ( this.liveCount === 2) {
        //this.explodeSnd.play();
        this.heart3.setVisible(false);
    } else if ( this.liveCount === 1) {
        //this.explodeSnd.play();
        this.heart2.setVisible(false);
    } else if ( this.liveCount === 0) {
        //this.explodeSnd.play();
        this.cameras.main.shake(1000);
        this.heart1.setVisible(false);
        this.isDead = true;
    }
	
    if ( this.isDead ) {
    console.log("Player Dies")
    // delay 1 sec
    this.time.delayedCall(1000,function() {
        // Reset counter before a restart
        this.isDead = false;
        this.liveCount = 3;
        this.scene.start('gameoverScene');
    },[], this);
    }	
}

    moveLeft(left) {
        this.tweens.add({
            targets: this.enemies2.getChildren().map(function (c) { return c.body.velocity }),
            x: Phaser.Math.Between(-300, -50) ,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: false
        });
    }

    moveRight(right) {
        this.tweens.add({
            targets: this.enemies2.getChildren().map(function (c) { return c.body.velocity }),
            x: Phaser.Math.Between(50, 300) ,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: false
        });
    }

    moveUp(up) {
        this.tweens.add({
            targets: this.enemies3.getChildren().map(function (c) { return c.body.velocity }),
            y: Phaser.Math.Between(-150, -50) ,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: false
        });
    }

    moveDown(down) {
        this.tweens.add({
            targets: this.enemies3.getChildren().map(function (c) { return c.body.velocity }),
            y: Phaser.Math.Between(50, 150) ,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: false
        });
    }


}