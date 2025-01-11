let rows = 8;
let columns = 5;

const tileSize = document.getElementById('tile').offsetHeight; // Gets the size of 1 tile from an invisible div
console.log("Tile size: ", tileSize); // Log tile size to make sure it's correct

let canvas = document.getElementById('board');
canvas.width = columns * tileSize; // Setting up the canvas size
canvas.height = rows * tileSize;
let context = canvas.getContext('2d'); // Initialize 2D context

let jet = {
    x: tileSize * parseInt(columns / 2),
    y: tileSize * (rows - 1),
    height: tileSize,
    width: tileSize
}; // Jet object stores its x, y coordinates and height/width

let jetImg = new Image(); // Create an img object for jet
jetImg.src = "/jet.png";

document.addEventListener('keydown', move);

let objects = [];
let occupied = [false, false, false, false, false]; // Keep track of occupied tiles
let positionFound;

// Function to generate obstacles once
/* 
the objects is an array which will store information of indivual obstacles
it will store their x, y posns and their sizes.
we start a loop with iterates till col-x where x lowest value can be 1
this is so that we can have anywhere between 1-4 objects being created
once the for loop starts we need to check whether a given randomTile is occupied
if it is then we will find another randomTile which is empty only then the loop will iterate to next obstacle
once a tile is occupied it will be flagged in the occupied array and no other obstacle will be able to occupy that tile
to prevent repetition.
*/
function randomObjs() {
    let x = Math.floor(Math.random() * 4+1);
    for (let i = 0; i < columns - x; i++) {
        positionFound = false;
        while (!positionFound) {
            let rndmTile = Math.floor(Math.random() * 5);
            if (!occupied[rndmTile]) {
                objects.push({
                    x: rndmTile * tileSize,
                    y: 0,
                    width: tileSize,
                    height: tileSize
                });
                occupied[rndmTile] = true;
                positionFound = true;
            }
        }
        // console.log(`Obstacle at x: ${objects[i].x}, y: ${objects[i].y}`);
    }
}

// draw obstacles fn
function objDraw() {
    context.fillStyle = "green";
    for (let i = 0; i < objects.length; i++) {
        // console.log(`Drawing obstacle at x: ${objects[i].x}, y: ${objects[i].y}`);
        context.fillRect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}

// When the window loads, start drawing
window.onload = function() {
    jetImg.onload = function() {
        context.drawImage(jetImg, jet.x, jet.y, jet.width, jet.height);
    };

    randomObjs(); // get the positions of the objects at random coords
    requestAnimationFrame(update);
};

// Function to update the canvas (repeated every frame)
function update() {
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire board and update next frame
    
    // Draw obstacles every frame
    objDraw();
    
    // Draw jet in updated position
    context.drawImage(jetImg, jet.x, jet.y, jet.width, jet.height); 
    
    requestAnimationFrame(update);
}

// Function to move the jet based on key presses
function move(e) {
    if (e.key === 'ArrowLeft' && jet.x > 0) {
        jet.x -= tileSize;
    } else if (e.key === 'ArrowRight' && jet.x < canvas.width - tileSize) {
        jet.x += tileSize;
    }
}
