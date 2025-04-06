import { deactivateGame } from "../Helpers/gameState.js";
import { showGameMessage } from "../Helpers/showGameMessage.js";
export class Timer {
    constructor(sec) {
        this.sec = sec;
        this.intervalId = null;
        this.initialSec = sec;
    }

    startTheTimer() {
        let timerDisplay = document.getElementById('timerDisplay');
    
        if (!timerDisplay) {
            console.error("Timer display element not found!");
            return;
        }

        if (this.intervalId !== null) return; 
    
        this.intervalId = setInterval(() => {
            if (this.sec <= 0) { 
                this.stopTheTimer();
                timerDisplay.innerHTML = "Time's up!";
                deactivateGame();
                showGameMessage("Game over! Time's up!");
                return;
            }
    
            timerDisplay.innerHTML = `${Math.floor(this.sec / 60)}: ${ this.sec % 60 < 10 ? '0' : ''}${this.sec % 60 }`;
            this.sec--; 
        }, 1000);
    }

    stopTheTimer(sec = null) {
        timerDisplay.innerHTML = "01:00"; 
        if (this.intervalId !== null) {
            clearInterval(this.intervalId); 
            this.intervalId = null;
        }
        if (sec !== null) {
            this.sec = this.initialSec; 
        }
    }
}
