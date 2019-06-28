import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GameComponent} from './components/game/game.component';
import {AllUsersComponent} from './components/all-users/all-users.component';
import {RegisterComponent} from './components/register/register.component';


const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  // {path: '', redirectTo: 'users', pathMatch: 'full'},
  {path: 'game/:id', component: GameComponent},
  {path: 'users', component: AllUsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
