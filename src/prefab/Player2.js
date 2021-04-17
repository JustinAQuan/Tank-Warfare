class Player2 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add object to existing scene
        this.moveSpeed = 2;         // Player2's movement speed
    }

    update() {        
        // press left arrow to move left
        if(keyLEFT.isDown) {
            this.x -= this.moveSpeed;
        }
    
        // press right arrow to move right
        else if (keyRIGHT.isDown) {
            this.x += this.moveSpeed;
        }

        // restricts rocket's position to within the borders
        this.x = Phaser.Math.Clamp(
            this.x,
            borderUISize + borderPadding,
            game.config.width - borderUISize - borderPadding
        );
    }
}