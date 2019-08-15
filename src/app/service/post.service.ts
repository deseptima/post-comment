import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../model/post.model';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = environment.url + 'posts'

  constructor(private http: HttpClient) { }

  getAllPostList(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url)
  }

  getPostListByUserId(userId: number) {
    const url = `${this.url}?userId=${userId}`
    return this.http.get<Post[]>(url)
  }
}
