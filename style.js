const player = document.getElementById('player');
const bar = document.getElementById('bar');
const scoreDisplay = document.getElementById('score');
const gameOverScreen = document.getElementById('gameOver');
const finalScore = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');
const jumpBtn = document.getElementById('jumpBtn');
let isJumping = false;
let score = 0;
let gameRunning = true;

// Jump function
function jump() {
    if (!isJumping && gameRunning) {
    isJumping = true;
    player.classList.add('jump');
    setTimeout(() => {
        player.classList.remove('jump');
        isJumping = false;
    }, 600);
    }
}

// Collision detection and score system
const checkCollision = setInterval(() => {
    if (!gameRunning) return;
    const playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue('bottom'));
    const barRight = parseInt(window.getComputedStyle(bar).getPropertyValue('right'));

    if (barRight > 520 && barRight < 600 && playerBottom < 40) {
    // Collision detected
    endGame();
    } else if (barRight > 520 && barRight < 600 && playerBottom >= 40) {
    score++;
    scoreDisplay.textContent = score;
    }
}, 50);

function endGame() {
    gameRunning = false;
    gameOverScreen.style.display = 'flex';
    finalScore.textContent = score;
    bar.style.animationPlayState = 'paused';
}

restartBtn.addEventListener('click', () => {
    score = 0;
    scoreDisplay.textContent = 0;
    gameOverScreen.style.display = 'none';
    bar.style.animationPlayState = 'running';
    gameRunning = true;
});

// Controls
jumpBtn.addEventListener('click', jump);
document.addEventListener('keydown', e => {
    if (e.code === 'Space' || e.code === 'ArrowUp') jump();
});