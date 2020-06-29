class Brain {
    directions = [];
    step;

    constructor(max) {
        this.step = 0;
        for (var i = 0; i < max; i++) {
            this.directions.push({x : this.rand(-5, 5), y: this.rand(-5, 5)});
        }

    }

    rand = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    getCopy = function() {
        var clonedBrain = new Brain(this.directions.length);
        for (var i = 0; i < this.directions.length; i++) {
            clonedBrain.directions[i] = JSON.parse(JSON.stringify(this.directions[i]));
        }
        return clonedBrain;
    }

    // mutating 1% of directions to a random direction
    mutate = function() {
        var mutationRate = 0.01;
        for (var i = 0; i < this.directions.length; i++) {
            var rand = Math.random();
            if (rand < mutationRate) {
                this.directions[i] = {x : this.rand(-5, 5), y: this.rand(-5, 5)};
            }
        }
    }
}