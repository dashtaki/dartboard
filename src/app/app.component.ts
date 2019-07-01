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
  public username: string;

  constructor(private utilityService: UtilityService,
              private store: Store<fromRoot.State>,
              private userService: UserService) {
  }

  /**
   * ngOnInit life cycle hook
   */
  ngOnInit(): void {
    const isLoggedIn = this.utilityService.isUserLoggedIn();
    this.username = '';
    this.store.dispatch(new userActions.AuthenticateAction(isLoggedIn));
    this.store.select(fromRoot.isLoggedIn).subscribe(data => {
      this.isUserLoggedIn = data;
    });

    this.store.select(fromRoot.getUserName).subscribe(name => {
      let dartUsername = 'dart-username';
      let uName = localStorage.getItem(dartUsername);
      if (name || uName) {
        localStorage.setItem(dartUsername, name || uName);
        this.username = name || uName;
      }

      if (!name && !localStorage.getItem('userInfo')) {
        localStorage.removeItem(dartUsername);
        this.username = null;
      }
    });

  }

  /**
   * logout logged in user
   */
  logoutUser() {
    this.userService.logout();
  }
}
