******************** Objective of the Game ***********************
    Get Pacman through the maze until he reaches the Ghost in under 30 seconds
    Player must add the amount of time that they will need to play the game
                        
                            
******************** Create Files Needed ***********************
    Images directory with the pictures of the pacman players and tile map, include css styling in html file, game.js, tilemap.js, index.html
                            

    ****************Create the function loop that will allow the game to operate

******************** Game Creation ************************
    //Create the character legend and 2d gameboard
    //Make the grid using a 2 demensional array 
    //(and array with other arrays inside of it) 
    //this is how I identify how many rows(the number of arrays inside the outer array) 
    //the columns is determined by the number of items in each inner arrays
    //created a legend to identify the part of the game board and players
    //1 = wall
    //0 = dots
    //2 = pacman
    //3 = enemies
    //Add methods and functions to display the gameboard and player on the screen

    //Define the varialbes needed to create the game display
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
    //give the canvas a fill style and color of black and use x and y axis on  the fill rect. 

    //Create a for loop to draw the map by looping the rows in the map by getting the length line 44
    //after looping the rows loop the columns

    ************Updates for the Future**************
    //Incorporate 

source used to inspire game: https://youtu.be/Tk48dQCdQ3E


