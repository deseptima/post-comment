import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Post } from '../model/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = environment.url + 'posts';

  constructor(private http: HttpClient) {}

  getAllPostList(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }

  getPostListByUserId(userId: number) {
    const url = `${this.url}?userId=${userId}`;
    return this.http.get<Post[]>(url);
  }
  getPost(userId?: number): Observable<Post[]> {
    if (userId) {
      const url = `${this.url}?userId=${userId}`;
      return this.http.get<Post[]>(url);
    } else {
      return this.http.get<Post[]>(this.url);
    }
  }
}
