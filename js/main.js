// Variables globales
var board = ['', '', '', '', '', '', '', '', ''];
var currentPlayer = 'X';
var gameEnded = false;

// Función para realizar un movimiento del jugador
function makeMove(index) {
  if (!gameEnded && board[index] === '') {
    board[index] = currentPlayer;
    document.getElementsByTagName('td')[index].innerText = currentPlayer;
    document.getElementsByTagName('td')[index].style.cursor = 'not-allowed';

    if (checkWin(currentPlayer)) {
      endGame(currentPlayer + ' ha ganado');
    } else if (checkDraw()) {
      endGame('Empate');
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      makeNPCMove();
    }
  }
}

// Función para realizar un movimiento del NPC
function makeNPCMove() {
  var emptyCells = [];
  for (var i = 0; i < board.length; i++) {
    if (board[i] === '') {
      emptyCells.push(i);
    }
  }

  var randomIndex = Math.floor(Math.random() * emptyCells.length);
  var npcMove = emptyCells[randomIndex];
  board[npcMove] = currentPlayer;
  document.getElementsByTagName('td')[npcMove].innerText = currentPlayer;
  document.getElementsByTagName('td')[npcMove].style.cursor = 'not-allowed';

  if (checkWin(currentPlayer)) {
    endGame(currentPlayer + ' ha ganado');
  } else if (checkDraw()) {
    endGame('Empate');
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Función para verificar si hay un ganador
function checkWin(player) {
  var winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
    [0, 4, 8], [2, 4, 6] // Diagonales
  ];

  for (var i = 0; i < winningCombinations.length; i++) {
    var [a, b, c] = winningCombinations[i];
    if (board[a] === player && board[b] === player && board[c] === player) {
      return true;
    }
  }

  return false;
}

// Función para verificar si hay empate
function checkDraw() {
  return !board.includes('');
}

// Función para finalizar el juego
function endGame(message) {
  gameEnded = true;
  alert(message);
}

// Función para reiniciar el juego
function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameEnded = false;

  var cells = document.getElementsByTagName('td');
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
    cells[i].style.cursor = 'pointer';
  }
}