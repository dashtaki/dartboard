import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GameComponent} from './components/game/game.component';
import {GuestService} from './services/guest/guest.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AllUsersComponent} from './components/all-users/all-users.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {LoginComponent} from './components/login/login.component';
import {UserService} from './services/user/user.service';
import {UtilityService} from './services/utility.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './components/register/register.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {ApiInterceptor} from './services/interceptors/api-interceptor.service';
import {JwtInterceptor} from './services/interceptors/jwt-interceptor.service';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './store/reducers';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from './store/effects/user.effect';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AllGamesComponent} from './components/all-games/all-games.component';
import {GuestEffect} from './store/effects/guest.effect';
import {CreateGameComponent} from './components/create-game/create-game.component';
import {LoginGuard} from "./guard/login.guard";

const DECLARATIONS = [
  AppComponent,
  GameComponent,
  AllUsersComponent,
  LoginComponent,
  RegisterComponent,
  UserProfileComponent,
  AllGamesComponent,
  CreateGameComponent
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([UserEffects, GuestEffect]),
  ],
  providers: [
    GuestService,
    UserService,
    UtilityService,
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
