import { isGameActivated } from "../Helpers/gameState.js";

export class AI {
    #aiMoveCount;
    #gameMaster;
    #boardMaster;
    #winningMaster;

    constructor(gameMaster, boardMaster, winningMaster) {
        this.#gameMaster = gameMaster;
        this.#boardMaster = boardMaster;
        this.aiCellsArray = [];
        this.#winningMaster = winningMaster;
        this.#aiMoveCount = 0;
    }

    move() {
        console.log(this.#aiMoveCount)
        if (!isGameActivated()) return;
    
        const executeMove = (moveFunction) => {
            setTimeout(() => {
                moveFunction();
                this.#gameMaster.alertWinner();
            }, 500);
        };
    
        if (this.#aiMoveCount < 4) {
            executeMove(() => this.#aiMakeMove());
            return;
        }
    
        const hasWinningMove = this.#winningMaster.findWinningMove("O") || this.#winningMaster.findWinningMove("X");
    
        if (!hasWinningMove) {
            executeMove(Math.random() < 0.5 ? () => this.#aiChangeMove() : () => this.#aiHandleMovement());
        } else {
            executeMove(() => this.#aiChangeMove());
        }
    }

    resetFields() {
        this.aiCellsArray = [];
        this.#aiMoveCount = 0;
        console.log("resetting")
    }

    #aiMakeMove() {
        console.log("make")
        if (this.#aiMoveCount >= 4) {
            console.log("AI shold not do this move");
            return;
        }
        let possibleMove = this.#findBestMove();

        this.#gameMaster.cells[possibleMove].textContent = "O";

        this.#gameMaster.setNextMove();
        this.#gameMaster.reduceMoves("O");
        this.#aiMoveCount++;
        this.aiCellsArray.push(possibleMove);
    }

    #findRandomMove() {
        let possibleMove = Math.floor(Math.random() * 24);
        while (this.#gameMaster.cells[possibleMove].textContent !== "") {
            possibleMove = Math.floor(Math.random() * 24);
        }
        return possibleMove;
    }

    #findBestMove() {
    return this.#winningMaster.findWinningMove("O") 
        || this.#winningMaster.findWinningMove("X") 
        || this.#findRandomMove();
    }


    #aiChangeMove() {
        console.log("change")
        if (this.aiCellsArray.length === 0) return;

        let newMove = this.#findBestMove();

        let i = Math.floor(Math.random() * this.aiCellsArray.length); 
        let oldMove = this.aiCellsArray[i]; 

        this.#gameMaster.cells[oldMove].textContent = "";  
        this.#gameMaster.cells[newMove].textContent = "O";
    
        this.aiCellsArray.splice(i, 1); 
        this.aiCellsArray.push(newMove);

        this.#gameMaster.setNextMove(); 
    }

    #aiHandleMovement() {
        console.log("handle")
        let eventArray = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
        let eventKey = eventArray[Math.floor(Math.random() * eventArray.length)];  
        console.log("esimene katse")
        while(!this.#boardMaster.checkKeyEvent(eventKey)) {
            console.log("proovin")
            eventKey = eventArray[Math.floor(Math.random() * eventArray.length)];  
        }  
        this.#boardMaster.handleMovement(new KeyboardEvent("keydown", { key: eventKey }));
    }
    
}