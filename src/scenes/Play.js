class Play extends Phaser.Scene{

    constructor(){
        super("playScene")
    }

    create(){
        
        //place the tile sprite
        this.starfield = this.add.tileSprite(0,0,640,480, 'starfield').setOrigin(0,0)

        //NOTE: rectangles are made like so rectangle(x-coordinate, y-coordinate, width, height, hex-color)
        //green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0)
        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)  //top
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)  //bottom
        this.add.rectangle(0,0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)  //left
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)  //right

        

        //adding the rocket (Player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5,0)


        //define key bindings
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        
        //adding the spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4 + borderPadding*5, 'spaceship', 0, 30).setOrigin(0,0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*6, 'spaceship', 0, 20).setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*7, 'spaceship', 0, 10).setOrigin(0,0)
            
        //add the new spaceship
        this.arwing = new Arwing(this, borderPadding, borderUISize*4, 'arwing', 0, 40).setOrigin(0,0)
        

        //initialize score
        this.p1Score = 0
        this.seconds = 60

        //displaying the score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)
        
        //GAME Over Flag
        this.gameOver = false

        //60-second play clock
        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null, this)

        //displaying the time remaining



        let clockConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '28px',
            backgroundColor: '#FACADE',
            color: '#A56C84',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }
        
        this.timedEvent = this.time.delayedCall(3000, this.onEvent, [], this);
        this.timeRemain = this.add.text(borderUISize*10 + borderPadding*10, borderUISize + borderPadding*2, [] , clockConfig)
    }

    update(){

        //timer updating
        this.timeRemain.setText(`Time: ${this.timedEvent.getProgress().toString().substr(0,3)*10} s`)



        //check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)){
            this.scene.restart()
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene")
        }

        this.starfield.tilePositionX -=4

        if(!this.gameOver){
            this.p1Rocket.update()

            //updating the spaceships
            this.ship01.update()
            this.ship02.update()
            this.ship03.update()
            
            //additional update for new ship
            this.arwing.update()
        }

        //collision checking
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)   
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)   
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)   
        }

        //additional collision check for new ship
        if(this.checkCollision(this.p1Rocket,this.arwing)){
            this.p1Rocket.reset()
            this.shipExplode(this.arwing)
        }
    }

    checkCollision(rocket, ship){
        //simple AABB checking
        if(rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y){
            return true
        }else{
            return false
        }
    }

    shipExplode(ship){
        //temporarily hiding the ship
        ship.alpha = 0
        //creating the explosion sprite at ship position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode')      //play the explosion animation

        //this callback happens once the explosion animation is completed
        boom.on('animationcomplete', () => {
            ship.reset()                //reset the ships position
            ship.alpha = 1              //make the ship visible again
            boom.destroy()              //remove the explosion sprite
        })

        //score adding and text updates
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score

        this.sound.play('sfx-explosion')
    }

}