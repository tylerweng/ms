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
    }

    play(rl) {
        this.getMove(rl);
    }

    getMove(rl) {
        console.log(this.board.render());
        rl.question("Enter action, rowNum, colNum: " + "\n", input => {
            let action, rowNum, colNum;
            [action, rowNum, colNum] = input.split(",");
            this.handleMove(action, [parseInt(rowNum, 10), parseInt(colNum, 10)]);
        });
        if (this.board.won()) {
            console.log("winner!");
            rl.close();

        } else if (this.board.lost()) {
            console.log("Boom!");
            console.log(this.board.reveal());
            rl.close();
        }
    }

    handleMove(action, pos) {
        let tile = this.board.getTile(pos);
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
        this.play(rl);
    }

}

let g = new Game();

g.play(rl);