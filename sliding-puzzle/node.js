class Node {
    parent;
    state;
    actions;
    cost;
    constructor(parent, state, actions, cost) {
        this.parent = parent;
        this.state = state;
        this.actions = actions;
        this.cost = cost;
    }
}