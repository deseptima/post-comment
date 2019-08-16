import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.url + 'users';

  constructor(private http: HttpClient) {}

  getUsers(id?: number): Observable<User[]> {
    if (id) {
      const url = `${this.url}users/${id}`;
      return this.http.get<User[]>(url);
    } else {
      return this.http.get<User[]>(this.url);
    }
  }
}
