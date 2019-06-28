import {Component, OnInit} from '@angular/core';
import {GuestService} from "../../services/guest.service";
import {User} from "../../services/models/user.model";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  public users: User[];
  public page: number;
  public currentPage: number;
  public total: number;
  public itemsPerPage: number;

  constructor(private guestService: GuestService) {
  }

  /**
   * ngOnInit life cycle hook
   */
  ngOnInit() {
    this.page = 1;
    this.guestService.getAllUsers(this.page).subscribe(data => {
      if (data) {
        this.currentPage = data.current_page;
        this.total = data.total;
        this.itemsPerPage = data.per_page;
        this.users = data.data;
      }
    });
  }

}
