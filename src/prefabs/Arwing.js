class Arwing extends Spaceship{
    constructor(scene,x,y,texture,frame,pointValue){
        super(scene,x,y,texture,frame,pointValue)
        this.moveSpeed = game.settings.spaceshipSpeed * 1.4
    }

    update(){
        //move spaceship left
        this.x -= this.moveSpeed

        //wrap from left to right edges
        if(this.x <= borderUISize*1.5 - this.width){
            this.x = game.config.width - this.width*1.5
        }
    }
}