class Game {

    // TODO: Maybe create a player class to make things cleaner?

    // boats players can places
    defaultBoatsToPlace = [5, 4, 3, 2]
    player1BoatsToPlace = [...this.defaultBoatsToPlace];
    player1BoatsToPlace = [...this.defaultBoatsToPlace];

    // boats
    player1Boats = [];
    player2Boats = [];

    // when all boats are placed
    player1CanStart = false;
    player2CanStart = false; 

    currentBoard = document.getElementById("currentBoard");
    currentBoardContext = currentBoard.getContext("2d");

    otherBoard = document.getElementById("otherBoard");
    otherBoardContext = otherBoard.getContext("2d");

    drag = false;
    toMoveBoatX = -1;
    toMoveBoatY = -1;
    
    startButton = document.getElementById("start");
    
    currentPlayer = 1;
    
    // to change
    player1Board = new Board([[new Boat([(0,0)], 1),,,,,,,,,new Boat([(9,0)], 1)],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,]]);
    player2Board = new Board([[new Boat([(0,0)], 1),,,,,,,,,new Boat([(9,0)], 1)],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,]]);
    
    currentField = player1Board;
    otherField = player2Board;
}


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

class Board {
    board; // TODO: 2d array {hit: boolean, ship: number that maps to boat array, }
    setupDone = false;
    
    constructor(width, height) {
        this.board = Board.generateEmptyBoard(width, height);
    }
    
    registerHit(pointX, pointY) {
        if (this.board[pointX][pointY] && !this.board[pointX][pointY].hit) {
            this.board[pointX][pointY] = {...this.board[pointX][pointY], hit: true};
            
            const boat = this.board[pointX][pointY];
            boat.registerHit(pointX, pointY);
        }
    }

    static generateEmptyBoard(width, height) {
        let board = [];

        for (let i = 0; i < height; i++) {
            let col = [];
            
            for (let j = 0; j < width; j++) {
                col[j] = null;
            }

            board[i] = col;
        }

        return board
    }
}

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
    ctx.fillStyle = "red";
    
    for (let i = 0; i < boardToRender.hitLocations.length; i++){
        for (let v = 0; v < boardToRender.hitLocations[i].length; v++){
            if (boardToRender.hitLocations[i][v]) {
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
    } else if (!currentField.hitLocations[getGridY(e)][getGridX(e)] && currentField.setupDone){
        currentField.hitLocations[getGridY(e)][getGridX(e)] = true;
        renderEnemyBoard(currentBoardContext, currentField);
        setTimeout(function () {
            if (currentField.field[getGridY(e)][getGridX(e)] instanceof Boat) {
                currentField.field[getGridY(e)][getGridX(e)].registerHit(getGridX(e), getGridY(e));
            }
            passTurn();
        }, 0)
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
    tellPlayerTurn(String(currentPlayer));
}

function startButtonFunc() {
    if (currentPlayer == 2 && !fieldPlayer2.setupDone) {
        fieldPlayer2.setupDone = true;
        startButton.style.display = "none"
        otherBoard.style.display = "inline"
        renderEnemyBoard(otherBoardContext, otherField);
    }
    if (!fieldPlayer2.setupDone) {
        player1EndSetup();
    } else {
        passTurn();
    }
}

function gameStart(playerName) {
    alert("Player "+playerName+", set up your field!");
}

function tellPlayerTurn(playerName) {
    alert("Player "+playerName+", it's your turn!");
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