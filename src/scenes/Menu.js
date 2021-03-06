class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', 'assets/blip_select12.wav');
        this.load.audio('sfx_explosion', 'assets/kaboom.wav');
        this.load.audio('sfx_rocket', 'assets/pewpew.wav');
        this.load.audio('sfx_tracks', 'assets/tank_tracks.wav')
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fonstSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width/2, game.config.height/3 - borderUISize - borderPadding, 'TANK WARFARE', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Player 1 uses (A)(S) to move & (F) to fire', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Player 2 uses 🠔🠖 arrows to move & (L) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press 🠔 for 1 Player or 🠖 for 2 Player', menuConfig).setOrigin(0.5);
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // One player mode
            game.settings = {
              spaceshipSpeed: 3,
              gameTimer: 60000,
              twoPlayer: false    
            }
            this.sound.play('sfx_select', {volume: 1});
            this.scene.start('playScene');    
        }

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // Two player mode
            game.settings = {
              spaceshipSpeed: 4,
              gameTimer: 45000,
              twoPlayer: true    
            }
            this.sound.play('sfx_select', {volume: 1});
            this.scene.start('playScene');    
        }
    }
}