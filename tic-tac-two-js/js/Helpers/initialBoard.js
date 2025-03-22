import { GameMaster } from "../GameBrains/GameMaster.js";
import { BoardMaster } from "../GameBrains/BoardMaster.js";
import { AI } from "../GameBrains/AI.js";
import { WinningMaster } from "../GameBrains/WinningMaster.js";
import { isGameActivated } from "./gameState.js";

export function makeInitialBoard(gameMode, timer) {
    let board = document.createElement("div");
    board.classList.add("container", "board");

    let winningMaster = new WinningMaster(board);
    let gameMaster = new GameMaster(board, winningMaster, timer);
    let boardMaster = new BoardMaster(gameMaster);

    if (gameMode === "Human-AI") {
        let ai = new AI(gameMaster, boardMaster, winningMaster);
        boardMaster.setAI(ai);
        gameMaster.setAI(ai);
    }
  
    let selectedCell = null;  

        for (let i = 0; i < 25; i++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i; 
    
            cell.addEventListener("click", () => {
                if (!isGameActivated()) {
                    alert("Please reset and start the game!");
                    return; 
                }
                if (selectedCell === null) {
                    if (cell.textContent === "") {
                        gameMaster.makeMove(i);
                    } else {
                        selectedCell = i;
                        cell.classList.add("selected"); 
                    }
                } else {
                    let j = i;
                    gameMaster.changeMove(selectedCell, j);
                    document.querySelectorAll(".selected").forEach(c => c.classList.remove("selected"));
                    selectedCell = null;
                }
            });
    
            board.appendChild(cell);
        }

    document.body.appendChild(board); 
    boardMaster.highlightBoard();
    document.addEventListener("keydown", (event) =>{
        if (!isGameActivated()) {
            alert("Please reset and start the game!");
            return; 
        }
        boardMaster.handleMovement(event);
    });
    
    return { board, gameMaster, boardMaster };
}