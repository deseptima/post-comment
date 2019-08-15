import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Post } from '../../model/post.model';
import { PostService } from '../../service/post.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription: Subscription
  postList: Post[] = []
  postDisplayList: Post[] = []

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subscription = this.postService.getAllPostList().subscribe(
      postList => {
        this.postList = postList
        for (let item of this.postList) {
          if (!this.postDisplayList.find(display => display.userId === item.userId)) {
            this.postDisplayList.push(item)
          }
        }
      },
      (error: HttpErrorResponse) => {
        console.log('Error occurs');
        console.log(error);
      }
    )
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  goToUserPost(userId: number) {
    this.router.navigate(['/post/' + userId])
  }

}
