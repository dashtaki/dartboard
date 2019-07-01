import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../store/reducers/index';
import *as guestActions from '../../store/actions/guest.action';
import {User} from '../../services/models/user.model';
import {Subscription} from 'rxjs';
import {UtilityService} from "../../services/utility.service";

@Component({
  selector: 'app-palyers-score',
  templateUrl: './players-score.component.html',
  styleUrls: ['./players-score.component.scss']
})
export class PlayersScoreComponent implements OnInit, OnDestroy {
  public users: User[];
  private subscription: Subscription;
  public page: number;
  public currentPage: number;
  public total: number;
  public itemsPerPage: number;

  constructor(private store: Store<fromRoot.State>,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.users = [];
    this.utilityService.toggleLoadingSpinner('show');
    this.page = 1;
    this.store.dispatch(new guestActions.AllUsersAction(this.page));
    this.subscription = this.store.select(fromRoot.getAllUsers).subscribe(users => {
      if (users) {
        this.currentPage = users.current_page;
        this.total = users.total;
        this.itemsPerPage = users.per_page;
        this.users = users.data;
        this.utilityService.toggleLoadingSpinner('hide');
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
