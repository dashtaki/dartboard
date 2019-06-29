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
import {EffectsModule} from "@ngrx/effects";
import {UserEffects} from './store/effects/user.effect';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

const DECLARATIONS = [
  AppComponent,
  GameComponent,
  AllUsersComponent,
  LoginComponent,
  RegisterComponent,
  UserProfileComponent
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
    EffectsModule.forRoot([UserEffects]),
  ],
  providers: [GuestService, UserService, UtilityService,
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
