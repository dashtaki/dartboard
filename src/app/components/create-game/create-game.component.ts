import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../store/reducers/index';
import * as userActions from '../../store/actions/user.action';
import {CreateGame} from '../../services/models/create-game.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {
  public isSubmitted: boolean;
  public createGameForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private store: Store<fromRoot.State>,
              private router: Router) {
  }

  /**
   * ngOnInit life cycle hook
   */
  ngOnInit() {
    this.isSubmitted = false;
    this.createGameForm = this.formBuilder.group({
      targetScore: ['', Validators.required]
    });
  }

  /**
   * get login form controls
   */
  get formControls() {
    return this.createGameForm.controls;
  }

  /**
   * create game
   */
  public createGame() {
    let targetScore: CreateGame = {
      target_score: this.formControls.targetScore.value
    };
    this.store.dispatch(new userActions.CreateGameAction(targetScore));
    this.formControls.targetScore.setValue(null);
    this.router.navigate(['/games']);
  }
}
