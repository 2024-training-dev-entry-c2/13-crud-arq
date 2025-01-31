import { inject, Injectable } from "@angular/core";
import { BlogState } from "./blog.state";

@Injectable({
  providedIn: 'root'
})
export class State {
  private readonly _blogs = inject(BlogState);

  get blogState() {
    return this._blogs.store();
  }
}