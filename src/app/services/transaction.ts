import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'http://localhost:8083/api/transactions';

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

  transfer(data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/transfer`,
      data,
      { headers: this.getHeaders() }
    );
  }

  getAllTransactions(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/all`,
      { headers: this.getHeaders() }
    );
  }

  deleteTransaction(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }
}