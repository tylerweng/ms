const Tile = require("./tile.js");

class Board {
    constructor(size, numBombs) {
        this.size = size;
        this.numBombs = numBombs;

        this.grid = [];
        this.initGrid();
        console.log(this.grid[0][1]);

    }

    initGrid() {
        for (let i = 0; i < this.size; i++) {
            const row = [];
            for (let j = 0; j < this.size; j++) {
                row.push(new Tile(this, [i, j]));
            }
            this.grid.push(row);
        }

        this.plantBombs();
    }

    plantBombs() {
        console.log("plantBombs");
        let totalBombs = 0;
        while (totalBombs < this.numBombs) {
            console.log(totalBombs);
            let randPos = this.randomPos();
            console.log("randPos", randPos);
            let tile = this.getTile(randPos);
            if (tile.bombed) continue;
            tile.plantBomb();
            totalBombs++;
        }
    }

    getTile(pos) {
        return this.grid[pos[0]][pos[1]];
    }

    randomPos() {
        return [Math.floor(Math.random() * this.size), Math.floor(Math.random() * this.size)];
    }

    render(reveal=false) {
        return this.grid.map(row =>
           row.map(tile =>
               reveal ? tile.reveal() : tile.render()
           ).join("")
        ).join("\n");
    }

    reveal() {
        return this.render(true);
    }

    lost() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                let tile = this.getTile([i, j]);
                if (tile.bombed && tile.explored) return true;
            }
        }
        return false;
    }

    won() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                let tile = this.getTile([i, j]);
                if (tile.bombed || (!tile.bombed && !tile.explored)) return false;
            }
        }
        return true;
    }

    inBounds(pos) {
        return (
            (pos[0] >= 0 && pos[0] < this.size) &&
            (pos[1] >= 0 && pos[1] < this.size)
        );
    }
}

module.exports = Board;