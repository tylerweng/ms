import Tile from "./tile.js";

class Board {
    constructor(size, numBombs) {
        this.size = size;
        this.numBombs = numBombs;

        this.grid = [];
        this.initGrid();
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
        let totalBombs = 0;
        while (totalBombs < this.numBombs) {
            let randPos = this.randomPos();
            let tile = this.getTile(randPos);
            if (tile.bombed) continue;
            tile.bombed = true;
            totalBombs++;
        }
    }

    getTile(pos) {
        return this.grid[pos[0], pos[1]];
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
}