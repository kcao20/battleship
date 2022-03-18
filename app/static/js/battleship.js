class Boat{
    
    length;
    orientation;
    
    x; 
    y;
    
    locations;
    hitLocations = [];
    isSunk = false;
    hp;
    
    constructor(locations, hp) {
        this.locations = locations;
        this.hp = hp;
    }
    
    registerHit(pointX, pointY) {
        this.hitLocations.push((pointX, pointY));
        this.hp -= 1;
        if (this.hp == 0) {
            this.isSunk = true;
        }
    }
}

class Field{
    hitLocations = [[, , , , , , , , ,], [, , , , , , , , ,], [, , , , , , , , ,], [, , , , , , , , ,], [, , , , , , , , ,], [, , , , , , , , ,], [, , , , , , , , ,], [, , , , , , , , ,], [, , , , , , , , ,], [, , , , , , , , ,]];
    field;
    setupDone = false;
    hp;
    
    constructor(field, hp) {
        this.field = field;
        this.hp = hp;
    }
    
    registerHit(pointX, pointY) {
        if (this.field[pointY][pointX] instanceof Boat) {
            this.field[pointY][pointX].registerHit(pointX, pointY);
            this.hp -= 1;
            this.hitLocations[pointY][pointX] = 1;
        } else {
            this.hitLocations[pointY][pointX] = 2;
        }
    }
}

let currentBoard = document.getElementById("currentBoard");
let currentBoardContext = currentBoard.getContext("2d");
let otherBoard = document.getElementById("otherBoard");
let label = document.getElementsByClassName("label");
let otherBoardContext = otherBoard.getContext("2d");
let drag = false;
let toMoveBoatX = -1;
let toMoveBoatY = -1;
let startButton = document.getElementById("start");
let currentPlayer = 1;

let fieldPlayer1 = new Field([[new Boat([(0,0)], 1),,,,,,,,,new Boat([(9,0)], 1)],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,]], 2);
let fieldPlayer2 = new Field([[new Boat([(0,0)], 1),,,,,,,,,new Boat([(9,0)], 1)],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,]], 2);
let currentField = fieldPlayer1;
let otherField = fieldPlayer2;
let boardClicked = false;

function renderGrid(ctx) {
    for (let i = currentBoard.offsetWidth / 10; i < currentBoard.offsetWidth; i += currentBoard.offsetWidth / 10){
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, currentBoard.offsetHeight);
        ctx.stroke();
    }
    
    for (let i = currentBoard.offsetHeight / 10; i < currentBoard.offsetHeight; i += currentBoard.offsetHeight / 10){
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(currentBoard.offsetWidth, i);
        ctx.stroke();
    }
}

function renderBoats(ctx, boardToRender) {
    ctx.fillStyle = "blue";
    
    for (let i = 0; i < boardToRender.field.length; i++){
        for (let v = 0; v < boardToRender.field[i].length; v++){
            if (boardToRender.field[i][v] instanceof Boat) {
                ctx.fillRect(v * currentBoard.offsetWidth / 10, i * currentBoard.offsetHeight / 10, currentBoard.offsetWidth / 10, currentBoard.offsetHeight / 10);
            }
        }
    }
}

function renderHits(ctx, boardToRender) {
    for (let i = 0; i < boardToRender.hitLocations.length; i++){
        for (let v = 0; v < boardToRender.hitLocations[i].length; v++){
            if (boardToRender.hitLocations[i][v] == 1) {
                ctx.fillStyle = "red";
                ctx.fillRect(v * currentBoard.offsetWidth / 10, i * currentBoard.offsetHeight / 10, currentBoard.offsetWidth / 10, currentBoard.offsetHeight / 10);
            } else if (boardToRender.hitLocations[i][v] == 2) {
                ctx.fillStyle = "#c2c3c7";
                ctx.fillRect(v * currentBoard.offsetWidth / 10, i * currentBoard.offsetHeight / 10, currentBoard.offsetWidth / 10, currentBoard.offsetHeight / 10);
            }
        }
    }
}

function getGridX(e) {
    const rect = currentBoard.getBoundingClientRect();
    return Math.floor((e.clientX - rect.left) / (currentBoard.offsetWidth / 10));
}

function getGridY(e) {
    const rect = currentBoard.getBoundingClientRect();
    return Math.floor((e.clientY - rect.top) / (currentBoard.offsetHeight / 10));
}

function readClicks(e) {
    if (drag && !(currentField.field[getGridY(e)][getGridX(e)] instanceof Boat) && !(getGridX(e) == toMoveBoatX && getGridY(e) == toMoveBoatY)) {
        drag = false;
        currentField.field[getGridY(e)][getGridX(e)] = currentField.field[toMoveBoatY][toMoveBoatX];
        currentField.field[toMoveBoatY][toMoveBoatX] = null;
        document.body.style.cursor = 'default';
        renderBoard(currentBoardContext, currentField);
    } else if (!currentField.hitLocations[getGridY(e)][getGridX(e)] && currentField.setupDone && !boardClicked) {
        boardClicked = true;
        currentField.registerHit(getGridX(e), getGridY(e));
        renderEnemyBoard(currentBoardContext, currentField);
        setTimeout(function () {
            if (currentField.field[getGridY(e)][getGridX(e)] instanceof Boat) {
                currentField.field[getGridY(e)][getGridX(e)].registerHit(getGridX(e), getGridY(e));
            }
            passTurn();
            boardClicked = false;
        }, 1000)
    }
}

function renderBoard(ctx, boardToRender) {
    ctx.clearRect(0, 0, currentBoard.offsetWidth, currentBoard.offsetHeight);
    renderBoats(ctx, boardToRender);
    renderHits(ctx, boardToRender);
    renderGrid(ctx);
}

function readClickStart(e) {
    if (!currentField.setupDone) {
        drag = true;
        document.body.style.cursor = 'move';
        toMoveBoatX = getGridX(e);
        toMoveBoatY = getGridY(e);
        // console.log(getGridX(e), getGridY(e));
    }
}

function readHoverCoordinate(e) {
    // console.log(getGridX(e), getGridY(e));
    if (!currentField.setupDone && 0 <= getGridY(e) && getGridY(e) < 10 && 0 <= getGridX(e) && getGridX(e) < 10 && currentField.field[getGridY(e)][getGridX(e)] instanceof Boat) {
        document.body.style.cursor = 'move';
    }
    else if (!drag){
        document.body.style.cursor = 'default';
    }
}

function player1EndSetup() {
    currentField.setupDone = true;
    gameStart("2");
    currentField = fieldPlayer2;
    currentPlayer = 2;
    renderBoard(currentBoardContext, currentField);
}

function passTurn() {
    currentField.setupDone = true;
    if (currentPlayer == 2){
        currentPlayer = 1;
        currentField = fieldPlayer1;
        otherField = fieldPlayer2;
        renderEnemyBoard(currentBoardContext, currentField);
        renderBoard(otherBoardContext, otherField);
    } else {
        currentPlayer = 2;
        currentField = fieldPlayer2;
        otherField = fieldPlayer1;
        renderEnemyBoard(currentBoardContext, currentField);
        renderBoard(otherBoardContext, otherField);
    }
    if (otherField.hp == 0) {
        if (currentPlayer == 1) {
            alert("Player 2 wins! Would you like to play again?");
            fieldPlayer1 = new Field([[new Boat([(0,0)], 1),,,,,,,,,new Boat([(9,0)], 1)],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,]], 2);
            fieldPlayer2 = new Field([[new Boat([(0,0)], 1),,,,,,,,,new Boat([(9,0)], 1)],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,]], 2);
            currentField = fieldPlayer1;
            otherField = fieldPlayer2;
            
        } else {
            alert("Player 1 wins! Would you like to play again?");
            fieldPlayer1 = new Field([[new Boat([(0,0)], 1),,,,,,,,,new Boat([(9,0)], 1)],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,]], 2);
            fieldPlayer2 = new Field([[new Boat([(0,0)], 1),,,,,,,,,new Boat([(9,0)], 1)],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,]], 2);
            currentField = fieldPlayer1;
            otherField = fieldPlayer2;
        }
        otherBoard.style.display = 'none';
        startButton.style.display = 'inline';
        renderBoard(currentBoardContext, currentField);
        renderBoard(otherBoardContext, otherField);
        for (let i = 0; i < label.length; i++) {
            label[i].style.display = "none";
        }
        currentPlayer = 1;
    }
    tellPlayerTurn(String(currentPlayer));
}

function startButtonFunc() {
    if (currentPlayer == 2 && !fieldPlayer2.setupDone) {
        fieldPlayer2.setupDone = true;
        startButton.style.display = "none";
        otherBoard.style.display = "inline";
        for (let i = 0; i < label.length; i++) {
            label[i].style.display = "inline";
        }
        otherField = fieldPlayer2
        currentField = fieldPlayer1
        renderBoard(currentBoardContext, currentField);
        renderEnemyBoard(otherBoardContext, otherField);
    }
    if (!fieldPlayer2.setupDone) {
        player1EndSetup();
    } else {
        passTurn();
    }
}

function gameStart(playerName) {
    player.innerHTML = "Player " + playerName + ", set up your field!"
}

function tellPlayerTurn(playerName) {
    player.innerHTML = "It is player " + currentPlayer + "'s turn."
}

function renderEnemyBoard(ctx, boardToRender) {
    ctx.clearRect(0, 0, currentBoard.offsetWidth, currentBoard.offsetHeight);
    renderHits(ctx, boardToRender);
    renderGrid(ctx);
}

renderBoard(currentBoardContext, currentField);
gameStart("1");

currentBoard.addEventListener('click', readClicks);
currentBoard.addEventListener('mousedown', readClickStart);
currentBoard.addEventListener('mousemove', readHoverCoordinate);
startButton.addEventListener('click', startButtonFunc);