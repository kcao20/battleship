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

    constructor(field) {
        this.field = field;
    }

    registerHit(pointX, pointY) {
        this.hitLocations.push((pointX, pointY));
        if (this.field[pointX][pointY]) {
            this.field[pointX][pointY].registerHit(pointX, pointY);
        }
    }
}

let canvas = document.getElementById("board");
let context = canvas.getContext("2d");
let drag = false;
let toMoveBoatX = -1;
let toMoveBoatY = -1;
let startButton = document.getElementById("start");
let currentPlayer = 1;

let fieldPlayer1 = new Field([[new Boat([(0,0)], 1),,,,,,,,,new Boat([(9,0)], 1)],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,]]);
let fieldPlayer2 = new Field([[new Boat([(0,0)], 1),,,,,,,,,new Boat([(9,0)], 1)],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,]]);
let currentField = fieldPlayer1;

function renderGrid() {
    for (let i = canvas.offsetWidth / 10; i < canvas.offsetWidth; i += canvas.offsetWidth / 10){
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, canvas.offsetHeight);
        context.stroke();
    }

    for (let i = canvas.offsetHeight / 10; i < canvas.offsetHeight; i += canvas.offsetHeight / 10){
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(canvas.offsetWidth, i);
        context.stroke();
    }
}

function renderBoats() {
    context.fillStyle = "blue";

    for (let i = 0; i < currentField.field.length; i++){
        for (let v = 0; v < currentField.field[i].length; v++){
            if (currentField.field[i][v] instanceof Boat) {
                context.fillRect(v * canvas.offsetWidth / 10, i * canvas.offsetHeight / 10, canvas.offsetWidth / 10, canvas.offsetHeight / 10);
            }
        }
    }
}

function renderHits() {
    context.fillStyle = "red";

    for (let i = 0; i < currentField.hitLocations.length; i++){
        for (let v = 0; v < currentField.hitLocations[i].length; v++){
            if (currentField.hitLocations[i][v]) {
                context.fillRect(v * canvas.offsetWidth / 10, i * canvas.offsetHeight / 10, canvas.offsetWidth / 10, canvas.offsetHeight / 10);
            }
        }
    }
}

function getGridX(e) {
    const rect = canvas.getBoundingClientRect();
    return Math.floor((e.clientX - rect.left) / (canvas.offsetWidth / 10));
}

function getGridY(e) {
    const rect = canvas.getBoundingClientRect();
    return Math.floor((e.clientY - rect.top) / (canvas.offsetHeight / 10));
}

function readClicks(e) {
    if (drag && !(currentField.field[getGridY(e)][getGridX(e)] instanceof Boat) && !(getGridX(e) == toMoveBoatX && getGridY(e) == toMoveBoatY)) {
        drag = false;
        currentField.field[getGridY(e)][getGridX(e)] = currentField.field[toMoveBoatY][toMoveBoatX];
        currentField.field[toMoveBoatY][toMoveBoatX] = null;
        document.body.style.cursor = 'default';
    } else if (!currentField.hitLocations[getGridY(e)][getGridX(e)]){
        currentField.hitLocations[getGridY(e)][getGridX(e)] = true;
        if (currentField.field[getGridY(e)][getGridX(e)] instanceof Boat) {
            currentField.field[getGridY(e)][getGridX(e)].registerHit(getGridX(e), getGridY(e));
        }
    }
    renderBoard();
}

function renderBoard() {
    context.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    renderBoats();
    renderHits();
    renderGrid();
}

function readClickStart(e) {
    drag = true;
    document.body.style.cursor = 'move';
    toMoveBoatX = getGridX(e);
    toMoveBoatY = getGridY(e);
    // console.log(getGridX(e), getGridY(e));
}

function readHoverCoordinate(e) {
    // console.log(getGridX(e), getGridY(e));
    if (0 <= getGridY(e) && getGridY(e) < 10 && 0 <= getGridX(e) && getGridX(e) < 10 && currentField.field[getGridY(e)][getGridX(e)] instanceof Boat) {
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
    renderBoard();
}

function passTurn() {
    currentField.setupDone = true;
    if (currentPlayer == 2){
        currentPlayer = 1;
        currentField = fieldPlayer1;
        renderBoard();
    } else {
        currentPlayer = 2;
        currentField = fieldPlayer2;
        renderBoard();
    }
    tellPlayerTurn(String(currentPlayer));
}

function startButtonFunc() {
    if (currentPlayer == 2 && !fieldPlayer2.setupDone) {
        fieldPlayer2.setupDone = true;
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

renderBoard();
gameStart("1");

canvas.addEventListener('click', readClicks);
canvas.addEventListener('mousedown', readClickStart);
canvas.addEventListener('mousemove', readHoverCoordinate);
startButton.addEventListener('click', startButtonFunc);