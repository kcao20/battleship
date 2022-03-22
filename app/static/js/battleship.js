class Boat {
  length;
  orientation;

<<<<<<< HEAD
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

  setOrientation(orientation) {
    this.orientation = orientation;
    return this;
  }

  registerHit(pointX, pointY) {
    this.hitLocations.push((pointX, pointY));
    this.hp -= 1;
    if (this.hp == 0) {
      this.isSunk = true;
=======
    setOrientation(orientation) {
        this.orientation = orientation;
        return this;
    }

    setHp(hp) {
        this.hp = hp;
        return this;
    }
    
    registerHit(pointX, pointY) {
        this.hitLocations.push((pointX, pointY));
        this.hp -= 1;
        if (this.hp == 0) {
            this.isSunk = true;
        }
>>>>>>> d6218298e2979fcbabc600865d306641a111a33e
    }
  }
}

class ShadmanGame {}

class ShadmanBoat {
  length;
  orientation;

  x;
  y;

  hitLocations; // if we want it?
  isSunk = false;

  constructor(length) {
    this.length = length;
  }

  setOrientation(orientation) {
    this.orientation = orientation;
    return this;
  }

  setY(x) {
    this.x = x;
    return this;
  }

  setX(x) {
    this.x = x;
    return this;
  }

  setIsSunk(isSunk) {
    this.isSunk = isSunk;
    return this;
  }
}

class ShadmanPlayer {
  board; // 2D array of either null or {hit: boolean, shipID: number}
  // boardElement;

  ships;

  shipsToPlace; // array of lengths of ships player must place
  ships;

  constructor() {} // Use builder pattern?

  setBoardElement(boardElement) {
    this.boardElement = boardElement;
    return this; // will allow chaining
  }

  setShipsToPlace(shipsToPlace) {
    this.shipsToPlace = shipsToPlace;
    return this; // will allow chaining
  }

  getBoardContext() {
    return boardElement.getContext("2d");
  }

  // getBoardContext() {
  //     return boardElement.getContext("2d");
  // }
}

class Board {
<<<<<<< HEAD
  hitLocations = [
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
  ];
  board;
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
=======
    hitLocations = [[, , , , , , , , ,], [, , , , , , , , ,], [, , , , , , , , ,], [, , , , , , , , ,], [, , , , , , , , ,], [, , , , , , , , ,], [, , , , , , , , ,], [, , , , , , , , ,], [, , , , , , , , ,], [, , , , , , , , ,]];
    board;
    setupDone = false;
    hp;
    
    constructor(field) {
        this.field = field;
    }
    
    registerHit(pointX, pointY) {
        if (this.field[pointY][pointX] instanceof Boat) {
            this.field[pointY][pointX].registerHit(pointX, pointY);
            this.hp -= 1;
            this.hitLocations[pointY][pointX] = 1;
            return true;
        } else {
            this.hitLocations[pointY][pointX] = 2;
            return false;
        }
>>>>>>> d6218298e2979fcbabc600865d306641a111a33e
    }
  }
}

class Player {
  username;
  hits = 0;
  misses = 0;
  isWon;

  constructor(username) {
    this.username = username;
  }

  gameStatus(win) {
    if (win) {
      isWon = true;
    } else {
      isWon = false;
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
let passTurnButton = document.getElementById("passTurn");
let currentPlayer = 1;

<<<<<<< HEAD
let fieldPlayer1 = new Board(
  [
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
  ],
  2
);
let fieldPlayer2 = new Board(
  [
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
  ],
  2
);
=======
let fieldPlayer1 = new Board([[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,]]);
let fieldPlayer2 = new Board([[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,]]);
>>>>>>> d6218298e2979fcbabc600865d306641a111a33e
let currentField = fieldPlayer1;
let otherField = fieldPlayer2;
let boardClicked = false;

<<<<<<< HEAD
let user1 = prompt("Player 1, please enter your username");
let user2 = prompt("Player 2, please enter your username");

function setupBoard() {
  let lengthsToDo = [5, 4, 3, 3, 2];
  for (let i = 0; i < lengthsToDo.length; i++) {
    let isVertical = Math.random() > 0.5;
    let placeX = 0;
    let placeY = 0;
    if (isVertical) {
      let goodCoordinates = 0;
      while (goodCoordinates < lengthsToDo[i]) {
        goodCoordinates = 0;
        placeX = Math.floor(Math.random() * 10);
        placeY = Math.floor(Math.random() * (10 - lengthsToDo[i]));
        for (let v = 0; v < lengthsToDo[i]; v++) {
          if (!(fieldPlayer1.field[placeX][placeY + v] instanceof Boat)) {
            goodCoordinates++;
          }
        }
      }
      let locations = [];
      for (let v = 0; v < lengthsToDo[i]; v++) {
        locations.push([placeX, placeY + v]);
      }
      // console.log(locations);
      let boat = new Boat(locations, length).setOrientation(isVertical);
      for (let v = 0; v < locations.length; v++) {
        // console.log(locations[v]);
        fieldPlayer1.field[locations[v][0]][locations[v][1]] = boat;
      }
      goodCoordinates = 0;
      while (goodCoordinates < lengthsToDo[i]) {
        goodCoordinates = 0;
        placeX = Math.floor(Math.random() * 10);
        placeY = Math.floor(Math.random() * (10 - lengthsToDo[i]));
        for (let v = 0; v < lengthsToDo[i]; v++) {
          if (!(fieldPlayer2.field[placeX][placeY + v] instanceof Boat)) {
            goodCoordinates++;
          }
        }
      }
      locations = [];
      for (let v = 0; v < lengthsToDo[i]; v++) {
        locations.push([placeX, placeY + v]);
      }
      // console.log(locations);
      boat = new Boat(locations, length).setOrientation(isVertical);
      for (let v = 0; v < locations.length; v++) {
        // console.log(locations[v]);
        fieldPlayer2.field[locations[v][0]][locations[v][1]] = boat;
      }
    } else {
      let goodCoordinates = 0;
      while (goodCoordinates < lengthsToDo[i]) {
        goodCoordinates = 0;
        placeY = Math.floor(Math.random() * 10);
        placeX = Math.floor(Math.random() * (10 - lengthsToDo[i]));
        for (let v = 0; v < lengthsToDo[i]; v++) {
          if (!(fieldPlayer1.field[placeX + v][placeY] instanceof Boat)) {
            goodCoordinates++;
          }
        }
      }
      let locations = [];
      for (let v = 0; v < lengthsToDo[i]; v++) {
        locations.push([placeX + v, placeY]);
      }
      let boat = new Boat(locations, length).setOrientation(isVertical);
      // console.log(locations);
      for (let v = 0; v < locations.length; v++) {
        // console.log(locations[v]);
        fieldPlayer1.field[locations[v][0]][locations[v][1]] = boat;
      }
      goodCoordinates = 0;
      while (goodCoordinates < lengthsToDo[i]) {
        goodCoordinates = 0;
        placeY = Math.floor(Math.random() * 10);
        placeX = Math.floor(Math.random() * (10 - lengthsToDo[i]));
        for (let v = 0; v < lengthsToDo[i]; v++) {
          if (!(fieldPlayer2.field[placeX + v][placeY] instanceof Boat)) {
            goodCoordinates++;
          }
        }
      }
      locations = [];
      for (let v = 0; v < lengthsToDo[i]; v++) {
        locations.push([placeX + v, placeY]);
      }
      boat = new Boat(locations, length).setOrientation(isVertical);
      // console.log(locations);
      for (let v = 0; v < locations.length; v++) {
        // console.log(locations[v]);
        fieldPlayer2.field[locations[v][0]][locations[v][1]] = boat;
      }
=======
let user1 = prompt("Player 1, please enter your name: ") || "Player 1"
let user2 = prompt("Player 2, please enter your name: ") || "Player 2"

function setupBoard() {
    let lengthsToDo = [5, 4, 3, 3, 2];
    for (let i = 0; i < lengthsToDo.length; i++){
        let isVertical = Math.random() > 0.5;
        let placeX = 0;
        let placeY = 0;
        if (isVertical) {
            let goodCoordinates = 0;
            while (goodCoordinates < lengthsToDo[i]){
                goodCoordinates = 0;
                placeX = Math.floor(Math.random() * 10);
                placeY = Math.floor(Math.random() * (10 - lengthsToDo[i]));
                for (let v = 0; v < lengthsToDo[i]; v++){
                    if (!(fieldPlayer1.field[placeX][placeY + v] instanceof Boat)) {
                        goodCoordinates++;
                    }
                }
            }
            let locations = [];
            for (let v = 0; v < lengthsToDo[i]; v++){
                locations.push([placeX, placeY + v]);
            }
            fieldPlayer1.hp += locations.length;
            // console.log(locations);
            let boat = new Boat(locations, length).setOrientation(isVertical).setHp(locations.length)
            for (let v = 0; v < locations.length; v++){
                // console.log(locations[v]);
                fieldPlayer1.field[locations[v][0]][locations[v][1]] = boat;
            }
            goodCoordinates = 0;
            while (goodCoordinates < lengthsToDo[i]){
                goodCoordinates = 0;
                placeX = Math.floor(Math.random() * 10);
                placeY = Math.floor(Math.random() * (10 - lengthsToDo[i]));
                for (let v = 0; v < lengthsToDo[i]; v++){
                    if (!(fieldPlayer2.field[placeX][placeY + v] instanceof Boat)) {
                        goodCoordinates++;
                    }
                }
            }
            locations = [];
            for (let v = 0; v < lengthsToDo[i]; v++){
                locations.push([placeX, placeY + v]);
            }
            fieldPlayer2.hp += locations.length;
            // console.log(locations);
            boat = new Boat(locations, length).setOrientation(isVertical).setHp(locations.length);
            for (let v = 0; v < locations.length; v++){
                // console.log(locations[v]);
                fieldPlayer2.field[locations[v][0]][locations[v][1]] = boat;
            }
        } else {
            let goodCoordinates = 0;
            while (goodCoordinates < lengthsToDo[i]){
                goodCoordinates = 0;
                placeY = Math.floor(Math.random() * 10);
                placeX = Math.floor(Math.random() * (10 - lengthsToDo[i]));
                for (let v = 0; v < lengthsToDo[i]; v++){
                    if (!(fieldPlayer1.field[placeX + v][placeY] instanceof Boat)) {
                        goodCoordinates++;
                    }
                }
            }
            let locations = [];
            for (let v = 0; v < lengthsToDo[i]; v++){
                locations.push([placeX + v, placeY]);
            }
            let boat = new Boat(locations, length).setOrientation(isVertical).setHp(locations.length);
            fieldPlayer1.hp += locations.length;
            // console.log(locations);
            for (let v = 0; v < locations.length; v++){
                // console.log(locations[v]);
                fieldPlayer1.field[locations[v][0]][locations[v][1]] = boat;
            }
            goodCoordinates = 0;
            while (goodCoordinates < lengthsToDo[i]){
                goodCoordinates = 0;
                placeY = Math.floor(Math.random() * 10);
                placeX = Math.floor(Math.random() * (10 - lengthsToDo[i]));
                for (let v = 0; v < lengthsToDo[i]; v++){
                    if (!(fieldPlayer2.field[placeX + v][placeY] instanceof Boat)) {
                        goodCoordinates++;
                    }
                }
            }
            locations = [];
            for (let v = 0; v < lengthsToDo[i]; v++){
                locations.push([placeX + v, placeY]);
            }
            boat = new Boat(locations, length).setOrientation(isVertical).setHp(locations.length);
            fieldPlayer2.hp += locations.length;
            // console.log(locations);
            for (let v = 0; v < locations.length; v++){
                // console.log(locations[v]);
                fieldPlayer2.field[locations[v][0]][locations[v][1]] = boat;
            }
        }        
>>>>>>> d6218298e2979fcbabc600865d306641a111a33e
    }
  }
}

function renderGrid(ctx) {
  for (
    let i = currentBoard.offsetWidth / 10;
    i < currentBoard.offsetWidth;
    i += currentBoard.offsetWidth / 10
  ) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, currentBoard.offsetHeight);
    ctx.stroke();
  }

  for (
    let i = currentBoard.offsetHeight / 10;
    i < currentBoard.offsetHeight;
    i += currentBoard.offsetHeight / 10
  ) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(currentBoard.offsetWidth, i);
    ctx.stroke();
  }
}

function renderBoats(ctx, boardToRender) {
  ctx.fillStyle = "blue";

  for (let i = 0; i < boardToRender.field.length; i++) {
    for (let v = 0; v < boardToRender.field[i].length; v++) {
      if (boardToRender.field[i][v] instanceof Boat) {
        ctx.fillRect(
          (v * currentBoard.offsetWidth) / 10,
          (i * currentBoard.offsetHeight) / 10,
          currentBoard.offsetWidth / 10,
          currentBoard.offsetHeight / 10
        );
      }
    }
  }
}

function renderHits(ctx, boardToRender) {
  for (let i = 0; i < boardToRender.hitLocations.length; i++) {
    for (let v = 0; v < boardToRender.hitLocations[i].length; v++) {
      if (boardToRender.hitLocations[i][v] == 1) {
        ctx.fillStyle = "red";
        ctx.fillRect(
          (v * currentBoard.offsetWidth) / 10,
          (i * currentBoard.offsetHeight) / 10,
          currentBoard.offsetWidth / 10,
          currentBoard.offsetHeight / 10
        );
      } else if (boardToRender.hitLocations[i][v] == 2) {
        ctx.fillStyle = "#c2c3c7";
        ctx.fillRect(
          (v * currentBoard.offsetWidth) / 10,
          (i * currentBoard.offsetHeight) / 10,
          currentBoard.offsetWidth / 10,
          currentBoard.offsetHeight / 10
        );
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
<<<<<<< HEAD
  if (
    drag &&
    !(currentField.field[getGridY(e)][getGridX(e)] instanceof Boat) &&
    !(getGridX(e) == toMoveBoatX && getGridY(e) == toMoveBoatY)
  ) {
    drag = false;
    currentField.field[getGridY(e)][getGridX(e)] =
      currentField.field[toMoveBoatY][toMoveBoatX];
    currentField.field[toMoveBoatY][toMoveBoatX] = null;
    document.body.style.cursor = "default";
    renderBoard(currentBoardContext, currentField);
  } else if (
    !currentField.hitLocations[getGridY(e)][getGridX(e)] &&
    currentField.setupDone &&
    !boardClicked
  ) {
    boardClicked = true;
    currentField.registerHit(getGridX(e), getGridY(e));
    renderEnemyBoard(currentBoardContext, currentField);
    setTimeout(function () {
      if (currentField.field[getGridY(e)][getGridX(e)] instanceof Boat) {
        currentField.field[getGridY(e)][getGridX(e)].registerHit(
          getGridX(e),
          getGridY(e)
        );
      }
      passTurn();
    }, 1000);
  }
=======
    if (drag && !(currentField.field[getGridY(e)][getGridX(e)] instanceof Boat) && !(getGridX(e) == toMoveBoatX && getGridY(e) == toMoveBoatY)) {
        drag = false;
        currentField.field[getGridY(e)][getGridX(e)] = currentField.field[toMoveBoatY][toMoveBoatX];
        currentField.field[toMoveBoatY][toMoveBoatX] = null;
        document.body.style.cursor = 'default';
        renderBoard(currentBoardContext, currentField);
    } else if (!currentField.hitLocations[getGridY(e)][getGridX(e)] && currentField.setupDone && !boardClicked) {
        boardClicked = true;
        if (currentField.registerHit(getGridX(e), getGridY(e))) {
            renderEnemyBoard(currentBoardContext, currentField);
            boardClicked = false;
            return;
        }
        renderEnemyBoard(currentBoardContext, currentField);
        setTimeout(function () {
            if (currentField.field[getGridY(e)][getGridX(e)] instanceof Boat) {
                currentField.field[getGridY(e)][getGridX(e)].registerHit(getGridX(e), getGridY(e));
            }
            passTurn();
        }, 1000)
    }
>>>>>>> d6218298e2979fcbabc600865d306641a111a33e
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
    document.body.style.cursor = "move";
    toMoveBoatX = getGridX(e);
    toMoveBoatY = getGridY(e);
    // console.log(getGridX(e), getGridY(e));
  }
}

function readHoverCoordinate(e) {
  // console.log(getGridX(e), getGridY(e));
  if (
    !currentField.setupDone &&
    0 <= getGridY(e) &&
    getGridY(e) < 10 &&
    0 <= getGridX(e) &&
    getGridX(e) < 10 &&
    currentField.field[getGridY(e)][getGridX(e)] instanceof Boat
  ) {
    document.body.style.cursor = "move";
  } else if (!drag) {
    document.body.style.cursor = "default";
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
  if (currentPlayer == 2) {
    currentPlayer = 1;
    currentField = fieldPlayer1;
    otherField = fieldPlayer2;
    clearBoard(currentBoardContext);
    clearBoard(otherBoardContext);
    renderGrid(currentBoardContext);
    renderGrid(otherBoardContext);
    passTurnButton.style.display = "inline";
  } else {
    currentPlayer = 2;
    currentField = fieldPlayer2;
    otherField = fieldPlayer1;
    clearBoard(currentBoardContext);
    clearBoard(otherBoardContext);
    renderGrid(currentBoardContext);
    renderGrid(otherBoardContext);
    passTurnButton.style.display = "inline";
  }
  if (otherField.hp == 0) {
    passTurnButton.style.display = "none";
    if (currentPlayer == 1) {
      alert("Player 2 wins! Would you like to play again?");
      fieldPlayer1 = new Board(
        [
          [new Boat([(0, 0)], 1), , , , , , , , , new Boat([(9, 0)], 1)],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
        ],
        2
      );
      fieldPlayer2 = new Board(
        [
          [new Boat([(0, 0)], 1), , , , , , , , , new Boat([(9, 0)], 1)],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
        ],
        2
      );
      currentField = fieldPlayer1;
      otherField = fieldPlayer2;
    } else {
      alert("Player 1 wins! Would you like to play again?");
      fieldPlayer1 = new Board(
        [
          [new Boat([(0, 0)], 1), , , , , , , , , new Boat([(9, 0)], 1)],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
        ],
        2
      );
      fieldPlayer2 = new Board(
        [
          [new Boat([(0, 0)], 1), , , , , , , , , new Boat([(9, 0)], 1)],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
          [, , , , , , , , ,],
        ],
        2
      );
      currentField = fieldPlayer1;
      otherField = fieldPlayer2;
    }
<<<<<<< HEAD
    otherBoard.style.display = "none";
    start.style.display = "inline";
    renderBoard(currentBoardContext, currentField);
    renderBoard(otherBoardContext, otherField);
    for (let i = 0; i < label.length; i++) {
      label[i].style.display = "none";
=======
    if (otherField.hp == 0) {
        passTurnButton.style.display = "none";
        if (currentPlayer == 1) {
            alert("Player 2 wins! Would you like to play again?");
            fieldPlayer1 = new Board([[new Boat([(0,0)], 1),,,,,,,,,new Boat([(9,0)], 1)],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,]], 2);
            fieldPlayer2 = new Board([[new Boat([(0,0)], 1),,,,,,,,,new Boat([(9,0)], 1)],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,]], 2);
            currentField = fieldPlayer1;
            otherField = fieldPlayer2;
            countHits();
        } else {
            alert("Player 1 wins! Would you like to play again?");
            fieldPlayer1 = new Board([[new Boat([(0,0)], 1),,,,,,,,,new Boat([(9,0)], 1)],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,]], 2);
            fieldPlayer2 = new Board([[new Boat([(0,0)], 1),,,,,,,,,new Boat([(9,0)], 1)],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,],[,,,,,,,,,]], 2);
            currentField = fieldPlayer1;
            otherField = fieldPlayer2;
            countHits();
        }
        otherBoard.style.display = 'none';
        start.style.display = 'inline';
        renderBoard(currentBoardContext, currentField);
        renderBoard(otherBoardContext, otherField);
        for (let i = 0; i < label.length; i++) {
            label[i].style.display = "none";
        }
        currentPlayer = 1;
>>>>>>> d6218298e2979fcbabc600865d306641a111a33e
    }
    currentPlayer = 1;
  }
  tellPlayerTurn(currentPlayer);
}

function startButtonFunc() {
  if (currentPlayer == 2 && !fieldPlayer2.setupDone) {
    fieldPlayer2.setupDone = true;
    startButton.style.display = "none";
    otherBoard.style.display = "inline";
    for (let i = 0; i < label.length; i++) {
      label[i].style.display = "inline";
    }
    otherField = fieldPlayer2;
    currentField = fieldPlayer1;
    renderBoard(currentBoardContext, currentField);
    renderEnemyBoard(otherBoardContext, otherField);
  }
  if (!fieldPlayer2.setupDone) {
    player1EndSetup();
  } else {
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
  renderEnemyBoard(currentBoardContext, currentField);
  renderBoard(otherBoardContext, otherField);
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

function countHits(){
    for (let i = 0; i < fieldPlayer1.hitLocations.length; i++){
        for (let v = 0; v < boardToRender.hitLocations[i].length; v++){
            if (boardToRender.hitLocations[i][v] == 1) {
                p2Hit++;
            } else if (boardToRender.hitLocations[i][v] == 2) {
				p2Miss++;
            }
        }
    }
    for (let i = 0; i < fieldPlayer2.hitLocations.length; i++){
        for (let v = 0; v < boardToRender.hitLocations[i].length; v++){
            if (boardToRender.hitLocations[i][v] == 1) {
                p1Hit++;
            } else if (boardToRender.hitLocations[i][v] == 2) {
				p1Miss++;
            }
        }
    }
}

setupBoard();
renderBoard(currentBoardContext, currentField);
gameStart("1");

currentBoard.addEventListener("click", readClicks);
currentBoard.addEventListener("mousedown", readClickStart);
currentBoard.addEventListener("mousemove", readHoverCoordinate);
startButton.addEventListener("click", startButtonFunc);
passTurnButton.addEventListener("click", passTurnButtonFunction);
