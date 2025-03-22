export class BoardMaster {
    #startIndex;
    #gridSize;
    #gameMaster;
    #ai;
    constructor(gameMaster) {
        this.#startIndex = 6;
        this.#gridSize = 5;
        this.handleMovement = this.handleMovement.bind(this);
        this.#gameMaster = gameMaster;
        this.#ai = null;
    };

    setAI(ai) {
        this.#ai = ai;
    }

    highlightBoard() {
        document.querySelectorAll(".cell").forEach(cell => cell.classList.remove("highlight"));

        let indexes = [
            this.#startIndex, this.#startIndex + 1, this.#startIndex + 2,
            this.#startIndex + this.#gridSize, this.#startIndex + this.#gridSize + 1, this.#startIndex + this.#gridSize + 2,
            this.#startIndex + 2 * this.#gridSize, this.#startIndex + 2 * this.#gridSize + 1, this.#startIndex + 2 * this.#gridSize + 2
        ];

        indexes.forEach(i => {
            let cell = document.querySelector(`.cell[data-index="${i}"]`);
            if (cell) cell.classList.add("highlight");
        });
    }

    handleMovement(event) {
        if(!this.#gameMaster.checkPlayerCount(this.#gameMaster.getNextMove())) {
            alert(`${this.#gameMaster.getNextMove()} you cannot do this move`);
            return;
        }

        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
            event.preventDefault();
        }

        if(this.checkKeyEvent(event.key) === false) {
            alert(`${this.#gameMaster.getNextMove()} you cannot do this move`);
            return;
        }

        switch (event.key) {
            case "ArrowUp":
                this.#startIndex -= this.#gridSize;
                break;
            case "ArrowDown":
                 this.#startIndex += this.#gridSize;
                break;
            case "ArrowLeft":
                this.#startIndex -= 1;
                break;
            case "ArrowRight":
                this.#startIndex += 1;
                break;
        }

        this.highlightBoard();
        if (this.#gameMaster.gameMode === "Human-AI" && this.#gameMaster.getNextMove() === "X") {
            this.#ai.move();
        }
        this.#gameMaster.setNextMove();
        this.#gameMaster.alertWinner();
    }

    clearTheBoard() {
        this.#startIndex = 6;
        this.highlightBoard();
        
        let cells = document.getElementsByClassName("cell");
        Array.from(cells).forEach(cell => {
            cell.textContent = ""; 
        });
    }

    checkKeyEvent(key) {
        switch (key) {
            case "ArrowUp":
                if (this.#startIndex >= this.#gridSize) return true;
                break;
            case "ArrowDown":
                if (this.#startIndex + 2 * this.#gridSize + this.#gridSize < 25) return true;
                break;
            case "ArrowLeft":
                if (this.#startIndex % this.#gridSize !== 0) return true;
                break;
            case "ArrowRight":
                if ((this.#startIndex + 2) % this.#gridSize !== this.#gridSize - 1) return true;
                break;
        }
        return false;
    }
}