import { getGameMode } from "../Helpers/gameMode.js";
import { deactivateGame } from "../Helpers/gameState.js";
import { showGameMessage } from "../Helpers/showGameMessage.js";

export class GameMaster {
    #timer
    #lastMove;
    #playerXCount;
    #playerOCount;
    constructor(board, winningMaster, timer) {
        this.#lastMove = "";
        this.cells = board.children;
        this.#playerXCount = 4;
        this.#playerOCount = 4;
        this.gameMode = getGameMode();
        this.ai = null;
        this.winningMaster = winningMaster;
        this.#timer = timer;
    };

    setAI(ai) {
        this.ai = ai;
    }

    setGameMode() {
        this.gameMode = getGameMode();
    }

    makeMove(index) {
        let nextMove = this.getNextMove();

        if (this.#canAddNewMove(nextMove) === true) {
            alert(`${nextMove} you cannot do this move`);
            return;
        }

        if (this.cells[index].textContent === "") {
            this.cells[index].textContent = nextMove;
            this.setNextMove();
            this.reduceMoves(nextMove);
            this.alertWinner();

            this.#handleAIMove(nextMove);
        }

    }

    changeMove(i, j) {
        let nextMove = this.getNextMove();
        if (this.cells[i].textContent === nextMove && this.cells[j].textContent === "" && this.canChangeMovesOrMoveBoard(nextMove)) {
            this.cells[i].textContent = "";
            this.cells[j].textContent = nextMove;
            this.setNextMove();
            this.alertWinner();

            this.#handleAIMove(nextMove);
        } else {
            alert(`${nextMove} you cannot do this move`);
        }
    }

    reduceMoves(move) {
        move === "X" ? this.#playerXCount-- : this.#playerOCount--;
    }

    #canAddNewMove(move) {
        return move === "X" ? this.#playerXCount === 0 : this.#playerOCount === 0;
    }

    canChangeMovesOrMoveBoard(move) {
        return move === "X" ? this.#playerXCount < 3 : this.#playerOCount < 3;
    }

    getNextMove() {
        return this.#lastMove === "" || this.#lastMove === "O" ? "X" : "O"; 
    }

    setNextMove() {
        this.#lastMove === "" || this.#lastMove === "O" ? this.#lastMove = "X" : this.#lastMove = "O"; 
    }

    alertWinner() {
        let winner = this.winningMaster.checkWinner();
        if (winner !== null) {
            deactivateGame();
            setTimeout(() => {
                showGameMessage("Game over! Winner: " + winner);
                this.#timer.stopTheTimer();
            }, 100);
        }
    }

    resetGame() {
        this.#lastMove = ""; 
        this.#playerXCount = 4;
        this.#playerOCount = 4;
        if (this.ai !== null) {
            this.ai.resetFields();
        }
    }

    #handleAIMove(nextMove) {
        if(this.gameMode === "Human-AI" && nextMove === "X") {
            this.ai.move();
         }
    }
}
