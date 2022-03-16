const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

class Game {

    // width and height of ship
    defaultShips = [
        [2, 1],
        [2, 1],
        [2, 1],
        [2, 1],
        [3, 1],
        [3, 1],
        [3, 1],
        [4, 1],
        [4, 1],
        [5, 1],
    ];

    player1ShipBoard;
    player2ShipBoard;
    player1AttackBoard;
    player2AttackBoard;

    boardSize = [10, 10];

    constructor () {
        this.player1ShipBoard = this.generateEmptyBoard();
        this.player2ShipBoard = this.generateEmptyBoard();
        this.player1AttackBoard = this.generateEmptyBoard();
        this.player2AttackBoard = this.generateEmptyBoard();

        console.log(shuffleArray([0, 1, 2, 3, 4]))

        this.generateRandomDefaultBoard()
    }

    generateEmptyBoard() {
        let board = [];

        for (let i = 0; i < this.boardSize[0]; i++) {
            let col = [];
            
            for (let j = 0; j < this.boardSize[1]; j++) {
                col[j] = 0;
            }

            board[i] = col;
        }

        return board
    }

    randomlySwapShipOrientations (ships) {
        for (let i = 0; i < ships.length; i++) {

            if (Math.random() > 0.5) {
                const temp = ships[i][0]
                ships[i][0] = ships[i][1]
                ships[i][1] = temp;
            }
        }
        return ships;
    }

    generateRandomDefaultBoard() {
        let board = this.generateEmptyBoard();
        let ships = [...this.defaultShips];

        this.randomlySwapShipOrientations(ships);

    }
}

/* 

[
    [1, 2, 0, 4, 4, 4, 3, 3, 0]
    [1, 2, 0, 0, 0, 0, 0, 0, 0]
]

[
    [1, 2, 0, 4, 4, 4, 3, 3, 0]
    [1, 2, 0, 0, 0, 0, 0, 0, 0]
]


*/

const game = new Game();