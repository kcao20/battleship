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
        if (hp == 0) {
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
        if (field[pointX][pointY]) {
            field[pointX][pointY].registerHit(pointX, pointY);
        }
    }
}

let canvas = document.getElementById("board");
let context = canvas.getContext("2d");
let drag = false;
let toMoveBoatX = -1;
let toMoveBoatY = -1;

let field = new Field([[new Boat(),,,,,,,,,new Boat()],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,]]);

function renderGrid() {
    for (let i = canvas.offsetWidth / 10; i < canvas.offsetWidth; i += canvas.offsetWidth / 10){
        context.moveTo(i, 0);
        context.lineTo(i, canvas.offsetHeight);
    }

    for (let i = canvas.offsetHeight / 10; i < canvas.offsetHeight; i += canvas.offsetHeight / 10){
        context.moveTo(0, i);
        context.lineTo(canvas.offsetWidth, i);
    }

    context.strokeStyle = "black";
    context.stroke();
}

function renderBoats() {
    context.fillStyle = "blue";

    for (let i = 0; i < field.field.length; i++){
        for (let v = 0; v < field.field[i].length; v++){
            if (field.field[i][v] instanceof Boat) {
                context.fillRect(v * canvas.offsetWidth / 10, i * canvas.offsetHeight / 10, canvas.offsetWidth / 10, canvas.offsetHeight / 10);
            }
        }
    }
}

function renderHits() {
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

function readClicks(e) {
    if (drag && !(field.field[getGridY(e)][getGridX(e)] instanceof Boat) && !(getGridX(e) == toMoveBoatX && getGridY(e) == toMoveBoatY)) {
        drag = false;
        field.field[getGridY(e)][getGridX(e)] = field.field[toMoveBoatY][toMoveBoatX];
        field.field[toMoveBoatY][toMoveBoatX] = null;
        context.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    } else {
        field.hitLocations[getGridY(e)][getGridX(e)] = true;
    }
    renderBoats();
    renderHits();
    renderGrid();
}

function readClickStart(e) {
    drag = true;
    toMoveBoatX = getGridX(e);
    toMoveBoatY = getGridY(e);
    console.log(getGridX(e), getGridY(e));
}

function readHoverCoordinate(e) {
    console.log(getGridX(e), getGridY(e));
    if (0 <= getGridY(e)
        && getGridY(e) < 10
        && 0 <= getGridX(e)
        && getGridX(e) < 10
        && field.field[getGridY(e)][getGridX(e)] instanceof Boat) {
        document.body.style.cursor = 'move';
    } else {
        document.body.style.cursor = 'default';
    }
}

renderBoats();
renderGrid();

canvas.addEventListener('click', readClicks);
canvas.addEventListener('mousedown', readClickStart);
canvas.addEventListener('mousemove', readHoverCoordinate);