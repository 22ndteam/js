
let config = {
    type: Phaser.AUTO,
    width: 1088,
    height: 1088,
    backgroundColor: '#000055',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    },
    //scene: [mainScene, main2Scene, storyScene, story2Scene, level1]
    scene: [mainScene, main2Scene, storyScene, level1, gameoverScene, endgame]


};

let game = new Phaser.Game(config);



