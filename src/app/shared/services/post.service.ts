import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:5000/api/posts'; // Backend URL

  constructor(private http: HttpClient) {}

  // Obtenir tous les posts
  getPosts(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // Créer un post
  createPost(content: string): Observable<any> {
    return this.http.post(`${this.baseUrl}`, { content });
  }

  // Liker un post
  likePost(postId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${postId}/like`, {});
  }

  // Ajouter un commentaire
  addComment(postId: string, content: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${postId}/comment`, { content });
  }
}
