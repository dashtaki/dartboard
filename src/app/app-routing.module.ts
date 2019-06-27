import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LeaderBoardComponent} from "./components/leader-board/leader-board.component";

const routes: Routes = [
  {path: '', redirectTo: 'leaderBoard', pathMatch: 'full'},
  {path: 'leaderBoard', component: LeaderBoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
