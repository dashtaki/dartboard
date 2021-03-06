import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GameComponent} from './components/game/game.component';
import {AllUsersComponent} from './components/all-users/all-users.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {AllGamesComponent} from './components/all-games/all-games.component';
import {CreateGameComponent} from './components/create-game/create-game.component';
import {LoginGuard} from './guard/login.guard';
import {PlayersScoreComponent} from './components/palyers-score/players-score.component';


const routes: Routes = [
  {path: '', redirectTo: 'players-score', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'game/:id', component: GameComponent},
  {path: 'games', component: AllGamesComponent},
  {path: 'users', component: AllUsersComponent},
  {path: 'players-score', component: PlayersScoreComponent},
  {path: 'profile', component: UserProfileComponent, canActivate: [LoginGuard]},
  {path: 'create-game', component: CreateGameComponent, canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
