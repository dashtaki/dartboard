import {Component, OnInit} from '@angular/core';
import {Game} from '../../services/models/game';
import {GuestService} from '../../services/guest.service';

@Component({
  selector: 'app-leader-board',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public gameInfo: Game;

  constructor(private guestService: GuestService) {
  }

  /**
   * ngOnInit life cycle hook
   */
  ngOnInit() {
    this.guestService.getGameById(1).subscribe(gameInfo => {
      if (gameInfo)
        this.gameInfo = gameInfo;
    });
  }

}
