import {Injectable} from '@angular/core';
import {KEYS, BOARD_SIZE, COLORS} from "../consts/app.consts";
import {Snake, Fruit, Point} from "../model/app.model";

@Injectable()
export class GameService {

    //variable type declaration
    board: boolean[][];
    snake: Snake;
    fruit: Fruit;
    isStarted: boolean;
    fruitType: Array<string>;
    score: number;

    private isGameOver: boolean;
    private interval: number;
    private tempDirection: number;

    constructor() {
        this.fruitType = [
            'apple',
            'avocado',
            'banana',
            'blueberries',
            'cherries',
            'grapes',
            'lemon',
            'lime',
            'orange',
            'peach',
            'pear',
            'pineapple',
            'pomegranate',
            'raspberry',
            'strawberry',
            'tomato'
        ];
        this.score = 0;
        this.setupBoard();

        window.addEventListener('keyup', (e: any) => {
            switch (e.keyCode) {
                case KEYS.ESC:
                    if (this.isStarted) {
                        this.gameOver();
                    }
                    break;
                case KEYS.SPACE_BAR:
                case KEYS.ENTER:
                    this.toggle();
                    break;
                case KEYS.LEFT:
                    if (this.snake.direction != KEYS.RIGHT) {
                        this.tempDirection = KEYS.LEFT;
                    }
                    break;
                case KEYS.RIGHT:
                    if (this.snake.direction != KEYS.LEFT) {
                        this.tempDirection = KEYS.RIGHT;
                    }
                    break;
                case KEYS.UP:
                    if (this.snake.direction != KEYS.DOWN) {
                        this.tempDirection = KEYS.UP;
                    }
                    break;
                case KEYS.DOWN:
                    if (this.snake.direction != KEYS.UP) {
                        this.tempDirection = KEYS.DOWN;
                    }
                    break;
            }
        });
    }

    /**
     * Initializes the board
     */
    setupBoard() {
        this.board = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            this.board[i] = [];
            for (let j = 0; j < BOARD_SIZE; j++) {
                this.board[i][j] = false;
            }
        }

        this.fruit = <Fruit>{
            x: -1,
            y: -1,
            type: this.getFruitType()
        };

        this.snake = <Snake>{
            direction: KEYS.LEFT,
            parts: [{
                x: -1,
                y: -1
            }]
        };
    }

    /**
     * Starts or stops a game
     */
    toggle() {
        if (this.isStarted) {
            this.gameOver();
        } else {
            this.start();
        }
    }

    /**
     * Starts a new game
     */
    start() {
        this.isStarted = true;
        this.isGameOver = false;
        this.score = 0;
        this.interval = 150;

        this.snake.direction = KEYS.LEFT;
        this.snake.parts = [];
        this.tempDirection = KEYS.LEFT;

        //add one piece in snake's body
        this.snake.parts.push({x: 16, y: 15});
        this.resetFruit();
        this.updateBoard();
    }

    /**
     * Ends current game and restarts it after 500 ms
     */
    gameOver() {
        this.isGameOver = true;
        setTimeout(() => {
            this.isGameOver = false;
        }, 500);

        this.isStarted = false;
        this.setupBoard();
    }

    /**
     * Updates the board and moves snake in the current direction with one increment
     * Update interval is as set while board was initialized
     */
    updateBoard() {
        let self: GameService = this;
        if (this.isStarted) {
            setTimeout(() => {
                let newHead: Point = self.getNewHead();
                if (self.boardCollision(newHead) || self.selfCollision(newHead)) {
                    return self.gameOver();
                } else if (self.fruitCollision(newHead)) {
                    self.eatFruit();
                }

                //remove tail
                let oldTail: Point = self.snake.parts.pop();
                self.board[oldTail.y][oldTail.x] = false;

                //add tail to head
                self.snake.parts.unshift(newHead);
                self.board[newHead.y][newHead.x] = true;

                //set the direction
                self.snake.direction = this.tempDirection;

                //repeat this whole process
                self.updateBoard();
            }, this.interval);
        }
    }

    /**
     * Creates a new head in current direction
     */
    getNewHead() {
        let newHead: Point = Object.assign({}, this.snake.parts[0]);

        //update its location based on current direction
        //current direction is set on tempDirection variable
        if (this.tempDirection === KEYS.LEFT) {
            newHead.x -= 1;
        } else if (this.tempDirection == KEYS.RIGHT) {
            newHead.x += 1;
        } else if (this.tempDirection === KEYS.UP) {
            newHead.y -= 1;
        } else if (this.tempDirection === KEYS.DOWN) {
            newHead.y += 1;
        }
        return newHead;
    }

    boardCollision(newHead: Point) {
        return newHead.x === BOARD_SIZE || newHead.x === -1 || newHead.y === BOARD_SIZE || newHead.y === -1;
    }

    selfCollision(newHead: Point) {
        return this.board[newHead.y][newHead.x];
    }

    fruitCollision(newHead: Point) {
        return newHead.x === this.fruit.x && newHead.y === this.fruit.y;
    }

    /**
     * Eat the fruit, increment the score and increase snake size
     */
    eatFruit() {
        this.score++;
        let tail: Point = Object.assign({}, this.snake.parts[this.snake.parts.length - 1]);
        this.snake.parts.push(tail);
        this.resetFruit();

        //reduce the refresh time
        if (this.score % 5 === 0) {
            this.interval -= 20;
        }
    }

    /**
     * Get a random fruit type each time this function is called
     */
    getFruitType() {
        return this.fruitType[Math.floor(Math.random() * (this.fruitType.length - 1))];
    }

    /**
     * Creates a new fruit at a random Point in board
     */
    resetFruit() {
        //random fruit Point
        let x: number = Math.floor(Math.random() * BOARD_SIZE);
        let y: number = Math.floor(Math.random() * BOARD_SIZE);

        //check if this Point has been occupied by snake
        //TODO: what happens when all the cells have been occupied by snake, how to get out of recursion then?
        if (this.board[x][y]) {
            //get another value
            return this.resetFruit();
        }

        this.fruit = <Fruit>{
            x: x,
            y: y,
            type: this.getFruitType()
        };
    }

    getStyling() {
        if (this.isGameOver) {
            return COLORS.GAME_OVER;
        }
        return COLORS.BOARD;
    }

    getFruit(col: number, row: number) {
        return this.fruit.x == row && this.fruit.y == col;
    }

    getSnake(col: number, row: number) {
        return ((this.snake.parts.length > 0 && this.snake.parts[0].x === row && this.snake.parts[0].y === col) || this.board[col][row])
    }

}
