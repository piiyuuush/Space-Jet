let rows = 8;
let columns = 5;

const tileSize = document.getElementById(`tile`).offsetHeight; // gets the size of 1 tile from an invisible div
//ofsetHeight converts 4rem into pixels so for pc browser 4*16px

let canvas= document.getElementById(`board`); 
canvas.width = columns*tileSize; // setting up the canvas size
canvas.height = rows*tileSize;
let context; // this is our drawing variable

let jet = {
    x: tileSize*parseInt(columns/2),
    y: tileSize*(rows-1),
    height: tileSize,
    width: tileSize
} // jet object which stores its x and y coordinates and height and width
jetImg = new Image(); // creating an img object for jet
jetImg.src = "/jet.png"

document.addEventListener(`keydown`, move);

// when the window loads we want the canvas to start drawing our game and update the frames
window.onload = function(){
    context = canvas.getContext(`2d`); //we want to make 2d canvas graphics
    jetImg.onload = function() {
        context.drawImage(jetImg, jet.x,jet.y,jet.width,jet.height);
    }
    requestAnimationFrame(update); // this function starts to go in a loop to update the frame
}
//constantly updates the postion(60fps usually)
function update(){
    context.clearRect(0, 0, canvas.width, canvas.height); // clear enitre board and update next frame
    context.drawImage(jetImg, jet.x,jet.y,jet.width,jet.height); //draw jet then call next frame where canvas cleared and again drawn
    requestAnimationFrame(update);
}

//defines the movement of jet, if key is pressed then it will move by one tile
function move(e){
    if(e.key === `ArrowLeft` && jet.x > 0){
        jet.x -= tileSize;
    }
    else if(e.key === `ArrowRight` && jet.x <canvas.width - tileSize){
        jet.x += tileSize;
    }
}
