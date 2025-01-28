class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene")
    }

    //why preload here?
    //we want to get loading out of the way so players can progress quicker later
    preload(){
        //load images and tile sprites
        this.load.image('rocket', "./assets/rocket.png")
        this.load.image('spaceship', "./assets/spaceship.png")
        this.load.image('starfield', "./assets/starfield.png")
        this.load.spritesheet('explosion', "./assets/explosion.png",{
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })

        //laod new images
        this.load.image('arwing', "./assets/StarfoxShip.png")
        //this.load.image('arwing32', "./assets/StarfoxShip32.png")
        //this.load.image('arwing64', "./assets/StarfoxShip64.png")

        //new background
        this.load.image('menuBackground', "./assets/newBackground1.png")

        //load audio
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('sfx-explosion1', './assets/sfx-explosion1.wav')
        this.load.audio('sfx-explosion2', './assets/sfx-explosion2.wav')
        this.load.audio('sfx-explosion3', './assets/sfx-explosion3.wav')
        this.load.audio('sfx-explosion4', './assets/sfx-explosion4.wav')
        this.load.audio('sfx-explosion5', './assets/sfx-explosion5.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')


        //load background image for menu
    }

    create(){
        //animation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        })

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }


        //create the menu


        this.intro = this.add.image(0, 0, 'menuBackground').setOrigin(0);

        //display menu text
        //this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5)


        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*4 + borderPadding*2, 'Use ← → arrows to move & (F) to fire', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*5 + borderPadding*3, ' Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5)

        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)




        //Scrapped Idea: interact button to start
        //zones of interaction (x, y, width, height)
        // this.input.mouse.disableContextMenu();
        // this.highlight = this.add.rectangle(borderPadding, borderUISize, 200, 100, 0x0182fb).setOrigin(0).setAlpha(0.75)
        // const zone1 = this.add.zone(borderUISize*4 + borderPadding*4, borderPadding*5 + borderUISize*9, 200,100).setOrigin(0,0);
        // zone1.setInteractive();
        // zone1.on('pointerover', () => {
        //     this.highlight.y = zone1.y;
        // });



    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
    }

}