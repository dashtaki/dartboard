import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LeaderBoardComponent} from './components/leader-board/leader-board.component';

const DECLARATIONS = [
  AppComponent,
  LeaderBoardComponent
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
