import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {Router} from '@angular/router';
import {Me} from '../../services/models/me.model';
import {UtilityService} from '../../services/utility.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../store/reducers/index';
import * as userActions from '../../store/actions/user.action';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public profileForm: FormGroup;
  public isSubmitted: boolean;
  public enableEdit: boolean;
  public toggleEditBtnText: string;
  public userProfileData: Me;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private utilityService: UtilityService,
              private store: Store<fromRoot.State>) {
  }

  /**
   * ngOnInit life cycle hook
   */
  ngOnInit() {
    this.utilityService.toggleLoadingSpinner('show');
    this.isSubmitted = false;
    this.enableEdit = false;
    this.toggleEditBtnText = 'Edit';
    this.userProfileData = new class implements Me {
      created_at: Date;
      email: string;
      email_verified_at: any;
      id: number;
      name: string;
      updated_at: Date;
    };
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.fillFormControls();
  }

  /**
   * fetch profile information from API
   */
  private fillFormControls() {
    this.store.dispatch(new userActions.GetProfileInfoAction());
    this.store.select(fromRoot.getUserProfileInfo).subscribe(data => {
      if (data) {
        this.userProfileData = data;
        this.formControls.name.setValue(data.name);
        this.formControls.email.setValue(data.email);
        this.utilityService.toggleLoadingSpinner('hide');
      }
    });
  }

  /**
   * get login form controls
   */
  get formControls() {
    return this.profileForm.controls;
  }


  /**
   * set profile changes
   */
  public editProfile() {
    this.isSubmitted = true;
    if (this.profileForm.invalid) {
      return;
    }

    const meRequestBody = {
      name: this.formControls.name.value,
      email: this.formControls.email.value,
      password: this.formControls.password.value
    };

    this.utilityService.toggleLoadingSpinner('show');
    this.store.dispatch(new userActions.SetProfileInfoAction(meRequestBody));
    this.store.select(fromRoot.getUserProfileInfo).subscribe(userInfo => {
      if (userInfo) {
        this.userProfileData = userInfo;
        this.userProfileData.email_verified_at = userInfo.email_verified_at ? userInfo.email_verified_at : 'Not Verified';
        this.formControls.name.setValue(userInfo.name);
        this.formControls.email.setValue(userInfo.email);
        this.utilityService.toggleLoadingSpinner('hide');
        this.toggleEditing();
      }
    }, () => this.router.navigate(['./login']));

  }

  /**
   * enable editing mode
   */
  public toggleEditing() {
    this.enableEdit = !this.enableEdit;
    this.toggleEditBtnText = this.enableEdit ? 'Cancel' : 'Edit';
  }
}
