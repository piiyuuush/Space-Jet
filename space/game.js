let rows = 8;
let columns = 5;

const tileSize = document.getElementById('tile').offsetHeight; // Gets the size of 1 tile from an invisible div
let canvas = document.getElementById('board');
canvas.width = columns * tileSize; // Setting up the canvas size
canvas.height = rows * tileSize;
let context = canvas.getContext('2d'); // Set up context to draw 2D graphics

let jet = {
    x: tileSize * parseInt(columns / 2),
    y: tileSize * (rows - 1),
    height: tileSize,
    width: tileSize
}; // Jet object stores its x, y coords and height/width

let jetImg = new Image(); // Create an img object for jet
jetImg.src = "jet.png";

document.addEventListener('keydown', start);

//initializing variables required to create obstacles
let objects = [];
let positionFound;
let obstacleSpeed = 2;

/*
  Function to create obstacles:
  The `occupied` array tracks whether a tile is occupied by an obstacle; initially, no tiles are occupied.
  We generate a random number `x` between 1 and 4 to determine the number of spaces/empty areas in a row, 
  ensuring at least one space for the player to navigate through. This results in creating `columns - x` obstacles in the row.
  The loop iterates to create the required number of obstacles. For each obstacle, 
  a `while` loop finds a suitable position by selecting a random tile index (`rndmTile`). 
  If the tile at `rndmTile` is unoccupied, we create an obstacle at `x: rndmTile * tileSize` and `y: -1 * tileSize` 
  (placing it just outside the visible area to slide into view). 
  The `occupied[rndmTile]` is set to `true` to mark the tile as occupied, and we exit the `while` loop for this obstacle.
  if `occupied[rndTile]` is already marked as `true` then the while loop will iterate again until a tile is found which is empty.
  The process repeats until all obstacles in the row are placed without overlapping.
*/
function randomObjs() {
    let occupied = [false, false, false, false, false]; // Keep track of occupied tiles
    let x = Math.floor(Math.random() * 4 + 1); // Random number of obstacles to be generated
    const randomInterval = Math.random() * 500 + 500; // random interval of time between 1-2 seconds
    for (let i = 0; i < columns - x; i++) {
        positionFound = false;
        while (!positionFound) {
            let rndmTile = Math.floor(Math.random() * 5); // Random tile selection for obstacle
            if (!occupied[rndmTile]) {
                objects.push({
                    x: rndmTile * tileSize,
                    y: -1*tileSize,
                    width: tileSize,
                    height: tileSize
                });
                occupied[rndmTile] = true; // Mark the tile as occupied
                positionFound = true;
            }
        }
    }
    setTimeout(randomObjs, randomInterval); // calls itself at random interval of time
}

// Function to draw obstacles
function objDraw() {
    context.fillStyle = "green"; // Set color for obstacles
    for (let i = 0; i < objects.length; i++) {
        context.fillRect(objects[i].x, objects[i].y, objects[i].width, objects[i].height); 
        // Draw obstacle at its position
    }
}

// When the window loads, start drawing
window.onload = function() {
    jetImg.onload = function() {
        context.drawImage(jetImg, jet.x, jet.y, jet.width, jet.height); // Draw jet once image is loaded
    };
    requestAnimationFrame(update); // This function starts the loop for frame updates
};
//game will start when space bar is pressed
function start(){
    document.getElementById("txt").innerHTML = ""
    document.removeEventListener('keydown', start);
    document.addEventListener('keydown', move);
    randomObjs();
}
// Function to update the canvas every frame
function update() {
    
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire board and update the next frame
    objDraw(); // Draw obstacles every frame
    context.drawImage(jetImg, jet.x, jet.y, jet.width, jet.height); // Draw jet
    obsMove(); // Move obstacles downwards
    // nextWave(); // create next wave
    requestAnimationFrame(update); // Continue updating the frame
}

// Function to move the jet based on key presses
function move(e) {

    if (e.key === 'ArrowLeft' && jet.x > 0) {
        jet.x -= tileSize; // Move jet left
    } else if (e.key === 'ArrowRight' && jet.x < canvas.width - tileSize) {
        jet.x += tileSize; // Move jet right
    }
}

function obsMove() {
    // Move obstacles down the screen
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].y < tileSize * rows) {
            objects[i].y += obstacleSpeed; // Move obstacle down by obstacleSpeed by default =1
        }
    }

    // Remove obstacles that have moved outside the screen
    if (objects.length > 0 && objects[0].y >= tileSize * rows) {
        objects.shift(); // Removes one element from object array that is at 0 index
    }
}

// checks for every other row whether first row of obstacles is in odd y coords
// if yes then it will create another wave


// function nextWave(){
//         if(objects[0].y === 1*tileSize || objects[0].y === 3*tileSize || 
//             objects[0].y === 5*tileSize || objects[0].y === 7*tileSize){
//                 randomObjs();
//     }
// }
