import {Component, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-leader-board',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public gameInfo: Game;
  public isUserLoggedIn: boolean;
  public gameId: number;
  public alreadyJoined: boolean;
  public availableUsersToInvite: User[];

  constructor(private store: Store<fromRoot.State>,
              private route: ActivatedRoute,
              private utilityService: UtilityService) {
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
    this.alreadyJoined = true;
    this.isUserLoggedIn = false;
    this.availableUsersToInvite = [];
    this.store.select(fromRoot.isLoggedIn).subscribe(data => {
      if (data) this.isUserLoggedIn = data
    });


    this.utilityService.toggleLoadingSpinner("show");
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.gameId = parseInt(params['id']);
        this.store.dispatch(new guestActions.GameAction(this.gameId));
        this.store.select(fromRoot.getGame).subscribe(data => {
          if (data) {
            this.gameInfo = data;
            this.checkAlreadyJoined();
            this.getAvailableUsersToInvite();
            this.utilityService.toggleLoadingSpinner("hide");
          }
        });
      }
    });

  }

  /**
   * join the game
   */
  public joinGame() {
    this.store.dispatch(new userActions.JoinGameAction(this.gameId));
  }

  /**
   * check user already joined to game or not
   */
  private checkAlreadyJoined() {
    this.store.select(fromRoot.getUserProfileInfo).pipe(first()).subscribe(data => {
      if (!data) {
        this.store.dispatch(new userActions.GetProfileInfoAction());
        this.store.select(fromRoot.getUserProfileInfo).subscribe(me => {
          if (me) {
            this.alreadyJoined = this.gameInfo.users.filter(user => user.id === me.id).length > 0;
          }
        })
      }
    });
  }

  /**
   * leave the game
   */
  public leaveGame() {
    this.store.dispatch(new userActions.LeaveGameAction(this.gameId))
  }

  /**
   * invite specific user
   */
  public inviteUser(userId: number) {
    const data = {userId: userId, gameId: this.gameId};
    this.store.dispatch(new userActions.InviteGameAction(data));
    // TODO: make sure api is 200
    this.availableUsersToInvite = this.availableUsersToInvite.filter(user => user.id !== userId);
  }

  /**
   * get available users to invite
   */
  private getAvailableUsersToInvite() {
    this.store.select(fromRoot.getAllUsers).pipe(first()).subscribe(data => {
      if (data) {
        this.availableUsersToInvite = this.filterUsers(data.data);
      } else {
        this.store.dispatch(new guestActions.AllUsersAction());
        this.store.select(fromRoot.getAllUsers).subscribe(data => {
          if (data) {
            this.availableUsersToInvite = this.filterUsers(data.data);
          }
        })
      }
    });
  }

  /**
   * filter users
   * @param allUsers
   */
  private filterUsers(allUsers) {
    return allUsers.filter(element => this.gameInfo.users.includes(element));
  }
}
