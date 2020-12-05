function Ball (x, y, r) {
    var option = {
        restitution : 1, // for bounce
        // eliminate friction
        friction : 0,
        frictionAir : 0,
        frictionStatic : 0,
        inertia : Infinity
    }
    this.body = Bodies.circle(x, y, r, option);
    this.color = color(random(0,256), random(0,256), random(0,256));
    World.add(world, this.body);

    this.body.force = {x : random(-0.1, 0.1), y : random(-0.1, 0.1)};

    // eliminate frictions
    this.body.restitution = 1; // for bounce
    this.body.friction = 0;
    this.body.frictionAir = 0;
    this.body.frictionStatic = 0;
    
    this.show = function() {
        var pos = this.body.position;

        push();
        noStroke();
        fill(this.color);
        translate(pos.x, pos.y);
        circle(0, 0, this.body.circleRadius * 2);

        pop();
    }
}