import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';
import { IBlog } from '../../domain/model/blog.model';

@Injectable({
  providedIn: 'root'
})
export class CreateBlogService {
  private readonly _http = inject(HttpClient);

  execute(blog: IBlog): Observable<IBlog> {
    return this._http.post<IBlog>(urlResources.blogs, blog);
  }
}
