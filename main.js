
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const pvpButton = document.getElementById('pvpButton');
const pvcButton = document.getElementById('pvcButton');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
const scoreTieElement = document.getElementById('scoreTie');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let vsComputer = false;

let scoreX = 0;
let scoreO = 0;
let scoreTie = 0;

const winningConditions = [
    [0, 1, 2],  
    [3, 4, 5],  
    [6, 7, 8],  
    [0, 3, 6],  
    [1, 4, 7],  
    [2, 5, 8],  
    [0, 4, 8],  
    [2, 4, 6],  
];

const checkWinner = () => {
    for (const [a, b, c] of winningConditions) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            status.textContent = `Player ${board[a]} wins!`;
            gameActive = false;

            if (board[a] === 'X') {
                scoreX++;
                scoreXElement.textContent = scoreX;
            } else {
                scoreO++;
                scoreOElement.textContent = scoreO;
            }

            return;
        }
    }

    if (!board.includes('')) {
        status.textContent = 'It\'s a tie!';
        gameActive = false;
        scoreTie++;
        scoreTieElement.textContent = scoreTie;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
};

const handleClick = (event) => {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWinner();

    if (vsComputer && gameActive && currentPlayer === 'O') {
        setTimeout(computerMove, 500);
    }
};

const computerMove = () => {
    const availableIndices = board
        .map((value, index) => (value === '' ? index : null))
        .filter(index => index !== null);

    if (availableIndices.length === 0) return;

    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    board[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';
    checkWinner();
};

const handleReset = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = vsComputer;
    status.textContent = vsComputer ? `Player ${currentPlayer}'s turn` : 'Select game mode';
    cells.forEach(cell => cell.textContent = '');
};

const handleModeChange = (event) => {
    if (event.target.id === 'pvpButton') {
        vsComputer = false;
        status.textContent = `Player ${currentPlayer}'s turn`;
        gameActive = true;
    } else if (event.target.id === 'pvcButton') {
        vsComputer = true;
        status.textContent = `Player ${currentPlayer}'s turn`;
        gameActive = true;
    }
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', handleReset);
pvpButton.addEventListener('click', handleModeChange);
pvcButton.addEventListener('click', handleModeChange);
