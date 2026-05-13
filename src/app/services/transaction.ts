import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'http://localhost:8083/api/transactions';

  constructor(private http: HttpClient) {}

  transfer(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/transfer`, data);
  }

  getAllTransactions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }

  deleteTransaction(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}