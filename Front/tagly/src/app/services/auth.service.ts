import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth'; // URL de tu backend

  constructor(private http: HttpClient, private router: Router) { }

  login(tag: string, password: string): Observable<any> {

    return this.http.post(`${this.apiUrl}/login`, {"tag":tag, "password":password});
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Si existe el token, el usuario está autenticado
  }

  logout(): void {
    localStorage.removeItem('token');  // Eliminar el token en logout
    this.router.navigate(['/index']);
  }
}
