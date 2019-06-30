import {Component, OnDestroy, OnInit} from '@angular/core';
import {GuestService} from '../../services/guest/guest.service';
import {User} from '../../services/models/user.model';
import {UtilityService} from '../../services/utility.service';
import * as guestActions from '../../store/actions/guest.action';
import * as fromRoot from '../../store/reducers';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit, OnDestroy {
  public users: User[];
  public page: number;
  public currentPage: number;
  public total: number;
  public itemsPerPage: number;
  private subscription: Subscription;

  constructor(
    private guestService: GuestService,
    private utilityService: UtilityService,
    private store: Store<fromRoot.State>) {
  }

  /**
   * ngOnInit life cycle hook
   */
  ngOnInit() {
    this.users = [];
    this.utilityService.toggleLoadingSpinner('show');
    this.page = 1;

    this.store.dispatch(new guestActions.AllUsersAction(this.page));
    this.subscription = this.store.select(fromRoot.getAllUsers).subscribe(data => {
      if (data) {
        this.currentPage = data.current_page;
        this.total = data.total;
        this.itemsPerPage = data.per_page;
        this.users = data.data;
        this.utilityService.toggleLoadingSpinner('hide');
      }
    });
  }

  /**
   * ngOnDestroy life cycle hook
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
