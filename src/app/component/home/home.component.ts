import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  userList: User[] = [];
  selectedItem = 1;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.subscription = this.userService.getUsers().subscribe(
      userList => {
        this.userList = userList;
      },
      (error: HttpErrorResponse) => {
        console.log('Error occurs');
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  goToUserPost(userId: number) {
    this.router.navigate(['/post/', userId]);
  }
}
