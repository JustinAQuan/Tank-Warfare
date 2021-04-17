class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load tanks
        this.load.spritesheet('Player1', './assets/Player164px.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('Player2', './assets/Player264px.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('EnemyTank', './assets/EnemyTank64px.png', {frameWidth: 64, frameHeight: 64});

        // load bullet
        this.load.image('Bullet', './assets/Bullet16px.png');

        // load background
        this.load.image('Desert', './assets/Desert_Background.png');

        // load explosion
        this.load.spritesheet('explosion', './assets/car_explode.png', {frameWidth: 64, frameHeight: 64});
    }

    create() {
        this.sfxRocket = this.sound.add('sfx_rocket', {volume: 0.1}); // add rocket sfx
        this.sfxTracks = this.sound.add('sfx_tracks', {volume: 0.2}); // add tracks sfx

        this.sfxTracks.setLoop(true);
        this.sfxTracks.play();
        
        // desert background
        this.desert = this.add.tileSprite(0, 0, 640, 480, 'Desert').setOrigin(0,0);

        // add Player1
        this.Player1 = new Player(
            this, 
            game.config.width / 2 - 50, 
            game.config.height - borderUISize * 3, 
            'Player1'
        ).setOrigin(0.5, 0);

        // Player1 animation
        this.anims.create({
            key: 'P1',
            frames: this.anims.generateFrameNumbers('Player1', { start: 0, end: 2 }),
            frameRate: 12,
            repeat: -1
        });

        // Have Player1 play animations
        this.Player1.anims.play('P1');

        // define Player1 keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        // if two player mode, add second player
        if(game.settings.twoPlayer){

            // define Player2 keys
            keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
            keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
            keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
            
            // add Player2
            this.Player2 = new Player2(
                this, 
                game.config.width / 2 + 50, 
                game.config.height - borderUISize * 3, 
                'Player2'
            ).setOrigin(0.5, 0);

            // Player2 animation
            this.anims.create({
                key: 'P2',
                frames: this.anims.generateFrameNumbers('Player2', { start: 0, end: 2 }),
                frameRate: 12,
                repeat: -1
            });

            // Have Player2 play animations
            this.Player2.anims.play('P2');
        }

        // Add Bullet Objects for each tank
        this.bullet1 = new Bullet(this, 0, 0, 'Bullet', 0).setOrigin(0,0);
        this.bullet2 = new Bullet(this, 0, 0, 'Bullet', 0).setOrigin(0,0);

        // sets bullet objects initial alpha
        this.bullet1.alpha = 0;
        this.bullet2.alpha = 0;

        // define restart
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // Enemy animations
        this.anims.create({
            key: 'enemy',
            frames: this.anims.generateFrameNumbers('EnemyTank', { start: 0, end: 2}),
            frameRate: 12,
            repeat: -1
        });

        // add enemies (x3)
        this.enemy1 = new Enemy(this, game.config.width + borderUISize*5, borderUISize*4, 'EnemyTank', 0, 30).setOrigin(0, 0);
        this.enemy2 = new Enemy(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'EnemyTank', 0, 20).setOrigin(0,0);
        this.enemy3 = new Enemy(this, game.config.width + borderUISize*1, borderUISize*6 + borderPadding*4, 'EnemyTank', 0, 10).setOrigin(0,0);

        this.enemy1.anims.play('enemy');
        this.enemy2.anims.play('enemy');
        this.enemy3.anims.play('enemy');

        // if two player mode, add more enemies
        if(game.settings.twoPlayer){
            // add more enemies (x3)
            this.enemy4 = new Enemy(this, game.config.width + borderUISize*12, borderUISize*4, 'EnemyTank', 0, 30).setOrigin(0, 0);
            this.enemy5 = new Enemy(this, game.config.width + borderUISize*10, borderUISize*5 + borderPadding*2, 'EnemyTank', 0, 20).setOrigin(0,0);
            this.enemy6 = new Enemy(this, game.config.width + borderUISize*8, borderUISize*6 + borderPadding*4, 'EnemyTank', 0, 10).setOrigin(0,0);

            this.enemy4.anims.play('enemy');
            this.enemy5.anims.play('enemy');
            this.enemy6.anims.play('enemy');
        }

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x1ca35b).setOrigin(0, 0);
        
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x027538).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x027538).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x027538).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x027538).setOrigin(0 ,0);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 5}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Garamond',
            fonstSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        if(!this.gameOver){
            // Desert Background moving to the right
            this.desert.tilePositionX -= 4;

            // Updating what Player1 does
            this.Player1.update();

            this.enemy1.update();
            this.enemy2.update();
            this.enemy3.update();

            if(Phaser.Input.Keyboard.JustDown(keyF) && this.bullet1.alpha != 1){
                this.sfxRocket.play();  // play sfx
                this.bullet1.alpha = 1;
                this.bullet1.x = this.Player1.x;
                this.bullet1.y = this.Player1.y;
            }

            if(this.bullet1.visible){
                this.bullet1.y -=2;
            }

            if(this.bullet1.y <= borderUISize * 3 + borderPadding){
                this.bullet1.reset();
            }
        }

        // settings with two player mode
        if(!this.gameOver && game.settings.twoPlayer){
            this.Player2.update();

            this.enemy4.update();
            this.enemy5.update();
            this.enemy6.update();

            if(Phaser.Input.Keyboard.JustDown(keyL) && this.bullet2.alpha != 1){
                this.sfxRocket.play();  // play sfx
                this.bullet2.alpha = 1;
                this.bullet2.x = this.Player2.x;
                this.bullet2.y = this.Player2.y;
            }

            if(this.bullet2.visible){
                this.bullet2.y -=2;
            }

            if(this.bullet2.y <= borderUISize * 3 + borderPadding){
                this.bullet2.reset();
            }
        }

        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        // collision checker for Player1
        if(this.checkCollision(this.bullet1, this.enemy1)){
            this.bullet1.reset();
            this.shipExplode(this.enemy1);
        }
        
        if(this.checkCollision(this.bullet1, this.enemy2)){
            this.bullet1.reset();
            this.shipExplode(this.enemy2);
        }
        
        if(this.checkCollision(this.bullet1, this.enemy3)){
            this.bullet1.reset();
            this.shipExplode(this.enemy3);
        }

        // collision checker for Player2
        if(game.settings.twoPlayer){
            if(this.checkCollision(this.bullet2, this.enemy1)){
                this.bullet2.reset();
                this.shipExplode(this.enemy1);
            }
            
            if(this.checkCollision(this.bullet2, this.enemy2)){
                this.bullet2.reset();
                this.shipExplode(this.enemy2);
            }
            
            if(this.checkCollision(this.bullet2, this.enemy3)){
                this.bullet2.reset();
                this.shipExplode(this.enemy3);
            }

            if(this.checkCollision(this.bullet2, this.enemy4)){
                this.bullet2.reset();
                this.shipExplode(this.enemy4);
            }
            
            if(this.checkCollision(this.bullet2, this.enemy5)){
                this.bullet2.reset();
                this.shipExplode(this.enemy5);
            }
            
            if(this.checkCollision(this.bullet2, this.enemy6)){
                this.bullet2.reset();
                this.shipExplode(this.enemy6);
            }

            if(this.checkCollision(this.bullet1, this.enemy4)){
                this.bullet1.reset();
                this.shipExplode(this.enemy4);
            }
            
            if(this.checkCollision(this.bullet1, this.enemy5)){
                this.bullet1.reset();
                this.shipExplode(this.enemy5);
            }
            
            if(this.checkCollision(this.bullet1, this.enemy6)){
                this.bullet1.reset();
                this.shipExplode(this.enemy6);
            }
        }
    }

    checkCollision(Player, enemy) {
        // simple AABB checking
        if (Player.x < enemy.x + enemy.width && 
            Player.x + Player.width > enemy.x && 
            Player.y < enemy.y + enemy.height &&
            Player.height + Player.y > enemy. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(enemy) {
        // temporarily hide enemy tank
        enemy.alpha = 0;

        // create explosion sprite at enemy's position
        let boom = this.add.sprite(enemy.x, enemy.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');     // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            enemy.reset();       // resets enemy's posision
            enemy.alpha = 1;     // make enemy visibile again
            boom.destroy();     // remove explosion sprite
        });

        // score add and repaint
        this.p1Score += enemy.points;
        this.scoreLeft.text = this.p1Score;

        this.sound.play('sfx_explosion', {volume: 0.1});
    }
}