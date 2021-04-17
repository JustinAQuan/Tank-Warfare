class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);

        this.points = pointValue;   // the amount of points this object is
        this.moveSpeed = game.settings.spaceshipSpeed;  // object's movement speed
    }

    update() {
        this.x -= this.moveSpeed; 

        // resets x position when offscreen
        if(this.x <= -this.width) {
            this.x = game.config.width;
        }
    }
    
    // resets object
    reset() {
        this.x = game.config.width;
    }
}