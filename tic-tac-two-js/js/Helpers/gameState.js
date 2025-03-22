let gameActive = false;

export function activateGame() {
    gameActive = true;
}

export function deactivateGame() {
    gameActive = false;
}

export function isGameActivated() {
    return gameActive;
}
