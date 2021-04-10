class Ships extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);

        this.pointValue = 1;
    }

    update() {
        this.x -= 1; 

        if(this.x < -this.width) {
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width;
        this.alpha = 1;
    }
}