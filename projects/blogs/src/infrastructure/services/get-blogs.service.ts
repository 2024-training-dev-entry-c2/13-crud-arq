import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBlog } from '../../domain/model/blog.model';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class GetBlogsService {
  private readonly _http = inject(HttpClient);

  execute(): Observable<IBlog[]> {
    return this._http.get<IBlog[]>(urlResources.blogs);
  }
}
