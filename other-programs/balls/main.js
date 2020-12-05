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

var balls = [];
var grounds = [];

function setup() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    world.gravity.y = 0;
    createCanvas(width, height);
    Engine.run(engine);
    
    var option = {
        isStatic: true
    }

    // create borders
    var bordersize = 100;
    grounds.push(new Bodies.rectangle(0, height, width*2, bordersize, option));
    grounds.push(new Bodies.rectangle(width - 1, 0, bordersize, height * 2, option));
    grounds.push(new Bodies.rectangle(0, height, bordersize, height * 2, option));
    grounds.push(new Bodies.rectangle(0, 0, width*2, bordersize, option));

    World.add(world, grounds);

    console.log(new Bodies.circle(20, 20, 20));
    
    Render.run(render);
}

function draw() {
    background(100);
    var removing = [];
    for (var i = 0; i < balls.length; i++) {
        // remove the small ball 
        if (balls[i].body.circleRadius < 15 || isOutsideScreen(balls[i])) { 
            removing.push(i);
        } else {
            balls[i].show();
        }
    }
    for (var i = 0; i < removing.length; i++) {
        if (balls[removing[i]] !== undefined) {
            World.remove(world, balls[removing[i]].body);
            balls.splice(removing[i], 1);
        }
    }

    collisionDetect(balls);
}

function isOutsideScreen(ball) {
    x = ball.body.position.x;
    y = ball.body.position.y;
    return (x < 0 || y < 0 || x > window.innerWidth || y > window.innerHeight);
}

function mouseDragged() {
    balls.push(new Ball(mouseX, mouseY, 30));
}

function mousePressed() {
    balls.push(new Ball(mouseX, mouseY, 30));
}

function collisionDetect() {
    for (var i = 0; i < balls.length; i++) {
        b1 = balls[i].body;
        r1 = b1.circleRadius;
        for (var j = i + 1; j < balls.length; j++) {
            b2 = balls[j].body;
            r2 = b2.circleRadius;
            if (Math.sqrt((b1.position.x - b2.position.x)**2 +(b1.position.y - b2.position.y)**2) 
                <= r1 + r2) {
                    /* shrinking balls */
                    var downscale = 0.2;
                    Matter.Body.scale(b1, (r1 - downscale)/ r1, (r1 - downscale)/ r1);
                    Matter.Body.scale(b2, (r2 - downscale)/ r2, (r2 - downscale)/ r2);

                    // attempting to keep the environment moving
                    b1.inertia = Infinity;
                    b2.inertia = Infinity;
                    var multiplier = 0.00005;
                    Matter.Body.applyForce(b1, b1.position, 
                        {x: b1.velocity.x*multiplier, y: b1.velocity.y*multiplier});
                    Matter.Body.applyForce(b2, b2.position, 
                        {x: b2.velocity.x*multiplier, y: b2.velocity.y*multiplier});
                    
                    // changing color
                    balls[i].color = color(random(0,255), random(0,255), random(0,255));
                    balls[j].color = color(random(0,255), random(0,255), random(0,255));
                }
        }
    }
}