var toReturn = {found: false, depth: 0, numCreated: 0, numExpanded: 0, maxFringe: 0, path: []};
var fringeLimit = 30000;
// Breath first search
function BFS() {
    resetResult();
    var root = new Node(null, board.currentState, board.getPossibleActions(board.currentState), 0);
    toReturn.numCreated++;

    if (goalStates.includes(root.state)) {
        // problem solved
        traceSolution(root);
        toReturn.found = true;
        return toReturn;
    }

    var fringe = [root];
    var explored = [];

    while (fringe.length > 0 && fringe.length < fringeLimit) {
        toReturn.maxFringe = Math.max(toReturn.maxFringe, fringe.length);

        // pop out a fringe (dequeue)
        var node = fringe.shift();
        // push to explored
        explored.push(node.state);
        toReturn.numExpanded++;
        
        // start exploring by going thru all possible actions
        for (var i = 0; i < node.actions.length; i++) {
            
            var newState = board.getNextState(node.state, node.actions[i]);

            // if state not already explored
            if (!explored.includes(newState)) {
                // make the child for an action
                var child = new Node(node, newState, board.getPossibleActions(newState), 0);
                

                // check the child
                if (!fringe.includes(child)) {
                    // stop if child is goal
                    if (goalStates.includes(child.state)) {
                        traceSolution(child);
                        toReturn.found = true;
                        toReturn.depth = toReturn.path.length - 1;
                        return toReturn;
                    }
                    // if child is not goal, push to fringe list
                    fringe.push(child);
                    toReturn.numCreated++;
                }
            }
        }
    }

    // reaching this point means no solution found
    toReturn.depth = -1;
    return toReturn;
}

// Depth first search
function DFS(limit) {
    resetResult();
    var root = new Node(null, board.currentState, board.getPossibleActions(board.currentState), 0);
    toReturn.numCreated++;

    if (goalStates.includes(root.state)) {
        // problem solved
        traceSolution(root);
        toReturn.found = true;
        return toReturn;
    }

    var fringe = [root];
    var explored = [];

    while (fringe.length > 0 && fringe.length < fringeLimit) {
        toReturn.maxFringe = Math.max(toReturn.maxFringe, fringe.length);

        // pop out a fringe as current node
        var node = fringe.pop();


        // push to explored
        explored.push(node.state);
        toReturn.numExpanded++;

        // find the next available child
        var nextChild = nextAvailableChild(fringe, explored, node, limit);

        // if there exist a child to move
        if (nextChild !== null) {
            toReturn.numCreated++;
            // check if child is goal
            if (goalStates.includes(nextChild.state)) {
                traceSolution(nextChild);
                toReturn.found = true;
                toReturn.depth = toReturn.path.length - 1;
                return toReturn;
            }
            // add current node to fringe for backtrack
            fringe.push(node);
            // add nextChild to fringe as next action
            fringe.push(nextChild);
        }
    }


    // reaching this point means no solution found
    toReturn.depth = -1;
    return toReturn;
}

// Greedy best-first seach
function GBFS(h, stepCost) {
    resetResult();
    var root = new Node(null, board.currentState, board.getPossibleActions(board.currentState), h(board.currentState));
    toReturn.numCreated++;

    if (goalStates.includes(root.state)) {
        // problem solved
        traceSolution(root);
        toReturn.found = true;
        return toReturn;
    }

    var fringe = [root];
    var explored = [];

    while (fringe.length > 0 && fringe.length < fringeLimit) {
        toReturn.maxFringe = Math.max(toReturn.maxFringe, fringe.length);

        // enqueue the node from fringe
        var node = fringe.shift();
        // push to explored
        explored.push(node.state);
        toReturn.numExpanded++;

        // check if node is goal
        if (goalStates.includes(node.state)) {
            traceSolution(node);
            toReturn.found = true;
            toReturn.depth = toReturn.path.length - 1;
            return toReturn;
        }

        // start exploring by going thru all possible actions
        for (var i = 0; i < node.actions.length; i++) {
            var newState = board.getNextState(node.state, node.actions[i]);
            // if state has not explored yet
            if (!explored.includes(newState)) {
                // create a child with heuristic cost
                var child = new Node(node, newState, board.getPossibleActions(newState), h(newState) + node.cost + stepCost);
                toReturn.numCreated++;
                // check for child state duplication in fringe 
                var duplicated = fringe.filter(e => e.state === child.state);
                if (duplicated.length > 0) {
                    // compare cost of existed item vs child. Keep the lower cost. 
                    var minCost = Math.min(duplicated[0].cost, child.cost);
                    var target = fringe.findIndex(e => e.state === child.state);
                    if (minCost === child.cost) {
                        fringe[target] = child;
                    }
                } else {
                    fringe.push(child);
                }
            }
        }

        // sort the list by heuristic cost
        fringe.sort(sortByCost);
    }

    // reaching this point means no solution found
    toReturn.depth = -1;
    return toReturn;
}

// A*
// Very similar to GBFS, except cost function f(x) = g(x) + h(x)
// Where g(x) is step cost, which is 1 in this problem
function AStar(h) {
    return GBFS(h, 1);
}

// Depth-limited search
function DLS(limit) {
    return DFS(limit);
}

// Iterative deepening 
function ID() {
    var culmulative = {found: false, depth: 0, numCreated: 0, numExpanded: 0, maxFringe: 0, path: []};
    var i = 1;
    while (true) {
        var result = DFS(i);
        culmulative.numCreated += result.numCreated;
        culmulative.numExpanded += result.numExpanded;
        culmulative.maxFringe += result.maxFringe;
        if (result.found) {
            culmulative.found = true;
            culmulative.depth = result.depth;
            culmulative.path = result.path;
            return culmulative;
        }
        i++;
    }
}

function resetResult() {
    toReturn = {found: false, depth: 0, numCreated: 0, numExpanded: 0, maxFringe: 0, path: []};
}

function traceSolution(node) {
    // trace path
    var tracedChild = node;
    while (tracedChild !== null) {
        toReturn.path.push(tracedChild.state);
        tracedChild = tracedChild.parent;
    } 
}

// return the next child available for a state
// does check if child is already explored or already in the fringe 
// also check depth limit
function nextAvailableChild(fringe, explored, node, limit) {
    if (node.cost >= limit)
        return null;
    for (var i = 0; i < node.actions.length; i++) {
        var newState = board.getNextState(node.state, node.actions[i])
        if (!explored.includes(newState)) {
            var child = new Node(node, newState, board.getPossibleActions(newState), node.cost + 1);
            if (!fringe.includes(child)) {
                return child;
            }
        }
    }
    return null;
}

// heuristic 1: number of misplaced tiles
function h1(state) {
    var score = 100;
    goalStates.forEach(e => {
        var count = 0; 
        for (var i = 0; i < state.length; i++) {
            if (state[i] !== e[i]) {
                count++;
            }
        }
        score = Math.min(score, count);
    });
    return score;
}

// heuristic 2: sum of distances of the tiles from their goal positions. (Manhattan distance)
function h2(state) {
    var result = 10000;
    goalStates.forEach(e => {
        var sum = 0;
        for (var i = 0; i < 16; i++) {
            var targetX = i % 4;
            var targetY = Math.floor(i / 4);
            var index = state.indexOf(e[i]);
            var x = index % 4;
            var y = Math.floor(index / 4);
            sum += Math.abs(x - targetX) + Math.abs(y - targetY);
        }
        result = Math.min(result, sum);
    });
    return result;
}

function sortByCost(a, b) {
    return (a.cost > b.cost) ? 1 : ((b.cost > a.cost) ? -1 : 0);
}