import { inject, Injectable } from "@angular/core";
import { State } from "../domain/state";
import { finalize, Subscription, tap } from "rxjs";
import { IBlog } from "../domain/model/blog.model";
import { CreateBlogService } from "../infrastructure/services/create-blog.service";
import { ModalComponent } from "shared";

@Injectable({
  providedIn: 'root'
})
export class CreateBlogUseCase {
  private readonly _service = inject(CreateBlogService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

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
            this._state.blogState.blogs.set([...blogs, blog]);
            modal.toggle();
          }),
        ).subscribe()
    );
  }
  //#endregion
}