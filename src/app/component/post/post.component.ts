import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Post } from '../../model/post.model';
import { PostService } from '../../service/post.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  private subscription: Subscription
  postList: Post[] = []
  userId: number

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = +paramMap.get('userId')
    })

    this.subscription = this.postService.getPostListByUserId(this.userId).subscribe(
      postList => {
        this.postList = postList
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

  goToPostAndComment(postId: number) {
    this.router.navigate(['/post/' + this.userId + '/' + postId])
  }

}
