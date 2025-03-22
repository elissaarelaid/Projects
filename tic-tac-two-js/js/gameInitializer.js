import { makeInitialBoard } from "./Helpers/initialBoard.js";
import { resetGame } from "./Helpers/resetGame.js";
import { Timer } from "./Timer/timer.js";
import { activateGame, deactivateGame } from "./Helpers/gameState.js";
import { getGameMode, setGameMode } from "./Helpers/gameMode.js";
import { AI } from "./GameBrains/AI.js";
import { showGameMessage, setGameMessageElement } from "./Helpers/showGameMessage.js";

export function initializeGame() {
    let h1 = document.createElement("h1");
    h1.innerHTML = "Tic Tac Two";
    document.body.appendChild(h1);

    let documentContainer = document.createElement("div");
    documentContainer.classList.add("flex-container");
    document.body.appendChild(documentContainer);

    let gameMessage = document.createElement("div");
    gameMessage.classList.add("game-message");
    documentContainer.appendChild(gameMessage);
    setGameMessageElement(gameMessage);

    let buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("button-wrapper");
    documentContainer.appendChild(buttonWrapper);

    let startButtonWrapper = document.createElement("div");
    startButtonWrapper.classList.add("start-button-wrapper");
    buttonWrapper.appendChild(startButtonWrapper); 

    let resetGameButton = document.createElement("button");
    resetGameButton.innerHTML = "Reset game";
    resetGameButton.classList.add("reset-game-button");
    startButtonWrapper.appendChild(resetGameButton);

    let startGameButton = document.createElement("button");
    startGameButton.innerHTML = "Start game";
    startGameButton.classList.add("start-game-button");
    startButtonWrapper.appendChild(startGameButton);

    let modeButtonWrapper = document.createElement("div");
    modeButtonWrapper.classList.add("mode-button-wrapper");
    buttonWrapper.appendChild(modeButtonWrapper);

    let modeButtonLabel = document.createElement("label");
    modeButtonLabel.innerHTML = "Select game mode: ";
    modeButtonWrapper.appendChild(modeButtonLabel);

    let modeButtonContainer = document.createElement("div");
    modeButtonContainer.classList.add("mode-button-container");
    modeButtonWrapper.appendChild(modeButtonContainer);

    let humanHumanGameModeButton = document.createElement("button");
    humanHumanGameModeButton.innerHTML = "Human-Human";
    humanHumanGameModeButton.classList.add("game-mode-button", "selected");
    modeButtonContainer.appendChild(humanHumanGameModeButton);

    let humanAIGameModeButton = document.createElement("button");
    humanAIGameModeButton.innerHTML = "Human-AI";
    humanAIGameModeButton.classList.add("game-mode-button");
    modeButtonContainer.appendChild(humanAIGameModeButton);

    humanHumanGameModeButton.addEventListener("click", () => {
        setGameMode("Human-Human");
        humanHumanGameModeButton.classList.add("selected");
        humanAIGameModeButton.classList.remove("selected");
    });

    humanAIGameModeButton.addEventListener("click", () => {
        setGameMode("Human-AI");
        humanAIGameModeButton.classList.add("selected"); 
        humanHumanGameModeButton.classList.remove("selected");
    });

    let timer = new Timer(59);

    let timerDisplay = document.createElement("div");
    timerDisplay.id = "timerDisplay";
    timerDisplay.innerHTML = "01:00";
    timerDisplay.classList.add("timer-style");
    buttonWrapper.appendChild(timerDisplay);

    let initialBoard;
    let gameMaster = null;
    let boardMaster = null;
    let gameReset = false;

    startGameButton.addEventListener("click", () => {
        if (!initialBoard) {
            ({ board: initialBoard, gameMaster, boardMaster } = makeInitialBoard(getGameMode(), timer));
            documentContainer.appendChild(initialBoard);
        } else {
            if (!gameReset) {
                alert("Please press 'Reset game' before starting!");
                return;
            }
        }

        gameMaster.setGameMode();
        if (getGameMode() === "Human-AI" && gameMaster.ai === null) {
            let ai = new AI(gameMaster, boardMaster, gameMaster.winningMaster);
            boardMaster.setAI(ai);
            gameMaster.setAI(ai);
        }
        activateGame();
        timer.startTheTimer();
        gameReset = false;
        showGameMessage("Game starts", 2000);
    });

    resetGameButton.addEventListener("click", () => {
        if (!gameMaster || !boardMaster) return;

        deactivateGame();
        timer.stopTheTimer(30);
        resetGame(gameMaster, boardMaster);
        gameReset = true;
        gameMessage.style.display = "none"; 
    });
}
