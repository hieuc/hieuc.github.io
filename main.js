document.addEventListener('DOMContentLoaded', function() {
    $("#op-select").change(e => {
        var selected = $("#op-select :selected");

        if (selected.val() === "1") {
            $("#op-description").text("Simple p5.js app that creates balls on mouse click which bounce and shrink on contact.");
            $("#op-git-links").attr("href", "https://github.com/hieuc/hieuc.github.io/tree/master/other-programs/balls");
            $("#op-deploy").attr("href", "./other-programs/balls");
        } else if (selected.val() === "2") {
            $("#op-description").text("A demonstration of generic algorithms where the newer generations inherit traits from the more success ancestors.");
            $("#op-git-links").attr("href", "https://github.com/hieuc/hieuc.github.io/tree/master/other-programs/dots");
            $("#op-deploy").attr("href", "./other-programs/dots");
        } else if (selected.val() === "3") {
            $("#op-description").text("Classic snake game. A learning algorithm is to be implemented.");
            $("#op-git-links").attr("href", "https://github.com/hieuc/hieuc.github.io/tree/master/other-programs/snake");
            $("#op-deploy").attr("href", "./other-programs/snek");
        } else if (selected.val() === "4") {
            $("#op-description").text("Sliding puzzle with some search algorithms (greedy, A*, depth limited, iterative deepening) to find the solution.");
            $("#op-git-links").attr("href", "https://github.com/hieuc/hieuc.github.io/tree/master/other-programs/sliding-puzzle");
            $("#op-deploy").attr("href", "./other-programs/sliding-puzzle");
        } else if (selected.val() === "5") {
            $("#op-description").text("Pentago game with some adversarial search algorithms (minimax, alpha-beta) to beat the opponent.");
            $("#op-git-links").attr("href", "https://github.com/hieuc/hieuc.github.io/tree/master/other-programs/pentago");
            $("#op-deploy").attr("href", "./other-programs/pentago");
        }
    });

    $("#op-select").trigger("change");
});