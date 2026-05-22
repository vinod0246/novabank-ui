import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'http://localhost:8082/api/accounts';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 
        `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json'
    });
  }

  createAccount(account: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/create`,
      account,
      { headers: this.getHeaders() }
    );
  }

  getAllAccounts(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/all`,
      { headers: this.getHeaders() }
    );
  }

  deleteAccount(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }

  depositMoney(data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/deposit`,
      data,
      { headers: this.getHeaders() }
    );
  }
}