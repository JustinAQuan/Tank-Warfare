class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
    }

    // sets alpha and position
    reset() {
        this.alpha = 0;
        this.y = 0;
    }
}