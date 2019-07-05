
let origBoard;
let huPlayer ='O';
let aiPlayer = 'X';
const winCombos =[
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [6, 4, 2],
  [2, 5, 8],
  [1, 4, 7],
  [0, 3, 6]
];

const cells = document.querySelectorAll('.cell');
startGame();

function selectSym(sym){
  huPlayer = sym;
  aiPlayer = sym==='O' ? 'X' :'O';
  origBoard = Array.from(Array(9).keys());
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', turnClick, false);
  }
  if (aiPlayer === 'X') {
    turn(bestSpot(),aiPlayer);
  }
  document.querySelector('.selectSym').style.display = "none";
}

function startGame() {
  document.querySelector('.endgame').style.display = "none";
  document.querySelector('.endgame .text').innerText ="";
  document.querySelector('.selectSym').style.display = "block";
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
  }
}

function turnClick(square) {
  if (typeof origBoard[square.target.id] ==='number') {
    turn(square.target.id, huPlayer);
    if (!checkWin(origBoard, huPlayer) && !checkTie())  
      turn(bestSpot(), aiPlayer);
  }
}

function turn(squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerHTML = player;
  let gameWon = checkWin(origBoard, player);
  if (gameWon) gameOver(gameWon);
  checkTie();
}

function checkWin(board, player) {
  let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
  let gameWon = null;
  for (let [index, win] of winCombos.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = {index: index, player: player};
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon){
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor = 
      gameWon.player === huPlayer ? "blue" : "red";
  }
  for (let i=0; i < cells.length; i++) {
    cells[i].removeEventListener('click', turnClick, false);
  }
  declareWinner(gameWon.player === huPlayer ? "You win!" : "You lose");
}

function declareWinner(who) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = who;
}
function emptySquares() {
  return origBoard.filter((elm, i) => i===elm);
}

function bestSpot(){
    return emptySquares()[0];}
  
function checkTie() {
  if (emptySquares().length === 0){
    for (cell of cells) {
      cell.style.backgroundColor = "green";
      cell.removeEventListener('click',turnClick, false);
    }
    declareWinner("Tie game");
    return true;
  } 
  return false;
}


