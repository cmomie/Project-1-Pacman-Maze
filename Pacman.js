import MovingDirection from "./MovingDirection.js";

export default class Pacman {
    constructor(x, y, tileSize, velocity, tileMap){
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.currentMovindDirection = null;
        this.requestedMovingDIrection = null;

        document.addEventListener('keydown', this.#keydown)


        this.loadPacmanImages();
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

        this.loadPacmanImages = [pacmanImage1, pacmanImage2, pacmanImage3, pacmanImage4];

        this.pacmanImageIndex = 3; //pacman fully closed
    }

    #keydown =(event)=>{
        //up
        if(event.keyCode === 'KeyW'){
            if(this.currentMovindDirection == MovingDirection.down)
                this.currentMovindDirection = MovingDirection.up;  
            this.requestedMovingDirection = MovingDirection.up;
        }
        //down
        if(event.keyCode === "KeyS"){
            if(this.currentMovindDirection == MovingDirection.up)
            this.currentMovindDirection = MovingDirection.down;  
        this.requestedMovingDirection = MovingDirection.down;

        }
        //left
        if(event.keyCode === "KeyA"){
            if(this.currentMovindDirection == MovingDirection.right)
            this.currentMovindDirection = MovingDirection.left;  
        this.requestedMovingDirection = MovingDirection.left;

        }
        //right
        if(event.keyCode == "KeyD"){
            if(this.currentMovindDirection == MovingDirection.left)
            this.currentMovindDirection = MovingDirection.right;  
        this.requestedMovingDirection = MovingDirection.right;

        }
    };
    #move() {
        if(this.currentMovindDirection !== this.requestedMovingDirection) {
            if(Number.isInteger(this.x/this.tileSize) && 
            Number.isInterger(this.y/this.tileSize)
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
