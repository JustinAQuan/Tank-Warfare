let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
 };
 
 let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard var for restart
let keyR;

// reserve keyboard vars for player 1
let keyF, keyA, keyS;

// reserve keyboard vars for player 2
let keyL, keyLEFT, keyRIGHT;

// ROCKET PATROL MODS USED
// - Display the time remaining (in seconds) on the screen (10)
// - Implement a simultaneous two-player mode (30)
// - Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)

// CREDITS
// - Tank Shot
//      - https://freesound.org/people/qubodup/sounds/168707/ ("Tank Firing")
//      - by qubodup
// - Tank Moving
//      - https://freesound.org/people/flyguy85/sounds/156919/ ("M1A2 Abrams Accelerating")
//      - by flyguy85
// - Explosion
//      - https://freesound.org/people/deleted_user_5405837/sounds/399303/ ("Explosion_012")
//      - by deleted_user_5405837