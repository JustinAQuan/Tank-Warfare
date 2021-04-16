let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
 };
 
 let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard var for restart
let keyR;

// reserve keyboard vars for player 1
let keyF, keyA, keyD;

// reserve keyboard vars for player 2
let keyL, keyLEFT, keyRIGHT;