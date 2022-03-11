class Boat{
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
let player1SetupComplete = false;

let fieldPlayer1 = new Field([[new Boat([(0,0)], 1),,,,,,,,,new Boat([(9,0)], 1)],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,]]);

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

function renderBoats(field) {
    context.fillStyle = "blue";

    for (let i = 0; i < field.field.length; i++){
        for (let v = 0; v < field.field[i].length; v++){
            if (field.field[i][v] instanceof Boat) {
                context.fillRect(v * canvas.offsetWidth / 10, i * canvas.offsetHeight / 10, canvas.offsetWidth / 10, canvas.offsetHeight / 10);
            }
        }
    }
}

function renderHits(field) {
    context.fillStyle = "red";

    for (let i = 0; i < field.hitLocations.length; i++){
        for (let v = 0; v < field.hitLocations[i].length; v++){
            if (field.hitLocations[i][v]) {
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

function readClicks(field, e) {
    if (drag && !(field.field[getGridY(e)][getGridX(e)] instanceof Boat) && !(getGridX(e) == toMoveBoatX && getGridY(e) == toMoveBoatY)) {
        drag = false;
        field.field[getGridY(e)][getGridX(e)] = this.field.field[toMoveBoatY][toMoveBoatX];
        field.field[toMoveBoatY][toMoveBoatX] = null;
        document.body.style.cursor = 'default';
    } else if (!field.hitLocations[getGridY(e)][getGridX(e)]){
        field.hitLocations[getGridY(e)][getGridX(e)] = true;
        if (field.field[getGridY(e)][getGridX(e)] instanceof Boat) {
            field.field[getGridY(e)][getGridX(e)].registerHit(getGridX(e), getGridY(e));
        }
    }
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

function readHoverCoordinate(field, e) {
    // console.log(getGridX(e), getGridY(e));
    if (0 <= getGridY(e) && getGridY(e) < 10 && 0 <= getGridX(e) && getGridX(e) < 10 && field.field[getGridY(e)][getGridX(e)] instanceof Boat) {
        document.body.style.cursor = 'move';
    }
    else if (!drag){
        document.body.style.cursor = 'default';
    }
}

renderBoats(fieldPlayer1);
renderGrid(fieldPlayer1);

function gameStart(playerName) {
    alert("Player "+playerName+", set up your field!");
}

function player1EndSetup() {
    player1SetupComplete = true;
    gameStart("2");
    
}

gameStart("1");

canvas.addEventListener('click', readClicks.bind(fieldPlayer1));
canvas.addEventListener('mousedown', readClickStart.bind(fieldPlayer1));
canvas.addEventListener('mousemove', readHoverCoordinate.bind(fieldPlayer1));
startButton.addEventListener('click', gameStart);