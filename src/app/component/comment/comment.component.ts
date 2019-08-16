import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Comment } from '../../model/comment.model';
import { Post } from '../../model/post.model';
import { CommentService } from '../../service/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  postList: Post[] = [];
  commentList: Comment[] = [];
  // userId: number;
  postId: number;

  constructor(private commentService: CommentService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscription = this.route.paramMap
      .pipe(
        switchMap(paramMap => {
          this.postId = +paramMap.get('postId');
          return this.commentService.getComment(this.postId);
        })
      )
      .subscribe(
        commentList => {
          this.commentList = commentList;
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

  deleteComment(commentId: number) {
    this.commentService
      .deleteComment(commentId)
      .pipe(take(1))
      .subscribe(
        () => {
          const index = this.commentList.findIndex(item => item.id === commentId);
          this.commentList.splice(index, 1);
          console.log('Delete Success');
        },
        (error: HttpErrorResponse) => {
          console.log('Error occurs');
          console.log(error);
        }
      );
  }

  addComment(name: string, email: string, body: string) {
    const newData = { postId: 0, id: 0, name, email, body };
    this.commentService
      .addComment(newData)
      .pipe(take(1))
      .subscribe(addComment => {
        const addData: Comment = { ...newData, ...addComment };
        this.commentList.push(addData);
      });
  }
}
