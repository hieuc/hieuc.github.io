
var board = new Board("123456789ABCDEF "); 
var unit = 100;
var fontSize = 50;
var goalStates = ["123456789ABCDEF ", "123456789ABCDFE "];
var attempt = 1;

function setup() {
    var c = createCanvas(unit * 4, unit * 4);
    c.parent("canvas");
    c.position(Math.min(window.innerWidth/4, 200), 50);
    document.getElementById("board-string").value = board.currentState;
    document.getElementById("fringe-limit").value = fringeLimit;
}

function draw() {
    board.show();
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        board.move("LEFT");
    } else if (keyCode === RIGHT_ARROW) {
        board.move("RIGHT");
    } else if (keyCode === UP_ARROW) {
        board.move("UP");
    } else if (keyCode === DOWN_ARROW) {
        board.move("DOWN");
    }
    /*
    if ([LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW].includes(keyCode)) {
        document.getElementById("board-string").value = board.currentState;
    }
    */
}

function startSearch() {
    changeFringeLimit();
    var mode = document.getElementById("algorithm").selectedIndex;
    var alg = document.getElementById("algorithm").value;
    var limit = parseInt(document.getElementById("depth-limit").value);
    var result;
    switch (mode) {
        case 0:
            result = BFS();
            break;
        case 1:
            result = DFS();
            break;
        case 2:
            result = GBFS(h1, 0);
            break;
        case 3:
            result = GBFS(h2, 0);
            break;
        case 4:
            result = AStar(h1);
            break;
        case 5:
            result = AStar(h2);
            break;
        case 6:
            if (Number.isNaN(limit) || limit < 0)
                return;
            result = DLS(limit);
            break;  
        case 7:
            result = ID();
            break;  

    }

    var row = document.createElement("tr");
    row.appendChild(createTDNode(attempt));
    row.appendChild(createTDNode(board.currentState.replace(" ", "_")));
    row.appendChild(createTDNode(alg === "DLS" ? alg + `(${limit})` : alg));
    row.appendChild(createTDNode(result.depth));
    row.appendChild(createTDNode(result.numCreated));
    row.appendChild(createTDNode(result.numExpanded));
    row.appendChild(createTDNode(result.maxFringe));
    var path = [];
    for (var i = result.path.length - 1; i > 0; i--) {
        var indexDiff = result.path[i].indexOf(" ") - result.path[i-1].indexOf(" ");
        switch (indexDiff) {
            case -1:
                path.push("right");
                break;
            case 1:
                path.push("left");
                break;
            case -4:
                path.push("down");
                break;
            case 4:
                path.push("up");
                break;
            default: break; 
        }
    }
    row.appendChild(createTDNode(path));
    document.getElementById("stats").appendChild(row);
    attempt++;
}

function createTDNode(text) {
    var node = document.createElement("td"); 
    var textnode = document.createTextNode(text); 
    node.appendChild(textnode);
    return node;
}

function changeState() {
    var state = document.getElementById("board-string").value.replace("_", " ");
    board.currentState = state;
    board.currentIndex = state.indexOf(" ");
}

function resetBoard() {
    board.currentState = "123456789ABCDEF ";
    board.currentIndex = 15;
}

function resetTable() {
    var table = document.createElement("table");
    table.setAttribute("id", "stats");
    table.innerHTML = "<tr><th>Attemp</th><th>Board</th><th>Algorithm</th><th>Depth</th><th>Nodes created</th> <th>Nodes expanded</th><th>Max fringe</th><th>Path</th></tr>";
    document.getElementById("table-container").removeChild(document.getElementById("stats"));
    document.getElementById("table-container").appendChild(table);
    attempt = 1;
}

function changeFringeLimit() {
    var limit = parseInt(document.getElementById("fringe-limit").value);
    fringeLimit = limit;
}