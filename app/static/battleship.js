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

function renderGrid() {
    for (var i = canvas.offsetWidth / 10; i < canvas.offsetWidth; i += canvas.offsetWidth / 10){
        context.moveTo(i, 0);
        context.lineTo(i, canvas.offsetHeight);
    }

    for (var i = canvas.offsetHeight / 10; i < canvas.offsetHeight; i += canvas.offsetHeight / 10){
        context.moveTo(0, i);
        context.lineTo(canvas.offsetWidth, i);
    }

    context.strokeStyle = "black";
    context.stroke();
}

function readClicks(e){
    console.log(e.clientX)
}

renderGrid();

canvas.addEventListener('click', readClicks)