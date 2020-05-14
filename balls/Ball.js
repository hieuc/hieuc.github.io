function Ball (x, y, r) {
    this.body = Bodies.circle(x, y, r);
    this.r = r;
    this.color = color(random(0,255), random(0,255), random(0,255));
    World.add(world, this.body);

    this.show = function() {
        var pos = this.body.position;

        push();
        fill(this.color);
        translate(pos.x, pos.y);
        circle(0, 0, this.r * 2);

        pop();
    }
}