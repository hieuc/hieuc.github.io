var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine = Engine.create();
var world = engine.world;
var render = Render.create({
    element: document.body,
    engine: engine
});

var c = [];
var grounds = [];

function setup() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    createCanvas(width, height);
    Engine.run(engine);
    
    var option = {
        isStatic: true
    }

    grounds.push(new Bodies.rectangle(0, height, width*2, 1, option));
    grounds.push(new Bodies.rectangle(width - 1, 0, 1, height * 2, option));
    grounds.push(new Bodies.rectangle(0, height, 1, height * 2, option));
    grounds.push(new Bodies.rectangle(0, 0, width*2, 1, option));

    World.add(world, grounds);

    console.log(new Ball(20, 20, 20));

    
    Render.run(render);
}

function draw() {
    background(69);
    for (var i = 0; i < c.length; i++) {
        c[i].show();
    }
}

function mousePressed() {
    c.push(new Ball(mouseX, mouseY, 20));
}