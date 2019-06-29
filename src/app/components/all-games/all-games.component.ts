import {Component, OnInit} from '@angular/core';
import {Game} from '../../services/models/game';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../store/reducers/index';
import * as guestActions from '../../store/actions/guest.action';
import {UtilityService} from '../../services/utility.service';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.scss']
})
export class AllGamesComponent implements OnInit {
  public itemsPerPage: number;
  public currentPage: number;
  public total: number;
  private page: number;
  public games: Game[];

  constructor(private store: Store<fromRoot.State>,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.utilityService.toggleLoadingSpinner("show");
    this.page = 1;
    this.games = [];
    this.store.dispatch(new guestActions.AllGamesAction(this.page));
    this.store.select(fromRoot.getAllGames).subscribe(allGames => {
      if (allGames) {
        this.itemsPerPage = allGames.per_page;
        this.currentPage = allGames.current_page;
        this.total = allGames.total;
        this.games = allGames.data;
        this.utilityService.toggleLoadingSpinner("hide");
      }
    })
  }

}
