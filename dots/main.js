
dots = new Population(1000);
goal = {x: window.innerWidth/2, y: 5};
obstacles = []

function setup() {    
    var w = window.innerWidth;
    var h = window.innerHeight;
    createCanvas(w - 20, h - 20);
    obstacles.push(new Obstacle(w / 40, h / 4, w / 1.8, 20));
    obstacles.push(new Obstacle(w / 2.2, h / 1.5, w / 2.1, 20));
    obstacles.push(new Obstacle(w / 4, h / 2.25, w / 2.5, 20));
    obstacles.push(new Obstacle(w / 1.8, h / 4, 20, h / 20));
    obstacles.push(new Obstacle(w / 3, h / 2.7, 20, h / 12));

    textSize(20);
}

function draw() {
    background(169);
    for (var i = 0; i < obstacles.length; i++) {
        obstacles[i].show();
    }
    fill(0);
    text("Resize window + F5 to resize arena", 15, 25);
    fill(255, 0, 0);
    circle(goal.x, goal.y, 10);
    if (dots.allDotsDead()) {
        dots.calculateFitness();
        dots.selection();
        dots.mutate();
    } else {
        dots.update();
        dots.show();
    }
    text("Generation: " + this.dots.generation, 15, 55);
}

