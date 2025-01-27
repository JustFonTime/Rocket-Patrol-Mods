class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)    //add to existing scene
        this.points = pointValue    //store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed          //spaceshup speed in pixels/frame
    }

    update(){
        //move spaceship left
        this.x -= this.moveSpeed

        //wrap from left to right edges
        if(this.x <= 0 - this.width){
            this.x = game.config.width
        }
    }

    //resetting the spaceship position
    reset(){
        this.x = game.config.width
    }
}