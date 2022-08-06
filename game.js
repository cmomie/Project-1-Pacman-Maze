class Character {
    constructor(x, y, image, width, height) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.width = width;
        this.height = height;
        this.alive = true;

        this.render = function() {
            ctx.drawImage(this.image, this.x, this.y);
        }
    }
}

let ghost 
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
        this.alive = true;
      
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
            if(
            Number.isInteger(this.x/this.tileSize) && //tells if we are in a positive area on the tileMap
            Number.isInteger(this.y/this.tileSize)
            ){
              
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
        [1,0,0,0,4,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,0,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,0,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,1,0,1,0,0,3,0,0,0,0,0,1,1],
        [1,0,1,0,1,0,1,1,1,1,0,1,1,0,1],
        [1,0,1,0,1,0,1,1,1,1,0,1,1,0,1],
        [1,0,1,0,1,0,1,1,1,1,0,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
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
   //started here trying to add pacman movement 
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

const tileSize = 32; //we want each tile as 32 pixels; Identify how big the tiles should be in the game using tileSize
const velocity = 2;

//Create the following variable that will be needed for the game to operate and be viewied on the browser.

const canvas = document.getElementById('gameCanvas'); //1st  define canvas to find it's html element by id 'gameCanvas';
const ctx = canvas.getContext('2d'); //define this to draw to the screen in 2d
const status = document.getElementById('status');
const score = document.getElementById('score'); // we went in and added an id for the score 
const ghostimg = document.getElementById('ghost');
//the tileMape has to be initialized after being imported on line 1 by creating a variable.  
//let tileMap 
//let pacman 
/* 2nd create the function gameLoop; this loop will redraw the game every second for up to 75 times using setInterval; 
1000 miliseconds = 1 second (This Function is the Most Important Part of the Game) */
window.addEventListener('DOMContentLoaded', function() {
     tileMap = new TileMap(tileSize); //passing in the tile size in the new TileMap
     pacman = tileMap.getPacman(velocity)
    ghost = new Character(10, 20, ghostimg, 70, 80)
    const runGame = setInterval(gameLoop, 1000 / 75);
});
function movementHandler(e) {
    console.log('movement', e.key);
//switch will allow us to use different keys according to the following conditions if we press those buttons
    switch(e.key) {
        case 'ArrowUp': //moves pacman up
            pacman.y - 10 >= 0 ? (pacman.y -= 10) : null; //it will check if it's greater than or equal to 0 then if it is it will move 10 spaces
        break; //type break to add additional cases or keys that we can press
        case 'ArrowLeft': //moves pacman left
            pacman.x - 10 >= 0 ? (pacman.x -= 10) : null;
        break
        case 'ArrowDown'://moves pacman down
            pacman.y + 10 <= canvas.height ? (pacman.y += 10) : null;
        break
        case 'ArrowRight'://moves pacman right
            pacman.x + 10 <= canvas.width ? (pacman.x += 10) : null;
        break
        case 'w': //moves pacman up
        pacman.y - 10 >= 0 ? (pacman.y -= 10) : null; //it will check if it's greater than or equal to 0 then if it is it will move 10 spaces
        break; //type break to add additional cases or keys that we can press
        case 'a': //moves pacman left
        pacman.x - 10 >= 0 ? (pacman.x -= 10) : null;
         break
        case 's'://moves pacman down
        pacman.y + 10 <= canvas.height ? (pacman.y += 10) : null;
        break
        case 'd'://moves pacman right
        pacman.x + 10 <= canvas.width ? (pacman.x += 10) : null;
        break
    }

}
function detectHit(player1, player2) {
    //booleen condition is testing if all of the following is true to see if the players actually hit each other according to the players x,y, height, and width positions
    let hitTest = 
    player1.y + player1.height > player2.y &&
    player1.y < player2.y + player2.height &&
    player1.x + player1.width > player2.x &&
    player1.x < player2.x + player2.width;
    //if they actually touch each other there is a hit

    if (hitTest) {//if this the test above is true we will add 100 points to the current score. 
        let newScore = Number(score.textContent) + 100; //we grab the score from HTML here and add the 100 points as well; writing the word Number turns the string that is already there into a number
        score.textContent = newScore;

    
    } else {
        return false;
    }
}
document.addEventListener('keydown', movementHandler);
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   // movement.textContent = `X:${pacman.x}\nY:${pacman.y}`;
    if (pacman.alive){
        pacman.draw(ctx);
let hit = detectHit(pacman, tileMap)
    }
tileMap.draw(canvas,ctx); // we will execute this on every single loop of the game
pacman.draw(ctx);

}


//tileMap.setCanvasSize(canvas); // When I added this it went back to the original small tileMap size
setInterval(gameLoop, 1000 / 75);
/* 3rd define the tile map to draw the screen in the game loop */

class Timer {
    constructor(root) {
      root.innerHTML = Timer.getHTML();
  
      this.el = {
        minutes: root.querySelector(".timer__part--minutes"),
        seconds: root.querySelector(".timer__part--seconds"),
        control: root.querySelector(".timer__btn--control"),
        reset: root.querySelector(".timer__btn--reset")
      };
  
      this.interval = null;
      this.remainingSeconds = 0;
  
      this.el.control.addEventListener("click", () => {
        if (this.interval === null) {
          this.start();
        } else {
          this.stop();
        }
      });
  
      this.el.reset.addEventListener("click", () => {
        const inputMinutes = prompt("Enter number of minutes:");
  
        if (inputMinutes < 60) {
          this.stop();
          this.remainingSeconds = inputMinutes * 60;
          this.updateInterfaceTime();
        }
      });
    }
  
    updateInterfaceTime() {
      const minutes = Math.floor(this.remainingSeconds / 60);
      const seconds = this.remainingSeconds % 60;
  
      this.el.minutes.textContent = minutes.toString().padStart(2, "0");
      this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }
  
    updateInterfaceControls() {
      if (this.interval === null) {
        this.el.control.innerHTML = `<span class="material-icons">play</span>`;
        this.el.control.classList.add("timer__btn--start");
        this.el.control.classList.remove("timer__btn--stop");
      } else {
        this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
        this.el.control.classList.add("timer__btn--stop");
        this.el.control.classList.remove("timer__btn--start");
      }
    }
  
    start() {
      if (this.remainingSeconds === 0) return;
  
      this.interval = setInterval(() => {
        this.remainingSeconds--;
        this.updateInterfaceTime();
  
        if (this.remainingSeconds === 0) {
          this.stop();
        }
      }, 1000);
  
      this.updateInterfaceControls();
    }
  
    stop() {
      clearInterval(this.interval);
  
      this.interval = null;
  
      this.updateInterfaceControls();
    }
  
    static getHTML() {
      return `
              <span class="timer__part timer__part--minutes">00</span>
              <span class="timer__part">:</span>
              <span class="timer__part timer__part--seconds">00</span>
              <button type="button" class="timer__btn timer__btn--control timer__btn--start">
                  <span class="material-icons">play</span>
              </button>
              <button type="button" class="timer__btn timer__btn--reset">
                  <span class="material-icons">timer</span>
              </button>
          `;
    }
  }
  
  new Timer(
      document.querySelector(".timer")
  );
