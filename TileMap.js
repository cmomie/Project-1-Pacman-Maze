export default class TileMap {
    constructor(tileSize){
        this.tileSize = tileSize; //implement the constructor and pass the tile size with by setting a variable for it
        this.wall = this.#image('wall.png');
        this.pacman = this.#image('pac0.png');
        this.dot = this.#image('yellowDot.png');
        this.ghost = this.#image('ghost.png');

    } 

    #image(fileName){
        const img = new Image(); //create an image object
        img.src =`images/${fileName}`;
        return img;
    }

    // Step 2 make the grid using a 2 demensional array (and array with other arrays inside of it) 
    //this is how I identify how many rows(the number of arrays inside the outer array) 
    //the columns is determined by the number of items in each inner arrays
    //created a legend to identify the part of the game board and players
    //1 = wall
    //0 = dots
    //2 = pacman
    //3 = enemies
    map =[
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,2,0,0,0,0,0,0,0,0,0,0,3,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    ];
    draw(canvas, ctx) {
        this.#setCanvasSize(canvas);
    } //method that takes in canvas and ctx to draw the game again during the loop
   #setCavasSize(canvas){
    canvas.height = this.map.length
   }  
}

// we are using individual images to get this game to display on the screen 
//load the images using a helper method #image(using the hash lets me know it's a private method) 
// give it the name fileName
//create an image object and set a path using src and path to the images using a string
//next load the images in the constructor created with the class TileMap
//load images by defining the 1st image, the wall using this. and call that helper method with the file name 