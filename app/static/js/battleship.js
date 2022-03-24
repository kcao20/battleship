let user1 = prompt("Player 1, please enter your username");
let user2 = prompt("Player 2, please enter your username");

var BOAT_ORIENTATIONS;
(function (BOAT_ORIENTATIONS) {
    BOAT_ORIENTATIONS["HORIZONTAL"] = "horizontal";
    BOAT_ORIENTATIONS["VERTICAL"] = "vertical";
})(BOAT_ORIENTATIONS || (BOAT_ORIENTATIONS = {}));
class Boat {
    length;
    orientation;
    x;
    y;
    locations = [];
    hp = 0;
    isSunk = false;
    constructor(length, locations) {
        this.length = length;
        this.locations = locations;
        this.hp = length;
    }
    setOrientation(orientation) {
        this.orientation = orientation;
        return this;
    }
    setX(x) {
        this.x = x;
        return this;
    }
    setY(y) {
        this.y = y;
        return this;
    }
    setIsSunk(isSunk) {
        this.isSunk = isSunk;
        return this;
    }
    registerHit(pointX, pointY) {
        this.hp = this.hp - 1;
        
        if (this.hp <= 0) {
            this.isSunk = true;
        }
    }
}
class Player {
    boardSize = [10, 10];
    board = Player.generateEmptyBoard(this.boardSize); // 2D array of either null or {hit: boolean, shipID: number}
    ships = [];
    shipsToPlace = []; // array of lengths of ships player must place
    isSetupDone = false;
    sunkenBoats = 0;
    username = "John Wick";
    hits = 0;
    misses = 0;
    constructor() { } // Use builder pattern?
    reset() {
        this.ships = [];
        this.shipsToPlace = [];
        this.isSetupDone = false;
        this.board = Player.generateEmptyBoard(this.boardSize);
    }
    setShipsToPlace(shipsToPlace) {
        this.shipsToPlace = shipsToPlace;
        return this; // will allow chaining
    }
    setUsername(username) {
        username = username;
        return this;
    }
    receiveHit(pointX, pointY) {
        const boat = this.board[pointY][pointX];
        if (boat) {
            if (typeof boat.shipID !== "undefined") {
                const shipID = this.board[pointY][pointX].shipID;
                this.board[pointY][pointX] = { ...this.board[pointY][pointX], hit: true };
                this.ships[shipID].registerHit(pointX, pointY);
                if (this.ships[shipID].isSunk) {
                    this.sunkenBoats++;
                }
                return true;
            }
        }
        else {
            this.board[pointY][pointX] = { miss: true };
            return false;
        }
    }
    getObjectAtPos(x, y) {
        return this.board[y][x];
    }
    setObjectAtPos(x, y, obj) {
        this.board[y][x] = obj;
        return this.board;
    }
    setBoard(board) {
        this.board = board;
        return this;
    }
    static generateEmptyBoard(boardSize) {
        let board = [];
        for (let i = 0; i < boardSize[0]; i++) {
            let col = [];
            for (let j = 0; j < boardSize[1]; j++) {
                col[j] = null;
            }
            board[i] = col;
        }
        return board;
    }
    randomlySetupBoard() {
        this.board = Player.generateEmptyBoard(this.boardSize);
        while (this.shipsToPlace.length > 0) {
            const boatLength = this.shipsToPlace.shift();
            // console.log(boatLength)
            let orientation = Math.random() > 0.5 ? BOAT_ORIENTATIONS.VERTICAL : BOAT_ORIENTATIONS.HORIZONTAL;
            let placeX = 0;
            let placeY = 0;
            let goodCoordinates = 0;
            while (goodCoordinates < boatLength) {
                if (orientation === BOAT_ORIENTATIONS.VERTICAL) {
                    placeX = Math.floor(Math.random() * 10);
                    placeY = Math.floor(Math.random() * (10 - boatLength));
                }
                else {
                    placeX = Math.floor(Math.random() * (10 - boatLength));
                    placeY = Math.floor(Math.random() * 10);
                }
                for (let v = 0; v < boatLength; v++) {
                    if (!(this.board[placeX][placeY + v])) {
                        goodCoordinates++;
                    }
                    else {
                        break;
                    }
                }
            }
            let locations = [];
            for (let v = 0; v < boatLength; v++) {
                if (orientation == BOAT_ORIENTATIONS.VERTICAL) {
                    locations.push([placeX, placeY + v]);
                }
                else {
                    locations.push([placeX + v, placeY]);
                }
            }
            // console.log(locations);
            let boat = new Boat(length, locations).setOrientation(orientation);
            this.ships.push(boat);
            const boatIndex = this.ships.length - 1;
            // console.log(locations)
            for (let v = 0; v < locations.length; v++) {
                // console.log(board);
                this.board[locations[v][0]][locations[v][1]] = { hit: false, shipID: boatIndex };
            }
        }
        return this;
    }
}

const defaultShipsToPlace = [1];
let player1 = new Player().setShipsToPlace([...defaultShipsToPlace]);
let player2 = new Player().setShipsToPlace([...defaultShipsToPlace]);

const currentBoard = document.getElementById("currentBoard");
const currentBoardContext = currentBoard.getContext("2d");
const otherBoard = document.getElementById("otherBoard");
const otherBoardContext = otherBoard.getContext("2d");

const labels = document.getElementsByClassName("label");
const playerElement = document.getElementById("player");
const startButton = document.getElementById("start");
const passTurnButton = document.getElementById("passTurn");

let drag = false;
let toMoveBoatX = -1;
let toMoveBoatY = -1;

let boardClicked = false;
let currentPlayer = 1;
let otherPlayer = 2;
let currentPlayerObject = player1;
let otherPlayerObject = player2;

function changeCurrentPlayer(playerNum) {
    switch (playerNum) {
        case 1:
            currentPlayerObject = player1;
            otherPlayerObject = player2;
            currentPlayer = 1;
            otherPlayer = 2;
            break;
        case 2:
            currentPlayerObject = player2;
            otherPlayerObject = player1;
            currentPlayer = 2;
            otherPlayer = 1;
            break;
    }
}

function setupBoard() {
    player1.randomlySetupBoard();
    player2.randomlySetupBoard();
}
function currentField() {
    if (currentPlayer == 1) {
        return player1.board;
    }
    if (currentPlayer == 2) {
        return player2.board;
    }
}
function otherField() {
    if (currentPlayer == 2) {
        return player1.board;
    }
    if (currentPlayer == 1) {
        return player2.board;
    }
}

function renderGrid(ctx) {
    for (let i = currentBoard.offsetWidth / 10; i < currentBoard.offsetWidth; i += currentBoard.offsetWidth / 10) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, currentBoard.offsetHeight);
        ctx.stroke();
    }
    for (let i = currentBoard.offsetHeight / 10; i < currentBoard.offsetHeight; i += currentBoard.offsetHeight / 10) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(currentBoard.offsetWidth, i);
        ctx.stroke();
    }
}
function renderBoats(ctx, boardToRender) {
    ctx.fillStyle = "blue";
    for (let i = 0; i < boardToRender.length; i++) {
        for (let v = 0; v < boardToRender[i].length; v++) {
            if (boardToRender[i][v]) {
                ctx.fillRect(v * currentBoard.offsetWidth / 10, i * currentBoard.offsetHeight / 10, currentBoard.offsetWidth / 10, currentBoard.offsetHeight / 10);
            }
        }
    }
}

function renderHits(ctx, boardToRender) {
    for (let i = 0; i < boardToRender.length; i++) {
        for (let v = 0; v < boardToRender[i].length; v++) {
            if (boardToRender[i][v] && boardToRender[i][v].hit) {
                ctx.fillStyle = "red";
                ctx.fillRect(v * currentBoard.offsetWidth / 10, i * currentBoard.offsetHeight / 10, currentBoard.offsetWidth / 10, currentBoard.offsetHeight / 10);
            }
            else if (boardToRender[i][v] && boardToRender[i][v].miss) {
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
function moveBoatAt(oldX, oldY, newX, newY) {
    console.log(newX, newY, oldX, oldY);
    const objectAtPos = currentField()[oldY][oldX];
    const deltaX = newX - oldX;
    const deltaY = newY - oldY;
    if (objectAtPos && typeof objectAtPos.shipID === "number") {
        const shipID = objectAtPos.shipID;
        const boat = currentPlayerObject.ships[shipID];
        const oldLocations = boat.locations;
        const newLocations = oldLocations.map((cords) => [cords[0] + deltaY, cords[1] + deltaX]);
        //checks if valid
        for (let i = 0; i < newLocations.length; i++) {
            const cords = newLocations[i];
            const inBoard = cords[0] < 10 && cords[0] >= 0 && cords[1] < 10 && cords[1] >= 0;
            if (!inBoard)
                return;
            const newCordData = currentField()[cords[0]][cords[1]];
            let isDiffBoat = newCordData && typeof newCordData.shipID !== "undefined" && newCordData.shipID !== shipID;
            if (isDiffBoat)
                return;
            console.log("hey");
        }
        //move ship
        for (let i = 0; i < oldLocations.length; i++) {
            const oldCords = oldLocations[i];
            currentField()[oldCords[0]][oldCords[1]] = null;
        }
        for (let i = 0; i < newLocations.length; i++) {
            const newCords = newLocations[i];
            currentField()[newCords[0]][newCords[1]] = { hit: false, shipID };
        }
        boat.locations = newLocations;
    }
}
function readClicks(e) {
    if (drag && !(getGridX(e) == toMoveBoatX && getGridY(e) == toMoveBoatY)) {
        drag = false;
        moveBoatAt(toMoveBoatX, toMoveBoatY, getGridX(e), getGridY(e));
        document.body.style.cursor = 'default';
        renderBoard(currentBoardContext, currentField());
    }
    else if (!currentField()[getGridY(e)][getGridX(e)]?.hit && currentPlayerObject.isSetupDone && !boardClicked) {
        boardClicked = true;
        if (currentPlayerObject.receiveHit(getGridX(e), getGridY(e))) {
            renderEnemyBoard(currentBoardContext, currentField());
            boardClicked = false;
            // passTurnButton.style.display = 'inline';
            return;
        }
        renderEnemyBoard(currentBoardContext, currentField());
        setTimeout(function () {
            if (currentField()[getGridY(e)][getGridX(e)]) {
                const shipID = currentField()[getGridY(e)][getGridX(e)].shipID || null;
                if (shipID) {
                    currentPlayerObject.ships[shipID].registerHit(getGridX(e), getGridY(e));
                }
                ;
            }
            passTurn();
        }, 500);
    }
}

function renderBoard(ctx, boardToRender) {
    ctx.clearRect(0, 0, currentBoard.offsetWidth, currentBoard.offsetHeight);
    renderBoats(ctx, boardToRender);
    renderHits(ctx, boardToRender);
    renderGrid(ctx);
}

function readClickStart(e) {
    if (!currentPlayerObject.isSetupDone) {
        drag = true;
        document.body.style.cursor = 'move';
        toMoveBoatX = getGridX(e);
        toMoveBoatY = getGridY(e);
        // console.log(getGridX(e), getGridY(e));
    }
}
function readHoverCoordinate(e) {
    // console.log(getGridX(e), getGridY(e));
    // console.log(currentPlayer)
    if (!currentPlayerObject.isSetupDone && 0 <= getGridY(e) && getGridY(e) < 10 && 0 <= getGridX(e) && getGridX(e) < 10 && currentField()[getGridY(e)][getGridX(e)]) {
        document.body.style.cursor = 'move';
    }
    else if (!drag) {
        document.body.style.cursor = 'default';
    }
}
function player1EndSetup() {
    currentPlayerObject.isSetupDone = true;
    changeCurrentPlayer(2);
    renderBoard(currentBoardContext, currentField());
}
function passTurn() {
    currentPlayerObject.isSetupDone = true;
    if (currentPlayer == 2) {
        changeCurrentPlayer(1);
        clearBoard(currentBoardContext);
        clearBoard(otherBoardContext);
        renderGrid(currentBoardContext);
        renderGrid(otherBoardContext);
        passTurnButton.style.display = "inline";
    }
    else {
        changeCurrentPlayer(2);
        clearBoard(currentBoardContext);
        clearBoard(otherBoardContext);
        renderGrid(currentBoardContext);
        renderGrid(otherBoardContext);
        passTurnButton.style.display = "inline";
    }
    console.log(otherPlayerObject, currentPlayerObject)
    if (otherPlayerObject.sunkenBoats >= otherPlayerObject.ships.length) {
        passTurnButton.style.display = "none";
        if (currentPlayer == 1) {
            alert("Player 2 wins! Would you like to play again?");
            player1.reset();
            player2.reset();
            changeCurrentPlayer(2);
            countHits();
        }
        else {
            alert("Player 1 wins! Would you like to play again?");
            player1.reset();
            player2.reset();
            changeCurrentPlayer(2);
            countHits();
        }
        otherBoard.style.display = 'none';
        startButton.style.display = 'inline';
        renderBoard(currentBoardContext, currentField());
        renderBoard(otherBoardContext, otherField());
        for (let i = 0; i < labels.length; i++) {
            labels[i].style.display = "none";
        }
        changeCurrentPlayer(1);
    }
    tellPlayerTurn(currentPlayer);
}

function startButtonFunc() {
    if (currentPlayer == 2 && !player2.isSetupDone) {
        player2.isSetupDone = true;
        startButton.style.display = "none";
        otherBoard.style.display = "inline";
        for (let i = 0; i < labels.length; i++) {
            labels[i].style.display = "inline";
        }
        renderBoard(currentBoardContext, currentField());
        renderEnemyBoard(otherBoardContext, otherField());
    }
    if (!player2.isSetupDone) {
        player1EndSetup();
    }
    else {
        passTurn();
        passTurnButtonFunction();
    }
}


function gameStart(playerName) {
    sendUserInfo();
    if (playerName == 1) {
        player.innerHTML = user1 + ", set up your field!";
    }
    if (playerName == 2) {
        player.innerHTML = user2 + ", set up your field!";
    }
}

function tellPlayerTurn(playerName) {
    if (playerName == 1) {
        player.innerHTML = "It is " + user1 + "'s turn.";
    }
    if (playerName == 2) {
        player.innerHTML = "It is " + user2 + "'s turn.";
    }
}

function renderEnemyBoard(ctx, boardToRender) {
    ctx.clearRect(0, 0, currentBoard.offsetWidth, currentBoard.offsetHeight);
    renderHits(ctx, boardToRender);
    renderGrid(ctx);
}
function clearBoard(ctx) {
    ctx.clearRect(0, 0, currentBoard.offsetWidth, currentBoard.offsetHeight);
}
function passTurnButtonFunction() {
    renderEnemyBoard(currentBoardContext, currentField());
    renderBoard(otherBoardContext, otherField());
    passTurnButton.style.display = "none";
    boardClicked = false;
}


function sendUserInfo() {
    fetch("/getdata", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

        // A JSON payload
        body: JSON.stringify({
            user1: user1,
            user2: user2,
        }),
    })
        .then(function (response) {
            // At this point, Flask has printed our JSON
            return response.text();
        })
        .then(function (text) {
            console.log("POST response: ");

            // Should be 'OK' if everything was successful
            console.log(text);
        });
}

function countHits() {
    for (let i = 0; i < fieldPlayer1.hitLocations.length; i++) {
        for (let v = 0; v < boardToRender.hitLocations[i].length; v++) {
            if (boardToRender.hitLocations[i][v] == 1) {
                p2Hit++;
            } else if (boardToRender.hitLocations[i][v] == 2) {
                p2Miss++;
            }
        }
    }
    for (let i = 0; i < fieldPlayer2.hitLocations.length; i++) {
        for (let v = 0; v < boardToRender.hitLocations[i].length; v++) {
            if (boardToRender.hitLocations[i][v] == 1) {
                p1Hit++;
            } else if (boardToRender.hitLocations[i][v] == 2) {
                p1Miss++;
            }
        }
    }
}

player1.setUsername(user1);
player2.setUsername(user2);

setupBoard();
gameStart(1)
renderBoard(currentBoardContext, currentField());

currentBoard.addEventListener('click', readClicks);
currentBoard.addEventListener('mousedown', readClickStart);
currentBoard.addEventListener('mousemove', readHoverCoordinate);
startButton.addEventListener('click', startButtonFunc);
passTurnButton.addEventListener('click', passTurnButtonFunction);
