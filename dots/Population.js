class Population {
    dots = [];
    fitnessSum = 0;
    generation = 1;

    constructor(size) {
        for (var i = 0; i < size; i++) {
            this.dots.push(new Dot());
        }
    }

    show = function() {
        for (var i = 0; i < this.dots.length; i++) {
            this.dots[i].show();
        }
    }

    update = function() {
        for (var i = 0; i < this.dots.length; i++) {
            this.dots[i].update();
        }
    }

    calculateFitness = function() {
        for (var i = 0; i < this.dots.length; i++) {
            this.dots[i].calculateFitness();
        }
    }

    allDotsDead = function() {
        for (var i = 0; i < this.dots.length; i++) {
            if (this.dots[i].alive)
                return false; 
        }
        return true;
    }



    selection = function() {
        var newDots = [];
        this.calculateFitnessSum();

        for (var i = 0; i < this.dots.length; i++) {
            // select parent based on fitness
            var parent = this.selectParent();
            // get baby from it
            // the baby is currently having the same brain as the chosen parent, no crossover
            newDots[i] = parent.getBaby();
        }
        this.dots = newDots;
        this.generation++;
    }

    selectParent = function () {
        var rand = Math.random() * this.fitnessSum;

        var runningSum = 0;
        for (var i = 0; i < this.dots.length; i++) {
            runningSum += this.dots[i].fitness;
            if (runningSum >= rand) {
                return this.dots[i];
            }
        }
        console.log("RETURNING NULL");
        return null;
    }

    mutate = function() {
        for (var i = 1; i < this.dots.length; i++) {
            this.dots[i].brain.mutate();
        }
    }

    calculateFitnessSum = function() {
        this.fitnessSum = 0;
        for (var i = 0; i < this.dots.length; i++) {
            this.fitnessSum += this.dots[i].fitness;
        }
    }
}