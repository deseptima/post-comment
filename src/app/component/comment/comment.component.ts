import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Post } from '../../model/post.model';
import { PostService } from '../../service/post.service';
import { Comment } from '../../model/comment.model';
import { CommentService } from '../../service/comment.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
  private subscription: Subscription
  postList: Post[] = []
  commentList: Comment[] = []
  userId: number
  postId: number

  constructor(private postService: PostService, private commentService: CommentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = +paramMap.get('userId')
    })

    this.route.paramMap.subscribe(paramMap => {
      this.postId = +paramMap.get('postId')
    })

    this.postService.getPostListByUserId(this.userId).subscribe(
      postList => {
        this.postList = postList
        for (let item of this.postList) {
          if (item.id === this.postId) {
            this.postList = []
            this.postList.push(item)
          }
        }
      },
      (error: HttpErrorResponse) => {
        console.log('Error occurs');
        console.log(error);
      }
    )

    this.subscription = this.commentService.getCommentByPostId(this.postId).subscribe(
      commentList => {
        this.commentList = commentList
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
}
