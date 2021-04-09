class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);

        this.moveSpeed = 2;
    }

    update() {
        // TODO: only move if not firing 
	    if(keyLEFT.isDown && this.x > 50) {
    	    this.x -= this.moveSpeed;
        }
        
        else if (keyRIGHT.isDown && this.x < 590) {
    	    this.x += this.moveSpeed;
        }
    }
}