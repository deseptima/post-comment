import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, delay } from 'rxjs/operators';
import { Post } from '../../model/post.model';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  postList: Post[] = [];
  userId: number;
  isLoading = true;

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.subscription = this.route.paramMap
      .pipe(
        switchMap(paramMap => {
          this.userId = +paramMap.get('userId');
          return this.postService.getPost(this.userId);
        }),
        delay(200)
      )
      .subscribe(
        postList => {
          this.postList = postList;
          this.isLoading = false;
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

  goToPostAndComment(postId: number) {
    this.router.navigate(['/comment', postId]);
  }
  nextId() {
    this.isLoading = true;
    this.router.navigate(['/post', ++this.userId]);
  }
  prevId() {
    this.isLoading = true;
    this.router.navigate(['/post', --this.userId]);
  }
}
