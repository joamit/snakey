import {Component, OnInit} from '@angular/core';
import {GameService} from "../service/game.service";

@Component({
    selector: 'app-tool-bar',
    templateUrl: './tool-bar.component.html',
    styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

    ngOnInit(): void {
    }

    constructor(private gameService: GameService) {
    }

    toggle() {
        this.gameService.toggle();
    }

    isStarted() {
        return this.gameService.isStarted;
    }

    score() {
        return this.gameService.score;
    }

    fruitType() {
        return this.gameService.fruitType;
    }

}
