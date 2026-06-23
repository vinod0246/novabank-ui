import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {
      username,
      password
    });
  }

  register(username: string, email: string,
      password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      username,
      email,
      password
    });
  }

  saveToken(token: string, username: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('isLoggedIn', 'true');
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  logout() {
    localStorage.clear();
  }

getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.getToken()}`
      })
    }
  }
 
}