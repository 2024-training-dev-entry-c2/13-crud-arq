import { BehaviorSubject } from "rxjs";
import { IBlog } from "../model/blog.model";
import { inject, Injectable } from "@angular/core";
import { StateFactory } from "shared";

@Injectable({
  providedIn: 'root'
})
export class BlogState {
  private readonly _factory = inject(StateFactory);
  private readonly blogs$ = new BehaviorSubject<IBlog[]>([]);
  private readonly currenBlog$ = new BehaviorSubject<IBlog>(null);

  store() {
    return {
      blogs: this._factory.state(this.blogs$),
      currenBlog: this._factory.state(this.currenBlog$)
    }
  }
}