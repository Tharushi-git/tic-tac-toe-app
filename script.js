const board = document.getElementById('board');
const status = document.getElementById('status');
const reset = document.getElementById('reset');
const overlay = document.getElementById('overlay');
const resultMessage = document.getElementById('result-message');
const newGame = document.getElementById('new-game');

let currentPlayer = 'X';
let cells = Array(9).fill(null);
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      showEndScreen(`Player ${cells[a]} wins!`);
      gameActive = false;
      return;
    }
  }
  if (!cells.includes(null)) {
    showEndScreen("It's a draw!");
    gameActive = false;
  }
}

function showEndScreen(message) {
  resultMessage.textContent = message;
  overlay.classList.remove('hidden');
}

function handleClick(index) {
  if (!gameActive || cells[index]) return;

  cells[index] = currentPlayer;
  renderBoard();
  checkWinner();
  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function renderBoard() {
  board.innerHTML = '';
  cells.forEach((cell, index) => {
    const cellDiv = document.createElement('div');
    cellDiv.className = 'cell';
    if (cell) {
      cellDiv.textContent = cell;
      cellDiv.classList.add('taken');
    }
    cellDiv.addEventListener('click', () => handleClick(index));
    board.appendChild(cellDiv);
  });
}

function resetGame() {
  cells = Array(9).fill(null);
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = "Player X's turn";
  overlay.classList.add('hidden');
  renderBoard();
}

reset.addEventListener('click', resetGame);
newGame.addEventListener('click', resetGame);

renderBoard();
