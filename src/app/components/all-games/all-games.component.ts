import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from '../../services/models/game';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../store/reducers/index';
import * as guestActions from '../../store/actions/guest.action';
import {UtilityService} from '../../services/utility.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.scss']
})
export class AllGamesComponent implements OnInit, OnDestroy {
  public itemsPerPage: number;
  public currentPage: number;
  public total: number;
  private page: number;
  public games: Game[];
  private subscription: Subscription;

  constructor(private store: Store<fromRoot.State>,
              private utilityService: UtilityService) {
  }

  /**
   * ngOnInit life cycle hook
   */
  ngOnInit() {
    this.utilityService.toggleLoadingSpinner('show');
    this.page = 1;
    this.games = [];
    this.subscription = null;
    this.store.dispatch(new guestActions.AllGamesAction(this.page));
    this.subscription = this.store.select(fromRoot.getAllGames).subscribe(allGames => {
      if (allGames) {
        this.itemsPerPage = allGames.per_page;
        this.currentPage = allGames.current_page;
        this.total = allGames.total;
        this.games = allGames.data;
        this.utilityService.toggleLoadingSpinner('hide');
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
