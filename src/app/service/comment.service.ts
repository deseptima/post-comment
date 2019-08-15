import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../model/comment.model';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private url = environment.url + 'comments?postId='

  constructor(private http: HttpClient) { }

  getAllCommentList(): Observable<Comment[]> {
    const url = `${environment.url}posts/1/comments`
    return this.http.get<Comment[]>(url)
  }

  getCommentByPostId(postId:number){
    const url = `${this.url}${postId}`
    return this.http.get<Comment[]>(url)
  }
}
