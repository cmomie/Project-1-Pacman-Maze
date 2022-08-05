const MovingDirection = {
    up: 0,
    down: 1,
    left: 2,
    right: 3,
};
class Pacman {
    constructor(x, y, tileSize, velocity, tileMap){
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.currentMovindDirection = null;
        this.requestedMovingDIrection = null;

        document.addEventListener('keydown', this.#keydown)


        this.#loadPacmanImages();
    }
    draw(ctx){
        this.#move();
        ctx.drawImage(this.pacmanImages[this.pacmanImageIndex], this.x, this.y, this.tileSize, this.tileSize);
    }
    #loadPacmanImages(){
        const pacmanImage1 = new Image();
        pacmanImage1.src = "../images/pac0.png"

        const pacmanImage2 = new Image();
        pacmanImage2.src = "../images/pac1.png"

        const pacmanImage3 = new Image();
        pacmanImage3.src = "../images/pac2.png"

        const pacmanImage4 = new Image();
        pacmanImage4.src = "../images/pac0.png"

        this.pacmanImages = [pacmanImage1, pacmanImage2, pacmanImage3, pacmanImage4];

        this.pacmanImageIndex = 3; //pacman fully closed
    }

    #keydown =(event)=>{
        //up
        if(event.code === "KeyW"){
            if(this.currentMovindDirection == MovingDirection.down)
                this.currentMovindDirection = MovingDirection.up;  
            this.requestedMovingDirection = MovingDirection.up;
        }
        //down
        if(event.code === "KeyS"){
            if(this.currentMovindDirection == MovingDirection.up)
            this.currentMovindDirection = MovingDirection.down;  
        this.requestedMovingDirection = MovingDirection.down;

        }
        //left
        if(event.code === "KeyA"){
            if(this.currentMovindDirection == MovingDirection.right)
            this.currentMovindDirection = MovingDirection.left;  
        this.requestedMovingDirection = MovingDirection.left;

        }
        //right
        if(event.code === "KeyD"){
            if(this.currentMovindDirection == MovingDirection.left)
            this.currentMovindDirection = MovingDirection.right;  
        this.requestedMovingDirection = MovingDirection.right;

        }
    };
    #move() {
        if(this.currentMovindDirection !== this.requestedMovingDirection) {
            if(Number.isInteger(this.x/this.tileSize) && 
            Number.isInteger(this.y/this.tileSize)
            ){
                this.currentMovindDirection = this.requestedMovingDirection;
            }
        }
        switch(this.currentMovindDirection) {
            case MovingDirection.up:
                this.y -= this.velocity;
                break;
       
            case MovingDirection.down:
                this.y += this.velocity;
                break;

            case MovingDirection.left:
                this.x -= this.velocity;
                break;
                    
            case MovingDirection.right:
                this.x += this.velocity;
                break;
        }
    }
}
class TileMap {
    constructor(tileSize){
        this.tileSize = tileSize; //implement the constructor and pass the tile size with by setting a variable for it
        this.wall = this.#image('wall.png'); //reference to images directory inside the tilemap constructor
        this.pacman = this.#image('pac1.png');
        this.pacman0 = this.#image('pac0.png');
        this.pacman2 = this.#image('pac2.png');
        this.dot = this.#image('yellowDot.png');
        this.ghost = this.#image('ghost.png');
        this.ghost1 = this.#image('scaredGhost.png');
        this.dot1 = this.#image('pinkDot.png');

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
    //2 = pacman pac1
    //3 = enemies ghost
    //4 = scared enemies ghost1
    //5 = pinkDot
    map =[
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,2,0,4,0,0,0,0,0,0,0,0,3,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,0,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,0,1,1,1,1,1,1,1,1,1,0,1],
        [1,0,1,0,1,0,0,3,0,0,0,0,0,0,1],
        [1,0,1,0,1,0,1,1,1,1,0,1,1,0,1],
        [1,0,1,0,1,0,1,1,1,1,0,1,1,0,1],
        [1,0,1,0,1,0,1,1,1,1,0,1,1,0,1],
        [1,3,0,0,0,0,0,0,0,0,0,0,0,3,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ];
    //method that takes in canvas and ctx to draw the game again during the loop
    draw(canvas, ctx) {
        this.#setCanvasSize(canvas);
        this.#clearCanvas(canvas, ctx);
        this.#drawMap(ctx);
    }; 

    #drawMap(ctx){
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                const tile = this.map[row] [column];
                let image = null;
                switch (tile) {
                    case 1:
                        image = this.wall;
                        break;
                    case 0:
                        image = this.dot;
                        break;
                    case 2:
                        image = this.pacman;
                        break;
                    case 3:
                        image = this.ghost;
                        break;
                    case 4:
                            image = this.ghost1;
                            break;
                }
               if (image != null)
                ctx.drawImage(
                    image, 
                    column * this.tileSize, 
                    row * this.tileSize, 
                    this.tileSize,
                    this.tileSize
                    );
            }
        }

    }

    #clearCanvas(canvas, ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
   //started here trying to add pacman movement and the board went away
    getPacman(velocity) {
        for (let row =0; row < this.map.length; row++){
            for(let column =0; column < this.map[row].length; column++){
                let tile = this.map[row] [column];
                if(tile === 4) {
                    this.map[row] [column] = 0;
                    return new Pacman(column * this.tileSize, row * this.tileSize, this.tileSize, velocity, this.tileMap);
                }
            }
        }
    }
    #setCanvasSize(canvas) {
    canvas.height = this.map.length * this.tileSize;
    canvas.width = this.map[0].length * this.tileSize; 
   }
   
}

//Get images to display 
//use individual images to get this game to display on the screen 
//load the images using a helper method #image(using the hash lets me know it's a private method) 
// give it the name fileName
//create an image object and set a path using src and path to the images using a string
//next load the images in the constructor created with the class TileMap
//load images by defining the 1st image, the wall using this. and call that helper method with the file name 

//Set images sizes
//Create a new method inside the draw method called setCanvasSize(canvas) to take in the method inside of the draw method
//then implement setCanvasSize and set the height and width lines 42-44 
//height is based on the number of items from the array, the width comes from the number of columns using the 1st row in the array

//Clear the canvas
//create a method called clear the canvas inside of the draw method that takes in the same properties as draw 
//define that function/method and put in the same properties on line
//give the canvas a fill style and color of black and use x and y axis on  the fill react. 

//Create a for loop to draw the map by looping the rows in the map by getting the length line 44
//after looping the rows loop the columns



const tileSize = 32; //we want each tile as 32 pixels; Identify how big the tiles should be in the game using tileSize
const velocity = 2;

//Create the following variable that will be needed for the game to operate and be view on the browser.

const canvas = document.getElementById('gameCanvas'); //1st  define canvas to find it's html element by id 'gameCanvas';
const ctx = canvas.getContext('2d'); //define this to draw to the screen in 2d
//the tileMape has to be initialized after being imported on line 1 by creating a variable.  
const tileMap = new TileMap(tileSize); //passing in the tile size in the new TileMap
const pacman = tileMap.getPacman(velocity)
/* 2nd create the function gameLoop; this loop will redraw the game every second for up to 75 times using setInterval; 
1000 miliseconds = 1 second (This Function is the Most Important Part of the Game) */
function gameLoop() {
tileMap.draw(canvas,ctx); // we will execute this on every single loop of the game
pacman.draw(ctx);
}
//tileMap.setCanvasSize(canvas); // When I added this it went back to the original small tileMap size
setInterval(gameLoop, 1000 / 75);
/* 3rd define the tile map to draw the screen in the game loop */

