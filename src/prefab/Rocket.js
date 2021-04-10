class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add object to existing scene

        this.moveSpeed = 2;         // rocket's movement speed
        this.isFiring = false;      // boolean to see if rocket is firing
        this.sfxRocket = scene.sound.add('sfx_rocket', {volume: 0.1}); // add rocket sfx
    }

    update() {

        // when rocket is firing, rockets moves upwards until it reaches some point to reset
        if(this.isFiring) {
            this.y -= this.moveSpeed;
            
            if(this.y < borderUISize * 3) {
                this.reset();
            }
        }
        
        // allows for left and right movement if rocket is not firing
        else{
            // press left arrow to move left
            if(keyLEFT.isDown) {
                this.x -= this.moveSpeed;
            }
            
            // press right arrow to move right
            else if (keyRIGHT.isDown) {
                this.x += this.moveSpeed;
            }

            // press F to fire rocket
            if(Phaser.Input.Keyboard.JustDown(keyF)) {
                this.isFiring = true;
                this.sfxRocket.play();  // play sfx
            }
        }

        // restricts rocket's position to within the borders
        this.x = Phaser.Math.Clamp(
            this.x,
            borderUISize + borderPadding,
            game.config.width - borderUISize - borderPadding
        );
    }

    // resets the rocket's position to the "ground"
    reset(){
        this.y = game.config.height - borderUISize - borderPadding;
        this.isFiring = false;
    }
}