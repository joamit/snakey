import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MdButtonModule, MdToolbarModule, MdIconModule, MdIconRegistry} from "@angular/material";
import {ToolBarComponent} from './tool-bar/tool-bar.component';
import {FooterComponent} from './footer/footer.component';
import {GameBoardComponent} from './game-board/game-board.component';
import {GameService} from "./service/game.service";
import {FruitComponent} from './fruit/fruit.component';
import {SnakeComponent} from './snake/snake.component';

@NgModule({
    declarations: [
        AppComponent,
        ToolBarComponent,
        FooterComponent,
        GameBoardComponent,
        FruitComponent,
        SnakeComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MdButtonModule,
        MdToolbarModule,
        MdIconModule,
        FormsModule,
        HttpModule
    ],
    providers: [
        MdIconRegistry,
        GameService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(mdIconRegistry: MdIconRegistry,
                private gameService: GameService,
                private sanitizer: DomSanitizer) {
        this.gameService.fruitType.forEach((value: string) => {
            mdIconRegistry.addSvgIcon(value,
                sanitizer.bypassSecurityTrustResourceUrl('assets/icons/' + value + '.svg'));
        });
        mdIconRegistry.addSvgIcon('play',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/play.svg'));
        mdIconRegistry.addSvgIcon('stop',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/stop.svg'));
        mdIconRegistry.addSvgIcon('circle',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/circle.svg'));
    }
}
