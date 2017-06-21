const Board = require("./board.js");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const LAYOUTS = {
    small: { gridSize: 9, numBombs: 10},
    medium: { gridSize: 16, numBombs: 40},
    large: { gridSize: 32, numBombs: 160}
};

class Game {
    constructor(size="small") {
        const layout = LAYOUTS[size];
        this.board = new Board(layout.gridSize, layout.numBombs);
        console.log("this.board", this.board);
    }

    play(rl) {
        while (!(this.board.lost() || this.board.won())) {
            console.log(this.board.render());
            this.getMove(rl);
        }
        if (this.board.won()) {
            console.log("Winner!");
        } else if (this.board.lost()) {
            console.log("Boom!");
            console.log(this.board.reveal());
        }
    }

    getMove(rl) {
        rl.question("Enter action, rowNum, colNum: " + "\n", input => {
            let action, rowNum, colNum;
            [action, rowNum, colNum] = input.split(",");
            console.log("action", action);
            this.handleMove(action, [parseInt(rowNum, 10), parseInt(colNum, 10)]);
        });
    }

    handleMove(action, pos) {
        let tile = this.board.getTile(pos);
        console.log("handleMove action", action);
        switch (action) {
            case "f":
                tile.toggleFlag();
                break;
            case "e":
                tile.explore();
                break;
            default:
                console.log("Invalid action");
        }
    }

}

let g = new Game();

g.play(rl);