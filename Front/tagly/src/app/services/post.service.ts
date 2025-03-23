import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'http://localhost:3000/api/posts'; // URL de tu backend

  constructor(private http: HttpClient) { }

  createPost(postData: any): Observable<any> {
    return this.http.post(this.apiUrl, postData);
  }
}
