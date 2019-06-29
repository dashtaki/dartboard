import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GameComponent} from './components/game/game.component';
import {AllUsersComponent} from './components/all-users/all-users.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {AllGamesComponent} from './components/all-games/all-games.component';
import {CreateGameComponent} from './components/create-game/create-game.component';


const routes: Routes = [
  {path: '', redirectTo: 'games', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'game/:id', component: GameComponent},
  {path: 'games', component: AllGamesComponent},
  {path: 'users', component: AllUsersComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: 'create-game', component: CreateGameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
