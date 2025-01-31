import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';
import { IBlog } from '../../domain/model/blog.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateBlogService {
  private readonly _http = inject(HttpClient);

  execute(blog: IBlog): Observable<IBlog> {
    return this._http.put<IBlog>(urlResources.blogsOperationsById(blog.id), blog);
  }
}
