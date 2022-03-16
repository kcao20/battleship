

class Game {

    SHIPS_AVAILABLE = [5, 4, 4, 3, 3, 2, 2];

    player1ShipsLeft = [...SHIPS_AVAILABLE];

    gameScene = "place_ships"

    constructor() {
        this.loop();
    }

    renderBoard() {
        const board = document.getElementById("board");

        let children = [];

        for (let i = 0; i < 100; i++) {
            const child = document.createElement('div');
            child.style.border = "1px solid #dee2e6";

            children.push(child);
        }

        board.replaceChildren(...children);
    }

    loop() {
        setInterval(() => {
            switch (gameScene) {
                case "place_ships":
                    if (this.player1ShipsLeft.length > 1) {
                        shipToPlace = {};
                    }

                    break;
                default:
                    break;
            }

            this.renderBoard();
        }, 200)
    }
}

const game = new Game();
