import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import User from 'src/app/Model/User';
import { RouterLinkService } from 'src/app/services/router-link.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss'],
})
export class FriendsListComponent implements OnInit {
  constructor(
    private userService: UserService,
    private routerLinkSerivce: RouterLinkService
  ) {
    this.loading = false;
  }
  allUsers!: User[];

  img: string = '../../../assets/Images/user-login-avatar.png';
  @Output() newItemEvent = new EventEmitter<User[]>();

  currentName: string | undefined;
  loading: boolean;
  ngOnInit(): void {
    this.currentName = localStorage.getItem('name')?.toString();
    this.initList();
  }
  initList() {
    this.loading = true;
    this.userService.getAll().subscribe(
      (users) => {
        this.loading = false;
        this.allUsers = users;
        this.newItemEvent.emit(this.allUsers);
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }
  removeSelf() {
    // for (var i = 0; i < this.allUsers.length; i++) {
    //   if (this.allUsers[i].userName === this.currentName) break;
    // }
    // this.allUsers.splice(i, 1);
  }
}
