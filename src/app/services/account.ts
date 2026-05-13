import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'http://localhost:8082/api/accounts';

  constructor(private http: HttpClient) {}

  createAccount(account: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, account);
  }

  getAllAccounts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }

  deleteAccount(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}