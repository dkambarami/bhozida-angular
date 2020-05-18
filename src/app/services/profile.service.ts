import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../common/profile';
import { User } from '../common/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private email: string;
  private user: User;
  private profile: Profile;
  private user_id: number;

  private baseUrl = 'http://localhost:8084/api/v1/users/';
  private userUrl = '';


  constructor(private httpClient: HttpClient) {

  }

  getUser(): Observable<User> {
    this.email = localStorage.getItem('email');
    this.userUrl = this.baseUrl + 'search/email?email=' + this.email;
    return this.httpClient.get<User>(this.userUrl);
  }


  //get user is giving me the user but I want the user id. nxaaaa
  getProfile(id: number): Observable<Profile> {
    const profileUrl = this.baseUrl + id + '/profile';
    console.log('data is here =====' + this.httpClient.get<Profile>(profileUrl));
    return this.httpClient.get<Profile>(profileUrl);
  }
}

