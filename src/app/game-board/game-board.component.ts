import {Component, OnInit} from '@angular/core';
import {GameService} from "../service/game.service";

@Component({
    selector: 'app-game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

    ngOnInit() {
    }

    board: boolean[][];

    constructor(private gameService: GameService) {
        this.board = this.gameService.board;
        console.log('board initialized', this.board);
    }

    setStyling() {
        return this.gameService.getStyling();
    }

    setFruit(col: number, row: number) {
        return this.gameService.getFruit(col, row);
    }

    setSnake(col: number, row: number) {
        return this.gameService.getSnake(col, row);
    }

}
