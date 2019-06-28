import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public isSubmitted: boolean;
  public returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute) {
  }

  /**
   * ngOnInit life cycle hook
   */
  ngOnInit() {
    this.isSubmitted = false;
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.userService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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

    this.userService.login(this.formControls.username.value, this.formControls.password.value)
      .pipe(first())
      .subscribe(
        userData => {
          if (userData) {
            if (userData.access_token) {
              localStorage.setItem('userInfo', JSON.stringify(userData));
              this.router.navigate([this.returnUrl]);
            }
          }

        });
    // this.authService.login(this.loginForm.value);
    // this.router.navigateByUrl('/admin');
  }

}
