import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Profile } from '../common/profile';
import { User } from '../common/user';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private email: string;
  private user: User;
  private profile: Profile;
  private user_id: number;

  private baseUrl = 'http://localhost:8080/api/v1/users/';
  private userUrl = '';
  private profileUrl = 'http://localhost:8080/api/v1/profiles/';


  constructor(private httpClient: HttpClient) {

  }

  getUser(): Observable<User> {
    this.email = localStorage.getItem('email');
    this.userUrl = this.baseUrl + 'search/email?email=' + this.email;
    return this.httpClient.get<User>(this.userUrl);
  }


  getProfile(id: number): Observable<Profile> {
    const profileUrl = this.baseUrl + id + '/profile';
    console.log('data is here =====' + this.httpClient.get<Profile>(profileUrl));
    return this.httpClient.get<Profile>(profileUrl);
  }

  updateProfile(data: any): Observable<any> {
    console.log('data is here =========================' + data);
    return this.httpClient.put<any>(this.profileUrl + data.id, data)
      .pipe(
        tap(_ => this.log('update')),
        catchError(this.handleError('update', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}

