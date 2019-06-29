import {Component, OnInit} from '@angular/core';
import {Game} from '../../services/models/game';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../store/reducers/index';
import * as guestActions from '../../store/actions/guest.action';
import {ActivatedRoute} from '@angular/router';
import {UtilityService} from '../../services/utility.service';
import {Winner} from "../../services/models/winner.model";
import {User} from "../../services/models/user.model";

@Component({
  selector: 'app-leader-board',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public gameInfo: Game;

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
    this.utilityService.toggleLoadingSpinner("show");
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.store.dispatch(new guestActions.GameAction(parseInt(params['id'])));
        this.store.select(fromRoot.getGame).subscribe(data => {
          if (data) {
            this.gameInfo = data;
            this.utilityService.toggleLoadingSpinner("hide");
          }
        });
      }
    });

  }

}
