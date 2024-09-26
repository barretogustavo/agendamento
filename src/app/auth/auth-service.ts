import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login, Token } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login({ username, password }: Login): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}/auth`, { username, password });
  }
}
