import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Comment } from '../model/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private url = environment.url + 'comments';

  constructor(private http: HttpClient) {}

  // getAllCommentList(): Observable<Comment[]> {
  //   return this.http.get<Comment[]>(this.url);
  // }

  // getCommentByPostId(postId: number) {
  //   const url = `${this.url}?postId=${postId}`;
  //   return this.http.get<Comment[]>(url);
  // }

  getComment(postId: number): Observable<Comment[]> {
    const url = `${this.url}?postId=${postId}`;
    return this.http.get<Comment[]>(url);
  }
  addComment(comment: Comment): Observable<Comment[]> {
    return this.http.post<Comment[]>(this.url, comment);
  }

  deleteComment(id: number) {
    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }
}
