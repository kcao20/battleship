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

var canvas = document.getElementById("board");
var context = canvas.getContext("2d");

function renderGrid(){
    for (let i = 1; i < canvas.offsetWidth; i += canvas.offsetWidth / 10){
        context.moveTo(40 * i, 0);
        context.lineTo(40 * i, context.offsetHeight)
    }
}

renderGrid();