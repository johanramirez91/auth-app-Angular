import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, User } from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _user!: User;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth`;
    return this.http.post<AuthResponse>(url, { email, password }).pipe(
      tap((resp) => {
        if (resp.ok) {
          localStorage.setItem('token', resp.token!);
          this._user = {
            name: resp.name!,
            uid: resp.uid!,
          };
        }
      }),
      map((resp) => resp.ok),
      catchError((error) => of(error.error))
    );
  }

  validarToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
    return this.http.get<AuthResponse>(url, { headers }).pipe(
      map((resp) => {
        localStorage.setItem('token', resp.token!);
        this._user = {
          name: resp.name!,
          uid: resp.uid!,
        };
        return resp.ok;
      }),
      catchError((err) => of(false))
    );
  }

  logOut(): void {
    localStorage.removeItem('token');
  }

  get usuario() {
    return { ...this._user };
  }
}
