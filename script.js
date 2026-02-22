const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScoreElement = document.getElementById('finalScore');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');

// Game constants
const TILE_SIZE = 20;
const CANVAS_SIZE = 400;
const GRID_SIZE = CANVAS_SIZE / TILE_SIZE;

// Colors matching CSS theme
const COLOR_NEON_GREEN = '#39ff14';
const COLOR_NEON_RED = '#ff073a';
const COLOR_SNAKE_BODY = '#2ab810';

let snake = [];
let food = {};
let dx = 0;
let dy = 0;
let score = 0;
let gameInterval = null;
let gameStarted = false;
let gameOver = false;
let changingDirection = false; // Prevent multiple key presses in one frame
const GAME_SPEED = 200;

function initGame() {
    snake = [
        { x: 10 * TILE_SIZE, y: 10 * TILE_SIZE },
        { x: 9 * TILE_SIZE, y: 10 * TILE_SIZE },
        { x: 8 * TILE_SIZE, y: 10 * TILE_SIZE },
    ];
    dx = TILE_SIZE;
    dy = 0;
    score = 0;
    scoreElement.textContent = score;
    gameOver = false;
    changingDirection = false;
    spawnFood();
}

function spawnFood() {
    food.x = Math.floor(Math.random() * GRID_SIZE) * TILE_SIZE;
    food.y = Math.floor(Math.random() * GRID_SIZE) * TILE_SIZE;

    // Check if food spawns on snake
    snake.forEach(part => {
        if (part.x === food.x && part.y === food.y) {
            spawnFood();
        }
    });
}

function drawSnakePart(snakePart, index) {
    ctx.fillStyle = index === 0 ? COLOR_NEON_GREEN : COLOR_SNAKE_BODY;
    ctx.strokeStyle = '#1a1a24'; // Canvas bg

    // Glow effect for head
    if (index === 0) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = COLOR_NEON_GREEN;
    } else {
        ctx.shadowBlur = 0;
    }

    // Draw rounded rect or standard rect
    ctx.fillRect(snakePart.x, snakePart.y, TILE_SIZE, TILE_SIZE);
    ctx.strokeRect(snakePart.x, snakePart.y, TILE_SIZE, TILE_SIZE);
    ctx.shadowBlur = 0; // Reset shadow
}

function drawFood() {
    ctx.fillStyle = COLOR_NEON_RED;
    ctx.shadowBlur = 15;
    ctx.shadowColor = COLOR_NEON_RED;

    // Draw food circle
    ctx.beginPath();
    ctx.arc(food.x + TILE_SIZE / 2, food.y + TILE_SIZE / 2, TILE_SIZE / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Wrap around screen
    if (head.x < 0) head.x = CANVAS_SIZE - TILE_SIZE;
    else if (head.x >= CANVAS_SIZE) head.x = 0;

    if (head.y < 0) head.y = CANVAS_SIZE - TILE_SIZE;
    else if (head.y >= CANVAS_SIZE) head.y = 0;

    snake.unshift(head); // Add new head

    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        spawnFood();
    } else {
        snake.pop(); // Remove tail
    }
}

function checkCollision() {
    const head = snake[0];

    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) return true;
    }

    return false;
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    drawFood();
    snake.forEach(drawSnakePart);
}

function update() {
    if (gameOver) return;

    changingDirection = false;
    moveSnake();

    if (checkCollision()) {
        endGame();
        return;
    }

    draw();
}

function gameLoop() {
    gameInterval = setInterval(update, GAME_SPEED);
}

function endGame() {
    gameOver = true;
    clearInterval(gameInterval);
    finalScoreElement.textContent = score;
    gameOverScreen.classList.remove('hidden');
}

function startGame() {
    initGame();
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    gameLoop();
    gameStarted = true;
}

// Input handling
document.addEventListener('keydown', (e) => {
    if (!gameStarted || gameOver) {
        if (e.key === 'Enter' || e.key === ' ') {
            if (!gameOverScreen.classList.contains('hidden')) restartBtn.click();
            else if (!startScreen.classList.contains('hidden')) startBtn.click();
        }
        return;
    }

    if (changingDirection) return;

    const key = e.key.toLowerCase();
    const goingUp = dy === -TILE_SIZE;
    const goingDown = dy === TILE_SIZE;
    const goingRight = dx === TILE_SIZE;
    const goingLeft = dx === -TILE_SIZE;

    if ((key === 'arrowleft' || key === 'a') && !goingRight) {
        dx = -TILE_SIZE;
        dy = 0;
        changingDirection = true;
    }
    if ((key === 'arrowup' || key === 'w') && !goingDown) {
        dx = 0;
        dy = -TILE_SIZE;
        changingDirection = true;
    }
    if ((key === 'arrowright' || key === 'd') && !goingLeft) {
        dx = TILE_SIZE;
        dy = 0;
        changingDirection = true;
    }
    if ((key === 'arrowdown' || key === 's') && !goingUp) {
        dx = 0;
        dy = TILE_SIZE;
        changingDirection = true;
    }
});

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

// Initialization
draw(); // Draw empty canvas initially
