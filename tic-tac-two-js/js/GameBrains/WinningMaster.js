export class WinningMaster {
    #cells;
    constructor(board) {
        this.#cells = board.children;
    }

    checkWinner() {
        return this.#checkLine(false) || this.#checkLine(true) || this.#checkDiagonals() || null;
    }
    

    findWinningMove(symbol) {
        let winIndex = null;
    
        for (let r = 0; r < 3; r++) {
            winIndex = this.#winningMove([r * 3, r * 3 + 1, r * 3 + 2], symbol);
            if (winIndex !== null) return winIndex;
        }
    
        for (let c = 0; c < 3; c++) {
            winIndex = this.#winningMove([c, c + 3, c + 6], symbol);
            if (winIndex !== null) return winIndex;
        }
    
        winIndex = this.#winningMove([0, 4, 8], symbol);
        if (winIndex !== null) return winIndex;
    
        winIndex = this.#winningMove([2, 4, 6], symbol);
        if (winIndex !== null) return winIndex;
    
        return null; 
    }

    #winningMove(cells, symbol) {
        let highlightedIndexes = this.#getHighlightedIndexes();
        let board = this.#cells;
        let countSymbol = 0;
        let emptyIndex = null;

        for (let highlightIndex of cells) {
            let boardIndex = highlightedIndexes[highlightIndex];
            if (board[boardIndex].textContent === symbol) {
                countSymbol++;
            } else if (board[boardIndex].textContent === "") {
                emptyIndex = boardIndex;
            }
        }

        if (countSymbol === 2 && emptyIndex !== null) {
            return emptyIndex; 
        }
        return null;
    };

    

    #checkCells(lines) {
        let board = this.#getCurrentBoard();

        for (let line of lines) {
            let countX = 0;
            let countO = 0;
            
            for (let index of line) {
                let cell = board[index].textContent;
    
                if (cell === "X") {
                    countX++;
                    countO = 0;
                } else if (cell === "O") {
                    countO++;
                    countX = 0;
                } else {
                    countX = 0;
                    countO = 0;
                }
    
                if (countX === 3) return "X";
                if (countO === 3) return "O";
            }
        }
        return null;
    }
    
    #checkLine(isRowCheck) {
        let lines = [];
    
        for (let i = 0; i < 3; i++) {
            let line = [];
            for (let j = 0; j < 3; j++) {
                line.push(isRowCheck ? i * 3 + j : j * 3 + i);
            }
            lines.push(line);
        }
    
        return this.#checkCells(lines);
    }
    
    #checkDiagonals() {
        return this.#checkCells([
            [0, 4, 8], 
            [2, 4, 6]
        ]);
    }
    

    #getCurrentBoard() {
        return document.getElementsByClassName("highlight");
    }

    #getHighlightedIndexes() {
        let highlightedCells = document.getElementsByClassName("highlight");
        let indexes = Array.from(highlightedCells).map(cell => parseInt(cell.dataset.index));
        return indexes;
    }
}