import Post from 'src/app/posts/post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Comment from 'src/app/comments/comment.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiURL: string = 'https://jsonplaceholder.typicode.com/';
  constructor(private http: HttpClient) {}

  getPosts(page: number): Observable<any> {
    return this.http.get<any>(
      this.apiURL + 'posts?_page=' + page + '&_limit=10'
    );
  }

  getPost(postId: number): Observable<Post> {
    return this.http.get<Post>(this.apiURL + 'posts/' + postId);
  }

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      this.apiURL + 'posts/' + postId + '/comments'
    );
  }

  postComments(payload: Comment): Observable<Comment> {
    return this.http.post<Comment>(
      this.apiURL + 'posts/' + payload.postId + '/comments',
      JSON.stringify(payload),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
