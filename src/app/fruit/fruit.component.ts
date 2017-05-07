import { Component, OnInit } from '@angular/core';
import {GameService} from "../service/game.service";

@Component({
  selector: 'app-fruit',
  templateUrl: './fruit.component.html',
  styleUrls: ['./fruit.component.css']
})
export class FruitComponent implements OnInit {

  type: string;

  constructor(private gameService: GameService) {
    this.type = this.gameService.fruit.type;
  }

  ngOnInit() {
  }

}
