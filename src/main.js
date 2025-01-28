/**
 * Name: Justin Fong
 * 
 * Title:
 * 
 * Time of Completion: start @ 3:05PM
 * 
 * Mods: 
 *  - Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5) - 2hrs
 *  - Implement a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses (5) - 1.5hrs
 *  - Display the time remaining (in seconds) on the screen (3) - 2hrs
 *  - Create a new title screen (e.g., new artwork, typography, layout) (3) - 0.5hr
 *  - Create 4 new explosion sound effects and randomize which one plays on impact (3) - 0.5hr
 *      - from: https://sfbgames.itch.io/chiptone
 *  - Add your own (copyright-free) looping background music to the Play scene (keep the volume low and be sure that multiple instances of your music don't play when the game restarts) (1)
 *      - https://www.youtube.com/watch?v=HeVIaLm0tyw&list=OLAK5uy_np776jRtjA4yqUGsgR4xIS2BK6IGIIuS0&index=2
 *      - https://artlist.io/royalty-free-music/song/night-rider/4780
 * 
 * Citations:
 */

console.log("Hello World")


let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene:[Menu, Play]
}

let game = new Phaser.Game(config)

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3


//keyboard Bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT
