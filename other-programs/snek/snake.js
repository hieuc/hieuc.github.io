class Snake {
    body;
    direction;

    constructor() {
        this.reset();
    }

    reset() {
        this.body = [];
        this.direction = {x: 1, y:0};
        for (var i = 0; i < 3; i++) {
            this.body.push({x: Math.round(boardW / 2) - 1 + i, y: Math.round(boardH / 2)});
        }
    }

    foodCheck() {
        var check = false;
        this.body.forEach(e => {
            if (e.x === food.x && e.y === food.y) {
                check = true;
            }
        });
        return check;
    }

    shiftDirection(d) {
        var head = this.body[this.body.length - 1]
        var rearHead = this.body[this.body.length - 2];
        if (!(d.x + head.x === rearHead.x && d.y + head.y === rearHead.y)) {
            this.direction.x = d.x;
            this.direction.y = d.y;
        }
    }

    move() {
        var head = this.body[this.body.length - 1];
        
        // move head
        this.body.push({x: head.x + this.direction.x,
             y: head.y + this.direction.y});

        // update head pointer
        head = this.body[this.body.length - 1];

        
        this.boundCheck();

        // check food
        if (!(head.x === food.x && head.y === food.y)) {
            this.body.splice(0, 1);
        } else {
            updateScore();
            spawnFood();
        }

        // check death
        for (var i = 0; i < this.body.length - 2; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                frameRate(0);
                setTimeout(function() {
                    snake.reset();
                    spawnFood();
                    updateScore();
                    frameRate(parseInt(document.getElementById("fps").value));
                }, 1000);
                
            }
        }
    }

    boundCheck() {
        var head = this.body[this.body.length - 1];
        if (head.x >= boardW) {
            head.x -= boardW;
        } else if (head.x < 0) {
            head.x += boardW;
        } else if (head.y >= boardH) {
            head.y -= boardH;
        } else if (head.y < 0) {
            head.y += boardH;
        } 
    }

    draw() {
        var size = this.body.length;
        fill(color(154, 0, 255));
        for (var i = 0; i < size -1; i++) {
            rect(this.body[i].x * unit, this.body[i].y * unit, unit, unit);
        }
        fill(color(109, 0, 181));
        rect(this.body[size - 1].x * unit, this.body[size - 1].y * unit, unit, unit);
    }
}