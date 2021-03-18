import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FbCreateResponse, Post} from './interface';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.FbDbUrl}/posts.json`, post)
        .pipe( map( (response: FbCreateResponse) => {
          return {
            ...post,
            id: response.name,
            date: new Date(post.date)
          };
        }));
  }
  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.FbDbUrl}/posts.json`)
          .pipe( map( (response: {[key: string]: any}) => {
              return Object
                  .keys(response)
                  .map( key => ({
                      ...response[key],
                      id: key,
                      date: new Date (response[key].date)
                      })
                  );
          }));
  }
  removePost(id: string): Observable<void> {
      return this.http.delete<void>(`${environment.FbDbUrl}/posts${id}.json`);
  }
  getPostId(id: string): Observable<Post> {
      return this.http.get<Post>(`${environment.FbDbUrl}/posts/${id}.json`)
          .pipe( map( (post: Post) => {
              return {
                  ...post,
                  id,
                  date: new Date(post.date)
              };
          }));
  }
  update(post: Post): Observable<Post> {
      return this.http.patch<Post>(`${environment.FbDbUrl}/posts/${post.id}.json`, post);
  }
}
