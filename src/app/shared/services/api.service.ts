import Post from 'src/app/posts/post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiURL: string = 'https://jsonplaceholder.typicode.com/';
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiURL + 'posts');
  }

  getPost(postId: number): Observable<Post> {
    return this.http.get<Post>(this.apiURL + 'posts/' + postId);
  }

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      this.apiURL + 'posts/' + postId + '/comments'
    );
  }
}
