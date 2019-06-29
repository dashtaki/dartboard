import {Component, OnInit} from '@angular/core';
import {UtilityService} from './services/utility.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../app/store/reducers/index';
import {UserService} from './services/user/user.service';
import * as userActions from '../app/store/actions/user.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isUserLoggedIn: boolean;

  constructor(private utilityService: UtilityService,
              private store: Store<fromRoot.State>,
              private userService: UserService) {
  }

  /**
   * ngOnInit life cycle hook
   */
  ngOnInit(): void {
    const isLoggedIn = this.utilityService.isUserLoggedIn();
    this.store.dispatch(new userActions.AuthenticateAction(isLoggedIn));
    this.store.select(fromRoot.isLoggedIn).subscribe(data => {
      this.isUserLoggedIn = data
    });

  }

  /**
   * logout logged in user
   */
  logoutUser() {
    this.userService.logout();
  }
}
