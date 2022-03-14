import { shuffleArray } from "utils";

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

    generateRandomDefaultBoard() {
        let board = this.generateEmptyBoard();
        let ships = [...this.defaultShips];


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