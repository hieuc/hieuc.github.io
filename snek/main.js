var unit = 40;
var canvasWidth = 1000;
var canvasHeight = canvasWidth;
var boardW = canvasWidth / unit;
var boardH = canvasHeight / unit;
var food = {x: -1, y: -1};
var snake = new Snake();

function setup() {
    createCanvas(1000, 1000);
    frameRate(12);
    spawnFood();
}

function draw() {
    background(color(229, 235, 197));
    fill(color(255, 0, 0));
    rect(food.x * unit, food.y * unit, unit, unit);
    snake.move();
    snake.draw();
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        snake.shiftDirection({x: -1, y: 0});
    } else if (keyCode === RIGHT_ARROW) {
        snake.shiftDirection({x: 1, y: 0});
    } else if (keyCode === UP_ARROW) {
        snake.shiftDirection({x: 0, y: -1});
    } else if (keyCode === DOWN_ARROW) {
        snake.shiftDirection({x: 0, y: 1});
    }
}

function spawnFood() {
    do {
        food = {x: floor(random(0, boardW)), y: floor(random(0, boardH))};
    } while (snake.foodCheck());
}