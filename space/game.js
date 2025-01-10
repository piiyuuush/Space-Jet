let rows = 8;
let columns = 5;

const tileSize = document.getElementById(`tile`).offsetHeight; // gets the size of 1 tile from an invisible div
//ofsetHeight converts 4rem into pixels so for pc browser 4*16px
let context; // this is our drawing variable

let jet = {
    x: tileSize*parseInt(columns/2),
    y: tileSize*(rows-1),
    height: tileSize,
    width: tileSize
} // jet object which stores its x and y coordinates and height and width


// when the game/window loads up we want to set up the board height n width and also start updating the frames
window.onload = function(){
    let canvas= document.getElementById(`board`); 
    canvas.width = columns*tileSize; // setting up the canvas size
    canvas.height = rows*tileSize;

    context = canvas.getContext(`2d`); //we want to make 2d canvas graphics
    jetImg = new Image(); // creating an img object for our jet then drawing it
    jetImg.src = "/jet.png"
    jetImg.onload = function() {
        context.drawImage(jetImg, jet.x,jet.y,jet.width,jet.height);
    }
    requestAnimationFrame(update); // this function starts to go in a loop to update the frame
}
//constantly updates the postion(60fps usually)
function update(){
    requestAnimationFrame(update);
    context.drawImage(jetImg, jet.x,jet.y,jet.width,jet.height);
}
