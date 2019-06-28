import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GameComponent} from './components/game/game.component';
import {GuestService} from './services/guest/guest.service';
import {HttpClientModule} from '@angular/common/http';
import {AllUsersComponent} from './components/all-users/all-users.component';
import {NgxPaginationModule} from 'ngx-pagination';

const DECLARATIONS = [
  AppComponent,
  GameComponent,
  AllUsersComponent
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [GuestService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
