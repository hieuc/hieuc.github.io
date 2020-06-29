class Dot {
    pos = {x: window.innerWidth/2, y: window.innerHeight - 50};
    vel = {x: 0, y:0};
    acc = {x: 0, y: 0};
    radius = 4;
    alive = true;
    reachedGoal = false;
    fitness = 0;
    brain = new Brain(400);
    
    show = function() {
        fill(0);
        circle(this.pos.x, this.pos.y, this.radius * 2);
    }
    
    move = function () {
        this.acc = this.brain.directions[this.brain.step];
        this.brain.step++;
        this.vel.y += this.acc.y;
        this.vel.x += this.acc.x;
        
        var speedLim = 12;
        if (this.vel.x > speedLim) this.vel.x = speedLim;
        else if (this.vel.x < -speedLim) this.vel.x = -speedLim;
        if (this.vel.y > speedLim) this.vel.y = speedLim;
        else if (this.vel.y < -speedLim) this.vel.y = -speedLim;
        
        this.pos.y += this.vel.y;
        this.pos.x += this.vel.x;
    }

    update = function() { 
        if (this.alive) {
            if (this.brain.step + 1 > this.brain.directions.length || 
                this.pos.x < 10 || this.pos.x > window.innerWidth - 20||
                this.pos.y < 0 || this.pos.y > window.innerHeight - 20) {
                this.alive = false;
            } 
            for (var i = 0; i < obstacles.length; i++) {
                var e = obstacles[i];
                if (this.pos.x <= e.x + e.w && this.pos.x >= e.x &&
                    this.pos.y <= e.y + e.h && this.pos.y >= e.y) {
                    this.alive = false;
                }
            }

            if (this.distanceToGoal() < 5) {
                this.alive = false;
                this.reachedGoal = true;
                for (var i = 0; i < dots.dots.length; i++) {
                    dots.dots[i].alive = false;
                }
            }

            if (this.alive) {
                this.move();
            }
        }
    }

    calculateFitness = function () {
        var dis = this.distanceToGoal();
        if (this.reachedGoal) {
            this.fitness = 1.0 / 10 + 10000.0 / Math.pow(this.brain.step, 2);
        } else {
            this.fitness = 1.0 / (Math.pow(dis, 2));
        }
    }

    getBaby() {
        var dot = new Dot();
        dot.brain = this.brain.getCopy();
        return dot;
    }

    distanceToGoal = function () {
        return Math.sqrt( Math.pow(this.pos.x - goal.x, 2) + Math.pow(this.pos.y - goal.y, 2) );
    }
}