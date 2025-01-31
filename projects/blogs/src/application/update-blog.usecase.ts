import { inject, Injectable } from "@angular/core";
import { State } from "../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IBlog } from "../domain/model/blog.model";
import { ModalComponent } from "shared";
import { UpdateBlogService } from "../infrastructure/services/update-blog.service";

@Injectable({
  providedIn: 'root'
})
export class UpdateBlogUseCase {
  private readonly _service = inject(UpdateBlogService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  currentBlog$(): Observable<IBlog> {
    return this._state.blogState.currenBlog.$();
  }

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(blog: IBlog, modal: ModalComponent): void {
    this.subscriptions.add(
      this._service.execute(blog)
        .pipe(
          tap((blog) => {
            const blogs = this._state.blogState.blogs.snapshot();
            const newBlogs = blogs.map(b => b.id === blog.id ? blog : b);
            this._state.blogState.blogs.set(newBlogs);
            modal.toggle();
            this._state.blogState.currenBlog.set(null);
          }),
        ).subscribe()
    );
  }

  selectBlog(id: string): void {
    const currentBlog = this._state.blogState.blogs.snapshot().find(blog => blog.id === id);
    this._state.blogState.currenBlog.set(currentBlog);
  }
  //#endregion
}