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
    hitLocations = [];
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
                console.log("ppmode");
                context.fillRect(v * canvas.offsetWidth / 10, i * canvas.offsetHeight / 10, canvas.offsetWidth / 10, canvas.offsetHeight / 10);
            }
        }
    }
}

function readClicks(e) {
    const rect = canvas.getBoundingClientRect();
    if (drag && !(field.field[Math.floor((e.clientY - rect.top) / (canvas.offsetHeight / 10))][Math.floor((e.clientX - rect.left) / (canvas.offsetWidth / 10))] instanceof Boat)) {
        drag = false;
        field.field[Math.floor((e.clientY - rect.top) / (canvas.offsetHeight / 10))][Math.floor((e.clientX - rect.left) / (canvas.offsetWidth / 10))] = field.field[toMoveBoatY][toMoveBoatX];
        field.field[toMoveBoatY][toMoveBoatX] = null;
        context.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        renderBoats();
        renderGrid();
    }
}

function readClickStart(e) {
    const rect = canvas.getBoundingClientRect();
    drag = true;
    toMoveBoatX = Math.floor((e.clientX - rect.left) / (canvas.offsetWidth / 10));
    toMoveBoatY = Math.floor((e.clientY - rect.top) / (canvas.offsetHeight / 10));
    console.log(Math.floor((e.clientX - rect.left) / (canvas.offsetWidth / 10)), Math.floor((e.clientY - rect.top) / (canvas.offsetHeight / 10)));
}

function readHoverCoordinate(e) {
    const rect = canvas.getBoundingClientRect();
    console.log(Math.floor((e.clientX - rect.left) / (canvas.offsetWidth / 10)), Math.floor((e.clientY - rect.top) / (canvas.offsetHeight / 10)));
    if (0 <= Math.floor((e.clientY - rect.top) / (canvas.offsetHeight / 10))
        && Math.floor((e.clientY - rect.top) / (canvas.offsetHeight / 10)) < 10
        && 0 <= Math.floor((e.clientX - rect.left) / (canvas.offsetWidth / 10))
        && Math.floor((e.clientX - rect.left) / (canvas.offsetWidth / 10)) < 10
        && field.field[Math.floor((e.clientY - rect.top) / (canvas.offsetHeight / 10))][Math.floor((e.clientX - rect.left) / (canvas.offsetWidth / 10))] instanceof Boat) {
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