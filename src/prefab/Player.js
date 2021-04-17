class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add object to existing scene
        this.moveSpeed = 2;         // Player1's movement speed
    }

    update() {                
        // press A to move left
        if(keyA.isDown) {
            this.x -= this.moveSpeed;
        }
        
        // press S to move right
        else if (keyS.isDown) {
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