import {Component, OnInit} from '@angular/core';
import {UtilityService} from "./services/utility.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isUserLoggedIn: boolean;

  constructor(private utilityService: UtilityService) {
  }

  ngOnInit(): void {
    this.isUserLoggedIn = this.utilityService.isUserLoggedIn();
  }

}
