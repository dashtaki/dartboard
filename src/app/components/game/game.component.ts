import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from '../../services/models/game';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../store/reducers/index';
import * as guestActions from '../../store/actions/guest.action';
import {ActivatedRoute} from '@angular/router';
import {UtilityService} from '../../services/utility.service';
import {Winner} from '../../services/models/winner.model';
import {User} from '../../services/models/user.model';
import * as userActions from '../../store/actions/user.action';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Me} from '../../services/models/me.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-leader-board',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  public gameInfo: Game;
  public isUserLoggedIn: boolean;
  public gameId: number;
  public alreadyJoined: boolean;
  public availableUsersToInvite: User[];
  public isAddGameScoreFormSubmitted: boolean;
  public isUpdateGameFormSubmitted: boolean;
  public addGameScoreForm: FormGroup;
  public updateGameForm: FormGroup;
  public me: Me;
  private subscriptions: Subscription[];

  constructor(private store: Store<fromRoot.State>,
              private route: ActivatedRoute,
              private utilityService: UtilityService,
              private formBuilder: FormBuilder) {
  }

  /**
   * ngOnInit life cycle hook
   */
  ngOnInit() {
    this.gameInfo = new class implements Game {
      created_at: Date;
      id: number;
      target_score: number;
      updated_at: Date;
      users: User[];
      winner: Winner;
      winner_id: number;
    };
    this.me = new class implements Me {
      created_at: Date;
      email: string;
      email_verified_at: any;
      id: number;
      name: string;
      updated_at: Date;
    };
    this.subscriptions = [];
    this.alreadyJoined = true;
    this.isUserLoggedIn = false;
    this.availableUsersToInvite = [];
    this.isAddGameScoreFormSubmitted = false;
    this.isUpdateGameFormSubmitted = false;
    this.addGameScoreForm = this.formBuilder.group({
      score: ['', Validators.required]
    });

    this.updateGameForm = this.formBuilder.group({
      targetScore: ['', Validators.required]
    });

    let isLoggedInSubscription = this.store.select(fromRoot.isLoggedIn).subscribe(data => {
      if (data) {
        this.isUserLoggedIn = data
      }
    });

    this.subscriptions.push(isLoggedInSubscription);

    this.utilityService.toggleLoadingSpinner('show');
    let paramSubscription = this.route.params.subscribe(params => {
      if (params['id']) {
        this.gameId = parseInt(params['id']);
        this.store.dispatch(new guestActions.GameAction(this.gameId));
        this.store.select(fromRoot.getGame).subscribe(data => {
          if (data) {
            this.gameInfo = data;
            this.checkAlreadyJoined();
            this.getAvailableUsersToInvite();
            this.utilityService.toggleLoadingSpinner('hide');
          }
        });
      }
    });
    this.subscriptions.push(paramSubscription);
  }

  /**
   * join the game
   */
  public joinGame() {
    this.store.dispatch(new userActions.JoinGameAction(this.gameId));
    this.store.select(fromRoot.joined).subscribe(joined => {
      if (joined) {
        this.alreadyJoined = true;
      }
    });
  }

  /**
   * check user already joined to game or not
   */
  private checkAlreadyJoined() {
    if (!localStorage.getItem('userInfo')) {
      this.isUserLoggedIn = false;
      return false;
    }
    let userProfileSubscription = this.store.select(fromRoot.getUserProfileInfo).pipe(first()).subscribe(data => {
      if (!data) {
        this.store.dispatch(new userActions.GetProfileInfoAction());
        this.store.select(fromRoot.getUserProfileInfo).subscribe(me => {
          if (me) {
            this.me = me;
            this.alreadyJoined = this.gameInfo.users.filter(user => user.id === me.id).length > 0;
          }
        });
      }
    });
    this.subscriptions.push(userProfileSubscription);
  }

  /**
   * leave the game
   */
  public leaveGame() {
    this.store.dispatch(new userActions.LeaveGameAction(this.gameId));
  }

  /**
   * invite specific user
   */
  public inviteUser(userId: number) {
    const data = {userId: userId, gameId: this.gameId};
    this.store.dispatch(new userActions.InviteGameAction(data));
    // TODO: make sure api is 200
    this.gameInfo.users.push(this.availableUsersToInvite.find(user => user.id === userId))
    this.availableUsersToInvite = this.availableUsersToInvite.filter(user => user.id !== userId);
  }

  /**
   * get available users to invite
   */
  private getAvailableUsersToInvite() {
    let getUsersSubscription = this.store.select(fromRoot.getAllUsers).pipe(first()).subscribe(data => {
      if (data) {
        this.availableUsersToInvite = this.filterUsers(data.data);
      } else {
        this.store.dispatch(new guestActions.AllUsersAction());
        let usersSubscription = this.store.select(fromRoot.getAllUsers).subscribe(data => {
          if (data) {
            this.availableUsersToInvite = this.filterUsers(data.data);
          }
        });
        this.subscriptions.push(usersSubscription);
      }
    });
    this.subscriptions.push(getUsersSubscription);
    this.subscriptions.push(getUsersSubscription);
  }

  /**
   * filter users
   * @param allUsers
   */
  private filterUsers(allUsers: User[]) {
    let arr: User[] = [];
    allUsers.forEach(user => {
      const result = this.gameInfo.users.find(gameUser => gameUser.id === user.id)
      if (!result) {
        arr.push(user);
      }
    });
    return arr;
  }

  /**
   * kick user
   * @param userId
   */
  public kickUser(userId: number) {
    const data = {userId: userId, gameId: this.gameId};
    this.store.dispatch(new userActions.KickGameAction(data));
    // TODO: make sure api is 200
    this.availableUsersToInvite.push(this.gameInfo.users.find(user => user.id === userId))
    this.gameInfo.users = this.gameInfo.users.filter(user => user.id !== userId);

  }

  /**
   * get add game score form controls
   */
  get addGameScoreFormControls() {
    return this.addGameScoreForm.controls;
  }

  /**
   * get add game score form controls
   */
  get updateGameFormControls() {
    return this.updateGameForm.controls;
  }

  /**
   * add game score
   */
  public addGameScore() {
    this.isAddGameScoreFormSubmitted = true;
    if (this.addGameScoreForm.invalid) {
      return;
    }

    const data = {score: this.addGameScoreFormControls.score.value, gameId: this.gameId};
    this.store.dispatch(new userActions.AddGameScoreAction(data));
    // TODO: make sure api returned 200
    this.gameInfo.target_score = this.gameInfo.target_score + this.addGameScoreFormControls.score.value;
    this.addGameScoreFormControls.score.setValue(null);
    this.isAddGameScoreFormSubmitted = false;
  }

  /**
   * update game
   */
  public updateGame() {
    this.isUpdateGameFormSubmitted = true;
    if (this.updateGameForm.invalid) {
      return;
    }

    const data = {targetScore: this.updateGameFormControls.targetScore.value, gameId: this.gameId};
    this.store.dispatch(new userActions.UpdateGameAction(data));
    // TODO: make sure api returned 200
    this.gameInfo.target_score = this.gameInfo.target_score + this.updateGameFormControls.targetScore.value;
    this.updateGameFormControls.targetScore.setValue(null);
    this.isUpdateGameFormSubmitted = false;
  }

  /**
   * ngOnDestroy life cycle hook
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
