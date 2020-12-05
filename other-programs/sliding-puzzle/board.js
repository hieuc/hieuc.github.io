class Board {
    currentState;
    currentIndex;

    constructor(initState) {
        this.currentState = initState;
        this.currentIndex = initState.indexOf(" ");
    }

    move(direction) {
        if (direction === "RIGHT") {
            if (this.currentIndex % 4 === 3) 
                return;
            this.swap(this.currentIndex + 1);
        } else if (direction === "DOWN") {
            if (this.currentIndex + 4 > 15) 
                return;
            this.swap(this.currentIndex + 4);
        } else if (direction === "LEFT") {
            if (this.currentIndex % 4 === 0) 
                return;
            this.swap(this.currentIndex - 1);
        } else if (direction === "UP") {
            if (this.currentIndex - 4 < 0) 
                return;
            this.swap(this.currentIndex - 4);
        }
    }
    
    show() {
        textSize(fontSize);
        for (var i = 0; i < 16; i++) {
            var x = i % 4;
            var y = Math.floor(i / 4);
            rect(x * unit, y * unit, unit, unit);
            text(this.currentState[i], x * unit + (unit - fontSize) / 1.5, y * unit + (unit - fontSize) * 1.4);
        }
    }

    // make the swap in current state of board
    swap(index) {
        this.currentState = this.getStateString(this.currentState, index);
        this.currentIndex = index;
    }

    //---------------------------------------"static" methods---------------------------------------------------------

    getNextState(state, direction) {
        var currentIndex = state.indexOf(" ");
        if (direction === "RIGHT") {
            if (currentIndex % 4 === 3) 
                return null;
            return this.getStateString(state, currentIndex + 1);
        } else if (direction === "DOWN") {
            if (currentIndex + 4 > 15) 
                return null;
            return this.getStateString(state, currentIndex + 4);
        } else if (direction === "LEFT") {
            if (currentIndex % 4 === 0) 
                return null;
            return this.getStateString(state, currentIndex - 1);
        } else if (direction === "UP") {
            if (currentIndex - 4 < 0) 
                return null;
            return this.getStateString(state, currentIndex - 4);
        }
    }

    getPossibleActions(state) {
        var index = state.indexOf(" ");
        var result = [];

        if (!(index % 4 === 3)) 
            result.push("RIGHT")
            if (!(index + 4 > 15)) 
            result.push("DOWN");
        if (!(index % 4 === 0)) 
            result.push("LEFT");
        if (!(index - 4 < 0))
            result.push("UP");
        
        
        return result;
    }

    getStateString(state, index) {
        var currentIndex = state.indexOf(" ");
        var str = state.split("");
        str[currentIndex] = str[index];
        str[index] = ' ';
        return str.join("");
    }
}