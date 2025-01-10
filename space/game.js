let rows = 8;
let columns = 5;

const tileSize = document.getElementById(`tile`).offsetHeight;
let context;

let jet = {
    x: tileSize*parseInt(columns/2),
    y: tileSize*(rows-1),
    height: tileSize,
    width: tileSize
}

window.onload = function(){
    let canvas= document.getElementById(`board`);
    canvas.width = columns*tileSize;
    canvas.height = rows*tileSize;
    context = canvas.getContext(`2d`);
    // context.fillStyle = "green";
    
    jetImg = new Image();
    jetImg.src = "/jet.png"
    jetImg.onload = function() {
        context.drawImage(jetImg, jet.x,jet.y,jet.width,jet.height);
    }

}