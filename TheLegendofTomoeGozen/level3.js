class level3 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level3' });
        this.liveCount = 3;
        this.isDead = false;
    }

	preload ()
    {
        this.load.atlas('tomoe','assets/TomoeTex.png','assets/TomoeTex.json')
        this.load.atlas('samurai','assets/EnemyTex.png','assets/EnemyTex.json')
        this.load.atlas('shogun','assets/Boss.png','assets/Boss.json')
		this.load.spritesheet('heart','assets/heart.png',{frameWidth:32, frameHeight: 32});
		this.load.spritesheet('health','assets/health.png',{frameWidth:32, frameHeight: 192});
        var map = this.load.tilemapTiledJSON('Level3', 'assets/Level3.json');
        this.load.spritesheet('tiles2', 'assets/Map3.png', {frameWidth: 64, frameHeight: 64});
		this.load.audio('level3music','assets/level3.mp3');
		this.load.audio('hitsound','assets/hit.mp3');
		this.load.audio('slashsound','assets/slash.mp3');
    }


 create ()
    {

		this.bgmSnd = this.sound.add('level3music');
		this.hitSnd = this.sound.add('hitsound');
		this.slashSnd = this.sound.add('slashsound');
		this.bgmSnd.play();
		this.bgmSnd.loop = true;
		
        var map = this.make.tilemap({key: 'Level3'});
        var Tiles = map.addTilesetImage('Map3','tiles2')

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
		this.groundLayer3.setCollisionByProperty({tree:true});
		this.groundLayer4.setCollisionByProperty({tree:true});
		
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
		var enemy08 = map.findObject("objectLayer", obj => obj.name === "enemy08");
		var enemy09 = map.findObject("objectLayer", obj => obj.name === "enemy09");
		var enemy10 = map.findObject("objectLayer", obj => obj.name === "enemy10");
		var enemy11 = map.findObject("objectLayer", obj => obj.name === "enemy11");
		var enemy12 = map.findObject("objectLayer", obj => obj.name === "enemy12");
		var enemy13 = map.findObject("objectLayer", obj => obj.name === "enemy13");
		var enemy14 = map.findObject("objectLayer", obj => obj.name === "enemy14");
		var enemy15 = map.findObject("objectLayer", obj => obj.name === "enemy15");
		var enemy16 = map.findObject("objectLayer", obj => obj.name === "enemy16");
		var enemy17 = map.findObject("objectLayer", obj => obj.name === "enemy17");
		var enemy18 = map.findObject("objectLayer", obj => obj.name === "enemy18");
		var enemy19 = map.findObject("objectLayer", obj => obj.name === "enemy19");
		var enemy20 = map.findObject("objectLayer", obj => obj.name === "enemy20");
		var enemy21 = map.findObject("objectLayer", obj => obj.name === "enemy21");
		var enemy22 = map.findObject("objectLayer", obj => obj.name === "enemy22");
		var enemy23 = map.findObject("objectLayer", obj => obj.name === "enemy23");
		var enemy24 = map.findObject("objectLayer", obj => obj.name === "enemy24");
		var enemy25 = map.findObject("objectLayer", obj => obj.name === "enemy25");
		var enemy26 = map.findObject("objectLayer", obj => obj.name === "enemy26");
		var enemy27 = map.findObject("objectLayer", obj => obj.name === "enemy27");
		var enemy28 = map.findObject("objectLayer", obj => obj.name === "enemy28");
		var enemy29 = map.findObject("objectLayer", obj => obj.name === "enemy29");
		var enemy30 = map.findObject("objectLayer", obj => obj.name === "enemy30");
		var enemy31 = map.findObject("objectLayer", obj => obj.name === "enemy31");
		var shogun = map.findObject("objectLayer", obj => obj.name === "shogun");

        //character sprites
        this.player = this.physics.add.sprite(startPoint.x, startPoint.y, 'tomoe')
        this.player.setScale(1);
        this.player.setCollideWorldBounds(true);
	
		this.groundLayer.setCollisionByProperty({ collides: true });
		this.physics.add.collider(this.groundLayer1, this.player);
		this.physics.add.collider(this.groundLayer3, this.player);
		this.physics.add.collider(this.groundLayer4, this.player);

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
            key:'shogunidle',
            frames:[
                {key:'shogun',frame:'shogunIdle01'},
                {key:'shogun',frame:'shogunIdle02'},
            ],
            frameRate:5,
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
		this.shogun = this.physics.add.group();
		
		this.shogun.create(shogun.x, shogun.y, 'shogun').setScale(1);
		
		this.enemies1.create(enemy01.x, enemy01.y, 'samurai').setScale(1);
		this.enemies1.create(enemy02.x, enemy02.y, 'samurai').setScale(1);
		this.enemies1.create(enemy03.x, enemy03.y, 'samurai').setScale(1);
		this.enemies1.create(enemy04.x, enemy04.y, 'samurai').setScale(1);
		this.enemies1.create(enemy05.x, enemy05.y, 'samurai').setScale(1);
		this.enemies1.create(enemy06.x, enemy06.y, 'samurai').setScale(1);
		this.enemies1.create(enemy07.x, enemy07.y, 'samurai').setScale(1);
		this.enemies1.create(enemy08.x, enemy08.y, 'samurai').setScale(1);
		this.enemies1.create(enemy09.x, enemy09.y, 'samurai').setScale(1);
		this.enemies1.create(enemy10.x, enemy10.y, 'samurai').setScale(1);
		this.enemies1.create(enemy11.x, enemy11.y, 'samurai').setScale(1);

		this.enemies3.create(enemy12.x, enemy12.y, 'samurai').setScale(1).setCollideWorldBounds(true);
		this.enemies3.create(enemy13.x, enemy13.y, 'samurai').setScale(1).setCollideWorldBounds(true);
		this.enemies3.create(enemy14.x, enemy14.y, 'samurai').setScale(1).setCollideWorldBounds(true);
		this.enemies3.create(enemy15.x, enemy15.y, 'samurai').setScale(1).setCollideWorldBounds(true);
		this.enemies3.create(enemy16.x, enemy16.y, 'samurai').setScale(1).setCollideWorldBounds(true);
		this.enemies3.create(enemy17.x, enemy17.y, 'samurai').setScale(1).setCollideWorldBounds(true);
		this.enemies3.create(enemy18.x, enemy18.y, 'samurai').setScale(1).setCollideWorldBounds(true);
		this.enemies3.create(enemy19.x, enemy19.y, 'samurai').setScale(1).setCollideWorldBounds(true);
		this.enemies3.create(enemy20.x, enemy20.y, 'samurai').setScale(1).setCollideWorldBounds(true);
		this.enemies3.create(enemy21.x, enemy21.y, 'samurai').setScale(1).setCollideWorldBounds(true);
		this.enemies3.create(enemy22.x, enemy22.y, 'samurai').setScale(1).setCollideWorldBounds(true);
		this.enemies3.create(enemy23.x, enemy23.y, 'samurai').setScale(1).setCollideWorldBounds(true);
		this.enemies3.create(enemy24.x, enemy24.y, 'samurai').setScale(1).setCollideWorldBounds(true);
		this.enemies3.create(enemy25.x, enemy25.y, 'samurai').setScale(1).setCollideWorldBounds(true);
		this.enemies3.create(enemy26.x, enemy26.y, 'samurai').setScale(1).setCollideWorldBounds(true);
		this.enemies3.create(enemy27.x, enemy27.y, 'samurai').setScale(1).setCollideWorldBounds(true);
		this.enemies3.create(enemy28.x, enemy28.y, 'samurai').setScale(1).setCollideWorldBounds(true);
		this.enemies3.create(enemy29.x, enemy29.y, 'samurai').setScale(1).setCollideWorldBounds(true);
		this.enemies3.create(enemy30.x, enemy30.y, 'samurai').setScale(1).setCollideWorldBounds(true);
		this.enemies3.create(enemy31.x, enemy31.y, 'samurai').setScale(1).setCollideWorldBounds(true);
		
		this.physics.add.collider(this.groundLayer1, this.enemies1);
		this.physics.add.collider(this.groundLayer3, this.enemies1);
		this.physics.add.collider(this.groundLayer4, this.enemies1);

        this.physics.add.collider(this.groundLayer1, this.enemies2);
		this.physics.add.collider(this.groundLayer3, this.enemies2);
		this.physics.add.collider(this.groundLayer4, this.enemies2);

        this.physics.add.collider(this.groundLayer1, this.enemies3);
		this.physics.add.collider(this.groundLayer3, this.enemies3);
		this.physics.add.collider(this.groundLayer4, this.enemies3);

		this.enemies1.children.iterate(samurai => {
        samurai.play('EnemyRunRight');
		samurai.flipX = true;
        this.physics.moveToObject( samurai, this.player, 30, 3000);
        })

		this.enemies2.children.iterate(samurai => {
        samurai.play('EnemyRunRight');
		samurai.flipX = true;
        })
		
		this.enemies3.children.iterate(samurai => {
        samurai.play('EnemyRunRight');
		samurai.flipX = true;
        })
		
		this.shogun.children.iterate(shogun => {
        shogun.play('shogunidle');
		shogun.flipX = true;
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
		this.physics.add.overlap(this.player, this.shogun, this.endgame, null, this);
		
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

}
	
 minusHealth1 (player, enemies1)
{	if (this.cursors.space.isDown) {
	this.slashSnd.play();
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
		this.bgmSnd.loop = false;
		this.bgmSnd.stop()
        this.scene.stop('level3');
        this.scene.start('gameoverScene');
    },[], this);
    }	
}

minusHealth2 (player, enemies2)
{	if (this.cursors.space.isDown) {
	this.slashSnd.play();
	enemies2.disableBody(true, true);
}	else if (this.cursors.space.isDown === false) {
    enemies2.disableBody(true, true);
	this.liveCount -= 1;
    this.cameras.main.shake(200);}
	    if ( this.liveCount === 2) {
		this.hitSnd.play();
        this.heart3.setVisible(false);
    } else if ( this.liveCount === 1) {
		this.hitSnd.play();
        this.heart2.setVisible(false);
    } else if ( this.liveCount === 0) {
		this.hitSnd.play();
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
	this.slashSnd.play();
	enemies3.disableBody(true, true);
}	else if (this.cursors.space.isDown === false) {
    enemies3.disableBody(true, true);
	this.liveCount -= 1;
    this.cameras.main.shake(200);}
	    if ( this.liveCount === 2) {
		this.hitSnd.play();
        this.heart3.setVisible(false);
    } else if ( this.liveCount === 1) {
		this.hitSnd.play();
        this.heart2.setVisible(false);
    } else if ( this.liveCount === 0) {
		this.hitSnd.play();
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
            x: Phaser.Math.Between(-500, -500) ,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: false
        });
    }

    moveRight(right) {
        this.tweens.add({
            targets: this.enemies2.getChildren().map(function (c) { return c.body.velocity }),
            x: Phaser.Math.Between(500, 500) ,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: false
        });
    }

    moveUp(up) {
        this.tweens.add({
            targets: this.enemies3.getChildren().map(function (c) { return c.body.velocity }),
            y: Phaser.Math.Between(-500, -500) ,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: false
        });
    }

    moveDown(down) {
        this.tweens.add({
            targets: this.enemies3.getChildren().map(function (c) { return c.body.velocity }),
            y: Phaser.Math.Between(500, 500) ,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: false
        });
    }
	
	endgame (player, shogun) {
	this.scene.stop('level3');
	this.scene.start('endgame');
	this.bgmSnd.loop = false;
    this.bgmSnd.stop()
	}
	


}