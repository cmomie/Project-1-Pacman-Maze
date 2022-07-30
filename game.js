import TileMap from "./TileMap.js";


//Create the following variable that will be needed for the game to operate and be view on the browser.

const canvas = document.getElementById('gameCanvas'); //1st  define canvas to find it's html element by id 'gameCanvas';
const ctx = canvas.getContext('2d'); //define this to draw to the screen in 2d
const tileSize = 32; //we want each tile as 32 pixels; Identify how big the tiles should be in the game using tileSize

//the tileMape has to be initialized after being imported on line 1 by creating a variable.  
const tileMap = new TileMap(tileSize); //passing in the tile size 

/* 2nd create the function gameLoop; this loop will redraw the game every second for up to 75 times using setInterval; 
1000 miliseconds = 1 second (This Function is the Most Important Part of the Game) */
function gameLoop() {

tileMap.draw(canvas, ctx); // we will execute this on every single loop of the game
}

setInterval(gameLoop, 1000 / 75);
/* 3rd define the tile map to draw the screen in the game loop */

