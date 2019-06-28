import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {GuestService} from '../../services/guest/guest.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public isSubmitted: boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private guestService: GuestService) {
  }

  /**
   * ngOnInit life cycle hook
   */
  ngOnInit() {
    this.isSubmitted = false;
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * get login form controls
   */
  get formControls() {
    return this.registerForm.controls;
  }


  /**
   * register user
   */
  public register() {
    this.isSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.guestService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        });
  }
}
