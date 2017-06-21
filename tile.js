const DELTAS = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
];

class Tile {

    constructor(board, pos) {
        this.board = board;
        this.pos = pos;
        this.bombed = this.explored = this.flagged = false;
    }

    adjacentBombCount() {
        return this.neighbors.filter(n => n.bombed).length;
    }

    explore() {
        if (this.explored || this.flagged) return this;
        this.explored = true;
        if (!this.bombed && this.adjacentBombCount() === 0) {
            this.neighbors.forEach(n => n.explore());
        }
        return self;
    }

    neighbors() {
        const adjacentCoords = [];
        DELTAS.forEach(d => {
            let adjCoord = [this.pos[0] + d[0], this.pos[1] + d[1]];
            if (this.board.inBounds(adjCoord)) adjacentCoords.push(adjCoord);
        });

        return adjacentCoords.map(pos => this.board.getTile(pos));
    }

    render() {
        if (this.flagged) {
            return "F";
        } else if (this.explored) {
            let adjBombCount = this.adjacentBombCount();
            return adjBombCount === 0 ? "_" : adjBombCount;
        } else {
            return "*";
        }
    }

    reveal() {
        if (this.flagged) {
            return this.bombed ? "F" : "f";
        } else if (this.bombed) {
            return this.explored ? "X" : "B";
        } else {
            let adjBombCount = this.adjacentBombCount();
            return adjBombCount === 0 ? "_" : adjBombCount;
        }
    }

    toggleFlag() {
        if(!this.explored) this.flagged = !this.flagged
    }
}

export default Tile;
