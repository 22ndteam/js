
let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: '#000055',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: true
        }
    },
    //scene: [mainScene, main2Scene, storyScene, story2Scene, level1]
    scene: [mainScene,main2Scene, storyScene, level1, level2, level3, gameoverScene, endgame, credits, congratulations]


};

let game = new Phaser.Game(config);



