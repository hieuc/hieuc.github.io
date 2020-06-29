class Obstacle {
    x;
    y;
    w;
    h;
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    show = function() {
        fill(75, 0, 130);
        rect(this.x, this.y, this.w, this.h);
    }
}