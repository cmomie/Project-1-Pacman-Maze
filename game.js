

/*1st  define canvas to find it's html element by id 'gameCanvas';
to get reference from context to canvas by defining context using 2d
*/

const tileSize = 32;
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
//const tilemap = new tilemap(tileSize)
/* 2nd create the function gameLoop will redraw the game every second for up to 75 times using setInterval; 
1000 miliseconds = 1 second (Most Important Part of the Game) 
Identify how big the tiles should be in the game using tileSize*/ 

class Tilemap {
    constructor(tileSize) {
        this.tileSize = tileSize
    

    }
    map = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
           [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    /*define an empty method called draw */
    draw() {
        //console.log('draw');
    }
}

function gameLoop() {
//console.log('game loop') ran it to make sure my gameLoop was working properly

//Tilemap.draw();
}

setInterval(gameLoop, 1000 / 75);
/* 3rd define the tile map to draw the screen in the game loop */

