import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../store/reducers/index';
import * as userActions from '../../store/actions/user.action';
import {Subscription} from 'rxjs';
import {UtilityService} from '../../services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isSubmitted: boolean;
  public returnUrl: string;
  private subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private utilityService: UtilityService) {
  }

  /**
   * ngOnInit life cycle hook
   */
  ngOnInit() {
    this.isSubmitted = false;
    this.subscription = null;
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * get login form controls
   */
  get formControls() {
    return this.loginForm.controls;
  }

  /**
   * login user
   */
  public login() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(new userActions.LoginAction({
      username: this.formControls.username.value,
      password: this.formControls.password.value
    }));

    this.subscription = this.store.select(fromRoot.getLoginData).subscribe(userData => {
      if (userData) {
        if (userData.access_token) {
          localStorage.setItem('userInfo', JSON.stringify(userData));
          this.store.dispatch(new userActions.GetProfileInfoAction());
          this.router.navigate(['./users']);
        }
      }
    });

    this.store.select(fromRoot.errorUser).subscribe(data => {
      if (data) {
        this.utilityService.showAlert(data);
      }
    })
  }

  /**
   * ngOnDestroy life cycle hook
   */
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
