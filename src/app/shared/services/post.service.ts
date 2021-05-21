import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Identifiers } from '@angular/compiler';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient, public router: Router) {}

  //* Get Single Blog
  getBlog(id: string): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };
    return this.http.get(`${environment.URI}blog/${id}`, options);
  }

  //* Get all Blogs

  getBlogs(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };
    return this.http.get(`${environment.URI}`, options);
  }

  deleteBlog(id: string): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };
    return this.http.delete(`${environment.URI}delete/${id}`, options);
  }

  postBlog(
    title: string,
    content: string,
    tags: [],
    postImage: File
  ): Observable<any> {
    var formData: any = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tags', tags);
    formData.append('postImage', postImage);

    return this.http.post<any>(`${environment.URI}create/`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  updateBlog(
    id: string,
    title?: string,
    content?: string,
    tags?: [],
    postImage?: File
  ): Observable<any> {
    var formData: any = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tags', tags);
    formData.append('postImage', postImage);

    return this.http.put<any>(`${environment.URI}update/${id}`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
