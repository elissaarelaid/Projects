let gameMessage = null;

export function setGameMessageElement(element) {
    gameMessage = element;
}

export function showGameMessage(message, duration = null) {
    if (!gameMessage) {
        console.error("Game message element is not set!");
        return;
    }

    gameMessage.innerHTML = message;
    gameMessage.style.display = "block";

    if (duration) {
        setTimeout(() => {
            gameMessage.style.display = "none";
        }, duration);
    }
}
