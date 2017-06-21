import Board from "./board.js";

const LAYOUTS = {
    small: { gridSize: 9, numBombs: 10},
    medium: { gridSize: 16, numBombs: 40},
    large: { gridSize: 32, numBombs: 160}
};

class Game {
    constructor(size) {
        size = size || "small";
        const layout = LAYOUTS[size];
        this.board = new Board(layout.gridSize, layout.numBombs);
    }

    play() {
        while (!(this.board.lost() || this.board.won())) {
            console.log(this.board.render());
            let action, pos;
            [action, pos] = this.getMove();
            this.handleMove(action, pos);
        }
        if (this.board.won()) {
            console.log("Winner!");
        } else if (this.board.lost()) {
            console.log("Boom!");
            console.log(this.board.reveal());
        }
    }

    getMove() {

    }


}