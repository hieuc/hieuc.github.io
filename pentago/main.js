var topPadding = 100;
var sidePadding = 100;
var circlePadding = 4;
var circleRadius = 25;
var boardSize = 400;
var turn = "black";
var board = new Array(36).fill(0);
var gameEnd = false;

makeQuadrants();
$(".rotate-options").css("display", "none");
$("body").html($("body").html());

function makeQuadrants() {
    var count = 1;
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 2; j++) {
            var x = sidePadding + j * boardSize / 2;
            var y = topPadding + i * boardSize / 2;
            var quad = $(`<g class='quad' style="cx:${x}; cy:${y}" id="0${count}" transform='translate(${x}, ${y}) rotate(0)'></g>`);
            quad.append($(`<rect class='quad'></rect>`));
            for (var a = 0; a < 3; a++) {
                for (var b = 0; b < 3; b++) {
                    var id = i * 18 + j * 3 + a * 6 + b;
                    var location = `cx=${circlePadding / 2 + (circleRadius + circlePadding * 2) * (b + 0.5)  * 2} cy=${circlePadding / 2 + (circleRadius + circlePadding * 2) * (a + 0.5)* 2} x=${circlePadding / 2 + (circleRadius + circlePadding * 2) * (b + 0.5)  * 2} y=${circlePadding / 2 + (circleRadius + circlePadding * 2) * (a + 0.5)* 2}`;
                    var circle = $(`<a href="#" class="move" onclick="switchTurn(this)"><circle id=${id} class="empty" r=${circleRadius} ${location} ></circle></a>`);
                    quad.append(circle);
                }
            }
            $(".board").append(quad);
            count++;
        }
    }
}

function switchTurn(e) {
    var child = e.firstChild;
    if (child.classList.contains("empty")) {
        $(".empty").css("pointer-events", "none");
        child.classList.remove("empty");
        child.classList.add(turn);
        
        if (turn === "black") {
            turn = "white";
        } else {
            turn = "black";
        }
        document.documentElement.style.setProperty("--turn", turn);
        updateBoard();
        if (!gameEnd)
            $(".rotate-options").css("display", "block");
    }
}

function rotateCW(id) {
    var e = $("#"+id);
    var children = $("#"+id + " circle").toArray().sort(function (a, b) { return a.id - b.id;});
    $(e).attr("transform", $(e).attr("transform") + " rotate(90)");
    $(".rotate-options").css("display", "none");
    reassignElements(id, children, -Math.PI/2);
}

function rotateCCW(id) {
    var e = $("#"+id);
    var children = $("#"+id + " circle").toArray().sort(function (a, b) { return a.id - b.id;});
    $(e).attr("transform", $(e).attr("transform") + " rotate(-90)");
    $(".rotate-options").css("display", "none");
    reassignElements(id, children, Math.PI/2);
}

function reassignElements(id, children, angle) {
    var newIDs = [];
    var newLocations = [];
    for (var i = 0; i < 9; i++) {
        var quadrant = parseInt(id) - 1;
        var relativePosition = Math.round(calculateRoration(angle, i));
        relativePosition += Math.floor(relativePosition / 3) * 3;
        var newID = ((quadrant) % 2) * 3 + Math.floor(quadrant / 2) * 18 + relativePosition;
        newLocations[newID] = {x : $("#" + newID).attr("x"), y : $("#" + newID).attr("y")};
        newIDs.push(newID);
    }
    for (var i = 0; i < 9; i++) {
        children[i].id = newIDs[i];
        $(children[i]).attr("x", newLocations[newIDs[i]].x);
        $(children[i]).attr("y", newLocations[newIDs[i]].y);
    }
    
    updateBoard();
    if (!gameEnd)
        $(".empty").css("pointer-events", "");
    // filled board
    if (!gameEnd && board.filter(x => x === "empty").length === 0) {
        gameEnd = true;
        $("#status").text("TIE");
    }

}

function updateBoard() {
    $("circle").toArray().forEach(function (e) {
        board[e.id] = e.classList[0];
    });
    var winners = checkWin();
    processWinState(winners);
}

function processWinState(winners) {
    if (winners.length > 0) {
        var player = board[winners[0][0]];
        gameEnd = true;
        for (var i = 0; i < winners.length; i++) {
            if (player !== board[winners[i][0]])
                player = "tie";
            var color = board[winners[i][0]];
            var start = $("#" + winners[i][0]);
            var end = $("#" + (winners[i][0] + winners[i][1] * 4));

            var x1 = parseInt(start.attr("x"))  + parseInt(start.parents()[1].style["cx"]);
            var y1 = parseInt(start.attr("y"))  + parseInt(start.parents()[1].style["cy"]);
            var x2 = parseInt(end.attr("x")) + parseInt(end.parents()[1].style["cx"]);
            var y2 = parseInt(end.attr("y")) + parseInt(end.parents()[1].style["cy"]);

            var line = `<line x1=${x1} y1=${y1} x2=${x2} y2=${y2} style="stroke:${color};stroke-width:12"/>`;
            $(".board").append(line);
            // wait for animation to declare win
        }
        window.setTimeout(function () {
            $("body").html($("body").html());
        }, 510);
        $("#status").text(player.toUpperCase());
        if (player !== "tie")
            $("#status").append(" wins");
    }
}

function calculateRoration(angle, position) {
    var x = -1 + position % 3;
    var y = 1 - Math.floor(position / 3);
    var x1 = x * Math.cos(angle) - y * Math.sin(angle);
    var y1 = x * Math.sin(angle) + y * Math.cos(angle);
    var id = x1 + 1 + (1 - y1) * 3;
    return id;
}

function checkWin() {
    var winners = [];
    // checking everything position in board
    for (var i = 0; i < board.length; i++) {
        if (checkHorizontal(i)) {
            winners.push([i, 1]);
        }
        if (checkVertical(i)) {
            winners.push([i, 6]);
        }
        if (checkForwardDiagonal(i)) {
            winners.push([i, 7]);
        }
        if (checkBackwardDiagonal(i)) {   
            winners.push([i, 5]);
        }
    }
    return winners;
}

function checkHorizontal(index) {
    var current = board[index];
    if (current !== "black" && current !== "white")
        return false;
    for (var i = 1; i < 5; i++) {
        if (Math.floor((index + i) / 6) > Math.floor(index / 6))
            return false;
        if (board[index + i] !== current)
            return false;
    }
    return true;
}

function checkVertical(index) {
    var current = board[index];
    if (current !== "black" && current !== "white")
        return false;
    for (var i = 1; i < 5; i++) {
        if (index + i * 6 > board.length)
            return false;
        if (board[index + i * 6] !== current)
            return false;
    }
    return true;
}

function checkForwardDiagonal(index) {
    var current = board[index];
    if (current !== "black" && current !== "white")
        return false;
    for (var i = 1; i < 5; i++) {
        if (index + i * 7 > board.length)
            return false;
        if (board[index + i * 7] !== current)
            return false;
        // diagonal must be in consecutive lines
        if (Math.floor((index + i*7)/6) - Math.floor((index + (i-1)*7)/6) !== 1)
            return false;
    }
    return true;
}

function checkBackwardDiagonal(index) {
    var current = board[index];
    if (current !== "black" && current !== "white")
        return false;
    for (var i = 1; i < 5; i++) {
        if (index + i * 5 > board.length)
            return false;
        if (board[index + i * 5] !== current)
            return false;
        // diagonal must be in consecutive lines
        if (Math.floor((index + i*5)/6) - Math.floor((index + (i-1)*5)/6) !== 1)
            return false;
    }
    return true;
}

function reset() {
    $(".quad").remove();
    $("line").remove();
    $("#status").text("");
    turn = "black";
    board = new Array(36).fill(0);
    gameEnd = false;
    makeQuadrants();
    $(".rotate-options").css("display", "none");
    $("body").html($("body").html());
}